import React from 'react'
import ReactDOM from 'react-dom'
import { MapsApp } from './MapsApp'

import mapboxgl from 'mapbox-gl'; 
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYWx2YXJvY3JvIiwiYSI6ImNrc2RwNzF3YzBzcjMzMXBpdHh4Yzc3NGwifQ.ZCmwhJlRqdhrhD1GyQL8Kg';


if (!navigator.geolocation) {
  alert('Tu navegador no tiene opción de Geolocation')
  throw new Error('Tu navegador no tiene opcion de Geolocation')
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
)
