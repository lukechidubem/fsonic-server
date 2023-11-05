import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { Date } from "./dateModel";
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.post("/expiry-date", async (req: Request, res: Response) => {
  try {
    const { date } = req.body;
    const newDate = await Date.create({ date });
    res
      .status(201)
      .json({ message: "Expiry date created successfully", data: newDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/expiry-date", async (req: Request, res: Response) => {
  try {
    const dateData = await Date.findOne().exec();
    if (dateData) {
      res.json(dateData);
    } else {
      res.status(404).json({ message: "No date data available." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.patch("/expiry-date", async (req: Request, res: Response) => {
  try {
    const { date } = req.body;
    const dateData = await Date.findOne().exec();
    if (dateData) {
      dateData.date = date;
      const updatedDate = await dateData.save();
      res.status(200).json({
        message: "Expiry date updated successfully",
        data: updatedDate,
      });
    } else {
      res.status(404).json({ message: "No date data available." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default app;
