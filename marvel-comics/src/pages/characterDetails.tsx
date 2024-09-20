import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../shared/utils/Loading';
import { fetchCharacterbyId } from '../components/routes/loaders/characterLoader';
import { Characters } from '../shared/models/random-characters';

const CharacterDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, error } = useQuery<Characters, Error>(
        ['comic', id],
        () => fetchCharacterbyId(id!),
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
        return <Loading/>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    return (
        <React.Fragment>
            
        </React.Fragment>
    )

}


export default CharacterDetails;