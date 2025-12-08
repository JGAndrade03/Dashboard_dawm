import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData()  {

    const  URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

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