import { Schema, model, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true },
}, {
  timestamps: true,
});

export const Category: Model<ICategory> = model<ICategory>('Category', CategorySchema);