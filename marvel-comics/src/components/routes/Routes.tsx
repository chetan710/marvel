import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import React from 'react';
import { layoutLoader } from './loaders/layoutLoader';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loading from '../../shared/utils/Loading';

const Layout = React.lazy(() => import('../layout/layout'));
const Home = React.lazy(() => import('../../pages/home'));
const Comics = React.lazy(() => import('../../pages/comics'));
const ComicDetails = React.lazy(() => import('../../pages/comicsDetails'));
const Series = React.lazy(() => import('../../pages/series'));
const SeriesDetails = React.lazy(() => import('../../pages/seriesDetails'));
const Characters = React.lazy(() => import('../../pages/characters'));
const CharacterDetails = React.lazy(() => import('../../pages/characterDetails'));

const queryClient = new QueryClient();

const browserRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} loader={layoutLoader}>
            <Route
                index
                element={
                    <Suspense fallback={<Loading/>}>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path="/comics"
                element={
                    <Suspense fallback={<Loading/>}>
                        <Comics />
                    </Suspense>
                }
            />
            <Route
                path="/comics/:id"
                element={
                    <Suspense fallback={<Loading/>}>
                        <ComicDetails />
                    </Suspense>
                }
            />
            <Route
                path="/series"
                element={
                    <Suspense fallback={<Loading/>}>
                        <Series />
                    </Suspense>
                }
            />
                <Route
                    path="/series/:id"
                    element={
                        <Suspense fallback={<Loading/>}>
                            <SeriesDetails />
                        </Suspense>
                    }
                />
                <Route
                    path="/characters"
                    element={
                        <Suspense fallback={<Loading/>}>
                            <Characters />
                        </Suspense>
                    }
                />
                <Route
                    path="/characters/:id"
                    element={
                        <Suspense fallback={<Loading/>}>
                            <CharacterDetails />
                        </Suspense>
                    }
                />
        </Route>
    )
);

const RoutesApp = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(loadingTimeout);
    }, []);

    return isLoading ? (
        <Loading/>
    ) : (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={browserRouter} />
        </QueryClientProvider>
    );
}

export default RoutesApp;