import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { renderData } from '../functions/UseFetchData';


export default function ChartUI( render : renderData) {
   return (

      <>
         {render.isLoading && <p> Cargando datos...</p>}
         {render.error && <p>{render.error}</p>}
         {render.data && ( <>
         <Typography variant="h5" component="div">
            Hora vs Temperatura (°C) & Viento (km/h)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: render.data.hourly.temperature_2m, label: 'Temperatura (°C)'},
               { data: render.data.hourly.wind_speed_10m, label: 'Viento (km/h)'},
            ]}
            xAxis={[{ scaleType: 'point', data: render.data.hourly.time }]}
         />
      </>)}
      
      
      
      </>





     
   );
}