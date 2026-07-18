import DongyangOldStoriesBlog, {
  DongyangOldStoriesAlbum,
  DongyangOldStoriesMessages,
} from '../pages/DongyangOldStoriesBlog';
import DongyangOldStoriesWestHillPost from '../pages/dongyang/posts/WestHillSiteCollapse';
import DongyangOldStoriesTwoYiShrinePost from '../pages/dongyang/posts/TwoYiShrineReturnVisit';
import DongyangOldStoriesMingchuanThirdMiddleCaseOnePost from '../pages/dongyang/posts/MingchuanThirdMiddleCaseOne';
import DongyangOldStoriesMingchuanThirdMiddleCaseTwoPost from '../pages/dongyang/posts/MingchuanThirdMiddleCaseTwo';
import DongyangOldStoriesMingchuanThirdMiddleCaseThreePost from '../pages/dongyang/posts/MingchuanThirdMiddleCaseThree';
import DongyangOldStoriesMingchuanThirdMiddleCaseFourPost from '../pages/dongyang/posts/MingchuanThirdMiddleCaseFour';
import DongyangOldStoriesMingchuanThirdMiddleCaseFivePost from '../pages/dongyang/posts/MingchuanThirdMiddleCaseFive';
import ClayIdolHeartCase from '../pages/dongyang/posts/ClayIdolHeartCase';
import DongyangStrangeCultsStudy from '../pages/dongyang/posts/DongyangStrangeCultsStudy';
import HiddenNameRecord from '../pages/dongyang/posts/HiddenNameRecord';
import MingchuanCountyGazetteer from '../pages/dongyang/posts/MingchuanCountyGazetteer';
import MingchuanWaterwaysAddendum from '../pages/dongyang/posts/MingchuanWaterwaysAddendum';
import DongyangGuestbookArchive from '../pages/dongyang/GuestbookArchive';
import PageRouteFrame from './PageRouteFrame';

const routes = [
  { path: '/p/71a6d0e2bf', component: DongyangOldStoriesBlog, pageNumber: '30', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/b4e9820fa1', component: DongyangOldStoriesAlbum, pageNumber: '31', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/0c1f8a6d94', component: DongyangOldStoriesMessages, pageNumber: '32', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/e6b0c3f91a', component: DongyangOldStoriesWestHillPost, pageNumber: '33', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/1fd9a0c7e4', component: DongyangOldStoriesTwoYiShrinePost, pageNumber: '37', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/a0c8e37b5f', component: DongyangOldStoriesMingchuanThirdMiddleCaseOnePost, pageNumber: '43', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/c49e1a0f72', component: DongyangOldStoriesMingchuanThirdMiddleCaseTwoPost, pageNumber: '40', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/7f2da90b31', component: DongyangOldStoriesMingchuanThirdMiddleCaseThreePost, pageNumber: '39', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/ed31c8b047', component: DongyangOldStoriesMingchuanThirdMiddleCaseFourPost, pageNumber: '44', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/4b0e72f6a9', component: DongyangOldStoriesMingchuanThirdMiddleCaseFivePost, pageNumber: '45', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/9c73ae0d6b', component: DongyangGuestbookArchive, pageNumber: '46', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/d8b3f2a6c0', component: ClayIdolHeartCase, progressTheme: 'dongyang', site: 'dongyangBlog', progressLabel: '彩蛋4/5' },
  { path: '/p/56b2d8a4c1', component: MingchuanCountyGazetteer, pageNumber: '34', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/8a4f03c7de', component: MingchuanWaterwaysAddendum, pageNumber: '35', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/2c91b7e6a4', component: DongyangStrangeCultsStudy, pageNumber: '36', progressTheme: 'dongyang', site: 'dongyangBlog' },
  { path: '/p/f0d6a19c82', component: HiddenNameRecord, pageNumber: '38', progressTheme: 'dongyang', site: 'dongyangBlog' },
];

export default function DongyangRoutes({ pageSlug, innerForumLightsOn }) {
  const route = routes.find((item) => item.path === `/p/${pageSlug}`);
  if (!route) return null;

  return <PageRouteFrame route={route} innerForumLightsOn={innerForumLightsOn} />;
}
