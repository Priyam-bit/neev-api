export interface Product {
    id? : number | null
    name : string
    rating? : number | null
    reviewCount? : number | null
    categoryId : number
    description? : string | null
}