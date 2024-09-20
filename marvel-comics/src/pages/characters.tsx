import React, { useEffect, useRef, useState } from 'react'
import Loading from '../shared/utils/Loading';
import { CharactersList } from '../shared/models/random-characters';
import { fetchAllCharacterList } from '../components/routes/loaders/characterLoader';
import CharacterHero from '../components/characters/characterListHero';
import CharacterFeatured from '../components/characters/characterFeatured';
import CharacterCompleteList from '../components/characters/characterCompleteList';

const Characters: React.FC = () => {

    const [characterList, setCharacterList] = useState<CharactersList[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);


    useEffect(() => {
        const fetchData = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;
            try {
                const seriesData: CharactersList[] = await fetchAllCharacterList();
                setCharacterList(seriesData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching characters. Please try again later.');
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
        <CharacterHero/>
        <CharacterFeatured/>
        <CharacterCompleteList data={characterList ?? []}/>
      
    </React.Fragment>
  )
}

export default Characters;
