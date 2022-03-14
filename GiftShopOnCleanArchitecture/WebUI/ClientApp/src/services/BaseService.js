export default class BaseService {
    _baseUrl = 'https://localhost:44345/api/';

    getQuery = async (url) => {
        const call = (url) => fetch(this._baseUrl + url, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
            }),
        });

        let res = await call(url);

        if (res.ok) {
            return await res.json();
        }
        else {
            return {
                error: {
                    ErrorCode: res.status,
                    massage: await res.statusText
                }
            };
        }
    }

    postQuery = async (url, data) => {
        const call = (url, data) => fetch(
            this._baseUrl + url,
            {
                method: "post",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
                }),
                body: JSON.stringify(data)
            }
        );

        return await call(url, data);
    }

    postQueryWithData = async (url, data) => {
        const call = (url, data) => fetch(
            this._baseUrl + url,
            {
                method: "post",
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }),
                body: data
            }
        );

        return await call(url, data);
    }
}