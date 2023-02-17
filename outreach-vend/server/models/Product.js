import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const ProductSchema = new Schema({
  vendingMachineId: { type: ObjectId, required: true, ref: 'VendingMachine' },
  name: { type: String, required: true, minlength: 3 },
  price: { type: Number, required: true, default: 0.25 },
  quantity: { type: Number, required: true, default: 100 }
}, SCHEMA_OPTIONS)
