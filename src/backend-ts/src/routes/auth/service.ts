import {
  DtoModel,
  ViewModel,
  registerModel,
  payLoad,
  registerTokenRedisModle,
} from "./model";
import { registerTokenRedis } from "./repository";
import mysqlPool from "../../utils/mysql";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import process from "node:process";
import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";
import nodemailer from "nodemailer";
dotenv.config();

export async function loginService(model: DtoModel): Promise<ViewModel> {
  try {
    const result = await mysqlSearchAccount(model);
    if (!result.success) {
      // return { jwtToken:'0' };
      throw new Error("Wrong mail or password");
    }
    const mail = model.mail;
    const tokenUpdateTime = 60 * 60 * 1000; // 1hr
    const pl: payLoad = {
      username: result.name,
      userID: result.uid,
      userMail: mail,
      currentTime: Math.floor(Date.now() / tokenUpdateTime),
    };
    const jwtToken = getJWTToken(pl);
    return { jwtToken };
  } catch (err) {
    console.error("loginService error:", err);
    throw err; // 確保錯誤傳遞到呼叫者
  }
}

export async function registerService(model: registerModel) {
  // const result: DataModel = registerRepository(model);
  console.log(model);
  try {
    const mysql = await mysqlPool.getConnection();
    const q = `
    SELECT email, password FROM user WHERE email = ? and password = ?;`;
    const value = [model.mail, model.hashPassword];
    const [rows] = await mysql.query<RowDataPacket[]>(q, value);
    console.log(rows);

    if (!rows.length) {
      const registerToken = registerVertifyMail(model.mail);
      const tokenMail: registerTokenRedisModle = {
        token: registerToken,
        mail: model.mail,
        name: model.name,
        hashPassword: model.hashPassword,
      };
      registerTokenRedis(tokenMail);

      // mysqlAddAccount(model);
    } else {
      throw new Error("Already have account!");
    }
  } catch (err) {
    console.error("registerService", err);
    throw err;
  }
}

export async function mysqlAddAccount(userData: registerModel) {
  try {
    const mysql = await mysqlPool.getConnection();
    const query = `
      insert into user (\`username\`, \`email\`, \`password\`)
      values (?, ?, ?);`;
    const value = [userData.name, userData.mail, userData.hashPassword];
    const [rows, fields] = await mysql.query(query, value);
    console.log(rows, fields);
  } catch (err) {
    console.error("mysqlAddAccount fail:\n", err);
  }
}

async function mysqlSearchAccount(userData: DtoModel) {
  try {
    const mysql = await mysqlPool.getConnection();
    const q = `
    SELECT * FROM user WHERE email = ? AND password = ?;`;
    const value = [userData.mail, userData.hashPassword];
    const [rows] = await mysql.query<RowDataPacket[]>(q, value);
    console.log("mysqlSearchAccount:", rows, typeof rows, rows.length);

    if (rows.length) {
      return {
        success: true,
        mail: userData.mail,
        uid: rows[0].uid,
        name: rows[0].username,
      };
    }
    return { success: false, mail: userData.mail, uid: 0, name: "0" };
  } catch (err) {
    console.error("mysqlSearchAccount fail:\n", err);
    return { success: false, mail: userData.mail, uid: 0, name: "0" };
  }
}

// Base64Url 編碼方法
function base64UrlEncode(input: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(input); // 使用 TextEncoder 來編碼字串
  const base64 = btoa(String.fromCharCode(...data)); // 將 Uint8Array 轉換為 base64 字串
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // Base64Url 編碼
}

// HMAC SHA256 簽名方法
function createHmacSignature(message: string, secret: string): string {
  const signature = CryptoJS.HmacSHA256(message, secret).toString(
    CryptoJS.enc.Base64
  );
  return signature.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// 簽發 JWT Token
export const getJWTToken = (payload: payLoad): string => {
  const secret = "P9/mQY0iZqNJ9xAzMVSS+c7tPWay8673rMKVk7EjJyU=";

  // Header
  const header = {
    alg: "HS256", // 使用 HMAC SHA256
    typ: "JWT", // 類型是 JWT
  };

  // 編碼 Header 和 Payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // 創建簽名
  const signature = createHmacSignature(
    `${encodedHeader}.${encodedPayload}`,
    secret
  );

  // 返回最終 Token
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export function verifyJWTToken(token: string): payLoad {
  const secret = "P9/mQY0iZqNJ9xAzMVSS+c7tPWay8673rMKVk7EjJyU=";

  try {
    // 驗證並解碼
    const decoded = jwt.verify(token, secret) as payLoad;
    return decoded;
  } catch (error) {
    throw new Error("Invalid JWT token");
  }
}

function registerVertifyMail(receiverMail: string): string {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // 寄信的host，
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILSENDER, // 代為寄信的帳號
      pass: process.env.MAILSENDER_PASSWORD, // 該帳戶的密碼
    },
  });
  const randomString = Math.random().toString(36).substr(2);
  console.log(randomString);
  const token = CryptoJS.SHA256(randomString).toString(CryptoJS.enc.Hex);
  const verificationLink = `http://groupup.neoycn.xyz/express/auth/registerVertifyMail?token=${token}`;

  let mailOptions = {
    from: process.env.MAILSENDER, //寄件人emai
    to: receiverMail, //收件人email
    subject: "GroupUp Validation Mail", //主旨
    text: "Plaintext version of the message", //信件內容，純文字
    html: `
        <p>Click the button below to verify your email:</p>
        <a href="${verificationLink}" style="
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #007BFF;
          text-decoration: none;
          border-radius: 5px;
        ">Verify Email</a>
        <p>If the button above doesn't work, click the following link:</p>
        <a href="${verificationLink}">${verificationLink}</a>`, //信件內容，html
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  });
  return token;
}
