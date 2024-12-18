import { DataModel, DtoModel, ViewModel, registerModel, searchResult} from "./model.ts";
import {loginRepository, registerRepository} from "./repository.ts";

import mysqlPool from "../../utils/mysql.ts";
import jwt from 'jsonwebtoken';
import process from "node:process";
import dotenv from "dotenv";
import { TokenExpiredError } from "../../node_modules/jsonwebtoken/index.js";
import {sha256} from 'js-sha256';
import redisClient from "../../utils/redis.ts";
dotenv.config()

redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Redis connection error:', err));


async function writeToRedis(key:string, value:string, second:Number) {
  try {
    await redisClient.set(key, value, {EX : second});
    console.log(`Key: ${key}, Value: ${value} written to Redis`);
  } catch (err) {
    console.error('Error writing to Redis:', err);
  }
}


export async function loginService(model: DtoModel): Promise<ViewModel> {
  try {
    const result = await mysqlSearchAccount(model);
    if (!result.success) {
      // return { jwtToken:'0' };
      throw new Error("Wrong mail or password");
    }
    const jwtToken = getJWTToken(result.mail);
    await writeToRedis("jwtToken", jwtToken, 3600);
    return { jwtToken };
  } catch (err) {
    console.error("loginService error:", err);
    throw err; // 確保錯誤傳遞到呼叫者
  }
}


export async function registerService(model: registerModel) {
  const result: DataModel  = registerRepository(model);
  try {
    const mysql = await mysqlPool.getConnection();
    const q = `
    SELECT email, password FROM user WHERE email = ?;`;
    const value = [model.mail, model.hashPassword];
    const [rows] = await mysql.query(q, value);
    console.log(rows);
    if (!rows.length) {
      mysqlAddAccount(model);
    }
    else {
      throw new Error("Already have account!");
    }

  } catch(err) {
    console.error("registerService", err);
    throw err;
  }
}


async function mysqlAddAccount(userData:registerModel) {
  try {
    const mysql = await mysqlPool.getConnection();
    const userCol = `uid, username, email, password, phone, description, icon, birthday, gender, attend_time, update_time`;
    const uid = sha256(userData.mail).substring(0,9);
    const phone = '0912345678';
    const description = 'Nothing to description';
    const icon = 'NULL';
    const birthday = '1990-01-01';
    const gender = '1';
    const attend_time = 'NOW()';
    const update_time = 'NULL';
    const userTuple = ['U'+uid, userData.name, userData.mail, userData.hashPassword, 
      phone, description, icon, birthday, gender];
    
    const query = `
      insert into user (${userCol})
      value (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NULL)
    `;
    const [rows, fields] = await mysql.query(query, userTuple);
    console.log(rows, fields);
  } catch (err) {
    console.error("mysqlSearchAccount fail:\n", err);
  }
}

async function mysqlSearchAccount(userData: DtoModel) {
  try {
    const mysql = await mysqlPool.getConnection();
    const q = `
    SELECT email, password FROM user WHERE email = ? AND password = ?;`;
    const value = [userData.mail, userData.hashPassword];
    const [rows] = await mysql.query(q, value);
    console.log("mysqlSearchAccount:", rows, typeof rows, rows.length);

    if (rows.length) {
      return { success: true, mail: userData.mail };
    }
    return { success: false, mail: userData.mail };
  } catch (err) {
    console.error("mysqlSearchAccount fail:\n", err);
    return { success: false, mail: userData.mail };
  }
}




const getJWTToken = (sort: string): string => { // 要取前9位 
  const secretkey = 'P9/mQY0iZqNJ9xAzMVSS+c7tPWay8673rMKVk7EjJyU=';
  const token = jwt.sign({mail:sort.substring(0, 9)}, secretkey, {expiresIn: '1h'});
  console.log("getJWTToken:", token);
  return token;
  
};

export function verifyJWTToken(token: string): object {
  const secretkey = process.env.JWT_KEY; 
  console.log(secretkey);
  try {
    const decoded = jwt.verify(token, secretkey);
    return decoded;
  } catch (error) {
    throw new Error(jwt.JsonWebTokenError);
  }
}

