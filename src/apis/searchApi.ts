import axios from "axios" 

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        languaje: 'es',
        access_token: 'pk.eyJ1IjoiYWx2YXJvY3JvIiwiYSI6ImNrc2RwNzF3YzBzcjMzMXBpdHh4Yzc3NGwifQ.ZCmwhJlRqdhrhD1GyQL8Kg'
    }
})

export default searchApi