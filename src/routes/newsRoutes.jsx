import NewsHeartHomeFiveYears from '../pages/NewsHeartHomeFiveYears';
import NewsMissingGirlSearch from '../pages/NewsMissingGirlSearch';
import NewsMingchuanThirdMiddleMissingGirls from '../pages/NewsMingchuanThirdMiddleMissingGirls';
import NewsAbandonedBuildingCollapse from '../pages/NewsAbandonedBuildingCollapse';
import NewsLiHongyuObituary from '../pages/NewsLiHongyuObituary';
import NewsTopScorerMingchuanThirdMiddle from '../pages/NewsTopScorerMingchuanThirdMiddle';
import NewsChenJiAward from '../pages/NewsChenJiAward';
import NewsMingchuanUniversityArchives from '../pages/NewsMingchuanUniversityArchives';
import NewsLiuXinyiBubbleHall from '../pages/NewsLiuXinyiBubbleHall';
import NewsWangJingYoungWriter from '../pages/NewsWangJingYoungWriter';
import PageRouteFrame from './PageRouteFrame';

const routes = [
  { path: '/p/ab6f90d2c4', component: NewsWangJingYoungWriter, pageNumber: '23', progressTheme: 'news', site: 'mingchuanNews' },
  { path: '/p/d4c1e8a07f', component: NewsLiuXinyiBubbleHall, pageNumber: '24', progressTheme: 'news', site: 'mingchuanNews' },
  { path: '/p/2ad87e50c9', component: NewsAbandonedBuildingCollapse, pageNumber: '25', progressTheme: 'news', site: 'mingchuanNews' },
  { path: '/p/9fe021c7ad', component: NewsMingchuanThirdMiddleMissingGirls, pageNumber: '26', progressTheme: 'news', site: 'mingchuanNews' },
  { path: '/p/3cf0b79a12', component: NewsMingchuanUniversityArchives, pageNumber: '27', progressTheme: 'news', site: 'mingchuanNews' },
  { path: '/p/50a8f6c3d1', component: NewsChenJiAward, pageNumber: '28', progressTheme: 'news', site: 'mingchuanNews' },
  { path: '/p/c8f09a3e61', component: NewsLiHongyuObituary, pageNumber: '29', progressTheme: 'news', site: 'mingchuanNews' },
  {
    path: '/p/f0d4c8a2b9',
    component: NewsTopScorerMingchuanThirdMiddle,
    progressLabel: '彩蛋2',
    excludeFromProgressTotal: true,
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  { path: '/p/86f1c4b0ed', component: NewsHeartHomeFiveYears, pageNumber: '30', progressTheme: 'news', site: 'mingchuanNews' },
  { path: '/p/44d2ae09f6', component: NewsMissingGirlSearch, pageNumber: '31', progressTheme: 'news', site: 'mingchuanNews' },
];

export default function NewsRoutes({ pageSlug, innerForumLightsOn }) {
  const route = routes.find((item) => item.path === `/p/${pageSlug}`);
  if (!route) return null;

  return <PageRouteFrame route={route} innerForumLightsOn={innerForumLightsOn} />;
}
