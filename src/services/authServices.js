const BASE_URL = import.meta.env.VITE_DOUGHTABASE_SERVER

export const loginStandardUser = async (formData) => {

    try {
        const res = await fetch(`${BASE_URL}/standard/login`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(formData),
            
        })
        const data = await res.json()

        return data
    } catch (error) {
        return error
    }
}

export const registerStandardUser = async (formData) => {

    formData['role'] = "standard"

    try {
        const res = await fetch(`${BASE_URL}/standard/register`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(formData),
        })

        const data = await res.json()

        return data

    } catch (error) {
        return error
    }
}