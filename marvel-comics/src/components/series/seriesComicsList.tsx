import React from 'react';
import { LatestComicData } from '../../shared/models/latest-comics';
import { Each } from '../../shared/utils/Each';
import ComicCard from '../comics/comicsCard';

interface SeriesCardProps {
    data: LatestComicData[],
    title: string
}

const SeriesComicsList: React.FC<SeriesCardProps> = ({ data, title }) => {
  return (
    <section className="mx-28 mt-16">
            <div className="pb-6">
                <div className="flex justify-between">
                    <h1 className='pb-2 text-2xl font-bold uppercase'>All Series of {title}</h1>
                </div>
                <img src="/images/Rectangle 5.png" alt="line" />
            </div>
            {/* <div className="flex flex-wrap mx-auto pb-6 gap-x-4"> */}
            <div className="grid lg:grid-cols-5  md:grid-cols-4 grid-cols-2 mx-auto pb-6 gap-4">
                <Each of={data ?? []} render={(card: LatestComicData, index: number) => (
                    <ComicCard key={index} title={card.title} issued={card.modified} image={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`}
                        to={`/comics/${card.id.toString()}`} width={'max-w[14rem] sm:w-[12rem]'} height={'h-[18rem]'} />
                )} />
            </div>
        </section>
  )
}

export default SeriesComicsList;
