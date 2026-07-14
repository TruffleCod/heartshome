const siteProfiles = {
  heartHome: {
    title: '\u5fc3\u4e4b\u5bb6',
    icon: 'favicon-heart-home.svg',
  },
  mingchuanNews: {
    title: '\u660e\u5ddd\u65b0\u95fb\u7f51',
    icon: 'favicon-mingchuan-news.svg',
  },
  dongyangBlog: {
    title: '\u4e1c\u9633\u65e7\u4e8b\u535a\u5ba2',
    icon: 'favicon-dongyang-blog.svg',
  },
  blackFlower: {
    title: '\u5fc3\u4e4b\u5bb6',
    icon: 'favicon-black-flower.svg',
  },
};

const mingchuanNewsSlugs = new Set([
  'ab6f90d2c4',
  'd4c1e8a07f',
  '2ad87e50c9',
  '9fe021c7ad',
  '3cf0b79a12',
  '50a8f6c3d1',
  'c8f09a3e61',
  'f0d4c8a2b9',
  '86f1c4b0ed',
  '44d2ae09f6',
]);

const dongyangBlogSlugs = new Set([
  '71a6d0e2bf',
  'b4e9820fa1',
  '0c1f8a6d94',
  'e6b0c3f91a',
  '1fd9a0c7e4',
  'a0c8e37b5f',
  'c49e1a0f72',
  '7f2da90b31',
  'ed31c8b047',
  '4b0e72f6a9',
  '9c73ae0d6b',
  'd8b3f2a6c0',
]);

const blackFlowerSlugs = new Set([
  'e08c72fa9d',
  '6c9f02a7bd',
  'd7e40a1c9b',
  'a19de704c6',
]);

export function getSiteKeyForPathname(pathname) {
  if (pathname.endsWith('/news/search')) {
    return 'mingchuanNews';
  }

  if (pathname.endsWith('/p/71a6d0e2bf/search')) {
    return 'dongyangBlog';
  }

  const pageSlug = pathname.match(/\/p\/([^/]+)/)?.[1];

  if (mingchuanNewsSlugs.has(pageSlug)) {
    return 'mingchuanNews';
  }

  if (dongyangBlogSlugs.has(pageSlug)) {
    return 'dongyangBlog';
  }

  if (blackFlowerSlugs.has(pageSlug)) {
    return 'blackFlower';
  }

  return 'heartHome';
}

export function updateFavicon(iconHref) {
  let iconLink = document.querySelector('link[rel="icon"]');

  if (!iconLink) {
    iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    document.head.appendChild(iconLink);
  }

  iconLink.type = 'image/svg+xml';
  iconLink.href = `${import.meta.env.BASE_URL}${iconHref}`;
}

export function updateSiteChrome(site) {
  const siteProfile = siteProfiles[site] || siteProfiles.heartHome;
  document.title = siteProfile.title;
  updateFavicon(siteProfile.icon);
}

export function isInnerForumLightToggleRoute(pathname) {
  return (
    pathname === '/p/f2c96a10de' ||
    pathname === '/p/0b9e71d4ac' ||
    pathname === '/p/5a1f90d7c3'
  );
}
