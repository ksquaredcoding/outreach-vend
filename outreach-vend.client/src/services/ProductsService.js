import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from "../utils/Pop.js"
import { api } from './AxiosService'

class ProductsService {
  async getAllProducts(vendingMachineId) {
    const res = await api.get(`/api/products/${vendingMachineId}`)
    AppState.products = res.data
  }
  async purchaseProduct(productData) {
    productData.paid = AppState.funds
    if (productData.paid < productData.price) {
      Pop.error('Insufficient Funds')
    }
    const res = await api.put(`/api/products/${productData.id}`, productData)
    let index = AppState.products.findIndex(p => p.id == productData.id)
    AppState.products.splice(index, 1, res.data)
    AppState.vendingMachine.sales += productData.price
    let change = productData.paid - productData.price
    Pop.success(`You have purchased ${productData.name}, your change is: $${change.toFixed(2)}`)
  }
}

export const productsService = new ProductsService()
