import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Channel router is availble");
});

export default router;