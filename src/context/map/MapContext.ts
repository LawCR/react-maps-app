import { Map } from "mapbox-gl";
import { createContext } from "react";

interface MapContextPropx {
    isMapReady: boolean,
    map?: Map,
    tiempoDistancia: {
        kms: number,
        minutes: number,
    }

    // Methods
    setMap: (map: Map) => void,
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext({} as MapContextPropx)