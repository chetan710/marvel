import React from 'react';
import ComicCard from './comicsCard';
import { LatestComicData } from '../../shared/models/latest-comics';
import { Each } from '../../shared/utils/Each';

interface ComicsProps {
    latestComicData: LatestComicData[];
}

const ComicLatestList: React.FC<ComicsProps> = ({ latestComicData }) => {

    return (
        <>
            <div className="flex flex-wrap">
                <Each of={latestComicData} render={(card: LatestComicData, index: number) => (
                    <ComicCard key={index} title={card.title} issued={card.modified} image={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`} to={`/comics/${card.id.toString()}`}/>
                )} />
            </div>
        </>
    )

};

export default ComicLatestList;