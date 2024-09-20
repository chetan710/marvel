import React, { useEffect, useRef, useState } from 'react';
import { SeriesListData } from "../../shared/models/latest-comics";
import { Link } from 'react-router-dom';

interface SeriesListProps {
    data: SeriesListData[];
}

const SeriesList: React.FC<SeriesListProps> = ({ data }) => {

    const [seriesList, setSeriesList] = useState<any>(null);
    const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const groupDataByAlphabet = (data: SeriesListData[]): { [key: string]: SeriesListData[] } => {
            const groupedData: { [key: string]: SeriesListData[] } = {};

            data.forEach(item => {
                const firstChar = item.title.charAt(0).toUpperCase();
                if (/[A-Z]/.test(firstChar)) { 
                    if (!groupedData[firstChar]) {
                        groupedData[firstChar] = [];
                    }
                    groupedData[firstChar].push(item);
                } else { 
                    if (!groupedData['#']) {
                        groupedData['#'] = []; 
                    }
                    groupedData['#'].push(item);
                }
            });
            return groupedData;
        };

        setSeriesList(groupDataByAlphabet(data));
    }, [data]);

    const handleScrollTo = (key: string, offset: number = 60) => {
        const element = containerRefs.current[key];
        if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetScrollTop = scrollTop + rect.top - offset;

            window.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className='mx-28'>
            <div className='relative'>
                {/* Ensure the parent does not interfere with sticky positioning */}
                <div className="sticky top-0 bg-black-100 text-white z-10 flex justify-between items-center mb-4 p-2 shadow-lg">
                    <div className="flex space-x-2">
                        <button onClick={() => handleScrollTo('#')} className="p-2">#</button>
                        {Array.from(Array(26)).map((_, i) => (
                            <button key={i} onClick={() => handleScrollTo(String.fromCharCode(65 + i))} className="p-2 hover:text-primary">
                                {String.fromCharCode(65 + i)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className=' sticky top-16 flex justify-end'>
                    <button
                        className="right-4 bg-primary text-white p-4 shadow-lg"
                        onClick={() => handleScrollTo('#')}
                    >
                        SCROLL TO TOP
                    </button>
                </div>
                {seriesList && (
                    <div>
                        {Object.keys(seriesList).map(letter => (
                            <div key={letter} className='pb-4' ref={el => containerRefs.current[letter] = el}>
                                <h3 className='text-6xl text-primary font-bold pb-4'>{letter}</h3>
                                <ul className='grid grid-cols-2 gap-x-4 gap-y-4'>
                                    {seriesList[letter].map(item => (
                                        <Link to={`/series/${item.id}`} className='hover:text-primary'>
                                            <li key={item.id}>{item.title}</li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default SeriesList;
