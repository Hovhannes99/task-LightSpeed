import {createRouter, createWebHistory } from 'vue-router'

import ShoppingCart from '../pages/ShoppingCart.vue'
import Products from '../pages/Products.vue'
import ProductDetails from '../pages/ProductDetails.vue'



const router = createRouter({
  history: createWebHistory(),
  routes:[
    { path: '/product-detail/:id', name: 'Product-details', component: ProductDetails },
    { path: '/', name: 'Products', component: Products },
    { path: '/shopping-cart', name: 'ShoppingCard', component: ShoppingCart },
  ]
})

export default router
