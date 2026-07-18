import DongyangArchivePost from './DongyangArchivePost';

const sections = [
  {
    heading: '原文整理',
    lines: [
      '明川水出县西北诸山，初名赤溪，至清川桥下汇诸涧，水色渐澄，始称明川。',
      '其流绕旧城而东，过东津口入大江。水道平缓，夏秋多雾，春冬少冰。县西多山，石脉横伏，雨后易生浊流。旧有樵径、茶道、采石道数条，今多湮没。',
      '县西三十里外，旧图标有“辨心壑”。两山相夹，地势幽窄，水声伏于石下，晴日亦少见阳光。旧时樵夫、采药人多绕行其地。民间则如血纹须数里方散。（后文字不详）',
    ],
  },
];

export default function MingchuanWaterwaysAddendum() {
  return (
    <DongyangArchivePost
      title="明川水经补遗"
      time="资料页存档"
      note="原件由明川大学文学部整理提供"
      images={[
        { src: '/images/明川水经补遗1.jpg', alt: '明川水经补遗 残页' },
        { src: '/images/明川水经补遗2.jpg', alt: '明川水经补遗 地图' },
      ]}
      sections={sections}
    />
  );
}
