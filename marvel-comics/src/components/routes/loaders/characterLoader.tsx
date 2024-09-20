import axios from 'axios';
import { Characters, CharactersList } from '../../../shared/models/random-characters';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllCharacterList = async (): Promise<CharactersList[]> => {
    const { data } = await axios.get<CharactersList[]>(`${apiUrl}/api/allCharacters`);
    return data;
};

export const fetchCharacterbyId = async (id: string): Promise<Characters> => {
    const { data } = await axios.get<Characters>(`${apiUrl}/api/character/${id}`);
    return data;
};