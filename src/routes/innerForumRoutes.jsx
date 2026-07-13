import InnerForumWorkspace from '../pages/InnerForumWorkspace';
import InternalForumRulesPost from '../pages/InternalForumRulesPost';
import InternalForumThanksSleepPost from '../pages/InternalForumThanksSleepPost';
import InternalForumPlantingCeremonyReplyPost from '../pages/InternalForumPlantingCeremonyReplyPost';
import PageRouteFrame from './PageRouteFrame';

const routes = [
  { path: '/p/f2c96a10de', component: InternalForumRulesPost, pageNumber: '19', progressTheme: 'innerDark' },
  { path: '/p/0b9e71d4ac', component: InternalForumThanksSleepPost, pageNumber: '20', progressTheme: 'innerDark' },
  { path: '/p/5a1f90d7c3', component: InternalForumPlantingCeremonyReplyPost, pageNumber: '21', progressTheme: 'innerDark' },
  { path: '/p/94dc1b7e03', component: InnerForumWorkspace, pageNumber: '22', progressTheme: 'innerWorkspace' },
];

export default function InnerForumRoutes({ pageSlug, innerForumLightsOn }) {
  const route = routes.find((item) => item.path === `/p/${pageSlug}`);
  if (!route) return null;

  return <PageRouteFrame route={route} innerForumLightsOn={innerForumLightsOn} />;
}
