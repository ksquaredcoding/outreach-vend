import { Auth0Provider } from '@bcwdev/auth0provider'
import { productsService } from "../services/ProductsService.js"
import BaseController from '../utils/BaseController'

export class ProductsController extends BaseController {
  constructor() {
    super('api/products')
    this.router
      .get('/:vendingMachineId', this.getAllProducts)
      .post('', this.createProduct)
      .put('/:productId', this.updateProduct)
  }
  async getAllProducts(req, res, next) {
    try {
      const products = await productsService.getAllProducts(req.params.vendingMachineId)
      res.send(products)
    } catch (error) {
      next(error)
    }
  }
  async createProduct(req, res, next) {
    try {
      const product = await productsService.createProduct(req.body)
      res.send(product)
    } catch (error) {
      next(error)
    }
  }
  async updateProduct(req, res, next) {
    try {
      req.body.id = req.params.productId
      const product = await productsService.updateProduct(req.body)
      res.send(product)
    } catch (error) {
      next(error)
    }
  }
}
