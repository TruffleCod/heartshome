import { useLayoutEffect } from 'react';
import PageProgressBanner from '../components/PageProgressBanner';
import { isInnerForumLightToggleRoute, updateSiteChrome } from './routeChrome';

const TOTAL_PAGES = 46;

function getPageNumber(route, fallbackPageNumber) {
  if (route.path === '/p/ad5f0c8b62') {
    return 'N/A';
  }

  if (route.path === '/p/09a7dc3e51') {
    return '17';
  }

  return route.pageNumber || fallbackPageNumber;
}

export default function PageRouteFrame({ route, fallbackPageNumber, innerForumLightsOn }) {
  const PageComponent = route.component;
  const pageNumber = getPageNumber(route, fallbackPageNumber);
  const bannerTotal = route.path === '/p/ad5f0c8b62' ? 'N/A' : TOTAL_PAGES;
  const bannerTheme =
    isInnerForumLightToggleRoute(route.path) &&
    (route.progressTheme === 'innerDark' || route.progressTheme === 'innerLight')
      ? innerForumLightsOn
        ? 'innerLight'
        : 'innerDark'
      : route.progressTheme || 'dark';

  useLayoutEffect(() => {
    if (route.site) {
      updateSiteChrome(route.site);
    }
  }, [route.site]);

  return (
    <>
      <PageComponent {...(route.props || {})} />
      {!route.hideProgressBanner && (
        <PageProgressBanner
          current={pageNumber}
          total={bannerTotal}
          projectName={route.projectName || '心之家 Project'}
          theme={bannerTheme}
          progressLabel={route.progressLabel}
        />
      )}
    </>
  );
}
