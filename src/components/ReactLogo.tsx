
import reactLogo from '../logo.svg'
import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';
export const ReactLogo = () => {
  const {tiempoDistancia} = useContext(MapContext)
  const {kms, minutes} = tiempoDistancia 
  const hours = Math.trunc(minutes/60);
  const mins = minutes % 60;
  const tiempohoras = hours +":"+ mins
  
  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '20px', width: '200px'}}>
      <img 
          src={reactLogo} 
          alt="React Logo"
      />
      <div style={{height: '25px', display: 'flex', flexDirection: 'row', textAlign: 'center', color: '#0d6efd', fontWeight: 'bold'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, border: '1px solid #0d6efd'}}>
          {`${kms} kms`}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, border: '1px solid #0d6efd'}}>
          {
            minutes >= 60 ? `${tiempohoras} hrs` : `${minutes} mins`
          }
        </div>
      </div>
    </div>
  )
}
