import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export interface renderData{
    data: OpenMeteoResponse | null,
    isLoading: boolean,
    error: string | null
}
    
    

export default function useFetchData()  {

    const  URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature';

    const [data, setData] = useState<OpenMeteoResponse | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);


    useEffect(() => { 
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
        
    }, []);

    return { data, isLoading, error};

}