import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { renderData } from '../functions/UseFetchData';

const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const arrLabels = ['A','B','C','D','E','F','G'];


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