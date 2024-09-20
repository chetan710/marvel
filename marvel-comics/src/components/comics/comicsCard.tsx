import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
    image: string;
    title: string;
    issued: string;
    width?: string;
    height?: string;
    to?: string;
}

const ComicCard: React.FC<CardProps> = ({ image, title, issued, width, height, to }) => {

    if (!to) {
        return null; // or return some fallback UI
    }

    const dateString = issued;
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();

    return (
        <>
            <Link to={to}>
                <div className={`overflow-hidden ${!width ? 'max-w-[9rem]' : width }  transform transition-transform hover:scale-105 cursor-pointer group`}>
                    <img className={`w-full ${height ? height : 'h-48'} object-contain`} src={image} alt={title} />
                    <div className="px-2 py-2 group flex flex-col text-center">
                        <div className="font-bold text-base mb-1 group-hover:text-red-700">{title}</div>
                        <p className="text-white text-base">{year}</p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ComicCard;