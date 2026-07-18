import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../pages/PostDetail';

const HeartRoutes = lazy(() => import('./heartRoutes'));
const InnerForumRoutes = lazy(() => import('./innerForumRoutes'));
const BlackFlowerRoutes = lazy(() => import('./blackFlowerRoutes'));
const NewsRoutes = lazy(() => import('./newsRoutes'));
const DongyangRoutes = lazy(() => import('./dongyangRoutes'));

function hashSlug(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

const routeGroups = [
  {
    routeHashes: new Set([
      '166ajty', 'kz4l3w', '3m3kbr', 'ocny9l', '1a6ka1r', '1ihvpba', 'zk9zc8',
      'inv0o1', '4c53kr', '1v0mmxw', '10x3e5g', '1j4pfrj', '332le4',
      '14uw8lb', 'k2yuvc', '1v7ng81', '1exjq39', 'alwepc', 'jo4740',
      'syvncj',
    ]),
    Component: HeartRoutes,
  },
  {
    routeHashes: new Set(['s6p50m', '1upr67p', '1kqa8ae', '3ecusr']),
    Component: InnerForumRoutes,
  },
  {
    routeHashes: new Set(['s51xnw', '4sfg19', '1ozz6b9', 'ckweqv', '2mbzxl']),
    Component: BlackFlowerRoutes,
  },
  {
    routeHashes: new Set([
      '1ty2c8m', '1tan2rs', 'n23p1l', '5i3q9h', 'tz3bzj', '1htdhzs',
      'zcy5rf', '1amzk5q', '1p5z1h2', 'zhytg2',
    ]),
    Component: NewsRoutes,
  },
  {
    routeHashes: new Set([
      '1b8k6s1', 'ttdyt3', 'anyd0n', '1cctlx', 'suamyf', '1haxh7p',
      'moqtpx', '17t815q', 'um37tw', '8fo5mr', '1t3qeql', '16q4uaq',
      'otlb73', 'pv87ks', '1388eqx', 'n7by3x',
    ]),
    Component: DongyangRoutes,
  },
];

export default function PageRouteDispatcher({ innerForumLightsOn }) {
  const { pageSlug } = useParams();
  const pageSlugHash = hashSlug(pageSlug);
  const routeGroup = routeGroups.find((group) => group.routeHashes.has(pageSlugHash));

  if (!routeGroup) {
    return <PostDetail />;
  }

  const GroupComponent = routeGroup.Component;

  return (
    <Suspense fallback={null}>
      <GroupComponent pageSlug={pageSlug} innerForumLightsOn={innerForumLightsOn} />
    </Suspense>
  );
}
