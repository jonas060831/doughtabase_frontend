const BASE_URL = import.meta.env.VITE_DOUGHTABASE_SERVER



export const addNewItem = async (formData) => {

    //localhost:8000/api/bakeries/1
    try {
        const res = await fetch(`${BASE_URL}/menus`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData, 
                bakery : formData.bakery_id
            })})

        return res.json()

    } catch (error) {
        return []
    }
}

export const deleteMenuItem = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/menus/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log(res)

        return true
    } catch (error) {
        console.log(error)
    }
}