export const fetchHelper = {
    // response: class Response {
    //     ok: boolean | undefined;
    //     status: number | undefined;
    //     response: any;
    // },
    fetch: async (
        method: string, 
        route: string, 
        body: any,
        headers: any
    ): Promise<any> => {

        
        var complement: any = {method: method}
        complement["headers"] = headers || {
            token: localStorage.getItem("token"),
            player: localStorage.getItem("player")
        }
        complement.headers["Content-Type"] = "application/json"
        if(method != 'GET')
            complement["body"] = JSON.stringify(body || {})
        const path = `${process.env.API}/${route}`
        
        var response = await fetch(path, complement)
        var final = await response.json()

        return final
    },

    get: async (
        route: string, 
        body: any,
        headers: any 
    ): Promise<any> => {
        return await fetchHelper.fetch('GET', route, body, headers)

    },

    post: async (
        route: string, 
        body: any,
        headers: any 
    ): Promise<any> => {
        return fetchHelper.fetch('POST', route, body, headers)
    },

    put: async (
        route: string, 
        body: any,
        headers: any 
    ): Promise<any> => {
        return fetchHelper.fetch('PUT', route, body, headers)
    },

    delete: async (
        route: string, 
        body: any,
        headers: any 
    ): Promise<any> => {
        return fetchHelper.fetch('DELETE', route, body, headers)
    }
}