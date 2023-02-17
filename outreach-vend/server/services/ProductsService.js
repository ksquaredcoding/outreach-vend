import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { vendingMachineService } from "./VendingMachineService.js"

class ProductsService {
  async getAllProducts(vendingMachineId) {
    const products = await dbContext.Products.find({ vendingMachineId })
    if (products.length <= 0) {
      throw new BadRequest('No products found')
    }
    return products
  }
  async createProduct(productData) {
    if (productData.price % 0.25 != 0) {
      throw new Forbidden('Product price must be a multiple of $0.25')
    }
    const product = await dbContext.Products.create(productData)
    return product
  }
  async getProductById(productId) {
    const product = await dbContext.Products.findById(productId)
    if (!product) {
      throw new BadRequest('Invalid or Bad Product Id')
    }
    return product
  }
  async updateProduct(productData) {
    const product = await this.getProductById(productData.id)
    const vend = await vendingMachineService.getVendingMachineById(product.vendingMachineId)
    if (productData.paid % 0.25 != 0) {
      throw new Forbidden('Invalid denomination')
    }
    if (product.price > productData.paid) {
      throw new Forbidden('Not enough funds to purchase this product')
    }
    const changeDue = productData.paid - product.price
    if ((changeDue / 0.25) > vend.change) {
      throw new BadRequest('Not enough change for transaction, sorry')
    }
    product.quantity--
    await vendingMachineService.updateVendingMachine(product, changeDue)

    await product.save()
    return product
  }
}

export const productsService = new ProductsService()
