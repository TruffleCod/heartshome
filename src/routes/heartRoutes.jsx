import DiseaseInfo from '../pages/DiseaseInfo';
import Forum from '../pages/Forum';
import ForumRulesPost from '../pages/ForumRulesPost';
import PostDetail from '../pages/PostDetail';
import Login from '../pages/Login';
import RecoverPassword from '../pages/RecoverPassword';
import Workspace from '../pages/Workspace';
import BuXiangWorkspace from '../pages/BuXiangWorkspace';
import CounselingRecords from '../pages/CounselingRecords';
import Assessment from '../pages/Assessment';
import AssessmentEasterEgg from '../pages/AssessmentEasterEgg';
import AssessmentFollowUp from '../pages/AssessmentFollowUp';
import InternalForum from '../pages/InternalForum';
import InternalForumBulliedHelpPost from '../pages/InternalForumBulliedHelpPost';
import EmergencyHelp from '../pages/EmergencyHelp';
import PageRouteFrame from './PageRouteFrame';

const routes = [
  { path: '/p/4d9e2b7a10', component: DiseaseInfo, pageNumber: '02' },
  { path: '/p/b12e8f40a6', component: Forum, pageNumber: '06' },
  { path: '/p/d3a90b7c2e', component: ForumRulesPost, pageNumber: '05' },
  { path: '/p/7c1e4a9f08', component: PostDetail, pageNumber: '07', props: { postId: 'holiday-flower' } },
  { path: '/p/2f8d6c0b91', component: PostDetail, pageNumber: '09', props: { postId: 'depression-memory' } },
  { path: '/p/8a04e6d3f2', component: PostDetail, pageNumber: '10', props: { postId: 'moral-kidnapping-rant' } },
  { path: '/p/91b7c2e0a4', component: PostDetail, pageNumber: '08', props: { postId: 'career-empty' } },
  { path: '/p/6e58c2b9a1', component: Login, pageNumber: '11' },
  { path: '/p/fa02d7c8e3', component: RecoverPassword, pageNumber: '12' },
  { path: '/p/1b9c60e4fa', component: Workspace, pageNumber: '13' },
  {
    path: '/p/82f4d90c31',
    component: BuXiangWorkspace,
    progressLabel: '彩蛋2/5',
    excludeFromProgressTotal: true,
  },
  { path: '/p/e47a92c0d1', component: CounselingRecords, pageNumber: '14', props: { recordCode: 'GDSYC-0428-CJ' } },
  { path: '/p/0f6b83d2a7', component: CounselingRecords, pageNumber: '15', props: { recordCode: 'GDSYC-0514-LXY' } },
  { path: '/p/c5a18f0e9d', component: CounselingRecords, pageNumber: '23', props: { recordCode: 'HJ338-0528-YD001' } },
  { path: '/p/c70a5e1d92', component: Assessment, pageNumber: '03' },
  {
    path: '/p/ef91b4c620',
    component: AssessmentEasterEgg,
    progressLabel: '彩蛋1/5',
    excludeFromProgressTotal: true,
  },
  { path: '/p/09a7dc3e51', component: AssessmentFollowUp, pageNumber: '16', progressTheme: 'charcoal' },
  { path: '/p/3e7b10a9c4', component: InternalForum, pageNumber: '17', progressTheme: 'innerLight' },
  { path: '/p/ad5f0c8b62', component: EmergencyHelp },
];

export default function HeartRoutes({ pageSlug, innerForumLightsOn }) {
  const route = routes.find((item) => item.path === `/p/${pageSlug}`);
  if (!route) return null;

  return <PageRouteFrame route={route} innerForumLightsOn={innerForumLightsOn} />;
}
