import { useReducer, useContext, useEffect } from 'react';
import { Map, Marker, Popup, LngLatBounds, AnySourceData } from "mapbox-gl"
import { MapContext } from './MapContext';
import { MapReducer } from "./MapReducer";
import { PlacesContext } from '../places/PlacesContext';
import directionsApi from '../../apis/directionsApi';
import { DirectionsResponse } from '../../interfaces/directions';


export interface MapState {
    isMapReady: boolean,
    map?: Map,
    markers: Marker[],
    tiempoDistancia: {
        kms: number,
        minutes: number,
    }
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
    tiempoDistancia: {
        kms: 0,
        minutes: 0,
    }
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({children}: Props) => {
    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)

    const { places } = useContext(PlacesContext)

    useEffect(() => {
        state.markers.forEach(marker => marker.remove())
        const newMarkers: Marker[] = []

        for (const place of places) {
            const [lng, lat] = place.center
            const popup = new Popup()
                .setHTML(`
                    <h6>${place.text}</h6>
                    <p>${place.place_name}</p>
                `)
            const newMarker = new Marker()
                    .setLngLat( [lng, lat] )
                    .setPopup(popup)
                    .addTo(state.map!)
            newMarkers.push(newMarker)
        }
        // Todo: Limpiar polyline

        dispatch({type: 'setMarkers', payload: newMarkers})

        
    }, [places])
    

    const setMap = (map: Map) => {

        // Popup
        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Aqui estoy</h4>
                <p>En algún lugar del mundo</p>
            `)

        // configuración del marcador
        new Marker({
            color: '#8644f9'
        })
            .setLngLat( map.getCenter() )
            .setPopup(myLocationPopup)
            .addTo(map)

        dispatch({type: 'setMap', payload: map})
    }

    const getRouteBetweenPoints = async(start: [number, number], end: [number, number]) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
        const {distance, duration, geometry} = resp.data.routes[0]
        const { coordinates: coords } = geometry
        let kms = distance / 1000
            kms = Math.round(kms * 100)
            kms /= 100
        
        const minutes = Math.floor(duration / 60)
        const tiempoDistancia = {kms, minutes}

        dispatch({type: 'setTiempoDisntacia', payload: tiempoDistancia})
        
        const bounds = new LngLatBounds(
            start,
            start
        )

        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]]
            bounds.extend(newCoord)
        }
        
        state.map?.fitBounds(bounds, {
            padding: 200
        })

            // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if (state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString')
            state.map.removeSource('RouteString')

        }

        // TODO remover polyline si existe
        state.map?.addSource('RouteString', sourceData)
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })
    }

    

    return (
    <MapContext.Provider value={{
        ...state,

        // Methods
        setMap,
        getRouteBetweenPoints
    }}>
        {children}
    </MapContext.Provider>
    )
}
