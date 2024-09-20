import { RandomCharactersData } from "./random-characters";

export interface LatestComicData {
    id: number;
    title: string;
    modified: string;
    description?: string;
    thumbnail: {
        path: string;
        extension: string;
    }
}

export interface LatestComicState {
    comics: LatestComicData[];
    latestComics: LatestComicData[];
    loading: boolean;
    error: string | null;
}

export interface LatestSeriesData {
    id: number;
    title: string;
    description?: string;
    startYear: number,
    endYear: number,
    thumbnail: {
        path: string;
        extension: string;
    }
}

export interface LatestSeriesState {
    series: LatestSeriesData[];
    loading: boolean;
    error: string | null;
}

export interface Comic {
    id: number;
    title: string;
    description: string;
    seriesId?: number;
    thumbnail: {
        path: string;
        extension: string;
    },
    modified: string;
    creators?: {
        items: Creator[]
    },
    comicsData?: LatestComicData[],
    charactersData?: RandomCharactersData[]
}

export interface Creator {
    name: string;
    role: string;
}

export interface SeriesListData {
    id: number;
    title: string;
}

export interface Series {
    id: number;
    title: string;
    description: string;
    startYear: string;
    endYear: string;
    thumbnail: {
        path: string;
        extension: string;
    },
    modified: string;
    comicsData?: LatestComicData[],
    charactersData?: RandomCharactersData[]
}