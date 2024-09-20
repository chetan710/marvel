import ComicSlider from '../components/comics/comicsSlider';
import SeriesSlider from '../components/series/seriesSlider';
import HeroSlide from '../components/hero/heroSlide';
import Characters from "../components/hero/characters";
import { useRef } from "react";
import React from "react";

export type ComicSliderHandle = {
  scrollIntoView: () => void;
};

const Home = () => {

  const comicSliderRef = useRef<ComicSliderHandle>(null);

  const scrollToComicSlider = () => {
    if (comicSliderRef.current) {
      comicSliderRef.current.scrollIntoView();
    }
  };

  return (
    <React.Fragment>
      <HeroSlide scrollToComicSlider={scrollToComicSlider} />
      <ComicSlider ref={comicSliderRef} />
      <SeriesSlider />
      <Characters />
    </React.Fragment>
  );
};

export default Home;