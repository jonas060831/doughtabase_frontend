//write the service to fetch one bakery
const BASE_URL = import.meta.env.VITE_DOUGHTABASE_SERVER

export const getBakeries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/bakeries`); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data received from API:', data); // Log the raw response
      return data;
    } catch (error) {
      console.error('Error in getBakeries:', error.message);
      return [];
    }
  };

export const getBakery = async (id) => {

    //localhost:8000/api/bakeries/1
    try {
        const res = await fetch(`${BASE_URL}/bakeries/${id}`)
        return res.json()
    } catch (error) {
        return []
    }
}


export const getBakeryPhoto = async (bakery) => {

    //is there a a data in bakery.photo_url ?
    if(bakery.photo_url) return bakery.photo_url //if there is.. then just return the bakery.photo_url

    else { //go ahead and fetch the image from the google API so then the next time we dont have to request it
        try {
            
            //fetch the image and save it to the database so whoever visits the page next time wont have to call google api resulting to no charge
            const res = await fetch(`${BASE_URL}/bakeries/get_bakery_photo_url/${bakery.latitude}/${bakery.longitude}`)
            const data = await res.json()
            //this must be the same as the database value
            const bakeryPhotoUrl = data.photo_url

            const res2 = await fetch(`${BASE_URL}/bakeries/${bakery.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...bakery, 
                    photo_url : bakeryPhotoUrl ? bakeryPhotoUrl : undefined
                })
            })

            const data2 = await res2.json()

            return data2.photo_url
        } catch (error) {
            console.log(error)
        }
    }
}


export const queryBakeries = async (searchQuery) => {

    //get request then pass the result the result can be an empty array

    try {
        
        const res = await fetch(`${BASE_URL}/bakeries/search?query=${searchQuery}`)

        const arrayOfBakery = await res.json()

        return arrayOfBakery

    } catch (error) {
        console.log(error)
    }

}

