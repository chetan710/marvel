import React, { useEffect, useState } from 'react';
import { CharactersList, RandomCharactersData } from '../../shared/models/random-characters';
import { Each } from '../../shared/utils/Each';
import CharactersCard from './charactersCard';

interface CharactersProps {
    data: CharactersList[],
}

const CharacterCompleteList: React.FC<CharactersProps> = ({ data }) => {
    const [displayedItems, setDisplayedItems] = useState(data.slice(0, 20));
    const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        if (data.length > 0) {
            setDisplayedItems(data.slice(0, 20));
        }
    }, [data]);


    const loadMoreItems = () => {
        const newCount = visibleCount + 5;
        setDisplayedItems(data.slice(0, newCount));
        setVisibleCount(newCount);
    };
    return (
        <section className="mx-28 mt-4">
            <div className="pb-6">
                <div className="flex justify-between">
                    <h1 className='pb-2 text-2xl font-bold uppercase'>Marvel Characters List</h1>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 last2 mt-3 place-content-center'>
                <Each of={displayedItems} render={(card: RandomCharactersData, index: number) => (
                    <CharactersCard key={index} name={card.name} image={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`} object={'cover'} width={'min-w-[0rem]'} height={'h-[22rem]'} to={`/characters/${card.id.toString()}`}/>
                )} />
            </div>
            {visibleCount < data.length && (
                <div className='flex justify-center mt-4 mb-4'>
                    <button type='button' className="btn bg-primary border-primary text-white w-[200px]" onClick={loadMoreItems}>Load More</button>
                </div>
            )}
        </section>
    )
}

export default CharacterCompleteList;
