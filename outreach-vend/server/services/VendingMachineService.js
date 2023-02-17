import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class VendingMachineService {
  async getVendingMachine() {
    const vend = await dbContext.VendingMachine.findOne()
    if (!vend) {
      throw new BadRequest('No vending machine found')
    }
    return vend
  }
  async createVendingMachine(vendData) {
    const vend = await dbContext.VendingMachine.create(vendData)
    return vend
  }
  async getVendingMachineById(vendingMachineId) {
    const vendingMachine = await dbContext.VendingMachine.findById(vendingMachineId)
    if (!vendingMachine) {
      throw new BadRequest('Invalid or Bad VendingMachine Id')
    }
    return vendingMachine
  }
  async updateVendingMachine(product, changeDue) {
    const vendingMachine = await this.getVendingMachineById(product.vendingMachineId)
    vendingMachine.sales += product.price
    vendingMachine.change -= (changeDue / 0.25)
    if (vendingMachine.change <= 0) {
      vendingMachine.change += 1000
    }

    await vendingMachine.save()
    return vendingMachine
  }
}

export const vendingMachineService = new VendingMachineService()
