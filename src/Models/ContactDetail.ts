export interface ContactDetail {
    addressId? : number | null
    userId : string
    street1 : string
    street2 : string | null
    city : string
    state : string
    country : string
    zipcode : number
    phone : number
    isDefault : number
}