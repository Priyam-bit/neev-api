export interface ProductVariant {
    id? : number;
    productId? : number;
    size : number;
    price : number;
    discountPrice? : number;
    availableUnits : number;
}