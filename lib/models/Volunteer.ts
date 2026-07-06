import mongoose, { Schema, models } from "mongoose";

const VolunteerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    skills: { type: String, required: true },
    availability: { type: String, required: true },
  },
  { timestamps: true }
);

export const Volunteer =
  models.Volunteer ?? mongoose.model("Volunteer", VolunteerSchema);
