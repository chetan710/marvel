import { fetchCharactersRequest } from "../../../shared/redux/actions/characterActions";
import { fetchComicsRequest } from "../../../shared/redux/actions/comicsActions";
import { fetchSeriesRequest } from "../../../shared/redux/actions/seriesActions";
import store from "../../../shared/redux/store";

export const layoutLoader = async () => {
  const dispatch = store.dispatch;

  await Promise.all([
    dispatch(fetchCharactersRequest()),
    dispatch(fetchComicsRequest()),
    dispatch(fetchSeriesRequest()),
  ]);

  return null;
};
