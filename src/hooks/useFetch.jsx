import { useEffect, useState } from 'react';

const DEFAULT_HEADERS = {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

export default function useFetch({ url = '', method = 'GET', headers = {} }, { enabled } = { enabled: true }) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (enabled) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
                method,
                headers: {
                    ...DEFAULT_HEADERS,
                    ...headers,
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, JSON.stringify(headers), method, enabled]);

    return { isLoading, data };
}
