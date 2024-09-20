import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetchComicById from '../components/routes/loaders/comicLoader';
import { Comic } from '../shared/models/latest-comics';
import ComicsDetailsCard from '../components/comics/comicsDetailsCard';
import React from 'react';
import ComicsSeriesList from '../components/comics/comicsSeriesList';
import ComicsCharacters from '../components/comics/comicsCharacters';
import Loading from '../shared/utils/Loading';

const ComicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error } = useQuery<Comic, Error>(
    ['comic', id],
    () => fetchComicById(id!),
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
      <ComicsDetailsCard data={data} />
      {data?.comicsData && data?.seriesId &&
        <ComicsSeriesList data={data?.comicsData} title={data.title} seriesId={data?.seriesId} />
      }
      {data?.charactersData &&
        <ComicsCharacters data={data?.charactersData} title={data.title} />
      }
    </React.Fragment>
  )
}

export default ComicDetails;
