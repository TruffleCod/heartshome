import MingchuanNewsArticle from '../components/MingchuanNewsArticle';

const paragraphs = [
  '近日，在第九届全国大学生心理健康研究论坛中，明川大学心理学系2012级学生陈霁凭借课题《正念训练对长期失眠与焦虑状态的干预作用》获得一等奖。',
  '据了解，本届论坛由中国心理卫生协会高校心理专业委员会主办，共收到来自全国多所高校的学生研究论文百余篇。陈霁的研究主要围绕“高压环境下青年群体的长期情绪紧张状态”展开，重点关注失眠、反复警觉与持续性焦虑等问题。',
  '评审专家认为，该课题在高校学生心理支持实践方面具有较强现实意义。',
  '陈霁在接受采访时表示，希望未来能继续从事与情绪疏导、正念减压相关的研究与实践工作，“帮助更多长期处于压力中的人，重新获得稳定和休息的能力”。',
];

export default function NewsChenJiAward() {
  return (
    <MingchuanNewsArticle
      category="教育"
      title="明川大学在校生获全国大学生心理健康研究论坛一等奖"
      date="2014-11-12"
      paragraphs={paragraphs}
      figure={{
        src: '/images/news/chenji.png',
        alt: '陈霁在领奖典礼现场',
        caption: '陈霁在2014年全国大学生心理健康研究论坛领奖典礼现场。图源：明川新闻网',
      }}
    />
  );
}
