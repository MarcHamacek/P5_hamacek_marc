import { Schema, model } from 'mongoose';

const furnitureSchema = Schema({
  name: String,
  price: Number,
  description: String,
  varnish: [String],
  imageUrl: String,
});

export default model('Furniture', furnitureSchema);
