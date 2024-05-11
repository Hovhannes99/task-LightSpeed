import {defineStore} from 'pinia'
import {State} from './interface.ts'
import {PATH} from './path.ts'
import axios from "../../services/axios.ts";
import {getCartsStorage} from "../../utils";

const FIELDS_PARAMS = [
    'id',
    'imageUrl',
    'thumbnailUrl',
    'defaultDisplayedPriceFormatted',
    'name',
]
const ITEM_PARAMS = [
    'id',
    'name',
    'description',
    'thumbnailUrl',
    'defaultDisplayedPriceFormatted',
    'imageUrl',
]
const responseFields = `count,items(${FIELDS_PARAMS.join()})`


export const useProductsStore = defineStore('products2Store', {
    state: (): State => ({
        currentItem: null,
        isLoading: false,
        items: [],
        cartIds: getCartsStorage(),
        cartItems: null,
        error: '',
        totalCount:0
    }),
    actions: {
        async GetProducts() {
            try {
                this.isLoading = true
                const { data } =  await axios.get(PATH.getProducts);
                this.items = data?.items
                this.totalCount = data?.total
                this.isLoading = false
            } catch (error: any) {
                this.isLoading = false
                this.error = error?.message || 'Something went wrong'
                return error
            }
        },
        async GetProductsByCategory(payload:{id:string}) {
            try {
                this.isLoading = true
                const { data } =  await axios.get(PATH.getProducts,{
                    params: {
                        includeProductsFromSubcategories: 'true',
                        categories: payload.id,
                        responseFields,
                    }});
                this.items = data?.items
                this.totalCount = data?.total
                this.isLoading = false
            } catch (error: any) {
                this.isLoading = false
                this.error = error?.message || 'Something went wrong'
                return error
            }
        },
        async GetCurrenProduct(payload:{id:string}) {
            try {
                this.isLoading = true
                const { data } =  await axios.get(PATH.getProducts + `/${payload.id}`,{
                    params: {
                        responseFields: ITEM_PARAMS.join(),
                    }});
                this.currentItem = data
                this.isLoading = false
            } catch (error: any) {
                this.isLoading = false
                this.error = error?.message || 'Something went wrong'
            }
        },
        async GetCartsProducts() {
            try {
                this.isLoading = true
                const { data } =  await axios.get(PATH.getProducts,{
                    params: {
                        productId: this.cartIds.join(','),
                        responseFields
                    }});
                this.cartItems = data.items
                this.isLoading = false
            } catch (error: any) {
                this.isLoading = false
                this.error = error?.message || 'Something went wrong'
            }
        },
        AddToCart(id: string){
            if (this.cartIds.includes(id)) {
                return
            }
            this.cartIds.push(id)
            localStorage.cart = JSON.stringify(this.cartIds)
        },
        RemoveFromCart(id:string){
            this.cartIds = this.cartIds.filter((i) => i !== String(id))
            this.cartItems = this.cartItems?.filter((item) => item?.id !== id)
            localStorage.cart = JSON.stringify(this.cartIds)
        }
    }
})
