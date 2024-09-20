import { asyncHandler } from '../helpers/expressHelper.js';
import crypto from "crypto";
import axios from "axios";
import NodeCache from "node-cache";

const API_URL = "https://gateway.marvel.com/v1/public";
const PUBLIC_KEY = process.env.PUBLIC_API_KEY || "4a180ac32c51c46bc81c5699a0b2bd0e";
const PRIVATE_KEY = process.env.PRIVATE_API_KEY || "6a1ed0a08312d4888cd88ce8ffc83bf63becd2a6";
const cache = new NodeCache({ stdTTL: 300 });

export const getMarvel = asyncHandler(async (req, res) => {

    const apiUrl = createURL('characters');
    axios.get(apiUrl)
        .then(response => {
            // Handle the API response
            res.json({ message: 'Custom API route works!', data: response.data });
        })
        .catch(error => {
            // Handle errors
            res.json({ message: error.message, url: apiUrl });
        });

});

export const getLatestComics = asyncHandler(async (req, res) => {

    const additionalParamerters = {
        dateDescriptor: 'thisMonth',
        hasDigitalIssue: true,
        limit: 6
    }
    const apiUrl = createURL('comics', additionalParamerters);

    axios.get(apiUrl)
        .then(response => {
            // Handle the API response
            res.json(response?.data?.data?.results);
        })
        .catch(error => {
            // Handle errors
            res.json({ message: error.message, url: apiUrl });
        });

});

export const getComics = asyncHandler(async (req, res) => {

    const additionalParamerters = {
        startYear: "2023",
        //format: 'comic',
        hasDigitalIssue: true,
        limit: 50
    }
    const apiUrl = createURL('comics', additionalParamerters);

    axios.get(apiUrl)
        .then(response => {
            res.json(response?.data?.data.results);
        })
        .catch(error => {
            res.json({ message: error.message, url: apiUrl });
        });

});

export const getComic = asyncHandler(async (req, res) => {
    try {
        const comicId = req.params.comicId;

        const apiUrl = createURL(`comics/${comicId}`);

        const response = await getComicsData(apiUrl);

        res.json(response);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

const getComicsData = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl);

        if (response) {
            const { id, title, description, series, thumbnail, creators, modified, characters } = response.data.data.results[0];
            let newData;

            if (series) {
                const seriesURL = createURL(null, null, series.resourceURI);
                var seriesId = series.resourceURI.split('/')[6];

                const seriesData = await getData(seriesURL);

                const { comics } = seriesData[0];

                const query = {
                    limit: 5
                }

                if (comics) {
                    const comicsURL = createURL(null, query, comics.collectionURI);
                    var comicsData = await getData(comicsURL);

                    if (comicsData.length > 0) {
                        comicsData = comicsData.splice(0, 3);
                    }
                }
            }

            if (characters && characters.items.length > 0) {
                const charactersURL = createURL(null, null, characters.collectionURI);

                var charactersData = await getData(charactersURL);

            }

            newData = {
                id,
                title,
                description,
                seriesId,
                thumbnail,
                modified,
                creators,
                comicsData,
                charactersData
            }


            return newData;
        }

    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

const getData = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl);
        return response.data.data.results;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }

}


export const getLatestSeries = asyncHandler(async (req, res) => {

    const additionalParamerters = {
        startYear: "2020",
        seriesType: 'limited',
        orderBy: 'startYear'
    }
    const apiUrl = createURL('series', additionalParamerters);

    getSeriesWithImages(apiUrl)
        .then((series) => {
            res.json(series);
        })
        .catch((error) => {
            res.json({ message: error.message, url: apiUrl });
        });

});

export const getAllSeries = asyncHandler(async (req, res) => {
    const totalItems = 5920;
    const limit = 100;
    let allSeries = [];

    const batchCount = Math.ceil(totalItems / limit);

    const promises = [];
    for (let offset = 0; offset < batchCount; offset++) {
        const additionalParameters = { limit, offset: offset * limit };
        const apiUrl = createURL('series', additionalParameters);
        promises.push(getData(apiUrl));
    }

    try {
        const results = await Promise.all(promises);
        results.forEach(series => {
            const titles = series.map(item => ({ id: item.id, title: item.title }));
            allSeries = allSeries.concat(titles);
        });
    } catch (error) {
        return res.json({ message: error.message });
    }

    res.json(allSeries);

});

export const getAllCharacters = asyncHandler(async (req, res) => {
    const totalItems = 1500;
    const limit = 100;
    let allCharacters = [];

    const batchCount = Math.ceil(totalItems / limit);
    const promises = [];
    for (let offset = 0; offset < batchCount; offset++) {
        const additionalParameters = { limit, offset: offset * limit };
        const apiUrl = createURL('characters', additionalParameters);
        promises.push(getData(apiUrl));
    }

    try {
        const results = await Promise.all(promises);
        results.forEach(characters => {
            const character = characters.map(item => ({ id: item.id, name: item.name, description: item.description, thumbnail: item.thumbnail }));
            allCharacters = allCharacters.concat(character);
        });

    } catch (error) {
        return res.json({ message: error.message });
    }

    res.json(allCharacters);

});

export const getCharacterById = asyncHandler(async (req, res) => {
    try {
        const characterId = req.params.characterId;

        const apiUrl = createURL(`characters/${characterId}`);

        const response = await getCharacterData(apiUrl);

        res.json(response);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

const getCharacterData = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl);

        if (response) {
            const { id, name, description, thumbnail, comics, series } = response.data.data.results[0];
            let newData;

            if (comics) {
                const comicsURL = createURL(null, null, comics.collectionURI);
                var comicsData = await getData(comicsURL);
                if (comicsData.length > 0) {
                    comicsData = comicsData.map(comic => {
                        return ({
                            id: comic.id,
                            title: comic.title,
                            description: comic.description,
                            modified: comic.modified,
                            thumbnail: comic.thumbnail
                        })
                    });
                }
            }
            if (series) {
                const seriesURL = createURL(null, null, series.collectionURI);
                var seriesData = await getData(seriesURL);
                if (seriesData.length > 0) {
                    seriesData = seriesData.map(series => {
                        return ({
                            id: series.id,
                            title: series.title,
                            description: series.description,
                            startYear: series.startYear,
                            endYear: series.endYear,
                            modified: series.modified,
                            thumbnail: series.thumbnail
                        })
                    });
                }
            }

            newData = {
                id,
                name,
                description,
                thumbnail,
                comicsData,
                seriesData
            }

            return newData;
        }

    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}


export const getSeries = asyncHandler(async (req, res) => {
    try {
        const seriesId = req.params.seriesId;

        const apiUrl = createURL(`series/${seriesId}`);

        const response = await getSeriesData(apiUrl);

        res.json(response);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

const getSeriesData = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl);

        if (response) {
            const { id, title, description, comics, thumbnail, startYear, endYear, modified, characters } = response.data.data.results[0];
            let newData;

            if (comics) {
                const comicsURL = createURL(null, null, comics.collectionURI);
                var comicsData = await getData(comicsURL);
            }

            if (characters && characters.items.length > 0) {
                const charactersURL = createURL(null, null, characters.collectionURI);

                var charactersData = await getData(charactersURL);
            }

            newData = {
                id,
                title,
                description,
                startYear,
                endYear,
                thumbnail,
                modified,
                comicsData,
                charactersData
            }

            return newData;
        }

    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}


export const getRandomCharacters = asyncHandler(async (req, res) => {
    try {
        const cachedData = cache.get('characters');
        if (cachedData) {
            return res.json(cachedData);
        }
        const limitCharacters = 1563;
        const random = Math.floor(Math.random() * (limitCharacters - 1));

        const additionalParamerters = {
            modifiedSince: '2018-06-01T19:00:00-0500',
            offset: random,
        }

        const apiUrl = createURL('characters', additionalParamerters);

        const characters = await getCharactersWithImages(apiUrl);
        cache.set('characters', characters); // Cache the result
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

const getCharactersWithImages = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl);

        const charactersWithImages = response.data.data.results.filter(
            (character) => character.thumbnail && character.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' && character.description !== "" && character.name !== "",
        );

        if (charactersWithImages.length === 0) {
            let limitCharacters = 1563;

            const random = Math.floor(Math.random() * (limitCharacters - 1));

            const additionalParamerters = {
                modifiedSince: '2018-06-01T19:00:00-0500',
                offset: random,
            }

            const apiUrl = createURL('characters', additionalParamerters);

            return getCharactersWithImages(apiUrl);
        }

        return charactersWithImages.slice(0, 12);
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

const getSeriesWithImages = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl);

        const charactersWithImages = response.data.data.results.filter(
            (character) => character.thumbnail && character.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' && character.description !== "",
        );

        if (charactersWithImages.length === 0) {
            const additionalParamerters = {
                // startYear: "2022",
                seriesType: 'ongoing'
            }

            const apiUrl = createURL('series', additionalParamerters);

            return getCharactersWithImages(apiUrl);
        }

        return charactersWithImages.slice(0, 24);
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

function createURL(endpoint, additionalParamerters, api) {
    const ts = Date.now();

    const md5Hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');

    const params = new URLSearchParams({
        ...additionalParamerters,
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: md5Hash,
    });
    if (api) {
        return `${api}?${params}`;
    }
    const apiUrl = `${API_URL}/${endpoint}?`;

    const url = apiUrl + params;

    return url;
}