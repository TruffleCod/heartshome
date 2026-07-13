import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import StartGame from './pages/StartGame';
import HomeNew from './pages/HomeNew';
import InternalForumGhostCache from './pages/InternalForumGhostCache';
import {
  isInnerForumLightToggleRoute,
  updateFavicon,
  updateSiteChrome,
} from './routes/routeChrome';

const PageRouteDispatcher = lazy(() => import('./routes/PageRouteDispatcher'));
const MingchuanNewsSearch = lazy(() => import('./pages/MingchuanNewsSearch'));
const DongyangOldStoriesSearch = lazy(() =>
  import('./pages/DongyangOldStoriesBlog').then((module) => ({
    default: module.DongyangOldStoriesSearch,
  }))
);

const SEARCH_PATHS = {
  mingchuan: '/news/search',
  dongyang: '/p/71a6d0e2bf/search',
};

const ordinaryNotFoundCopy = {
  title: '抱歉，页面无法访问…',
  description: '网址已失效：可能页面已删除，地址变更等',
  instruction: 'Oops, this page does not exist. Please go back to previous page.',
};

const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '');

function getInnerForumThemeStorageKey(pathname) {
  return `inner-forum-lights:${pathname}`;
}

function getStoredInnerForumLights(pathname) {
  if (typeof window === 'undefined') {
    return true;
  }

  const storedValue = window.localStorage.getItem(
    getInnerForumThemeStorageKey(pathname)
  );
  return storedValue !== 'false';
}

function AppRoutes() {
  const location = useLocation();
  const [innerForumLightsOn, setInnerForumLightsOn] = useState(() =>
    getStoredInnerForumLights(location.pathname)
  );

  useEffect(() => {
    if (!isInnerForumLightToggleRoute(location.pathname)) {
      return undefined;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Keep the route banner in sync with per-page light state before subscribing.
    setInnerForumLightsOn(getStoredInnerForumLights(location.pathname));

    const handleThemeChange = (event) => {
      const detail = event.detail || {};
      if (detail.path === location.pathname) {
        setInnerForumLightsOn(detail.lightsOn !== false);
      }
    };

    window.addEventListener('inner-forum-theme-change', handleThemeChange);
    return () => window.removeEventListener('inner-forum-theme-change', handleThemeChange);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === SEARCH_PATHS.mingchuan) {
      updateSiteChrome('mingchuanNews');
      return;
    }

    if (location.pathname === SEARCH_PATHS.dongyang) {
      updateSiteChrome('dongyangBlog');
      return;
    }

    updateSiteChrome('heartHome');
  }, [location.pathname]);

  useEffect(() => {
    updateFavicon('favicon-heart-home.svg');
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeNew />} />
        <Route path="/start-game" element={<StartGame />} />
        <Route
          path="/404-page-not-found"
          element={<InternalForumGhostCache showGame={false} copy={ordinaryNotFoundCopy} />}
        />
        <Route
          path={SEARCH_PATHS.mingchuan}
          element={
            <Suspense fallback={null}>
              <MingchuanNewsSearch />
            </Suspense>
          }
        />
        <Route
          path={SEARCH_PATHS.dongyang}
          element={
            <Suspense fallback={null}>
              <DongyangOldStoriesSearch />
            </Suspense>
          }
        />
        <Route
          path="/p/:pageSlug"
          element={
            <Suspense fallback={null}>
              <PageRouteDispatcher innerForumLightsOn={innerForumLightsOn} />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <AppRoutes />
    </BrowserRouter>
  );
}
