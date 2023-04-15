export interface UserDTO {
    id? : number | null
    email : string
    firstName : string
    lastName : string | null
    password? : string | null
    userType : number
}