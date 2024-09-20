import React from 'react';
import { useSelector } from 'react-redux';
import { selectCharacters } from '../../shared/redux/selectors/characterSelectors';
import { Each } from '../../shared/utils/Each';
import CharactersCard from './charactersCard';
import { RandomCharactersData } from '../../shared/models/random-characters';

const CharacterFeatured: React.FC = () => {
    const characters = useSelector(selectCharacters);

    return (
        <section className="mx-28 mt-16">
            <div className="pb-6">
                <div className="flex justify-between">
                    <h1 className='pb-2 text-2xl font-bold uppercase'>Featured Characters</h1>
                </div>
            </div>
            <div className='grid lg:grid-cols-5  md:grid-cols-4 grid-cols-2 mx-auto pb-6 gap-4'>
                <Each of={characters} render={(card: RandomCharactersData, index: number) => (
                    <CharactersCard key={index} name={card.name} image={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`} height={'h-[22rem]'} width={'max-w-[14rem]'} to={`/characters/${card.id.toString()}`}/>
                )} />
            </div>
        </section>
    )
}

export default CharacterFeatured;
