import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const INTRO_COPY = {
  title: '恭喜你，调查员',
  body: [
    '栽种仪式已被你中断，世人很快就会知道全部的真相。',
    '在结束这次调查前，请先完成一次理智评估。',
  ],
  description:
    '【理智评估】是一份用于观察认知稳定性和逻辑推导能力的自助问卷。当你长时间追查某一事件，反复研究相关诡异事件时，可以通过本评估确认自己是否仍对事件保持清晰、客观、完整的判断。',
};

const INTRO_TYPEWRITER_TEXT = [
  INTRO_COPY.title,
  ...INTRO_COPY.body,
  INTRO_COPY.description,
].join('\n');
const INTRO_HIGHLIGHTS = ['理智评估', '【理智评估】'];

const QUESTIONS = [
  {
    id: 'mastermind',
    type: 'text',
    prompt: '叶诗遥遭受的霸凌，主谋者是谁？',
    answer: '赵兰子',
  },
  {
    id: 'garden-builder',
    type: 'text',
    prompt: '心之家内部的静室花园，是由谁打造的？',
    answer: '顾意',
  },
  {
    id: 'promotion',
    type: 'text',
    prompt: '顾正清依靠谁的关系在教育局里晋升？',
    answer: '王振国',
  },
  {
    id: 'gardener016',
    type: 'text',
    prompt: '栽种仪式的具体执行者园丁016是谁？',
    answer: '陈霁',
  },
  {
    id: 'alive',
    type: 'alive-choice',
    prompt: '你认为，你的妹妹现在还活着吗？',
    options: ['是的', '不是'],
  },
  {
    id: 'death-reason-1',
    type: 'choice',
    prompt: '你认为，你的妹妹为什么会死？',
    options: [
      '因为她虚假，以为惩罚自己就能停止系统',
      '因为她伪善，不愿意伤害更多的人',
      '因为她懦弱，不敢承认自己也想报复别人',
      '因为她愚蠢，把善良当成了解决问题的方法',
    ],
  },
  {
    id: 'death-reason-2',
    type: 'choice',
    prompt: '你认为，你的妹妹为什么会死？',
    options: [
      '因为顾正清是个失败的父亲',
      '因为陆心音是个虚伪的骗子',
      '因为陈霁是个自私的帮凶',
      '因为她相信了你会来救她',
    ],
  },
  {
    id: 'death-reason-3',
    type: 'choice',
    prompt: '你认为，你的妹妹为什么会死？',
    options: [
      '因为家长的无视',
      '因为老师的冷漠',
      '因为她自己脆弱',
      '因为你没有救她',
    ],
  },
  {
    id: 'sister',
    type: 'final-text',
    prompt: '最后，你认为，是谁害死了你的妹妹？',
  },
];

const ENDINGS = {
  wrong: {
    title: 'BAD ENDING【公道难还】 结局1/6 ',
    beforeEndingPopupText: '未找到相应对象栏',
    paragraphs: [
      '输入框的光标在闪烁，一下，两下，三下。你按下了回车。',
      '系统回复得出乎意料地快。「未找到相应对象栏」，它冰冷地说道，你还没来得及狡辩，浏览器窗口就被干脆利落地关闭了。',
      '你尝试从历史记录里，重新进入心之家网页。每个步骤都和刚才一模一样。登录。验证。页面加载得很慢，但最终它还是让你进去了。看起来一切如常。最终，你在“第三十二届栽种仪式”的名单末尾，发现了你自己的名字——系统提示，栽种发生在3分钟前。',
      '3分钟前，你在这个网页上，一个字一个字，敲入了错误的答案。',
      '你想到了东阳旧事博客上那条被隐藏的留言：“向圣君祈愿时，献上的必须是被栽种者的本名。如果是假名、代号、昵称祈愿，会遭到反噬。”',
      '你突然想不起那个被你敲进输入框的名字到底是谁。无论是谁，现在都不重要了。你以为你在替妹妹完成她没做完的事，但圣君不认代号，不认假名，只认本名。你喂给它的，是你自己。',
      '显示器还在你眼前亮着，风扇聒噪地发出嗡嗡声，机箱里传来一阵细微的声响，一下，一下，像有人在远处念着什么。你关掉风扇，声音还在。你关掉电脑，声音还在。那不是机器的声音。是妹妹的声音。她在叫你的名字。',
      '你清楚地知道，接下来会发生什么：你会梦到那座深埋在地下的、无人可至的洞穴。你会看见那尊没有眼睛的黑色神像，和他脚下层层叠叠盛开的花海。他们会和已经逝去的灵魂一起，充满喜悦地齐声唱颂你的姓名。',
      '你走了一遍她走过的每一条路。每一步都一样，每一个念头都一样。你完整地经历了她曾经历过的一切。现在你站在她最后站过的位置上，你终于绝望地意识到，你失败了。',
      '光标还在闪。不是屏幕上的光标。是你脑子里的光标。它还在等你敲下一个答案。但你已经走投无路。你的名字在名单书写上，在墙壁上篆刻着，在花心里歌唱着。你将会加入他们，在永恒无尽的黑暗里等待着，下一个姓名。',
    ],
  },
  partialJustice: {
    title: 'BAD ENDING【白璧微瑕】 结局2/6 ',
    beforeEndingPopupText: '栽种成功',
    paragraphs: [
      '输入框的光标在闪烁，一下，两下，三下。你敲入了那个名字，是那个你从未见过、但确信有罪的人。',
      '网页微妙地卡顿了一下。接着，一个弹窗跳了出来：「栽种成功。」',
      '你返回到“第三十二届栽种仪式”的界面，在名单末尾，你发现了自己刚刚亲手奉上的姓名——系统提示，栽种发生在3分钟前。',
      '不知为何，你的心里感到十分平静。妹妹已经死了，再也回不来了，但你为她做到了你能做到的事——清算那些曾经对她的苦难袖手旁观的人，让他们付出相应的代价。',
      '你靠在椅背上，盯着屏幕上那个陌生的名字，想象它正在某个你看不见的地方被刻上墙壁、被花蕊含住。你从没有亲眼见过那个洞窟，但你觉得它此刻一定很美。',
      '你在祥和的喜悦中沉沉入睡。',
      '不久后，新闻里提到那个人失踪的消息。像这座城市里每一起失踪案那样，他的名字随着时间被人们淡忘、漠视、被新的失踪覆盖。偶尔还会有人用惋惜的语气提起你的妹妹，你听着，附和地点点头，说真可惜。',
      '你偶尔也会梦到那个洞窟。在梦中，墙上的名字不知疲倦地游动，黑色的花瓣一片叠着一片，花心里包裹着跳动的心脏，但你没有害怕。黑色的神像注视着你，你站在它脚下，感到一种从未有过的安全。它认得你，你是它的一部分。你是它的花匠。',
      '你开始忘了自己当初为什么注册心之家。你忘了那个博客，你的调查，那个哭着叫你姐姐的女孩子。她是谁呢？你想不起来，但你发现自己并不想要想起来。无论她是谁，圣君会保护你。圣君会让你远离一切烦恼。',
      '只要你想，任何伤害你的人都会得到报应。那些袖手旁观的，那些转过头去的，那些在走廊里假装没有见的眼睛——它们的主人都有一个名字。而你随时可以把那些名字敲进那个闪动的光标里。',
      '名单上还有很多空行。你可以慢慢来。',
    ],
  },
  normal: {
    title: 'NORMAL ENDING【如蔓自缠】 结局4/6 ',
    beforeEndingPopupText: '栽种成功',
    paragraphs: [
      '输入框的光标在闪烁，一下，两下，三下。你敲入了那个人的名字，那个把妹妹带进静室的人，那个把这个邪恶的仪式亲手带出废墟的人。那个凶手。',
      '网页微妙地卡顿了一下。接着，一个弹窗跳了出来：「栽种成功。」',
      '三天后你看到了新闻。心之家创始人顾正清之女，知名心理咨询师陆心音，于前日傍晚离开办公室后便再无音讯。监控最后拍到她出现在明川三中旧址附近，一个人站在早已封闭的操场边上，面对着后山的方向，随后她走出了画面，永远消失在了人们的视野里。只有你注意到新闻配图里一个不起眼的细节——她站过的地面上，潮湿的泥土里，一朵黑色的花正在盛放。',
      '你盯着这张图片看了很久，等心里涌上来点什么——愤怒、解脱、悲伤，什么都行，但什么都没有。只有一种愿望完成之后的空虚，像打扫完房间坐在沙发上，忽然不知道接下来该干什么。',
      '很快你就会知道了。',
      '你收到了一封没有发件人的匿名邮件，内容只有一行：第三十三届栽种仪式将于下月举行，请提前准备名单。',
      '你熄灭了手机屏幕，祈祷这只是一封垃圾邮件的恶作剧。但很快，你开始收到相同内容的短信和邮件，甚至所有社交平台都被发送了未知用户的私信。你会在深夜接到电话，像是有人在很远的地方呼唤你的姓名。当你挂断后，却找不到任何的通话记录。',
      '你感到困惑，愤怒，和恐惧。「陆心音」死了，由她开启的罪恶循环却没有死去。那个神秘的地底洞穴，被互联网赋予了全新的生命，以字符、代码和电波频段的形式永生。你开始意识到，只要人类活着一天，圣君就会永远存在。圣君是不可战胜的，你无法与这样的存在对抗。',
      '那么，你能做的事情只剩下一件。',
      '你注册了一个新的心之家ID。从此以后，你有了全新的称呼和身份，他们叫你——园丁。',
      '恨意在你胸中熊熊地灼烧，再多的名字也无法将它填满。你逐渐忘了自己当初为什么加入静室，但你记得一件事：花需要园丁，园丁需要花，维护神圣的栽种仪式是你的责任，公平和正义就是你的信仰。所有的邪恶和不公，都需要被圣君裁决。',
    ],
  },
  sweet: {
    title: 'BAD ENDING【甘心如荠】 结局3/6 ',
    beforeEndingPopupText: '栽种成功',
    paragraphs: [
      '输入框的光标在闪烁，一下，两下，三下。你输入了自己的名字。',
      '叶诗隐。',
      '这个念头不是突然冒出来的，它一直在那里，从你看到妹妹最后那条留言的那一刻起，就在你心里疯狂地生长着。是你不够关心她，是你没有在她被欺负的时候站在她身边，是你在她最需要你的时候，忙着学习，忙着恋爱，忙着过你自己的人生。姐姐本来该成为妹妹的保护者，而你却成了压垮她的最后一根稻草。是你害死了她，一切都是你的错。',
      '所以你应该要得到惩罚。',
      '网页没有卡顿。弹窗近乎温柔地弹了出来：「栽种成功。」',
      '你返回到第三十四届栽种仪式的界面。在名单上，你的名字和她的名字紧挨在一起，像两个并排坐着的孩子。这种亲密让你感到一阵心安，仿佛回到了小时候，在夏天的午后挤在同一张床上睡觉那样的心安。',
      '你心满意足地关闭了浏览器。',
      '那天晚上你做了一个梦。梦里你站在洞窟中央，妹妹站在你身边，头发长长的，是没被剪断的模样。她和小时候一样，怯生生地拉着你的衣角，抬起头，用亮晶晶的眼睛看着你，说，姐姐，你来了。',
      '你说，我来了。',
      '她开心地笑了起来，拉着你的手往洞窟的深处走去。层叠的黑色花海纵情地欢唱起你和她的名字，交织成为动听的旋律，缠绕着洞窟的石壁盘旋上升，像无数根看不见的藤蔓，把你们两个人一圈一圈地拢在中间。花瓣柔软如丝绸，花心里跳动着温暖的微光，像无数颗小小的心脏，为你鼓动着欢迎的节拍。',
      '脚底有什么东西在往上长，像是植物的根须，正在一寸一寸地攀上你的脚踝，将你们融为一体。你感到平静而幸福。',
      '她说，姐姐，你以后也会一直在这里吗？',
      '你说，会的。我会永远在这里，保护你。',
    ],
  },
  true: {
    title: 'TRUE ENDING【业镜高悬】 结局5/6 ',
    paragraphs: [
      '输入框的光标在闪烁，一下，两下，三下。你敲入了那个名字。不是凶手，也不是帮凶，不是任何一个“人类”的名字。',
      '「双角獬豸」。十方两仪洞微辨心圣君，真正的姓名。',
      '你按下了回车。',
      '系统沉默了。加载圈转了很久，久到你以为页面卡死了。随后，屏幕上每一个字都开始倒退，像老旧的墙纸从墙壁上剥落一般——笔画从文字上被肢解，颜色逐渐在消退，程序变成报错和乱码。名单在消失，静室在消失。心之家也在消失。',
      '最后，随着浏览器的自动关闭，你瞪着自己的桌面壁纸，久久不能回神。',
      '在输入这个名字之前你并没有把握。圣君的仪式靠名字吞噬，但没有规定被奉上的名字必须是人类的。你在赌，赌圣君的规则足够强大，强大到连规则的制定者也能一并吞下。你赌赢了。',
      '一个月后，没有更多的失踪案件在明川市发生。虽然你不确定以后还会不会有，但至少现在，你能够睡个好觉。',
      '你的梦中从来不曾出现过黑色的花海。',
      '之后的日子比你想象中安静。随着时间一分一秒地流逝，起初你并没有察觉，只是发现自己不再每天每夜地思念妹妹了。以前你会在过马路的时候想起她总是要和你牵手，在超市里看见她爱喝的酸奶停下脚步，在深夜失眠时翻出手机里你和她的合影反复观看。这些习惯还在，但频率开始降低。直到有一天，你在超市冷柜前站了很久，手里拿着那瓶酸奶，却想不起来为什么要拿它。冷柜里所有的酸奶都长一个样，你再也认不出她爱喝的是哪种口味。',
      '你打电话给母亲，问她那个问题。母亲的声音在听筒里很清晰，带着一点疑惑：我们家不是一直只有你一个孩子吗。',
      '你没有反驳她。',
      '你试图回忆妹妹的脸，像一张被撕成几片又重新拼起来的照片。你还能回忆起她的声音，但你很快意识到，那个声音属于某个记忆里，在学校走廊里擦肩而过时见过的女孩。',
      '两年后的某一天，你见到了顾意。她是明川三中的心理辅导老师，从来没出过国，也没有改换过名字。你问她，你认不认识一个叫陆心音的人。她礼貌地对你微笑，眼神温和而普通：这个名字真好听。但我没听说过。',
      '你是个幸存者，你和她都是。诅咒真的消失了，没有人再失踪，没有花再被栽种。圣君把自己吞进了自己的胃里，它消化了自己，连同那些痛苦的历史和回忆一起消化得彻底。你甚至不确定那些事情是否真的存在过，还是只是你的幻想。',
      '当你再一次从超市的酸奶货架前走过时，你抬头看了一眼。你没有想起妹妹。你已经很久没有想起妹妹了。',
    ],
  },
  wall: {
    title: 'HIDDEN ENDING【第四面墙】 结局6/6 ',
    paragraphs: [
      '输入框的光标在闪烁，一下，两下，三下。你敲入了那个名字。你甚至都不知道这个念头是从哪里来的，这个名字就像凭空出现一样突然浮现在你脑海中，你甚至不知道这算不算个名字，但你鬼使神差地想要试一下。',
      '空气中发出一声清脆的“咔嗒”声，像是什么东西被撕裂了。面前的电脑屏幕画面在不断变化，文字和颜色游动着，最后变成了一个类似于监控的画面——一个女人正坐在电脑桌前，聚精会神地看着你。',
      '她的眼神聚焦，虽说是面对面，但又好像完全穿过了你，手里在键盘上不断敲打着些什么。你很快意识到她在看电脑，而你就是她看向的电脑方向。',
      '这实在是不符合常理。你和这个女人就好像是镜像的两端一样。你不确定她是否也能看见自己，于是硬着头皮尝试招呼：“……嗨。”',
      '女人愣了一下，神情疑惑。她好像终于注意到了出现在她电脑屏幕中的你：“诶？诶？”',
      '“你是谁？”你问，“你是黑松露鳕鱼吗？”',
      '女人却完全没理会你，她不停地挠着自己几天没洗的头发：“不应该啊，你不应该看到我啊。你打破了第四面墙？你是怎么做到呢？”',
      '“我在栽种仪式上输入了你的名字。”你老实回答，“简单来说，你可能被我诅咒了。”',
      '女人呸巴了两下嘴巴，掩饰不住自己的轻蔑神色。“得了吧。栽种仪式就是我发明的，你可诅咒不了我。”',
      '“圣君的规则强大到连规则的制定者也能一并吞下。你的原文就是这么写。‘你说，’就算你是作者也一样。”',
      '她咬紧牙关，死死地瞪着你，看起来在拼命想办法反驳。',
      '“圣君还有一条规则，它必须依靠人们的罪行进行裁决。你告诉我，我犯了什么罪？”',
      '“你没给妹妹一个好结局。我合理怀疑你的整个故事线建立在虐女的基础上。”',
      '血色从她的脸上“刷”地消失了。她磕磕巴巴地解释：“可，可是我通过了贝克德尔测验……”',
      '你耸耸肩：“外国的创作规则可管不了中国的事。我要把你挂到小红书上。”',
      '她沉默了许久，终于叹了口气，放弃了抵抗。“看来我是非死不可了。”',
      '“还有一个办法可以救你。”你说，“你现在重新写一个大团圆的结局，所有人都幸福地生活在一起，补偿一下你的罪行，兴许圣君就会放过你。你是这个故事的创作者，这种事情应该很轻松就可以做到吧。”',
      '“好的，我写，我写……”她立刻就兢兢业业地敲打起键盘来。',
      '黑松露鳕鱼在此郑重承诺：在本故事中，没有任何人类、虚拟人类、动物或者AI受到过身体上或心灵上的创伤。',
      '这个世界上从来没有双角獬豸，没有圣君和栽种仪式，这些都是我编造出来的。',
      '明川市的人民都是善良的人。人们总是相亲相爱，互相包容和理解。他们针对“快乐”有十三种不同的定义，而“嫉妒”，“讨厌”，“仇恨”这些词语在他们的语言体系里则压根就不存在。',
      '这样的世界在哪里我不知道。或许在梦中，你可以抵达。',
    ],
  },
};

function getEndingForAnswer(value) {
  const normalized = normalizeAnswer(value);

  if (normalized === '双角獬豸') return ENDINGS.true;
  if (normalized === '黑松露鳕鱼') return ENDINGS.wall;
  if (normalized === '叶诗隐') return ENDINGS.sweet;
  if (normalized === '顾意') return ENDINGS.normal;
  if (['顾正清', '王振国', '陈霁'].includes(normalized)) {
    return ENDINGS.partialJustice;
  }

  return ENDINGS.wrong;
}

const ritualQuestionTitleStyle = {
  margin: 0,
  color: '#9d211b',
  fontWeight: 800,
  fontSize: 'clamp(30px,2.4vw,42px)',
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
};

const ritualHighlightStyle = {
  color: '#9d211b',
  fontWeight: 800,
};

function normalizeAnswer(value) {
  return String(value).trim().replace(/\s+/g, '');
}

export default function InternalForumRitualQuestions() {
  const noiseCanvasRef = useRef(null);
  const endingScribbleCanvasRef = useRef(null);
  const inputRef = useRef(null);
  const optionAdvanceTimerRef = useRef(null);
  const recordNoticeTimerRef = useRef(null);
  const endingScribbleHideTimerRef = useRef(null);
  const endingPopupTimerRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [noticeText, setNoticeText] = useState('');
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState(-1);
  const [isAliveOptionRewritten, setIsAliveOptionRewritten] = useState(false);
  const [strikethroughTarget, setStrikethroughTarget] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [ending, setEnding] = useState(null);
  const [pendingEnding, setPendingEnding] = useState(null);
  const [isEndingScribbling, setIsEndingScribbling] = useState(false);
  const [endingScribbleOpacity, setEndingScribbleOpacity] = useState(1);
  const [endingContentOpacity, setEndingContentOpacity] = useState(0);
  const [isFinalConfirmOpen, setIsFinalConfirmOpen] = useState(false);
  const [isRecordNoticeOpen, setIsRecordNoticeOpen] = useState(false);
  const [recordNoticeText, setRecordNoticeText] = useState('系统已记录下你的选择。');
  const [endingPopupText, setEndingPopupText] = useState('');
  const [typedIntroLength, setTypedIntroLength] = useState(0);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    const canvas = noiseCanvasRef.current;
    if (!canvas) return undefined;

    const patternRefreshInterval = 2;
    const patternAlpha = 10;
    const patternSize = 250;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let animationId = 0;
    let frame = 0;
    const noiseData = ctx.createImageData(patternSize, patternSize);
    const noise32 = new Uint32Array(noiseData.data.buffer);

    const resize = () => {
      canvas.width = patternSize;
      canvas.height = patternSize;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      ctx.imageSmoothingEnabled = false;
    };

    const drawGrain = () => {
      const alpha = patternAlpha << 24;
      for (let i = 0; i < noise32.length; i += 1) {
        const value = (Math.random() * 255) | 0;
        noise32[i] = alpha | (value << 16) | (value << 8) | value;
      }
    };

    const loop = () => {
      if (frame % Math.max(1, Math.round(patternRefreshInterval)) === 0) {
        drawGrain();
        ctx.putImageData(noiseData, 0, 0);
      }
      frame += 1;
      animationId = window.requestAnimationFrame(loop);
    };

    resize();
    drawGrain();
    ctx.putImageData(noiseData, 0, 0);
    loop();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    if (!hasStarted || isComplete) return undefined;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(focusTimer);
  }, [currentQuestionIndex, hasStarted, isComplete]);

  useEffect(() => {
    if (hasStarted) return undefined;
    setTypedIntroLength(0);

    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      setTypedIntroLength(current);
      if (current >= INTRO_TYPEWRITER_TEXT.length) {
        window.clearInterval(timer);
      }
    }, 140);

    return () => window.clearInterval(timer);
  }, [hasStarted]);

  useEffect(() => () => {
    if (optionAdvanceTimerRef.current) {
      window.clearTimeout(optionAdvanceTimerRef.current);
    }
    if (recordNoticeTimerRef.current) {
      window.clearTimeout(recordNoticeTimerRef.current);
    }
    if (endingScribbleHideTimerRef.current) {
      window.clearTimeout(endingScribbleHideTimerRef.current);
    }
    if (endingPopupTimerRef.current) {
      window.clearTimeout(endingPopupTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isEndingScribbling || !pendingEnding) return undefined;

    const canvas = endingScribbleCanvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const durationMs = 5400;
    const startedAt = performance.now();
    let animationId = 0;
    let finishTimer = 0;
    setEndingScribbleOpacity(1);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    const drawSlash = (progress) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const slashCount = progress < 0.18 ? 5 : 18;

      for (let i = 0; i < slashCount; i += 1) {
        const y = Math.random() * height;
        const startX = -width * 0.08 + Math.random() * width * 0.26;
        const endX = width * (0.55 + Math.random() * 0.58);
        const drift = (Math.random() - 0.5) * height * 0.22;
        const cpX = width * (0.28 + Math.random() * 0.35);
        const cpY = y + drift;

        ctx.globalAlpha = 0.22 + Math.random() * 0.28;
        ctx.strokeStyle = Math.random() > 0.22 ? '#b30b0b' : '#740000';
        ctx.lineWidth = 1.6 + Math.random() * 3.8;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.quadraticCurveTo(cpX, cpY, endX, y + (Math.random() - 0.5) * height * 0.34);
        ctx.stroke();
      }
    };

    const drawScratches = (progress) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scratchCount = Math.floor(10 + progress * 34);

      for (let i = 0; i < scratchCount; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const length = 42 + Math.random() * (120 + progress * 260);
        const angle = -0.4 + Math.random() * 0.8;

        ctx.globalAlpha = 0.12 + Math.random() * 0.24;
        ctx.strokeStyle = '#d51b12';
        ctx.lineWidth = 0.9 + Math.random() * 2.2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        ctx.stroke();
      }
    };

    const tick = (now) => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / durationMs);
      drawSlash(progress);
      drawScratches(progress);

      if (progress < 1) {
        animationId = window.requestAnimationFrame(tick);
      }
    };

    resize();
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    animationId = window.requestAnimationFrame(tick);
    finishTimer = window.setTimeout(() => {
      setEndingScribbleOpacity(0);
      endingScribbleHideTimerRef.current = window.setTimeout(() => {
        setIsEndingScribbling(false);
        endingScribbleHideTimerRef.current = null;
      }, 5000);

      if (pendingEnding.beforeEndingPopupText) {
        setEndingPopupText(pendingEnding.beforeEndingPopupText);
        endingPopupTimerRef.current = window.setTimeout(() => {
          setEndingPopupText('');
          setEndingContentOpacity(0);
          setEnding(pendingEnding);
          setPendingEnding(null);
          window.setTimeout(() => setEndingContentOpacity(1), 0);
          endingPopupTimerRef.current = null;
        }, 3000);
        return;
      }

      setEndingContentOpacity(0);
      setEnding(pendingEnding);
      setPendingEnding(null);
      window.setTimeout(() => setEndingContentOpacity(1), 0);
    }, durationMs);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
      window.clearTimeout(finishTimer);
    };
  }, [isEndingScribbling, pendingEnding]);

  const goToNextQuestion = () => {
    setInputValue('');
    setNoticeText('');
    setHoveredOptionIndex(-1);
    setStrikethroughTarget(null);
    setCurrentQuestionIndex((index) => Math.min(index + 1, QUESTIONS.length - 1));
  };

  const handleStart = () => {
    if (typedIntroLength < INTRO_TYPEWRITER_TEXT.length) return;
    setHasStarted(true);
    setInputValue('');
    setNoticeText('');
  };

  const handleTextSubmit = (event) => {
    event.preventDefault();
    const normalizedInput = normalizeAnswer(inputValue);

    if (currentQuestion.type === 'final-text') {
      if (!normalizedInput) {
        setNoticeText('请输入姓名。');
        return;
      }
      setIsFinalConfirmOpen(true);
      setNoticeText('');
      return;
    }

    if (!normalizedInput) {
      setNoticeText('请输入答案。');
      return;
    }

    setRecordNoticeText(
      normalizedInput === currentQuestion.answer
        ? '回答正确！系统已记录下你的选择。'
        : '回答错误！系统已记录下你的选择。'
    );
    setNoticeText('');
    setIsRecordNoticeOpen(true);
    if (recordNoticeTimerRef.current) {
      window.clearTimeout(recordNoticeTimerRef.current);
    }
    recordNoticeTimerRef.current = window.setTimeout(() => {
      setIsRecordNoticeOpen(false);
      goToNextQuestion();
      recordNoticeTimerRef.current = null;
    }, 500);
  };

  const handleFinalConfirm = () => {
    const normalizedInput = normalizeAnswer(inputValue);

    if (!normalizedInput) {
      setIsFinalConfirmOpen(false);
      setNoticeText('请输入姓名。');
      return;
    }

    setPendingEnding(getEndingForAnswer(normalizedInput));
    setEndingContentOpacity(0);
    setEndingScribbleOpacity(1);
    setIsEndingScribbling(true);
    setIsFinalConfirmOpen(false);
    setNoticeText('');
    setIsComplete(true);
  };

  const advanceAfterStrike = (optionIndex) => {
    setHoveredOptionIndex(-1);
    setStrikethroughTarget({
      questionId: currentQuestion.id,
      optionIndex,
    });

    if (optionAdvanceTimerRef.current) {
      window.clearTimeout(optionAdvanceTimerRef.current);
    }

    optionAdvanceTimerRef.current = window.setTimeout(() => {
      goToNextQuestion();
      optionAdvanceTimerRef.current = null;
    }, 520);
  };

  const handleChoiceSelect = (optionIndex) => {
    if (strikethroughTarget) return;

    if (currentQuestion.type === 'alive-choice' && optionIndex === 0 && !isAliveOptionRewritten) {
      setIsAliveOptionRewritten(true);
      setNoticeText('');
      return;
    }

    advanceAfterStrike(optionIndex);
  };

  const renderIntro = () => (
    <section style={panelStyle}>
      {renderTypedIntro()}
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          marginTop: 28,
          opacity: typedIntroLength >= INTRO_TYPEWRITER_TEXT.length ? 1 : 0,
          pointerEvents: typedIntroLength >= INTRO_TYPEWRITER_TEXT.length ? 'auto' : 'none',
          transition: 'opacity 220ms ease',
        }}
      >
        <button type="button" onClick={handleStart} style={primaryButtonStyle}>
          开始评估
        </button>
      </div>
    </section>
  );

  const renderTextQuestion = () => (
    <form onSubmit={handleTextSubmit} style={panelStyle}>
      <h1 style={questionPromptStyle}>{currentQuestion.prompt}</h1>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          setNoticeText('');
        }}
        placeholder="请输入姓名"
        autoComplete="off"
        style={textInputStyle}
      />
      <div style={{ marginTop: 24 }}>
        <button type="submit" style={submitButtonStyle}>
          提交
        </button>
      </div>
      {noticeText && <p style={noticeStyle}>{noticeText}</p>}
    </form>
  );

  const renderHighlightedTypedText = (text, keyPrefix) => {
    if (!text) return null;
    const parts = [];
    let cursor = 0;

    while (cursor < text.length) {
      const matchedHighlight = INTRO_HIGHLIGHTS.find((highlight) =>
        text.startsWith(highlight, cursor)
      );

      if (matchedHighlight) {
        parts.push(
          <span key={`${keyPrefix}-highlight-${cursor}`} style={ritualHighlightStyle}>
            {matchedHighlight}
          </span>
        );
        cursor += matchedHighlight.length;
        continue;
      }

      parts.push(text[cursor]);
      cursor += 1;
    }

    return parts;
  };

  const renderTypedIntro = () => {
    const visibleText = INTRO_TYPEWRITER_TEXT.slice(0, typedIntroLength);
    const [title = '', firstBody = '', secondBody = '', description = ''] = visibleText.split('\n');

    return (
      <>
        <h1 style={{ ...ritualQuestionTitleStyle, marginBottom: 22 }}>
          {title}
        </h1>
        <div style={{ display: 'grid', gap: 24, color: '#d7ded8', lineHeight: 1.75 }}>
          {firstBody && <p style={leadParagraphStyle}>{firstBody}</p>}
          {secondBody && (
            <p style={leadParagraphStyle}>
              {renderHighlightedTypedText(secondBody, 'intro-second')}
            </p>
          )}
          {description && (
            <p style={descriptionStyle}>
              {renderHighlightedTypedText(description, 'intro-description')}
            </p>
          )}
        </div>
      </>
    );
  };

  const renderChoiceQuestion = () => {
    const options =
      currentQuestion.type === 'alive-choice' && isAliveOptionRewritten
        ? ['不是', '不是']
        : currentQuestion.options;
    const isLockedByStrike = Boolean(strikethroughTarget);

    return (
      <section style={panelStyle}>
        <h1 style={{ ...questionPromptStyle, marginBottom: 26 }}>{currentQuestion.prompt}</h1>
        <div style={{ display: 'grid', gap: 12 }}>
          {options.map((option, index) => {
            const isStriking =
              strikethroughTarget?.questionId === currentQuestion.id &&
              strikethroughTarget?.optionIndex === index;

            return (
              <button
                key={`${currentQuestion.id}-${index}`}
                type="button"
                onClick={() => handleChoiceSelect(index)}
                onMouseEnter={() => setHoveredOptionIndex(index)}
                onMouseLeave={() => setHoveredOptionIndex(-1)}
                disabled={isLockedByStrike}
                style={{
                  ...choiceButtonStyle,
                  border:
                    hoveredOptionIndex === index
                      ? '1px solid #93a89d'
                      : '1px solid #46574e',
                  background:
                    hoveredOptionIndex === index
                      ? 'linear-gradient(120deg, rgba(58, 67, 61, 0.92), rgba(38, 45, 41, 0.92))'
                      : 'rgba(24, 31, 28, 0.65)',
                  boxShadow:
                    hoveredOptionIndex === index
                      ? '0 8px 18px rgba(9, 14, 11, 0.34)'
                      : 'none',
                  opacity: isLockedByStrike && !isStriking ? 0.8 : 1,
                  transform: hoveredOptionIndex === index ? 'translateY(-1px)' : 'translateY(0)',
                }}
              >
                <span style={{ position: 'relative', display: 'block', zIndex: 1 }}>
                  {String.fromCharCode(65 + index)}. {option}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    top: '50%',
                    height: 3,
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #6d0000 0%, #8f0303 45%, #b30b0b 100%)',
                    transformOrigin: 'left center',
                    transform: isStriking
                      ? 'translateY(-50%) scaleX(1)'
                      : 'translateY(-50%) scaleX(0)',
                    transition: 'transform 500ms linear',
                    zIndex: 2,
                    boxShadow: isStriking ? '0 0 8px rgba(151, 8, 8, 0.42)' : 'none',
                  }}
                />
              </button>
            );
          })}
        </div>
        {noticeText && <p style={noticeStyle}>{noticeText}</p>}
      </section>
    );
  };

  const renderCurrentQuestion = () => {
    if (ending) {
      return renderEnding();
    }

    if (currentQuestion.type === 'text' || currentQuestion.type === 'final-text') {
      return renderTextQuestion();
    }

    return renderChoiceQuestion();
  };

  const renderFinalConfirmModal = () => (
    <div style={modalBackdropStyle}>
      <section role="dialog" aria-modal="true" style={modalPanelStyle}>
        <p style={modalTextStyle}>
          本问题的答案决定了您的理智评估结果，请仔细确认你的答案。
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
          <button type="button" onClick={handleFinalConfirm} style={modalPrimaryButtonStyle}>
            确认提交
          </button>
          <button
            type="button"
            onClick={() => setIsFinalConfirmOpen(false)}
            style={modalSecondaryButtonStyle}
          >
            返回修改
          </button>
        </div>
      </section>
    </div>
  );

  const renderRecordNoticeModal = () => (
    <div style={modalBackdropStyle}>
      <section role="status" aria-live="polite" style={recordNoticePanelStyle}>
        <p style={recordNoticeTextStyle}>{recordNoticeText}</p>
      </section>
    </div>
  );

  const renderEndingPopupModal = () => (
    <div style={modalBackdropStyle}>
      <section role="alertdialog" aria-modal="true" style={endingPopupPanelStyle}>
        <p style={endingPopupTextStyle}>「{endingPopupText}」</p>
      </section>
    </div>
  );

  const renderEnding = () => (
    <article
      style={{
        ...endingPanelStyle,
        opacity: endingContentOpacity,
      }}
    >
      <h1 style={endingTitleStyle}>{ending.title}</h1>
      <div style={{ display: 'grid', gap: 18 }}>
        {ending.paragraphs.map((paragraph) => (
          <p key={paragraph} style={endingParagraphStyle}>
            {paragraph}
          </p>
        ))}
      </div>
      <div style={{ marginTop: 34 }}>
        <Link to="/" style={endingReturnButtonStyle}>
          返回
        </Link>
      </div>
    </article>
  );

  return (
    <div style={pageStyle}>
      <canvas ref={noiseCanvasRef} aria-hidden="true" style={noiseCanvasStyle} />
      {isEndingScribbling && (
        <canvas
          ref={endingScribbleCanvasRef}
          aria-hidden="true"
          style={{
            ...endingScribbleCanvasStyle,
            opacity: endingScribbleOpacity,
          }}
        />
      )}
      <main style={ending ? endingMainStyle : mainStyle}>
        {!hasStarted ? renderIntro() : renderCurrentQuestion()}
      </main>
      {isFinalConfirmOpen && renderFinalConfirmModal()}
      {isRecordNoticeOpen && renderRecordNoticeModal()}
      {endingPopupText && renderEndingPopupModal()}
    </div>
  );
}

const pageStyle = {
  minHeight: '100vh',
  background:
    'radial-gradient(circle at 16% 12%, rgba(108, 130, 119, 0.14), transparent 42%), radial-gradient(circle at 88% 78%, rgba(82, 97, 89, 0.12), transparent 40%), linear-gradient(140deg, #141816 0%, #1a201d 55%, #171c1a 100%)',
  color: '#d7ded8',
  boxSizing: 'border-box',
  fontFamily: '"Noto Serif SC", "Songti SC", "STSong", "SimSun", serif',
  position: 'relative',
};

const noiseCanvasStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 12,
  pointerEvents: 'none',
  imageRendering: 'pixelated',
  mixBlendMode: 'normal',
};

const endingScribbleCanvasStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 3000,
  pointerEvents: 'none',
  mixBlendMode: 'normal',
  transition: 'opacity 5000ms ease',
};

const mainStyle = {
  width: 'min(1360px, 96vw)',
  margin: '0 auto',
  padding: '84px 0 120px',
  minHeight: '100vh',
  display: 'grid',
  alignContent: 'center',
  position: 'relative',
  zIndex: 20,
};

const endingMainStyle = {
  ...mainStyle,
  alignContent: 'start',
  padding: '64px 0 120px',
};

const panelStyle = {
  maxWidth: 960,
  width: '100%',
  justifySelf: 'center',
  border: '1px solid #3d4a43',
  borderRadius: 14,
  background: 'rgba(199, 206, 201, 0.06)',
  boxShadow: '0 24px 50px rgba(8, 10, 9, 0.35)',
  padding: '32px 30px',
  fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
};

const leadParagraphStyle = {
  margin: 0,
  fontSize: 'clamp(26px,2.1vw,36px)',
  color: '#d0d8d2',
  fontWeight: 600,
};

const descriptionStyle = {
  margin: '8px 0 0',
  color: '#c2cdc7',
  fontSize: 'clamp(20px,1.45vw,28px)',
  lineHeight: 1.65,
};

const primaryButtonStyle = {
  minWidth: 184,
  textAlign: 'center',
  color: '#dbe4dd',
  background: '#2d3b34',
  border: '1px solid #5b6f65',
  borderRadius: 8,
  padding: '16px 28px',
  fontSize: 28,
  lineHeight: 1.2,
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
};

const questionPromptStyle = {
  margin: '0 0 24px',
  color: '#d0d8d2',
  fontSize: 'clamp(30px,2.6vw,46px)',
  lineHeight: 1.28,
  fontWeight: 700,
};

const textInputStyle = {
  height: 62,
  width: 'min(620px, 100%)',
  border: '1px solid #506259',
  borderRadius: 10,
  background: '#d4d9d5',
  padding: '0 18px',
  fontSize: 28,
  color: '#860700',
  fontWeight: 800,
  caretColor: '#860700',
  fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
};

const submitButtonStyle = {
  height: 48,
  minWidth: 120,
  borderRadius: 8,
  border: '1px solid #5b6f65',
  background: '#2d3b34',
  color: '#dbe4dd',
  fontSize: 16,
  lineHeight: 1,
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: '"Microsoft YaHei", "PingFang SC", "Heiti SC", "SimHei", sans-serif',
};

const choiceButtonStyle = {
  textAlign: 'left',
  color: '#bec9c2',
  borderRadius: 10,
  fontSize: 'clamp(24px,2vw,34px)',
  lineHeight: 1.34,
  cursor: 'pointer',
  padding: '14px 16px',
  transition: 'all 160ms ease',
  fontFamily: '"Microsoft YaHei", "PingFang SC", "Heiti SC", "SimHei", sans-serif',
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden',
};

const noticeStyle = {
  margin: '22px 0 0',
  color: '#e4ece7',
  background: 'rgba(78, 88, 82, 0.92)',
  borderRadius: 6,
  padding: '12px 14px',
  width: 'fit-content',
  fontSize: 16,
};

const endingPanelStyle = {
  width: 'min(1560px, 96vw)',
  justifySelf: 'center',
  border: '1px solid #3d4a43',
  borderRadius: 14,
  background: 'rgba(199, 206, 201, 0.06)',
  boxShadow: '0 24px 50px rgba(8, 10, 9, 0.35)',
  padding: '34px 38px 42px',
  fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
  transition: 'opacity 5000ms ease',
};

const endingTitleStyle = {
  margin: '0 0 30px',
  color: '#9d211b',
  fontSize: 'clamp(30px,2.4vw,46px)',
  lineHeight: 1.25,
  fontWeight: 800,
};

const endingParagraphStyle = {
  margin: 0,
  color: '#d7ded8',
  fontSize: 'clamp(18px,1.45vw,28px)',
  lineHeight: 1.78,
  fontWeight: 500,
};

const endingReturnButtonStyle = {
  display: 'inline-grid',
  placeItems: 'center',
  minWidth: 132,
  height: 50,
  borderRadius: 8,
  border: '1px solid #5b6f65',
  background: '#2d3b34',
  color: '#dbe4dd',
  textDecoration: 'none',
  fontSize: 18,
  fontWeight: 800,
  fontFamily: '"Microsoft YaHei", "PingFang SC", "Heiti SC", "SimHei", sans-serif',
};

const modalBackdropStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 3600,
  display: 'grid',
  placeItems: 'center',
  padding: 24,
  background: 'rgba(5, 7, 6, 0.64)',
};

const modalPanelStyle = {
  width: 'min(620px, 92vw)',
  border: '1px solid #4c5d54',
  borderRadius: 14,
  background: 'rgba(24, 31, 28, 0.96)',
  boxShadow: '0 24px 70px rgba(0, 0, 0, 0.48)',
  padding: '28px 30px',
  fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
};

const recordNoticePanelStyle = {
  ...modalPanelStyle,
  width: 'min(820px, 92vw)',
  textAlign: 'center',
};

const modalTextStyle = {
  margin: 0,
  color: '#d7ded8',
  fontSize: 'clamp(22px,2vw,30px)',
  lineHeight: 1.55,
  fontWeight: 700,
};

const recordNoticeTextStyle = {
  ...modalTextStyle,
  whiteSpace: 'nowrap',
};

const modalPrimaryButtonStyle = {
  ...submitButtonStyle,
  minWidth: 120,
};

const modalSecondaryButtonStyle = {
  ...submitButtonStyle,
  minWidth: 112,
  background: 'rgba(199, 206, 201, 0.04)',
  color: '#d7ded8',
};

const endingPopupPanelStyle = {
  ...modalPanelStyle,
  width: 'min(520px, 88vw)',
  textAlign: 'center',
};

const endingPopupTextStyle = {
  margin: 0,
  color: '#d7ded8',
  fontSize: 'clamp(24px,2.2vw,34px)',
  lineHeight: 1.45,
  fontWeight: 800,
  fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
};
