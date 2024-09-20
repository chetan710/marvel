import express from 'express';
import { getMarvel, getLatestComics, getRandomCharacters, getLatestSeries, getComics, getComic, getAllSeries, getSeries, getAllCharacters, getCharacterById } from '../controllers/marvelCtrl.js';

const router = express.Router();

router.get('/marvel', getMarvel);
router.get('/latestComics', getLatestComics);
router.get('/getComics', getComics);
router.get('/randomCharacters', getRandomCharacters);
router.get('/latestSeries', getLatestSeries);
router.get('/allSeries', getAllSeries);
router.get('/comics/:comicId', getComic);
router.get('/series/:seriesId', getSeries);
router.get('/allCharacters', getAllCharacters);
router.get('/character/:characterId', getCharacterById);

export default router;