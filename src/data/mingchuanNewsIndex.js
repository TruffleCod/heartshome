export const mingchuanNewsIndex = [
  {
    id: 'heart-home-five-years',
    path: '/p/86f1c4b0ed',
    title: '从“危机干预”到长期陪伴：心理服务平台“心之家”上线十周年',
    date: '2026-01-30',
    category: '教育',
    source: '明川新闻网',
    summary:
      '青少年情绪障碍、校园关系压力及家庭沟通问题持续受到社会关注。',
    keywords: ['顾正清', '心之家心理服务平台'],
  },
  {
    id: 'missing-girl-search',
    path: '/p/44d2ae09f6',
    title: '17岁女生离家后失联已超两周，警方仍在持续搜寻',
    date: '2026-05-28',
    category: '社会',
    source: '明川新闻网',
    summary:
      '高二女生失联事件引发社会持续关注，警方就搜寻进展和相关情况作出回应。',
    keywords: ['明川市第三中学'],
  },
  {
    id: 'mingchuan-third-middle-missing-girls',
    path: '/p/9fe021c7ad',
    title: '明川三中接连发生女生失踪事件 警方已介入调查',
    date: '2005-05-22',
    category: '社会',
    source: '明川新闻网',
    summary:
      '警方征集线索中，校方提示青少年心理健康问题需要社会共同关注。',
    keywords: ['顾正清', '李宏宇', '明川市第三中学'],
  },
  {
    id: 'abandoned-building-collapse',
    path: '/p/2ad87e50c9',
    title: '明川市郊废弃建筑坍塌　一学生被困后获救',
    date: '2005-03-05',
    category: '社会',
    source: '明川新闻网',
    summary:
      '西郊废弃建筑局部坍塌，事故原因警方排查中。',
    keywords: ['李宏宇'],
  },
  {
    id: 'li-hongyu-obituary',
    path: '/p/c8f09a3e61',
    title: '沉痛悼念李宏宇同志',
    date: '2016-04-23',
    category: '社会',
    source: '明川新闻网',
    summary:
      '悼念我们的好伙伴，前《明川晚报》记者、“东阳旧事”博客作者李宏宇不幸逝世。',
    keywords: ['李宏宇'],
  },
  {
    id: 'top-scorer-mingchuan-third-middle',
    path: '/p/f0d4c8a2b9',
    title: '2022年文科高考状元花落明川三中',
    date: '2022-06-25',
    category: '教育',
    source: '明川新闻网',
    summary:
      '总分712分获明川市文科第一名，明川市第三中学整体高考成绩再创新高。',
    keywords: ['叶诗隐'],
  },
  {
    id: 'chen-ji-award',
    path: '/p/50a8f6c3d1',
    title: '明川大学在校生获全国大学生心理健康研究论坛一等奖',
    date: '2014-11-12',
    category: '教育',
    source: '明川新闻网',
    summary:
      '心理学系学生陈霁凭借关于正念训练与长期失眠、焦虑状态的研究课题获得一等奖。',
    keywords: ['陈霁', '明川大学'],
  },
  {
    id: 'mingchuan-university-archives',
    path: '/p/3cf0b79a12',
    title: '明川大学启动地方文献整理工程　多批旧志残卷首次公开',
    date: '2014-09-26',
    category: '教育',
    source: '明川新闻网',
    summary:
      '明川大学启动地方文献整理工程，首次对外公开一批地方志、碑刻拓片与残卷资料。',
    keywords: ['明川大学'],
  },
  {
    id: 'liu-xinyi-bubble-hall',
    path: '/p/d4c1e8a07f',
    title: '《泡泡堂》大赛爆冷：冠军家族族长竟是高中女生',
    date: '2004-12-24',
    category: '社会',
    source: '明川新闻网',
    summary:
      '明川市首届《泡泡堂》英雄大会总冠军出炉，引发玩家热议。',
    keywords: ['刘欣怡'],
  },
  {
    id: 'wang-jing-young-writer',
    path: '/p/ab6f90d2c4',
    title: '15岁出书3本！明川才女王静：父亲是我的第一任“编辑”',
    date: '2004-11-18',
    category: '教育',
    source: '明川新闻网',
    summary:
      '天赋与努力共同浇灌，15岁明星小作家与父亲的写作故事引发社会关注。',
    keywords: ['王静', '王振国'],
  },
];

function normalizeKeyword(value) {
  return value.replace(/\s+/g, '').trim().toLowerCase();
}

export function searchMingchuanNews(keyword) {
  const normalized = normalizeKeyword(keyword);

  if (!normalized) {
    return [];
  }

  return mingchuanNewsIndex.filter((item) =>
    item.keywords
      .filter(Boolean)
      .map((value) => normalizeKeyword(value))
      .some((value) => value === normalized)
  );
}
