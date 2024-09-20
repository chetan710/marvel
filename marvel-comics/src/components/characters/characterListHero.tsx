import React from 'react';

const CharacterHero: React.FC = () => {
    return (
        <section className="relative -z-10">
            <div className="w-full">
                <div className="relative">
                    <img className='object-cover w-full h-[600px]' src="/images/all_characters.jpg" alt="" />
                    <div className="absolute inset-0 bg-black opacity-80"></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-6 px-12">
                        <h2 className="text-3xl font-bold text-white">Marvel Characters</h2>
                        <p className="text-lg text-white">Dive into a dynamic world of heroes and villains from Marvel's legendary universe!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CharacterHero;
