import { defineStore } from 'pinia'
import {State} from "./interface.ts";
import axios from "../../services/axios.ts";
import {PATH} from "./path.ts";


const params = ['id', 'name', 'thumbnailUrl']
const responseFields = `count,items(${params.join()})`
export const useCategoriesStore = defineStore('categoriesStore',  {
    state: (): State => ({
        categories: [],
        isLoading: false,
        error: '',
    }),
        actions: {
            async GetCategories(payload: { id?: string }) {
                console.log('jere')
                try{
                    this.isLoading = true
                    console.log('here11')
                    const { data } = await axios.get(PATH.getCategories, {
                        params: {
                            parentCategoryId: payload.id || '0',
                            responseFields,
                        },
                    })
                    console.log('data')
                    this.categories = data.items;
                    this.isLoading = false
                }catch (e:any){
                    this.isLoading = false
                    this.error = e?.message || "Something went wrong"
                }
            }
        }
})
