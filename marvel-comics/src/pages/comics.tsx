import React from "react";
import ComicsHeroSlide from "../components/comics/comicsHeroSlide";
import ComicsList from "../components/comics/comicsList";


const comics = () => {
  return (
    <React.Fragment>
        <ComicsHeroSlide />
        <ComicsList/>
    </React.Fragment>
  )
}

export default comics;
