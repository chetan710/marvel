import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { selectLatestComics } from '../../shared/redux/selectors/comicsSelectors';
import { useSelector } from 'react-redux';
const ComicsHeroSlide = () => {
  const latestComics = useSelector(selectLatestComics);
  return (
    <section className='relative -z-10 w-full h-full '>
      <Swiper
        direction={'horizontal'}
        autoplay={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >

        {latestComics.map((comic, index) => (
          <SwiperSlide key={index}>
            <div className="w-full">
              <img className='object-cover w-full max-h-[720px]' src={`${comic.thumbnail.path}/detail.${comic.thumbnail.extension}`} alt={comic.title} />
              <div className="absolute top-[65%] flex flex-col justify-center gap-6 p-4 bg-black  m-8 border-2 border-white">
                <h2 className="text-3xl font-bold text-white">{comic.title.replace(/[#\d()]/g, "")}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ComicsHeroSlide;
