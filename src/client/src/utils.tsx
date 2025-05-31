export class Request {
    private readonly endpointUrl: string
    private readonly responseCallback: (data: any) => any
    private readonly errorHandler: (error: string) => void

    public constructor(
        endpoint: string,
        responseCallback: (data: any) => any = (x) => x,
        errorHandler: (error: string) => void = (error) => console.error(error)
    ) {
        this.endpointUrl = `http://localhost:8000${endpoint}`
        this.responseCallback = responseCallback
        this.errorHandler = errorHandler
    }

    /**
     * Performs a GET request
     * @returns The output of the inputted callback function
     */
    public async get(requestData: object = {}): Promise<any> {
        const response = await fetch(this.endpointUrl, this.getPayload('GET', requestData))
        if (!response.ok) return this.errorHandler(`${response.status} HTTP error`)
        const data = await response.json()
        return 'error' in data ? this.errorHandler(data.error) : this.responseCallback(data)
    }

    /**
     * Performs a POST request
     * @returns The output of the inputted callback function
     */
    public async post(requestData: object = {}): Promise<any> {
        const response = await fetch(this.endpointUrl, this.getPayload('POST', requestData))
        if (!response.ok) return this.errorHandler(`${response.status} HTTP error`)
        const data = await response.json()
        return 'error' in data ? this.errorHandler(data.error) : this.responseCallback(data)
    }

    /**
     * Performs a PUT request
     * @returns The output of the inputted callback function
     */
    public async put(requestData: object = {}): Promise<any> {
        const response = await fetch(this.endpointUrl, this.getPayload('PUT', requestData))
        if (!response.ok) return this.errorHandler(`${response.status} HTTP error`)
        const data = await response.json()
        return 'error' in data ? this.errorHandler(data.error) : this.responseCallback(data)
    }

    /**
     * Performs a DELETE request
     * @returns The output of the inputted callback function
     */
    public async delete(requestData: object = {}): Promise<any> {
        const response = await fetch(this.endpointUrl, this.getPayload('DELETE', requestData))
        if (!response.ok) return this.errorHandler(`${response.status} HTTP error`)
        const data = await response.json()
        return 'error' in data ? this.errorHandler(data.error) : this.responseCallback(data)
    }

    /**
     * Makes `this.requestData` able to be sent to the API server
     * @param method REST API Method
     * @returns The appropriate payload for the method
     */
    private getPayload(method: 'GET'|'POST'|'PUT'|'DELETE', requestData: object): Record<string, string|object|undefined> {
        const payload: Record<string, string|object|undefined> = {
            method: method,
            headers: method !== 'GET' ? { 'Content-Type': 'application/json' } : undefined
        }
        if (method !== 'GET') payload.body = JSON.stringify(requestData)
        return payload
    }
}