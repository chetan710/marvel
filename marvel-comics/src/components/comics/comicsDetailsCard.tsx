import React from 'react'
import { Comic, Creator } from '../../shared/models/latest-comics';
import { Each } from '../../shared/utils/Each';

interface ComicsProps {
    data: Comic;
}

const ComicsDetailsCard: React.FC<ComicsProps> = ({ data }) => {

    const formatDate = (dateString: string) => {
        if (dateString == '') {
            return 'Unknown';
        }
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' } as Intl.DateTimeFormatOptions;
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <section className="relative h-[100%] -z-10">
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-md"
                style={{
                    backgroundImage: `url("${data?.thumbnail.path}/detail.${data?.thumbnail.extension}")`,
                }}
            ></div>
            <div className="relative z-10  h-full text-white top-16 mx-28 pb-10">
                <div className='flex flex-row justify-center bg-black'>
                    <div className='p-8 w-[1000px]'>
                        <img src={`${data?.thumbnail.path}/portrait_uncanny.${data?.thumbnail.extension}`} alt={data?.title} />
                    </div>
                    <div className='pt-8'>
                        <h2 className='text-3xl'>{data?.title}</h2>
                        <div className='pt-4'>
                            <p className='uppercase text-base'>Published:</p>
                            <span className='text-lg'>{formatDate(data?.modified ?? '')}</span>
                        </div>
                        <div className='grid grid-cols-2 gap-5 last2 mt-3 place-content-cent pb-6'>
                            <Each of={data?.creators.items.slice(0, 4) ?? []} render={(creator: Creator, index: number) => (
                                <div key={index}>
                                    <p className='uppercase text-base'>{creator.role}:</p>
                                    <span className='text-lg'>{creator.name}</span>
                                </div>
                            )} />
                        </div>
                        <p className="text-base">{data?.description}</p>
                    </div>
                </div>
            </div>
            <div className='relative bg-black h-full mt-12'>
                <div className='p-8 text-white mx-28'>
                    <h3 className='text-lg uppercase'>More Details</h3>
                    <p className='uppercase text-base pt-4'>Creators:</p>
                    <div className='grid grid-cols-4 gap-5 last2 mt-3 place-content-cent pb-6'>
                        <Each of={data?.creators.items ?? []} render={(creator: Creator, index: number) => (
                            <div key={index} className='flex flex-row gap-x-2 text-xs'>
                                <p className='uppercase'>{creator.role}:</p>
                                <span className=''>{creator.name}</span>
                            </div>
                        )} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComicsDetailsCard;
