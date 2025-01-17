const BASE_URL = import.meta.env.VITE_DOUGHTABASE_SERVER

export const getSpecialties = async () => {
    try {
        const res = await fetch(`${BASE_URL}/specialties`)

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export const addSpecialty = async (itemId, bakeryId) => {

    //localhost:8000/api/bakeries/1
    try {
        const res = await fetch(`${BASE_URL}/specialties`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bakery: bakeryId,
                item: itemId
            })})

        return res.json()

    } catch (error) {
        return []
    }
}

export const deleteSpecialty = async (specialtyId) => {
    try {
        const res = await fetch(`${BASE_URL}/specialties/${specialtyId}`,{ 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(res)
        const data = await res.json()
        console.log(data)
        return res
    } catch (error) {
        console.log(error)
    }
}