import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import PageProgressBanner from './components/PageProgressBanner';
import ScrollToTop from './components/ScrollToTop';
import StartGame from './pages/StartGame';
import HomeNew from './pages/HomeNew';
import Forum from './pages/Forum';
import ForumRulesPost from './pages/ForumRulesPost';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import Workspace from './pages/Workspace';
import CounselingRecords from './pages/CounselingRecords';
import Assessment from './pages/Assessment';
import AssessmentEasterEgg from './pages/AssessmentEasterEgg';
import AssessmentFollowUp from './pages/AssessmentFollowUp';
import InternalForum from './pages/InternalForum';
import InnerForumWorkspace from './pages/InnerForumWorkspace';
import DiseaseInfo from './pages/DiseaseInfo';
import EmergencyHelp from './pages/EmergencyHelp';
import NewsHeartHomeFiveYears from './pages/NewsHeartHomeFiveYears';
import NewsMissingGirlSearch from './pages/NewsMissingGirlSearch';
import NewsMingchuanThirdMiddleMissingGirls from './pages/NewsMingchuanThirdMiddleMissingGirls';
import NewsAbandonedBuildingCollapse from './pages/NewsAbandonedBuildingCollapse';
import NewsLiHongyuObituary from './pages/NewsLiHongyuObituary';
import NewsTopScorerMingchuanThirdMiddle from './pages/NewsTopScorerMingchuanThirdMiddle';
import NewsChenJiAward from './pages/NewsChenJiAward';
import NewsMingchuanUniversityArchives from './pages/NewsMingchuanUniversityArchives';
import NewsLiuXinyiBubbleHall from './pages/NewsLiuXinyiBubbleHall';
import NewsWangJingYoungWriter from './pages/NewsWangJingYoungWriter';
import MingchuanNewsSearch from './pages/MingchuanNewsSearch';
import DongyangOldStoriesBlog, {
  DongyangOldStoriesAlbum,
  DongyangOldStoriesMessages,
  DongyangOldStoriesSearch,
} from './pages/DongyangOldStoriesBlog';
import DongyangOldStoriesWestHillPost from './pages/dongyang/posts/WestHillSiteCollapse';
import DongyangOldStoriesTwoYiShrinePost from './pages/dongyang/posts/TwoYiShrineReturnVisit';
import DongyangOldStoriesMingchuanThirdMiddleCaseOnePost from './pages/dongyang/posts/MingchuanThirdMiddleCaseOne';
import DongyangOldStoriesMingchuanThirdMiddleCaseTwoPost from './pages/dongyang/posts/MingchuanThirdMiddleCaseTwo';
import DongyangOldStoriesMingchuanThirdMiddleCaseThreePost from './pages/dongyang/posts/MingchuanThirdMiddleCaseThree';
import DongyangOldStoriesMingchuanThirdMiddleCaseFourPost from './pages/dongyang/posts/MingchuanThirdMiddleCaseFour';
import DongyangOldStoriesMingchuanThirdMiddleCaseFivePost from './pages/dongyang/posts/MingchuanThirdMiddleCaseFive';
import DongyangGuestbookArchive from './pages/dongyang/GuestbookArchive';
import InternalForumRulesPost from './pages/InternalForumRulesPost';
import InternalForumThanksSleepPost from './pages/InternalForumThanksSleepPost';
import InternalForumBulliedHelpPost from './pages/InternalForumBulliedHelpPost';
import InternalForumPlantingCeremonyReplyPost from './pages/InternalForumPlantingCeremonyReplyPost';
import InternalForumPlantingRecords from './pages/InternalForumPlantingRecords';
import InternalForumGhostCache from './pages/InternalForumGhostCache';
import InternalForumRitualEntry from './pages/InternalForumRitualEntry';
import InternalForumRitualQuestions from './pages/InternalForumRitualQuestions';

const pageRoutes = [
  { path: '/', component: HomeNew, pageNumber: '01' },
  { path: '/p/4d9e2b7a10', component: DiseaseInfo, pageNumber: '02' },
  { path: '/p/b12e8f40a6', component: Forum, pageNumber: '04' },
  { path: '/p/d3a90b7c2e', component: ForumRulesPost, pageNumber: '07' },
  { path: '/p/7c1e4a9f08', component: PostDetail, pageNumber: '08', props: { postId: 'holiday-flower' } },
  { path: '/p/b80a4e6c1f', component: InternalForumBulliedHelpPost, pageNumber: '09', progressTheme: 'dark' },
  { path: '/p/2f8d6c0b91', component: PostDetail, pageNumber: '10', props: { postId: 'depression-memory' } },
  { path: '/p/8a04e6d3f2', component: PostDetail, pageNumber: '11', props: { postId: 'moral-kidnapping-rant' } },
  { path: '/p/91b7c2e0a4', component: PostDetail, pageNumber: '12', props: { postId: 'career-empty' } },
  { path: '/p/6e58c2b9a1', component: Login, pageNumber: '05' },
  { path: '/p/fa02d7c8e3', component: RecoverPassword, pageNumber: '06' },
  { path: '/p/1b9c60e4fa', component: Workspace, pageNumber: '13' },
  { path: '/p/e47a92c0d1', component: CounselingRecords, pageNumber: '14', props: { recordCode: 'GDSYC-0428-CJ' } },
  { path: '/p/0f6b83d2a7', component: CounselingRecords, pageNumber: '15', props: { recordCode: 'GDSYC-0514-LXY' } },
  { path: '/p/c5a18f0e9d', component: CounselingRecords, pageNumber: '16', props: { recordCode: 'HJ338-0528-YD001' } },
  { path: '/p/c70a5e1d92', component: Assessment, pageNumber: '03' },
  {
    path: '/p/ef91b4c620',
    component: AssessmentEasterEgg,
    progressLabel: '彩蛋1',
    excludeFromProgressTotal: true,
  },
  { path: '/p/09a7dc3e51', component: AssessmentFollowUp, pageNumber: '17', progressTheme: 'charcoal' },
  { path: '/p/3e7b10a9c4', component: InternalForum, pageNumber: '18', progressTheme: 'innerLight' },
  { path: '/p/ad5f0c8b62', component: EmergencyHelp },
  { path: '/p/f2c96a10de', component: InternalForumRulesPost, pageNumber: '19', progressTheme: 'innerDark' },
  { path: '/p/0b9e71d4ac', component: InternalForumThanksSleepPost, pageNumber: '20', progressTheme: 'innerDark' },
  { path: '/p/5a1f90d7c3', component: InternalForumPlantingCeremonyReplyPost, pageNumber: '21', progressTheme: 'innerDark' },
  { path: '/p/94dc1b7e03', component: InnerForumWorkspace, pageNumber: '22', progressTheme: 'innerWorkspace' },
  { path: '/p/e08c72fa9d', component: InternalForumGhostCache, pageNumber: '43', hideProgressBanner: true, site: 'blackFlower' },
  { path: '/p/6c9f02a7bd', component: InternalForumRitualEntry, pageNumber: '44', progressTheme: 'charcoal', site: 'blackFlower' },
  { path: '/p/d7e40a1c9b', component: InternalForumRitualQuestions, pageNumber: '46', progressTheme: 'charcoal', site: 'blackFlower' },
  { path: '/p/a19de704c6', component: InternalForumPlantingRecords, pageNumber: '45', progressTheme: 'charcoal', site: 'blackFlower' },
  {
    path: '/p/ab6f90d2c4',
    component: NewsWangJingYoungWriter,
    pageNumber: '23',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/d4c1e8a07f',
    component: NewsLiuXinyiBubbleHall,
    pageNumber: '24',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/2ad87e50c9',
    component: NewsAbandonedBuildingCollapse,
    pageNumber: '25',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/9fe021c7ad',
    component: NewsMingchuanThirdMiddleMissingGirls,
    pageNumber: '26',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/3cf0b79a12',
    component: NewsMingchuanUniversityArchives,
    pageNumber: '27',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/50a8f6c3d1',
    component: NewsChenJiAward,
    pageNumber: '28',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/c8f09a3e61',
    component: NewsLiHongyuObituary,
    pageNumber: '29',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/f0d4c8a2b9',
    component: NewsTopScorerMingchuanThirdMiddle,
    progressLabel: '彩蛋2',
    excludeFromProgressTotal: true,
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/71a6d0e2bf',
    component: DongyangOldStoriesBlog,
    pageNumber: '32',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/b4e9820fa1',
    component: DongyangOldStoriesAlbum,
    pageNumber: '33',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/0c1f8a6d94',
    component: DongyangOldStoriesMessages,
    pageNumber: '34',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/e6b0c3f91a',
    component: DongyangOldStoriesWestHillPost,
    pageNumber: '35',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/1fd9a0c7e4',
    component: DongyangOldStoriesTwoYiShrinePost,
    pageNumber: '36',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/a0c8e37b5f',
    component: DongyangOldStoriesMingchuanThirdMiddleCaseOnePost,
    pageNumber: '37',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/c49e1a0f72',
    component: DongyangOldStoriesMingchuanThirdMiddleCaseTwoPost,
    pageNumber: '38',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/7f2da90b31',
    component: DongyangOldStoriesMingchuanThirdMiddleCaseThreePost,
    pageNumber: '39',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/ed31c8b047',
    component: DongyangOldStoriesMingchuanThirdMiddleCaseFourPost,
    pageNumber: '40',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/4b0e72f6a9',
    component: DongyangOldStoriesMingchuanThirdMiddleCaseFivePost,
    pageNumber: '41',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/9c73ae0d6b',
    component: DongyangGuestbookArchive,
    pageNumber: '42',
    progressTheme: 'dongyang',
    site: 'dongyangBlog',
  },
  {
    path: '/p/86f1c4b0ed',
    component: NewsHeartHomeFiveYears,
    pageNumber: '30',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
  {
    path: '/p/44d2ae09f6',
    component: NewsMissingGirlSearch,
    pageNumber: '31',
    progressTheme: 'news',
    site: 'mingchuanNews',
  },
];

const paths = {
  diseaseInfo: '/p/4d9e2b7a10',
  forum: '/p/b12e8f40a6',
  forumRules: '/p/d3a90b7c2e',
  postHolidayFlower: '/p/7c1e4a9f08',
  postDepressionMemory: '/p/2f8d6c0b91',
  postMoralKidnappingRant: '/p/8a04e6d3f2',
  postCareerEmpty: '/p/91b7c2e0a4',
  login: '/p/6e58c2b9a1',
  recoverPassword: '/p/fa02d7c8e3',
  workspace: '/p/1b9c60e4fa',
  record0428: '/p/e47a92c0d1',
  record0514: '/p/0f6b83d2a7',
  recordHJ338: '/p/c5a18f0e9d',
  assessment: '/p/c70a5e1d92',
  assessmentEasterEgg: '/p/ef91b4c620',
  assessmentFollowUp: '/p/09a7dc3e51',
  innerForum: '/p/3e7b10a9c4',
  emergencyHelp: '/p/ad5f0c8b62',
  innerForumRules: '/p/f2c96a10de',
  innerForumThanksSleep: '/p/0b9e71d4ac',
  innerForumWorkspace: '/p/94dc1b7e03',
  innerForumBulliedHelp: '/p/b80a4e6c1f',
  innerForumPlantingCeremonyReply: '/p/5a1f90d7c3',
  innerForumGhostCache: '/p/e08c72fa9d',
  innerForumRitualEntry: '/p/6c9f02a7bd',
  innerForumRitualQuestions: '/p/d7e40a1c9b',
  innerForumPlantingRecords: '/p/a19de704c6',
  newsHeartHomeFiveYears: '/p/86f1c4b0ed',
  newsMissingGirlSearch: '/p/44d2ae09f6',
  newsMingchuanThirdMiddleMissingGirls: '/p/9fe021c7ad',
  newsChenJiAward: '/p/50a8f6c3d1',
  newsMingchuanUniversityArchives: '/p/3cf0b79a12',
  newsAbandonedBuildingCollapse: '/p/2ad87e50c9',
  newsLiHongyuObituary: '/p/c8f09a3e61',
  newsTopScorerMingchuanThirdMiddle: '/p/f0d4c8a2b9',
  newsLiuXinyiBubbleHall: '/p/d4c1e8a07f',
  newsWangJingYoungWriter: '/p/ab6f90d2c4',
  dongyangHome: '/p/71a6d0e2bf',
  dongyangAlbum: '/p/b4e9820fa1',
  dongyangMessages: '/p/0c1f8a6d94',
  dongyangWestHill: '/p/e6b0c3f91a',
  dongyangTwoYiShrine: '/p/1fd9a0c7e4',
  dongyangCaseOne: '/p/a0c8e37b5f',
  dongyangCaseTwo: '/p/c49e1a0f72',
  dongyangCaseThree: '/p/7f2da90b31',
  dongyangCaseFour: '/p/ed31c8b047',
  dongyangCaseFive: '/p/4b0e72f6a9',
  dongyangGuestbookArchive: '/p/9c73ae0d6b',
  mingchuanSearch: '/news/search',
  dongyangSearch: '/p/71a6d0e2bf/search',
};

const siteProfiles = {
  heartHome: {
    title: '心之家',
    icon: 'favicon-heart-home.svg',
  },
  mingchuanNews: {
    title: '明川新闻网',
    icon: 'favicon-mingchuan-news.svg',
  },
  dongyangBlog: {
    title: '东阳旧事博客',
    icon: 'favicon-dongyang-blog.svg',
  },
  blackFlower: {
    title: '心之家',
    icon: 'favicon-black-flower.svg',
  },
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

function getSiteProfile(pathname) {
  if (pathname === paths.mingchuanSearch) {
    return siteProfiles.mingchuanNews;
  }

  if (pathname === paths.dongyangSearch) {
    return siteProfiles.dongyangBlog;
  }

  const route = pageRoutes.find((item) => item.path === pathname);
  return siteProfiles[route?.site] || siteProfiles.heartHome;
}

function updateFavicon(iconHref) {
  let iconLink = document.querySelector('link[rel="icon"]');

  if (!iconLink) {
    iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    document.head.appendChild(iconLink);
  }

  iconLink.type = 'image/svg+xml';
  iconLink.href = `${import.meta.env.BASE_URL}${iconHref}`;
}

function getTotalPages() {
  return 46;
}

function getPageNumber(route, fallbackPageNumber) {
  if (route.path === paths.emergencyHelp) {
    return 'N/A';
  }

  if (route.path === paths.assessmentFollowUp) {
    return '17';
  }

  return route.pageNumber || fallbackPageNumber;
}

function isInnerForumLightToggleRoute(pathname) {
  return (
    pathname === paths.innerForumRules ||
    pathname === paths.innerForumThanksSleep ||
    pathname === paths.innerForumPlantingCeremonyReply
  );
}

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
  const totalPages = getTotalPages();
  const [innerForumLightsOn, setInnerForumLightsOn] = useState(() =>
    getStoredInnerForumLights(location.pathname)
  );

  useEffect(() => {
    if (!isInnerForumLightToggleRoute(location.pathname)) {
      return undefined;
    }

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
    const siteProfile = getSiteProfile(location.pathname);
    document.title = siteProfile.title;
    updateFavicon(siteProfile.icon);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/start-game" element={<StartGame />} />
        <Route
          path="/404-page-not-found"
          element={<InternalForumGhostCache showGame={false} copy={ordinaryNotFoundCopy} />}
        />
        <Route path={paths.mingchuanSearch} element={<MingchuanNewsSearch />} />
        <Route path={paths.dongyangSearch} element={<DongyangOldStoriesSearch />} />
        {pageRoutes.map((route, index) => {
          const PageComponent = route.component;
          const fallbackPageNumber = String(index + 1).padStart(2, '0');
          const pageNumber = getPageNumber(route, fallbackPageNumber);
          const bannerTotal = route.path === paths.emergencyHelp ? 'N/A' : totalPages;
          const bannerTheme =
            isInnerForumLightToggleRoute(location.pathname) &&
            (route.progressTheme === 'innerDark' || route.progressTheme === 'innerLight')
              ? innerForumLightsOn
                ? 'innerLight'
                : 'innerDark'
              : route.progressTheme || 'dark';

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
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
              }
            />
          );
        })}
        <Route path="/p/:postId" element={<PostDetail />} />
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
