import axios from 'axios';
import { Comic } from '../../../shared/models/latest-comics';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchComicById = async (id: string): Promise<Comic> => {
    const { data } = await axios.get<Comic>(`${apiUrl}/api/comics/${id}`);
    return data;
};

export default fetchComicById;
