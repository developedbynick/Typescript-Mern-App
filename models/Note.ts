import mongoose, { InferSchemaType } from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "A note must have a title"] },
    text: { type: String },
  },
  { timestamps: true }
);
export type Note = InferSchemaType<typeof noteSchema>;
export default mongoose.model("Note", noteSchema);
