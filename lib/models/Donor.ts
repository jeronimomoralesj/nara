import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const DonorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    amount: { type: Number, required: true, min: 1000 },
    method: {
      type: String,
      enum: ["nequi", "daviplata", "otro"],
      default: "nequi",
    },
    message: { type: String, trim: true, maxlength: 600 },
  },
  { timestamps: true }
);

export type DonorDoc = InferSchemaType<typeof DonorSchema>;

export const Donor: Model<DonorDoc> =
  (mongoose.models.Donor as Model<DonorDoc>) ??
  mongoose.model<DonorDoc>("Donor", DonorSchema);
