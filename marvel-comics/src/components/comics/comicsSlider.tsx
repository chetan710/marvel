import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectLatestComics } from '../../shared/redux/selectors/comicsSelectors';


export type ComicSliderHandle = {
    scrollIntoView: () => void;
};

const ComicSlider = forwardRef<ComicSliderHandle>((_, ref) => {
    const compRef = useRef<HTMLDivElement>(null);
    const latestComics = useSelector(selectLatestComics);

    useImperativeHandle(ref, () => ({
        scrollIntoView: () => {
            if (compRef.current) { // Add a null check here
                compRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }));

    const getDate = (modified: string) => {
        const dateString = modified;
        const dateObject = new Date(dateString);

        const year = dateObject.getFullYear();

        return year;
    }
    return (
        <>
            <section className='px-12 py-10 bg-background comic-slider' ref={compRef}>
                <h1 className='pb-2 text-2xl font-bold text-white uppercase'>Latest Comics</h1>
                <img src="/images/Rectangle 5.png" alt="line" />
                <div className='flex mt-10 flex-col md:flex-row'>
                    <div className='w-full md:w-[50%] pr-10 pb-10'>
                        <h2 className="headline font-bold mb-4 text-white">Latest Comic Releases</h2>
                        <p className="copy text-gray-400 mb-8">Discover the newest adventures from your favorite Marvel heroes and villains. Explore thrilling storylines,
                            stunning artwork, and immerse yourself in the latest tales that will keep you on the edge of your seat!</p>
                        <Link to={'comics'} className='button'>
                            <span className='circle'>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </span>
                            <span className='text'>Browse to see all comics</span>
                        </Link>
                    </div>
                    <div className='w-full overflow-hidden'>
                        <Swiper
                            effect={'coverflow'}
                            speed={1000}
                            grabCursor={true}
                            centeredSlides={false}
                            slidesPerView={"auto"}
                            coverflowEffect={{
                                rotate: 40,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            keyboard={{ enabled: true }}
                            mousewheel={{ thresholdDelta: 70 }}
                            modules={[EffectCoverflow, Pagination, Navigation]}
                            noSwiping={true}
                            className="comic-slider-swiper h-full"
                        >
                            {latestComics.map((comic) => (
                                <SwiperSlide className='max-w-[15rem]' key={comic.id}>
                                    <Link to={`comics/${comic.id}`}>
                                        <div className="overflow-hidden transition-transform transform cursor-pointer hover:scale-105 group">
                                            <img className="object-cover w-full" src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`} alt={comic.title} />
                                            <div className="px-2 py-2 group">
                                                <div className="mb-1 text-base font-bold text-white group-hover:text-red-500">{comic.title}</div>
                                                <p className="text-base text-white">{getDate(comic.modified)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
});

export default ComicSlider;

