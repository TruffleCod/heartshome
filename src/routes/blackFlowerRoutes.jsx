import InternalForumPlantingRecords from '../pages/InternalForumPlantingRecords';
import InternalForumGhostCache from '../pages/InternalForumGhostCache';
import InternalForumRitualEntry from '../pages/InternalForumRitualEntry';
import InternalForumRitualQuestions from '../pages/InternalForumRitualQuestions';
import TrueEndingAuthorNote from '../pages/TrueEndingAuthorNote';
import PageRouteFrame from './PageRouteFrame';

const routes = [
  { path: '/p/e08c72fa9d', component: InternalForumGhostCache, pageNumber: '43', hideProgressBanner: true, site: 'blackFlower' },
  { path: '/p/6c9f02a7bd', component: InternalForumRitualEntry, pageNumber: '44', progressTheme: 'charcoal', site: 'blackFlower' },
  { path: '/p/d7e40a1c9b', component: InternalForumRitualQuestions, pageNumber: '46', progressTheme: 'charcoal', site: 'blackFlower' },
  { path: '/p/a19de704c6', component: InternalForumPlantingRecords, pageNumber: '45', progressTheme: 'charcoal', site: 'blackFlower' },
  { path: '/p/5e0f3a9b2c', component: TrueEndingAuthorNote, progressLabel: '真结局' },
];

export default function BlackFlowerRoutes({ pageSlug, innerForumLightsOn }) {
  const route = routes.find((item) => item.path === `/p/${pageSlug}`);
  if (!route) return null;

  return <PageRouteFrame route={route} innerForumLightsOn={innerForumLightsOn} />;
}
