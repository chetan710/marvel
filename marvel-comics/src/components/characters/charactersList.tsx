import React from 'react';
import CharactersCard from './charactersCard';
import { RandomCharactersData } from '../../shared/models/random-characters';
import { Each } from '../../shared/utils/Each';

interface CharacterProps {
    randomCharactersData: RandomCharactersData[];
}

const CharactersList: React.FC<CharacterProps> = ({ randomCharactersData }) => {

    return (
        <>
            <div className="flex flex-wrap justify-center mx-auto pb-6 gap-x-4">
                <Each of={randomCharactersData} render={(card: RandomCharactersData, index: number) => (
                    <CharactersCard key={index} name={card.name} image={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`} to={`/characters/${card.id.toString()}`}/>
                )} />
            </div>
        </>
    )

};

export default CharactersList;