import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export interface renderData{
    data: OpenMeteoResponse | null,
    isLoading: boolean,
    error: string | null
}

    const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'Quito' : {latitude: -0.2298, longitude: -78.525},
  'Manta' : {latitude: -0.9494, longitude: -80.7314},
  'Cuenca': {latitude: -2.9005, longitude: -79.0045}
    };
    
    

export default function useFetchData(selectedOption:string|null): renderData {

    const  URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature';

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);


    useEffect(() => { 

        const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature`
        const fetchData = async() => {
            try{
                setIsLoading(true);
                setError(null);
                const response = await fetch(URL);

                if(!response.ok){
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);

            } catch(error){
                setError(error instanceof Error ? error.message: 'Error');
            } finally{
                setIsLoading(false);
            }
        };
        fetchData();
        
    }, [selectedOption]);

    return { data, isLoading, error};

}