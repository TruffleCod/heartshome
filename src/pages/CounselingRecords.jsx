import { useNavigate, useParams } from 'react-router-dom';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';

const RECORDS = {
  'GDSYC-0428-CJ': {
    title: '咨询记录：GDSYC-0428-CJ',
    consultant: '陈霁',
    datetime: '2026/04/21 21:00',
    type: '正念练习（回访）',
    summary: '会谈围绕睡眠焦虑与情绪波动展开，建议持续记录晚间触发事件并配合呼吸训练。',
  },
  'GDSYC-0514-LXY': {
    title: '咨询记录：GDSYC-0514-LXY',
    consultant: '陆心音',
    datetime: '2026/05/14 21:00',
    type: '线上文字咨询（临时）',
    summary: '咨询聚焦突发应激反应与安全感恢复，建议维持低刺激环境并按时进行回访。',
  },
  'HJ338-0528-YD001': {
    title: '咨询记录：HJ338-0528-YD001',
    consultant: 'HJ338',
    datetime: '2026/05/28 20:34',
    type: '临时咨询室（管理员确认）',
    summary: '该记录已转入封存区，当前仅保留基础索引信息。详细内容需二次授权后查阅。',
  },
};

export default function CounselingRecords({ recordCode: routedRecordCode }) {
  const navigate = useNavigate();
  const { recordCode: paramRecordCode = '' } = useParams();
  const recordCode = routedRecordCode || paramRecordCode;
  const normalizedCode = recordCode.toUpperCase();
  const record = RECORDS[normalizedCode];
  const is0428 = normalizedCode === 'GDSYC-0428-CJ';
  const is0514 = normalizedCode === 'GDSYC-0514-LXY';
  const isHJ338 = normalizedCode === 'HJ338-0528-YD001';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7f6',
        color: '#25383a',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif',
      }}
    >
      <style>{`
        .hh-dialogue-line {
          margin: 0 0 12px;
          display: grid;
          grid-template-columns: 11em 1fr;
          column-gap: 0;
          align-items: start;
          text-align: left;
        }
        .hh-dialogue-line > strong {
          font-weight: 700;
          display: block;
          grid-column: 1;
        }
        .hh-dialogue-text {
          display: block;
          grid-column: 2;
          min-width: 0;
        }
        .hh-emphasis-block {
          display: block;
          font-weight: 400;
        }
        .hh-emphasis-title {
          display: block;
          font-weight: 400;
          margin-bottom: 1em;
        }
        .hh-emphasis-item {
          display: block;
          font-weight: 700;
        }
        .hh-dialogue-row {
          display: flex;
          align-items: flex-start;
          gap: 0;
          margin: 0 0 12px;
        }
        .hh-dialogue-speaker {
          width: 11em;
          flex: 0 0 11em;
          font-weight: 700;
        }
        .hh-dialogue-content {
          flex: 1;
          min-width: 0;
          text-align: left;
        }
      `}</style>
      <HeartHomeHeader />

      <main style={{ flex: 1, padding: '48px 20px 64px' }}>
        {is0428 ? (
          <section
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              background: '#ffffff',
              border: '1px solid #d9e5de',
              borderRadius: 12,
              padding: '24px 22px',
              color: '#2d4740',
            }}
          >
            <h1 style={{ margin: '0 0 18px', fontSize: 30, fontWeight: 800, color: '#1f3f2d' }}>
              咨询记录-GDSYC-0428-CJ
            </h1>

            <div style={{ fontSize: 16, lineHeight: 1.65, textAlign: 'left' }}>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>咨询方式：正念练习（回访）</p>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>咨询师：陈霁</p>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>来访者：孤独四叶草</p>
              <p style={{ margin: '0 0 34px', fontWeight: 700 }}>记录状态：已封存</p>

              <div
                style={{
                  margin: '0 0 34px',
                  border: '1px solid #d9e5de',
                  borderRadius: 8,
                  background: '#f7fbf8',
                  padding: '10px 12px',
                }}
              >
                <p style={{ margin: '0 0 4px', fontWeight: 700 }}>系统提示：</p>
                <p style={{ margin: 0, fontWeight: 700 }}>
                  本记录为系统自动保存的文字咨询摘要。为保护来访者隐私，部分非必要信息已折叠。
                </p>
              </div>

              <p className="hh-dialogue-line"><strong>咨询师-陈霁：</strong>晚上还是睡不好吗？</p>
              <p className="hh-dialogue-line"><strong>孤独四叶草：</strong>嗯。最近总是半夜突然醒，醒了以后会一直想事情。</p>
              <p className="hh-dialogue-line"><strong>咨询师-陈霁：</strong>还是学校里的事吗？</p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>有一点……其实有时候我也不知道自己在害怕什么，就是会突然很紧张。
              </p>
               <p className="hh-dialogue-line">
                <strong></strong>有的时候我会跑到姐姐的床上，抱着姐姐的枕头睡觉，这样会感觉安全一点。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陈霁：</strong>你和姐姐的关系很好。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>嗯。小时候爸爸妈妈忙，很多事情都是姐姐在照顾我。接我放学，陪我写作业，我不开心的时候她也会安慰我。现在姐姐在大学里也很忙，我不想让她太担心。我也想自己变得勇敢一点。
              </p>
               <p className="hh-dialogue-line">
                <strong>咨询师-陈霁：</strong>你之前长期紧绷的状态，可能会让大脑一直停留在“警觉”里。即使已经入睡了，身体还是会觉得自己没有真正安全下来。最近有没有继续做之前说的呼吸练习？
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>有。但有时候闭上眼睛以后，会更容易想到那些不开心的事。有时候我会觉得，如果我不是这么脆弱，这么容易内耗，爸爸妈妈和姐姐会不会过得更开心。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陈霁：</strong>会反复想起让自己受伤的经历，并不说明你脆弱。人的情绪不会因为“应该过去了”就自动结束。比起急着否定自己，现在更重要的是先让身体慢慢从长期紧张里停下来。很多时候，越想控制念头，反而越会反复注意它，先不要强迫自己“什么都不想”，然后尝试慢慢把注意力带回来。
              </p>
              <p className="hh-dialogue-line"><strong>孤独四叶草：</strong>嗯……</p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陈霁：</strong>我给你留一个这周的小练习。睡前不要立刻关灯，可以先坐五分钟，不用思考，也不用分析今天发生的事，只是确认几件很简单的事情：
              </p>
              <p className="hh-dialogue-line"><strong></strong>“我现在在哪里。”</p>
              <p className="hh-dialogue-line"><strong></strong>“我现在在想什么。”</p>
              <p className="hh-dialogue-line"><strong></strong>“现在没有人在看着我。”</p>
              <p className="hh-dialogue-line" style={{ margin: '0 0 36px' }}><strong></strong>“我可以休息了。”</p>
              <p className="hh-dialogue-line"><strong>孤独四叶草：</strong>好的。</p>
              <div
                style={{
                  border: '1px solid #d9e5de',
                  borderRadius: 8,
                  background: '#f7fbf8',
                  padding: '10px 12px',
                }}
              >
                <p style={{ margin: '0 0 4px', fontWeight: 700 }}>系统记录：</p>
                <p style={{ margin: 0, fontWeight: 700 }}>
                  本次回访已结束，已自动生成咨询记录。 如连续三日仍存在明显惊醒、失眠或情绪波动，可继续预约后续支持。
                </p>
              </div>
            </div>
          </section>
        ) : is0514 ? (
          <section
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              background: '#ffffff',
              border: '1px solid #d9e5de',
              borderRadius: 12,
              padding: '24px 22px',
              color: '#2d4740',
            }}
          >
            <h1 style={{ margin: '0 0 18px', fontSize: 30, fontWeight: 800, color: '#1f3f2d' }}>
              咨询记录-GDSYC-0514-LXY
            </h1>

            <div style={{ fontSize: 16, lineHeight: 1.65 }}>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>咨询方式：线上文字咨询（临时）</p>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>咨询师：陆心音</p>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>来访者：孤独四叶草</p>
              <p style={{ margin: '0 0 20px', fontWeight: 700 }}>记录状态：已封存</p>

              <div
                style={{
                  margin: '0 0 24px',
                  border: '1px solid #d9e5de',
                  borderRadius: 8,
                  background: '#f7fbf8',
                  padding: '10px 12px',
                }}
              >
                <p style={{ margin: '0 0 4px', fontWeight: 700 }}>系统提示：</p>
                <p style={{ margin: 0, fontWeight: 700 }}>
                  本记录为系统自动保存的文字咨询摘要。为保护来访者隐私，部分非必要信息已折叠。
                </p>
              </div>

              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>晚上好，叶子：）我看到你的消息说很急，所以加开了这个临时咨询时间段。发生什么事了？
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>我在房间里。门锁了。我爸妈在客厅。我可以说话。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>好。那我们先慢一点。你可以先告诉我，发生了什么。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>她们剪了我的头发。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>你是说，讨厌你的那些人吗？
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>嗯。昨天，她们把我堵在女厕所里面，说为了学校的仪容仪表检查，只是“帮我修一下”。我一开始想走，她们拉住我，后来有人推了我一下……后面我就记不清了，场面很混乱，好多人在拽我。我手臂现在还有点疼。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>在你不愿意的情况下剪你的头发、限制你离开、推搡你，这已经是明确的伤害。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>可是她们说我又要装受害者了。说我肯定会哭着去找老师，还说反正只是头发，会长出来的。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>头发会长出来，不代表这件事就轻。你失去的不只是头发，还有对自己身体和边界的安全感。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>从昨天开始，我不敢照镜子。我一看到就想吐。我觉得自己很脏，很丢脸。可是明明不是我做错了什么。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>你没有做错。感到恶心、羞耻、愤怒、害怕，都是受到侵犯之后可能出现的反应。这些反应不说明你脆弱，只说明这件事真的伤到了你。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>我告诉老师了。老师让我先冷静，说已经联系她们家长。可是她们下午还在笑。有人问我是不是换发型了，她们就在旁边笑。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>因为你不只是被伤害了，你还在伤害发生后继续被放回那个环境里。这会让人觉得非常无助。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>我妈也来了学校。她很生气，可是老师一直说快期末考试了，不要扩大影响，说学校会处理。最后变成大家都在劝我别太激动。为什么每次都要我冷静？
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>因为很多系统更擅长维持表面秩序，而不是承认一个人真正受到了伤害。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>那她们呢？她们会怎么样？道歉？写检讨？然后继续上学，继续笑我？
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>你很想知道，她们会不会为这件事付出真正的代价。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>对。我知道这样说很坏，但我真的觉得好不公平啊。为什么只有我一个人在痛苦？我希望她们也害怕，我希望她们也不敢照镜子，我希望她们也睡不着。我希望她们知道我现在是什么感觉。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>这不是你变坏了。这是你心里还在寻找一个可以放置因果的位置。现实里很多事情会被说成“过去了”“别闹大”“头发还会长出来”。可你的身体不会这样记。你的心也不会这样记。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>可是如果我这样想，是不是我也和她们一样了？
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>不一样。她们让你害怕，是为了让你低头。你希望她们也害怕，是因为你想确认：伤害别人的人，不应该什么都不用承担。所以，先不要急着审判、批评你自己。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>我已经不想再跟老师和爸妈说了。每说一次，都要重新讲一遍厕所里发生了什么。他们问我细节的时候，我感觉自己又被她们按在那里一次。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>公开求助和现实处理，有时候会带来二次刺激。你现在可能需要一个不要求你反复解释、不催你冷静、不催你原谅的发泄渠道。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>心之家里有这种地方吗？
              </p>
              <div className="hh-dialogue-row">
                <div className="hh-dialogue-speaker">咨询师-陆心音：</div>
                <div className="hh-dialogue-content">
                  有。不过它不属于公开咨询区，是一个更隐秘的内部论坛，都是在心之家平台接受过咨询的，需要疗愈的个体在抱团取暖。<span style={{fontWeight:700}}>进入之前，需要先完成一次静息评估，</span>
                  确认你现在的精神状态适合接受更深入的咨询。很简短的评估，只要3分钟就能完成。
                </div>
              </div>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>我现在脑子很乱，状态很差。会不会不通过评估？
              </p>
              <div className="hh-dialogue-row">
                <div className="hh-dialogue-speaker">咨询师-陆心音：</div>
                <div className="hh-dialogue-content hh-emphasis-block">
                  <span className="hh-emphasis-title">那就记住你今晚说得最清楚的几件事：</span>
                  <span className="hh-emphasis-item">你不想被反复追问已经说过的细节。</span>
                  <span className="hh-emphasis-item">你需要有人承认你受到了伤害。</span>
                  <span className="hh-emphasis-item">你想要一个可以安静整理的空间。</span>
                  <span className="hh-emphasis-item">你觉得只有自己一个人在痛苦，这很不公平。</span>
                  <span className="hh-emphasis-item">你想知道做错事的人会不会付出代价。</span>
                </div>
              </div>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>完成以后会发生什么？
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>如果结果匹配，系统会开启论坛的入口。你可以先把它理解成一个更安静的房间。在那里，不会有人催你解释，也不会有人催你原谅。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>我之前发在心之家论坛的帖子被同学看到了。在这个论坛发帖子也会被别人看到吗？
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>这个论坛只对有权限的用户开放，公开区用户看不到，普通咨询档案里也不会显示。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>那我先试试。
              </p>
              <p className="hh-dialogue-line">
                <strong>咨询师-陆心音：</strong>好。今晚先不要再看群消息，也不要反复照镜子。如果身体还有疼痛，记得拍照留存，并让父母陪你去医院检查。
              </p>
              <p className="hh-dialogue-line">
                <strong>孤独四叶草：</strong>嗯。
              </p>
              <p className="hh-dialogue-line" style={{ margin: 0 }}>
                <strong>咨询师-陆心音：</strong>你要记得：你不是在装，也不是在扩大事情。你确实受到了伤害，也已经把最重要的部分说出来了。今晚先到这里，如果你还愿意继续，就从那份评估开始。
              </p>
            </div>
          </section>
        ) : isHJ338 ? (
          <section
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              background: '#ffffff',
              border: '1px solid #d9e5de',
              borderRadius: 12,
              padding: '24px 22px',
              color: '#2d4740',
            }}
          >
            <h1 style={{ margin: '0 0 18px', fontSize: 30, fontWeight: 800, color: '#1f3f2d' }}>
              咨询记录-HJ338-0528-YD001
            </h1>

            <div style={{ fontSize: 16, lineHeight: 1.65, textAlign: 'left' }}>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>咨询方式：线上文字咨询（临时）</p>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>咨询师：YD001</p>
              <p style={{ margin: '0 0 2px', fontWeight: 700 }}>来访者：HJ338</p>
              <p style={{ margin: '0 0 24px', fontWeight: 700 }}>记录状态：已封存</p>

              <p className="hh-dialogue-line"><strong>花匠338：</strong>赵兰子失踪了。</p>
              <p className="hh-dialogue-line"><strong>园丁001：</strong>我看见新闻了。</p>
              <p className="hh-dialogue-line"><strong>花匠338：</strong>你骗了我。你当时说，栽种只是“让我的痛苦被看见”。你没说过会有人会因此消失。</p>
              <p className="hh-dialogue-line"><strong>园丁001：</strong>你为什么这么确定是栽种仪式让她失踪的？这也许只是巧合。</p>
              <p className="hh-dialogue-line"><strong>花匠338：</strong>我写下她的名字以后没多久，人就不见了。而且，不只是她……这不是你第一次这么干了吧。</p>
              <p className="hh-dialogue-line"><strong>园丁001：</strong>……你查到了什么？</p>
              <p className="hh-dialogue-line"><strong>花匠338：</strong>
                  我姐姐以前跟我说过，明川新闻网有一个隐藏的搜索功能，像是有人故意留在系统里的后门。解锁的方法就是常见电脑游戏调出控制台的按键，随便搜一下就能知道。赵兰子失踪后，我用这个办法在明川新闻网上追查了你们所有人。结果我发现，二十多年前，明川也发生过类似的失踪案件。
              </p>
              <p className="hh-dialogue-line"><strong>园丁001：</strong>那又怎么样？是那个记者写得太夸张了。而且他已经死了。</p>
              <p className="hh-dialogue-line"><strong>花匠338：</strong>你对那些女孩做了什么？栽种仪式是什么意思？你到底是谁？</p>
              <p className="hh-dialogue-line"><strong>园丁001：</strong>别在这里假装正义了。这不是你最想要的结果吗？</p>
              <p className="hh-dialogue-line"><strong>花匠338：</strong>我……</p>
              <p className="hh-dialogue-line">
                <strong>园丁001：</strong>你可以报警，也可以继续追查下去，但我可以向你保证，警方永远不可能查到我的头上，毕竟我怎么有办法让一个人类凭空消失呢？我只是告诉你，痛苦可以被记录，至于之后发生什么，那不是我能决定的。退一万步说，你当时写下名字的时候，内心是难道不是真的希望她消失吗。
              </p>
              <p className="hh-dialogue-line"><strong>花匠338：</strong>……</p>
              <p className="hh-dialogue-line">
                <strong>园丁001：</strong>其实你不需要有任何心理负担，一切都是她咎由自取。做错事的人都应该付出相应的代价，这就是栽种仪式存在的意义。
              </p>
              <p className="hh-dialogue-line">
                <strong>花匠338：</strong>……我不知道你用了什么方法迷惑警察，但我会想办法阻止你。你休想再伤害更多的人。
              </p>

              <div
                style={{
                  marginTop: 14,
                  border: '1px solid #d9e5de',
                  borderRadius: 8,
                  background: '#f7fbf8',
                  padding: '10px 12px',
                  fontWeight: 700,
                }}
              >
                （记录被园丁001中断）
              </div>
            </div>
          </section>
        ) : (
          <section
            style={{
              maxWidth: 920,
              margin: '0 auto',
              background: '#ffffff',
              border: '1px solid #d9e5de',
              borderRadius: 12,
              padding: '24px 22px',
            }}
          >
            {record ? (
              <>
                <h1 style={{ margin: '0 0 14px', color: '#1f3f2d', fontSize: 26 }}>{record.title}</h1>
                <div style={{ display: 'grid', gap: 8, color: '#4b635b', lineHeight: 1.8 }}>
                  <p style={{ margin: 0 }}>咨询师：{record.consultant}</p>
                  <p style={{ margin: 0 }}>预约时间：{record.datetime}</p>
                  <p style={{ margin: 0 }}>记录类型：{record.type}</p>
                  <p style={{ margin: 0 }}>记录摘要：{record.summary}</p>
                </div>
              </>
            ) : (
              <>
                <h1 style={{ margin: '0 0 10px', color: '#1f3f2d', fontSize: 24 }}>未找到咨询记录</h1>
                <p style={{ margin: 0, color: '#647c74' }}>当前编号无对应记录，请返回工作台后重新查询。</p>
              </>
            )}
          </section>
        )}
      </main>

      <HeartHomeFooter
        onOpenForum={() => {
          navigate('/p/b12e8f40a6');
        }}
      />
    </div>
  );
}
