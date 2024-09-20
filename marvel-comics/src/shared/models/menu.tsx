import { LatestComicData } from "./latest-comics";
import { RandomCharactersData } from "./random-characters";

export interface MenuItems {
    label?: string;
    link?: string;
    submenu?: SubmenuItem[];
    comics?: boolean;
    characters?: boolean;
    comicsData?: LatestComicData[],
    charactersData?: RandomCharactersData[],
}

export interface SubmenuItem {
     id: string, 
     label: string; 
     link: string;
}