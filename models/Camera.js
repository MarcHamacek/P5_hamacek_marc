import { Schema, model } from 'mongoose';

const cameraSchema = Schema({
  name: String,
  price: Number,
  description: String,
  lenses: [String],
  imageUrl: String,
});

export default model('Camera', cameraSchema);
