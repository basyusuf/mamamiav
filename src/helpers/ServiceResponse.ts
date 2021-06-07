interface IServiceResponse {
    status?: boolean;
    statusCode?: number;
    data?: any;
    error?: any;
}
export class ServiceResponse implements IServiceResponse {
    status?: boolean;
    statusCode?: number;
    data?: any;
    error?: any;
    constructor(responseData: IServiceResponse) {
        this.status = responseData.status ? responseData.status : true;
        this.statusCode = responseData.statusCode ? responseData.statusCode : 200;
        this.data = responseData.data ? responseData.data : {};
        this.error = responseData.error ? responseData.error : {};
    }
    get() {
        let responseObject = {
            status: this.status,
            statusCode: this.statusCode,
            data: this.data,
            error: this.error,
        };
        console.info('Response Information:', JSON.stringify(responseObject));
        return responseObject;
    }
}
