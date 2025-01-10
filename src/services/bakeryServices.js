//write the service to fetch one bakery
const BASE_URL = import.meta.env.VITE_DOUGHTABASE_SERVER

export const getBakeries = async () => {

    try {
        
    } catch (error) {
        console.log(error)
    }
}
export const getBakery = async (id) => {

    //localhost:8000/api/bakeries/1
    try {
        const res = await fetch(`${BASE_URL}/bakeries/${id}`)
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

