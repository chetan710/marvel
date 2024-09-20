import React from 'react';
import { useSelector } from 'react-redux';
import { selectCharacters } from '../../shared/redux/selectors/characterSelectors';
import { Link } from 'react-router-dom';

const Characters: React.FC = () => {
    const characters = useSelector(selectCharacters);

    return (
        <section className='bg-background px-12 py-10 character-slide'>
            <h2 className='text-white flex justify-center pb-8 text-4xl'>Marvel Characters</h2>
            <div className='grid grid-cols-4 gap-4'>
                {characters.map((character, index: number) => (
                    <Link to={`/characters/${character.id.toString()}`}>
                        <div className='rounded transform transition-transform  cursor-pointer group hover:scale-105' key={index}>
                            <img className='w-full object-contain group-hover:filter-grayscale' src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`} alt={character.name} />
                            <div className="px-2 py-2 after absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <div className="mb-1 text-base font-bold text-white group-hover:text-primary">{character.name}</div>
                                <div className="mb-1 copy font-bold text-white line-clamp-2 sm:line-clamp-3 md:line-clamp-none ">{character.description}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
};

export default Characters;