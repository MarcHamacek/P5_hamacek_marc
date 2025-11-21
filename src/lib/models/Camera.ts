import { Schema, model, models } from 'mongoose';

import { Camera } from '@/types';

const cameraSchema = new Schema<Camera>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  lenses: { type: [String], required: true },
  imageUrl: { type: String, required: true },
});

export default models.Camera || model<Camera>('Camera', cameraSchema);
