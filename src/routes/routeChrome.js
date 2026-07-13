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
