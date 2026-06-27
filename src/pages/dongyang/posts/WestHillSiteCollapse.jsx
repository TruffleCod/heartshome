import { DongyangOldStoriesLayout } from '../../DongyangOldStoriesBlog';
import { publicPath } from '../../../utils/publicPath';

const paragraphs = [
  '3月4日，雨',
  '我重新返回了清川公园，废庙坍塌的地方已经被警方围了起来，外面加上了“山体滑坡，请勿靠近”的警示。',
  '有几个穿着雨衣的人在附近小声交谈，我给他们买了两瓶水，抽了根烟，然后就打开了话口：他们说自己是市里请来的考古专家，来看看这片遗址有没有抢救性保护的价值。但初步从土壤和建筑的风格推断，这座废庙最多是民国年间建造的，而且多半是地方信仰，没什么特别大的研究价值。',
  '其中一个样貌年轻些的人补了一句：不过，夯土层的颜色不对，不排除地基下面叠着更早的东西。',
  '年长的考古专家顿了一下，不置可否地扫了他一眼，似乎在叫他不要多嘴。他看起来地位更高，或许正是那位年轻学者的导师：“现在还说不好。”',
  '我注意到他们从废墟里清出来的东西堆在一块油布上，几片碎瓦，半截看不出形状的木头，还有一块巴掌大的石板，上面似乎刻着什么。我蹲下去假装系鞋带看了一眼——那石板上的刻痕不像字，倒像是很多道指甲划出来的，密密地挤在一起。石板的边缘缝隙里夹着几瓣干透了的东西，暗红色，蜷成很小很小的团，像是花瓣。',
  '专家说，他们这两天会把还能抢救的文物想办法收集一下，至于其他的事，他们不管也不清楚。',
  '我看确实问不出再多的话来，就趁没人注意，偷偷溜进了警戒线。',
  '不知道是不是因为连日的降雨，仅仅两天过去，废墟看起来比我那天来更破了，像一堆被肢解的碎块，散发出一股湿腐味。除此之外，还有一股很淡很淡的，微妙的甜腻味。',
  '大部分建筑的结构都被泡烂了，我勉强找到了一片还算完整的泥墙，拨开上面的白灰和泥水，想验证一下我那天的记忆是否正确——',
  '果然，墙上刻满了好多好多的名字。',
  '甚甚至看得出来是不同时期刻的，有的地方纵横交错刻了好多层。全都是不同的笔迹。有些笔画浅而细，像是用指甲或什么尖东西硬划上去的；有些深得像凿子凿的，一道一道，边缘不太整齐，像是刻的时候手在抖。最上面那一层名字的刻痕还很新，新到白灰还没完全渗进去，雨水也没把它冲淡，像是最近才刻上去的，而那些刻痕特别深的地方，凹槽底部隐隐透出一种暗红色，像是干涸了很久的血迹。',
  '我伸手摸了一下那些名字，指尖触到刻痕的时候有一股暖意，彷佛这些石板是会呼吸的、活着的生物似的。',
  '再逗留更久可能会引起人的注意，我拍了两张照片没就退了出来，走时和考古专家们还打了个招呼。年轻的那位不小心和我对上了眼神，立刻躲闪开了。他的导师倒是很和善地朝我挥了挥手。',
  '这里一定还隐藏了更多秘密。',
  '虽然不知道考古是真是假，但这事倒是提醒了我：我突然想起来，明川大学一直在搜集本地的方志和民间古籍，负责人是我的大学同学。如果能托他帮忙，用明川市的旧地图和现在清川公园的位置做对比，或许就能找到更多关于这座废庙的信息。',
];

const investigationImages = [
  '/images/blog/xishanjiuzhi-1.jpg',
  '/images/blog/xishanjiuzhi-2.jpg',
  '/images/blog/xishanjiuzhi-3.jpg',
];

export default function WestHillSiteCollapse() {
  return (
    <DongyangOldStoriesLayout>
      <article className="dy-card">
        <div className="dy-card-body">
          <h1>关于西山旧址坍塌事件的调查</h1>
          <div className="dy-post-time">2005-03-04 22:17</div>
          <img
            className="dy-signature"
            src={publicPath('images/blog/lihongyu-sign.jpg')}
            alt="李宏宇签名"
          />
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="dy-investigation-photos">
            {investigationImages.map((image, index) => (
              <figure className="dy-investigation-photo" key={image}>
                <img src={publicPath(image)} alt={`西山旧址调查照片 ${index + 1}`} />
              </figure>
            ))}
          </div>
        </div>
      </article>
    </DongyangOldStoriesLayout>
  );
}
