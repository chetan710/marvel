import React from 'react'
import { useSelector } from 'react-redux';
import { selectSeries } from '../../shared/redux/selectors/seriesSelectors';
import { Each } from '../../shared/utils/Each';
import { LatestSeriesData } from '../../shared/models/latest-comics';
import { Link } from 'react-router-dom';

const SeriesFeaturedList: React.FC = () => {

    const series = useSelector(selectSeries);
    if (series.length === 0) {
        return <div>No series found</div>
    }
    return (
        <React.Fragment>
            <section className='relative -z-10 w-full h-full  bg-background px-12 py-10'>
            </section>
            <section className='sm:mx-28 sm:my-20 mx-10 my-5'>
                <h2 className='text-xl uppercase font-bold'>Featured Series</h2>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-5'>
                    <Each of={series.slice(0, 10)} render={(card: LatestSeriesData, index: number) => (
                        <Link to={`/series/${card.id}`} key={index} className="group">
                            <div className="overflow-hidden transition-transform transform cursor-pointer hover:scale-105 group">
                                <img className="object-cover w-full" src={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`} alt={card.title} />
                                <div className="px-2 py-2 group">
                                    <div className="mb-1 text-base font-bold text-black group-hover:text-red-500">{card.title}</div>
                                    <p className="text-base text-black">{card.startYear} - {card.endYear}</p>
                                </div>
                            </div>
                        </Link>
                    )} />
                </div>
            </section>
        </React.Fragment>

    )
}

export default SeriesFeaturedList;
