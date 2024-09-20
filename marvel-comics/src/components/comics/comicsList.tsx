import { selectComics } from '../../shared/redux/selectors/comicsSelectors';
import { useSelector } from 'react-redux';
import { Each } from '../../shared/utils/Each';
import { LatestComicData } from '../../shared/models/latest-comics';
import ComicCard from './comicsCard';
import { useEffect, useState } from 'react';

const ComicsList = () => {

    const comics = useSelector(selectComics);
    const [displayedItems, setDisplayedItems] = useState(comics.slice(0, 20));
    const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        if (comics.length > 0) {
            setDisplayedItems(comics.slice(0, 20));
        }
    }, [comics]);


    const loadMoreItems = () => {
        const newCount = visibleCount + 5;
        setDisplayedItems(comics.slice(0, newCount));
        setVisibleCount(newCount);
    };

    return (
        <section className="px-12 py-10">
            <h1 className='pb-2 text-2xl font-bold uppercase'>Latest Comics</h1>
            <img src="/images/Rectangle 5.png" alt="line"></img>
            <div className='grid grid-cols-5 gap-5 last2 mt-3 place-content-center'>
                <Each of={displayedItems} render={(comic: LatestComicData, index: number) => (
                    <ComicCard key={index} title={comic.title} issued={comic.modified} image={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`} 
                    width={'min-w-[0rem]'} height={'h-[22rem]'} to={`${comic.id.toString()}`} />
                )} />
            </div>
            {visibleCount < comics.length && (
                <div className='flex justify-center'>
                    <button type='button' className="btn bg-primary border-primary text-white w-[200px]" onClick={loadMoreItems}>Load More</button>
                </div>
            )}
        </section>
    )
}

export default ComicsList;
