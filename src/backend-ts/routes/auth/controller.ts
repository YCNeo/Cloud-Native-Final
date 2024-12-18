import express, { Request, Response } from "express";
import {loginService, registerService} from "./service.ts";
import cors from "cors"
import { JsonWebTokenError } from "../../node_modules/jsonwebtoken/index.js";


const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Auth router is availble");
});

router.get("/login", (req: Request, res: Response) => {
  res.status(200).send("Login router is availblemm");
});


router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("req.body:", email, password);

    const successTok = await loginService({ mail: email, hashPassword: password });
    console.log("success", successTok);
    res.status(200).json({ msg: "Login Success!", jwttok: successTok.jwtToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ msg: error.message });
  }
});

router.post("/register", async (req:Request, res: Response) => {
  try {
    const {name, email, password} = req.body;
    await registerService({name:name, mail:email, hashPassword:password});
    res.status(200).json({msg: req.body}) 
  } catch (err) {
    console.error("Email has Existed:", err);
    res.status(401).json({msg: err.message})
  };
})

router.post("/google-login", async (req: Request, res: Response) => {
  try {
    
    
  } catch (error) {
    console.error("Error during google-login:", error);
    res.status(401).json({ msg: error.message });
  }
});



export default router;
