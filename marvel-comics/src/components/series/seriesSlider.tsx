import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { LatestSeriesData } from '../../shared/models/latest-comics';
import { selectSeries } from '../../shared/redux/selectors/seriesSelectors';
import { Link } from 'react-router-dom';

const SeriesSlider: React.FC = () => {

    const series = useSelector(selectSeries);

    return (
        <>
            <section className='flex flex-col h-[900px] series-wrapper'>
                <div className="relative h-[50%] overflow-hidden bg-purple">
                    <div className="absolute inset-0 z-0 bg-background clip-div"></div>
                    <div className="relative z-10 h-full">
                        <div className="absolute w-[800px] flex flex-col gap-6 px-12 top-[20%]">
                            <img className='relative left-[10%] w-[200px]' src="/images/logo.svg" alt="logo" />
                            <h1 className="lg:mb-4 md:mb-0 text-3xl font-bold text-white">Latest Marvel Comics Series</h1>
                            <p className="text-white">Explore the thrilling adventures of your favorite Marvel superheroes in the newest series, featuring captivating storylines and stunning artwork!</p>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <div className='relative p-8 mt-[-60px] left-[5%] overflow-hidden w-[90%] bg-white'>
                        <div className="swiper-container-wrapper">
                            <Swiper
                                effect={'coverflow'}
                                speed={1000}
                                grabCursor={true}
                                centeredSlides={false}
                                slidesPerView={'auto'}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 0,
                                    modifier: 1,
                                    slideShadows: false,
                                }}
                                navigation={true}
                                keyboard={{ enabled: true }}
                                mousewheel={{ thresholdDelta: 70 }}
                                modules={[EffectCoverflow, Navigation]}
                                className="series-slider-swiper"
                            >
                                {series.map((series: LatestSeriesData) => (
                                    <SwiperSlide className='max-w-[12rem]' key={series.id}>
                                        <Link to={`/series/${series.id}`}>
                                            <div className="overflow-hidden transition-transform transform cursor-pointer hover:scale-105 group">
                                                <img className="object-cover w-full" src={`${series.thumbnail.path}/portrait_uncanny.${series.thumbnail.extension}`} alt={series.title} />
                                                <div className="px-2 py-2 group">
                                                    <div className="mb-1 text-base font-bold text-black group-hover:text-red-500">{series.title}</div>
                                                    <p className="text-base text-black">{series.startYear} - {series.endYear}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SeriesSlider;

