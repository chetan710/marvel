import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
    image: string;
    name: string;
    width?: string;
    height?: string;
    object?: string;
    to: string;
}

const CharactersCard: React.FC<CardProps> = ({ image, name, width, height, object, to }) => {
    return (
        <>
            <Link to={to}>
                <div className={`overflow-hidden ${!width ? 'max-w-[9rem]' : width} transform transition-transform hover:scale-105 cursor-pointer group`}>
                    <img className={`w-full ${height ? height : 'h-48'} object-${object ? object : 'cover'}`} src={image} alt={name} />
                    <div className="px-2 py-2 group bg-background h-32 after absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                        <div className="font-bold text-white mb-1">{name}</div>
                    </div>
                </div>
            </Link>
        </>
    )

};

export default CharactersCard;