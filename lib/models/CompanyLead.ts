import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const CompanyLeadSchema = new Schema(
  {
    company: { type: String, required: true, trim: true, maxlength: 160 },
    contact: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    sector: { type: String, required: true, trim: true, maxlength: 80 },
    status: {
      type: String,
      enum: ["nuevo", "contactado", "aliado"],
      default: "nuevo",
    },
  },
  { timestamps: true }
);

export type CompanyLeadDoc = InferSchemaType<typeof CompanyLeadSchema>;

export const CompanyLead: Model<CompanyLeadDoc> =
  (mongoose.models.CompanyLead as Model<CompanyLeadDoc>) ??
  mongoose.model<CompanyLeadDoc>("CompanyLead", CompanyLeadSchema);
