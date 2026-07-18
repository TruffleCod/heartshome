import DongyangArchivePost from './DongyangArchivePost';

const sections = [
  {
    heading: '原文整理',
    lines: [
      '……又东三百里；有山曰嗟灵，其上多赤铜，其下多瘿木……有兽焉，其状如麟而黑，人目在肋，声如磬折。其角有二，一左……一右直如朽骨……是兽也，本独角而直，食邪佞……自残……',
      '见则其邑有冤狱……冤狱起，则人相告讦，或闻铁链曳地声，不出三日，必有割心之事。见之者癫。',
      '古之獬豸，独角，能触邪辨奸，为廷狱所奉；此兽则异名曰双角獬……凡心怀怨憎、羞愧、妒恨、恶念者……近之则如醉如魔，涕泪俱下，不可自制。将平生不敢言之事尽数吐露……',
      '',
      <strong>编者注：本手抄本因保存条件较差，其中省略号处，文字多有缺损，请研究者自行辨别。</strong>,
    ],
  },
];

export default function HiddenNameRecord() {
  return (
    <DongyangArchivePost
      title="幽名别录"
      time="资料页存档"
      note="手抄本扫描件，以下文字按可辨识部分整理。"
      images={[
        { src: '/images/幽名别录.jpg', alt: '幽名别录 残卷扫描' },
      ]}
      sections={sections}
    />
  );
}
