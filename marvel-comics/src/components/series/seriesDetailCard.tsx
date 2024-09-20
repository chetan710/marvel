import React from 'react';
import { Series } from '../../shared/models/latest-comics';

interface SeriesProps {
    data: Series;
}

const SeriesDetailCard: React.FC<SeriesProps> = ({ data }) => {
    return (
        <section className="relative h-[100%] -z-10">
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-md"
                style={{
                    backgroundImage: `url("${data?.thumbnail.path}/detail.${data?.thumbnail.extension}")`,
                }}
            ></div>
            <div className="relative z-10 text-white top-16 mx-28 pb-10 h-[600px]">
                <div className='flex flex-row bg-black'>
                    <div className={`p-8`}>
                        <img src={`${data?.thumbnail.path}/portrait_uncanny.${data?.thumbnail.extension}`} alt={data?.title}  className='max-w-[300px]'/>
                    </div>
                    <div className='pt-8'>
                        <h2 className='text-3xl pb-6'>{data?.title}</h2>
                        <p className="text-base">{data?.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeriesDetailCard;
