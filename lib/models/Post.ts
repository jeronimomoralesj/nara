import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const PostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    excerpt: { type: String, required: true, trim: true, maxlength: 400 },
    body: { type: String, required: true },
    coverImage: { type: String, trim: true },
    tags: { type: [String], default: [] },
    readingMinutes: { type: Number, default: 4 },
    author: { type: String, trim: true, default: "Fundación Nara" },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export type PostDoc = InferSchemaType<typeof PostSchema>;

export const Post: Model<PostDoc> =
  (mongoose.models.Post as Model<PostDoc>) ??
  mongoose.model<PostDoc>("Post", PostSchema);
