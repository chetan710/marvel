import React from 'react'
import { RandomCharactersData } from '../../shared/models/random-characters';
import CharactersCard from '../characters/charactersCard';
import { Each } from '../../shared/utils/Each';

interface ComicsCaractersProps {
    data: RandomCharactersData[],
    title: string
}

const ComicsCharacters: React.FC<ComicsCaractersProps> = ({ data, title }) => {
    return (
        <section className='mx-28 '>
            <div className='pb-2'>
                <h2 className='text-2xl font-bold uppercase'>Characters of {title}</h2>
                <img src="/images/Rectangle 5.png" alt="line" />
            </div>
            <div className='pt-6 grid lg:grid-cols-5  md:grid-cols-4 grid-cols-2 mx-auto pb-6 gap-4'>
                <Each of={data} render={(card: RandomCharactersData, index: number) => (
                    <CharactersCard key={index} name={card.name} image={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`} width={'max-w[14rem] sm:w-[12rem]'} height={'h-[18rem]'} to={`/characters/${card.id.toString()}`}/>
                )} />
            </div>
        </section>
    )
}

export default ComicsCharacters;
