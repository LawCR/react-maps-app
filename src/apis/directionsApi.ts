import axios from "axios" 

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: 'false',
        access_token: 'pk.eyJ1IjoiYWx2YXJvY3JvIiwiYSI6ImNrc2RwNzF3YzBzcjMzMXBpdHh4Yzc3NGwifQ.ZCmwhJlRqdhrhD1GyQL8Kg'
    }
})

export default directionsApi