import { Link } from "react-router-dom"
import { LatestComicData } from "../../shared/models/latest-comics"
import { Each } from "../../shared/utils/Each"
import ComicCard from "./comicsCard"

interface ComicCardProps {
    data: LatestComicData[],
    title: string,
    seriesId: number,
}

const ComicsSeriesList: React.FC<ComicCardProps> = ({ data, title, seriesId }) => {
    return (
        <section className="mx-28 mt-16">
            <div className="pb-6">
                <div className="flex justify-between">
                    <h1 className='pb-2 text-2xl font-bold uppercase'>More {title}</h1>
                    <div className="flex flex-wrap items-center gap-x-2">
                        <Link to={`/series/${seriesId}`} className="flex items-center gap-x-2 hover:text-primary">
                            <p className="uppercase text-base">See All </p>
                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-black"></div>
                        </Link>
                    </div>
                </div>
                <img src="/images/Rectangle 5.png" alt="line" />
            </div>
            {/* <div className="flex flex-wrap mx-auto pb-6 gap-x-4"> */}
            <div className="grid lg:grid-cols-5  md:grid-cols-4 grid-cols-2 mx-auto pb-6 gap-x-4">
                <Each of={data ?? []} render={(card: LatestComicData, index: number) => (
                    <ComicCard key={index} title={card.title} issued={card.modified} image={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`}
                        to={`/comics/${card.id.toString()}`} width={'max-w[14rem] sm:w-[12rem]'} height={'h-[18rem]'} />
                )} />
            </div>
        </section>
    )
}

export default ComicsSeriesList
