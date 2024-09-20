import React, { useEffect, useRef, useState } from "react";
import SeriesFeaturedList from "../components/series/seriesFeaturedList";
import { fetchAllSeriesList } from "../components/routes/loaders/seriesLoader";
import { SeriesListData } from "../shared/models/latest-comics";
import SeriesList from "../components/series/seriesList";
import Loading from "../shared/utils/Loading";

const Series = () => {
    const [seriesList, setSeriesList] = useState<SeriesListData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);


    useEffect(() => {
        const fetchData = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;
            try {
                const seriesData: SeriesListData[] = await fetchAllSeriesList();
                setSeriesList(seriesData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching series. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <SeriesFeaturedList />
            <SeriesList data={seriesList ?? []} />
        </React.Fragment>
    )
}

export default Series;
