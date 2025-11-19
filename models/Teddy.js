import { Schema, model } from 'mongoose';

const teddySchema = Schema({
  name: String,
  price: Number,
  description: String,
  colors: [String],
  imageUrl: String,
});

export default model('Teddy', teddySchema);
