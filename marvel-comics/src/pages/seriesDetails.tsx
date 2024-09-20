import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Series } from '../shared/models/latest-comics';
import { fetchSeriesbyId } from '../components/routes/loaders/seriesLoader';
import Loading from '../shared/utils/Loading';
import SeriesDetailCard from '../components/series/seriesDetailCard';
import SeriesComicsList from '../components/series/seriesComicsList';
import ComicsCharacters from '../components/comics/comicsCharacters';

const SeriesDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, error } = useQuery<Series, Error>(
        ['comic', id],
        () => fetchSeriesbyId(id!),
        {
            enabled: !!id, // Enable query only if id is present
            suspense: true, // Enables suspense mode
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false, // Disable refetching on window focus
        }
    );

    if (!id) {
        return <div>Error: </div>;
    }

    if (!data && data === undefined) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <React.Fragment>
            <SeriesDetailCard data={data} />
            <SeriesComicsList data={data?.comicsData} title={data.title} />
            {data?.charactersData &&
                <ComicsCharacters data={data?.charactersData} title={data.title} />
            }

        </React.Fragment>
    )
}

export default SeriesDetails
