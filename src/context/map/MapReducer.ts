import { Map, Marker } from 'mapbox-gl';
import { MapState } from './MapProvider';

type MapAction = 
| { type: 'setMap', payload: Map}
| { type: 'setMarkers', payload: Marker[]}
| { type: 'setTiempoDisntacia', payload: {kms: number, minutes: number}}

export const MapReducer = (state: MapState, action: MapAction):MapState => {
  switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            }
        case 'setTiempoDisntacia':
            return {
                ...state,
                tiempoDistancia: action.payload
            }
      default:
          return state;
  }
}
