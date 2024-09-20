import { LatestComicData, LatestSeriesData } from "./latest-comics";

export interface RandomCharactersData {
    id: number;
    name: string;
    description: string;
    modified?: string;
    thumbnail: {
        path: string;
        extension: string;
    }
}

export interface RandomCharatersState {
    characters: RandomCharactersData[];
    loading: boolean;
    error: string | null;
}

export interface CharactersList {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }
}

export interface Characters {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    },
    comicsData: LatestComicData[],
    seriesData: LatestSeriesData[]
}