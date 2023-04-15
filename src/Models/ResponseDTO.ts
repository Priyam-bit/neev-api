export class ResponseDTO<T> {
    success : number
    message? : string
    data? : T | null

    constructor(success : number, message? : string, data? : T | null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

