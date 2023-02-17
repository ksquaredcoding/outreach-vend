import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ProductSchema } from "../models/Product.js";
import { ValueSchema } from '../models/Value'
import { VendingMachineSchema } from "../models/VendingMachine.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  VendingMachine = mongoose.model('VendingMachine', VendingMachineSchema);
  Products = mongoose.model('Product', ProductSchema);
}

export const dbContext = new DbContext()
