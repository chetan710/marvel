type HeroSlideProps = {
    scrollToComicSlider: () => void;
  };

const HeroSlide: React.FC<HeroSlideProps> = ({ scrollToComicSlider }) => {

    return (
        <>
            <section className="relative -z-10">
                <div className="w-full">
                    <img className='object-cover w-full h-screen' src="/images/heroImage.jpg" alt="" />
                    <div className="absolute top-1/2 flex flex-col justify-center md:w-[60%] gap-6 px-12">
                        <h2 className="text-3xl font-bold text-white">Welcome to the Marvel Universe!</h2>
                        <p className="text-lg text-white">Dive into the extraordinary world of Marvel Comics, where heroes rise, villains clash, and epic adventures await.
                            Explore iconic characters, gripping storylines, and boundless imagination that has captivated fans for generations.</p>
                        <button type='button' className="btn bg-primary border-primary text-white w-[200px]" onClick={scrollToComicSlider}>Start Exploring</button>
                    </div>
                </div>
            </section>
            {/* <section className="hero">
                <div className="hero-content">
                    <h2>Welcome to Our Website</h2>
                </div>
            </section> */}
        </>
    );
};
export default HeroSlide;
