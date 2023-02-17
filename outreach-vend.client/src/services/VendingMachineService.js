import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { productsService } from "./ProductsService.js"

class VendingMachineService {
  async getVendingMachine() {
    const res = await api.get('/api/vend')
    AppState.vendingMachine = res.data
    await productsService.getAllProducts(AppState.vendingMachine.id)
  }
}

export const vendingMachineService = new VendingMachineService()
