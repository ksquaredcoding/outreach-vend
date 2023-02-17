import { Schema } from "mongoose";
import { SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const VendingMachineSchema = new Schema({
  sales: { type: Number, required: true, default: 0 },
  change: { type: Number, required: true, default: 1000 }
}, SCHEMA_OPTIONS)
