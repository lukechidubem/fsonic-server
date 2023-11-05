import mongoose, { Document, model, Schema } from "mongoose";

export interface IDate extends Document {
  date: string;
}

const dateSchema: Schema<IDate> = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "Please add a date"],
  },
});

export const Date = model<IDate>("Date", dateSchema);
