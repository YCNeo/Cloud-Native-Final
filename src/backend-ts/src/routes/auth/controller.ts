import express, { Request, Response } from "express";
import loginService from "./service.ts";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Auth router is availble");
});

router.get("/login", (req: Request, res: Response) => {
  // res.status(200).send("Login router is availble");
  try {
    res
      .status(201)
      .send(loginService({ mail: "sdfa", hashPassword: "sfajgla" }));
  } catch (error) {}
});

export default router;
