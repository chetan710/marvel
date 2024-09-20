import axios from 'axios';
import { Series, SeriesListData } from '../../../shared/models/latest-comics';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllSeriesList = async (): Promise<SeriesListData[]> => {
    const { data } = await axios.get<SeriesListData[]>(`${apiUrl}/api/allSeries`);
    return data;
};

export const fetchSeriesbyId = async (id: string): Promise<Series> => {
    const { data } = await axios.get<Series>(`${apiUrl}/api/series/${id}`);
    return data;
};
