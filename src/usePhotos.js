import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useDebounce } from 'use-debounce';

// const DEBOUNCED_INTERVAL = 2000;
const API_URL = 'https://jsonplaceholder.typicode.com/photos';

export const usePhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [prevY, setPrevY] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const url = `${API_URL}/?_page=${page}&_limit=10`;

            try {
                const result = await axios.get(url);
                setPhotos(result.data);
            } catch (error) {
                setPhotos([]);
            }

            setLoading(false);
        };

        fetchData();
    }, [page]); 

    return { photos, loading, setPage, prevY, setPrevY };
};