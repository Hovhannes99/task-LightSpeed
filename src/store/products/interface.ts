import {ICategory} from "../categories/interface.ts";
import {GalleryImage} from "../../types.ts";


export interface IProducts {
    id: number
    name: string
    description: string
    price: number
    categories: ICategory[]
    categoriesIds: number[]
    defaultDisplayedPriceFormatted: string
    thumbnailUrl: string
    imageUrl: string
    galleryImages: GalleryImage[]
    defaultCategoryId: number
    createTimestamp: number
    seoDescription: string
    seoTitle: string
    media: any
}

export interface State {
    currentItem: IProducts | null,
    isLoading: boolean,
    items: IProducts[],
    cartIds: string[],
    cartItems: string[] | null,
    error: string,
    totalCount: number
}
