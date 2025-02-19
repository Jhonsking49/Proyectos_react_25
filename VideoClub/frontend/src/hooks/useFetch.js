import { useEffect, useState } from "react"

// hook que se encargue de realizar cualquier peticion a una API
export const useFetch = (fetchFunction, dependencias = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const result = await fetchFunction();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const abortController = new AbortController();

        setLoading(true);
        fetchData();
        return () => {
            abortController.abort();
        }
    }, dependencias);

    return [data, loading, error];
    
}