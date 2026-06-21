import { useCallback, useEffect, useRef, useState } from "react";

const ASSETS = {
  dingtalk: "/assets/dingtalk-brand.png",
  tableLogo: "/assets/ai-table-logo.png",
  capabilities: "/assets/ai-capabilities.png",
  automation: "/assets/automation.png",
  dashboard: "/assets/dashboard.png",
};

function BrandHeader({ label = "业务场景共创计划", inverse = false }) {
  return (
    <header className={`brand-header ${inverse ? "brand-header-inverse" : ""}`}>
      <img src={ASSETS.tableLogo} alt="钉钉 AI 表格" />
      <span>{label}</span>
    </header>
  );
}

function Visual({ src, alt, className = "" }) {
  const [status, setStatus] = useState("loading");

  return (
    <div className={`visual ${className} visual-${status}`}>
      {status === "loading" && <div className="visual-skeleton" aria-hidden="true" />}
      {status === "error" && (
        <div className="visual-error" role="img" aria-label={alt}>
          图片暂未载入
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}

function Slide({ children, className = "" }) {
  return <section className={`slide ${className}`}>{children}</section>;
}

const slides = [
  {
    title: "让 AI 培训真正进入业务",
    duration: "30 秒",
    notes:
      "各位领导，今天不花大量时间介绍 AI 表格有多少功能。真正需要回答的是，投入一批骨干和一段时间后，企业能不能留下真实可用的业务成果。",
    content: (
      <Slide className="slide-cover">
        <div className="cover-brand-row">
          <img className="dingtalk-brand" src={ASSETS.dingtalk} alt="钉钉，AI 时代的工作方式" />
          <span>管理层现场汇报</span>
        </div>
        <div className="cover-grid">
          <div className="cover-copy">
            <p className="kicker">AI 表格业务场景共创与技能评比方案</p>
            <h1>让 AI 培训<br />真正进入业务</h1>
            <p className="cover-summary">
              不是几堂功能课，而是一轮可验收、可复用的业务共创项目。
            </p>
          </div>
          <div className="cover-mark" aria-hidden="true">
            <span>人才</span>
            <span>场景</span>
            <span>方法</span>
          </div>
        </div>
        <div className="cover-foot">
          <img src={ASSETS.tableLogo} alt="钉钉 AI 表格" />
          <span>约 6 周完成一轮价值验证</span>
        </div>
      </Slide>
    ),
  },
  {
    title: "培训结束，企业该留下什么",
    duration: "1 分钟",
    notes:
      "管理层不应只看参训人数、课程数量和考试通过率。这些只能证明培训完成了。更重要的是员工是否形成能力，业务是否出现变化，成果是否能够继续复制。",
    content: (
      <Slide className="slide-outcomes">
        <BrandHeader label="从培训完成转向价值交付" />
        <div className="section-heading">
          <p className="kicker">老板真正关心的问题</p>
          <h2>一场培训结束后，<br />企业应该留下什么？</h2>
        </div>
        <div className="outcome-layout">
          <article className="outcome-primary">
            <span className="outcome-index">能力</span>
            <strong>一批能独立解决问题的业务骨干</strong>
            <p>让懂业务的人，具备快速验证管理想法的能力。</p>
          </article>
          <div className="outcome-secondary">
            <article>
              <span className="outcome-index">成果</span>
              <strong>一批进入真实流程的业务应用</strong>
            </article>
            <article>
              <span className="outcome-index">资产</span>
              <strong>一套可以继续复制的场景与方法</strong>
            </article>
          </div>
        </div>
        <p className="bottom-statement">交付目标不是学会按钮，而是留下人才、场景和方法。</p>
      </Slide>
    ),
  },
  {
    title: "传统培训存在四个落地断点",
    duration: "2 分钟",
    notes:
      "会操作不等于会选择场景，作品不等于应用，个人效率不等于企业效率，比赛结束也不等于项目成功。问题不是课程怎么讲，而是价值怎么落地。",
    content: (
      <Slide className="slide-breakpoints">
        <BrandHeader label="问题诊断" />
        <div className="breakpoint-heading">
          <p className="kicker">传统工具培训为什么难落地</p>
          <h2>四个断点，切断了价值传导</h2>
        </div>
        <div className="breakpoint-chain">
          {[
            ["听懂功能", "不知道哪个问题值得优先解决"],
            ["搭出作品", "没有真实用户、数据和流程"],
            ["节省时间", "没有转化为岗位与组织结果"],
            ["完成比赛", "没有负责人持续运营"],
          ].map(([name, detail], i) => (
            <div className="breakpoint-step" key={name} style={{ "--step": i }}>
              <span>{name}</span>
              <p>{detail}</p>
              {i < 3 && <b aria-hidden="true">≠</b>}
            </div>
          ))}
        </div>
        <div className="question-band">
          <span>关键问题</span>
          <strong>如何让一次 AI 培训形成可持续的业务成果？</strong>
        </div>
      </Slide>
    ),
  },
  {
    title: "业务共创闭环",
    duration: "1 分 30 秒",
    notes:
      "我们的答案，是把单次培训升级成四阶段业务共创项目。先明确企业希望解决什么，再围绕这些问题培养能力和交付成果。培训只是其中一环，业务成果才是终点。",
    content: (
      <Slide className="slide-loop">
        <BrandHeader label="方案总览" />
        <div className="loop-intro">
          <p className="kicker">我们的答案</p>
          <h2>把一次培训，升级为一轮业务共创</h2>
          <p>先定义问题，再培养能力，最后用真实业务验收。</p>
        </div>
        <div className="loop-track">
          {[
            ["方向共识", "确认目标、部门、人员与场景"],
            ["实战培训", "用真实问题学习结构与方法"],
            ["场景共创", "陪跑、测试、修正与试用"],
            ["成果沉淀", "业务验收、评比与复制"],
          ].map(([name, detail], i) => (
            <article key={name}>
              <span className="loop-number">{i + 1}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <div className="loop-conclusion">
          <span>培训</span>
          <b>只是能力建设的一环</b>
          <strong>业务成果才是终点</strong>
        </div>
      </Slide>
    ),
  },
  {
    title: "为什么选择 AI 表格",
    duration: "1 分 30 秒",
    notes:
      "AI 表格不是比 Excel 多几个功能，而是在传统表格和重型系统之间，提供适合业务快速验证的载体。业务人员可以把数据采集、流程流转、权限和分析组合成轻量应用，AI 也能进入具体数据和流程。",
    content: (
      <Slide className="slide-product">
        <BrandHeader label="为什么选择 AI 表格" />
        <div className="product-layout">
          <div className="product-copy">
            <p className="kicker">AI 时代的应用搭建平台</p>
            <h2>让业务想法，<br />快速变成可验证应用</h2>
            <div className="product-reasons">
              <div><b>业务可参与</b><span>一张表、零代码，降低首轮验证门槛</span></div>
              <div><b>流程可闭环</b><span>采集、流转、权限和分析位于同一载体</span></div>
              <div><b>AI 可嵌入</b><span>AI 直接进入业务数据，不停留在聊天窗口</span></div>
            </div>
          </div>
          <Visual
            className="product-visual"
            src={ASSETS.capabilities}
            alt="钉钉 AI 表格能力总览，包括 AI 搭表、工作流、数据分析、字段 Agent 和公式生成"
          />
        </div>
        <p className="evidence-line">
          方案判断基于钉钉 AI 表格官方能力，具体功能以企业实际版本为准。
        </p>
      </Slide>
    ),
  },
  {
    title: "把能力放到业务一线",
    duration: "1 分 30 秒",
    notes:
      "第一层价值，是让业务骨干形成自主解决轻量数字化问题的能力。课程从业务问题、数据结构和流程开始，不从产品菜单开始。结果用场景说明和真实原型检验。",
    content: (
      <Slide className="slide-value-one">
        <BrandHeader label="第一层价值" />
        <div className="value-one-grid">
          <div className="value-one-copy">
            <p className="kicker">人才能力</p>
            <h2>把解决问题的能力，<br />放到业务一线</h2>
            <blockquote>懂业务的人，应该能更快验证自己的管理想法。</blockquote>
          </div>
          <div className="method-stack">
            <div className="method-step method-step-wide">
              <span>先看业务</span>
              <strong>识别问题和价值</strong>
            </div>
            <div className="method-step">
              <span>再拆场景</span>
              <strong>角色、流程、数据</strong>
            </div>
            <div className="method-step">
              <span>最后搭应用</span>
              <strong>原型、试用、验证</strong>
            </div>
          </div>
        </div>
        <div className="proof-strip">
          <span>验收不只看考试</span>
          <b>场景说明</b>
          <b>应用原型</b>
          <b>问题解释</b>
        </div>
      </Slide>
    ),
  },
  {
    title: "让成果进入真实业务",
    duration: "1 分 30 秒",
    notes:
      "第二层价值，是让培训成果进入真实业务。每个入选场景都要有业务负责人、搭建负责人和明确验收方式。首期优先选择高频、范围清楚、数据可得的轻量场景。",
    content: (
      <Slide className="slide-value-two">
        <BrandHeader label="第二层价值" />
        <div className="value-two-layout">
          <Visual
            className="automation-visual"
            src={ASSETS.automation}
            alt="钉钉 AI 表格自动化流程配置界面"
          />
          <div className="value-two-copy">
            <p className="kicker">真实场景</p>
            <h2>不做虚拟演示，<br />只验证真实业务</h2>
            <div className="acceptance-list">
              {[
                "真实问题与业务负责人",
                "真实用户与代表性数据",
                "能够跑通的核心流程",
                "明确的指标与验收方式",
              ].map((item, i) => (
                <div key={item}><span>{i + 1}</span><b>{item}</b></div>
              ))}
            </div>
          </div>
        </div>
        <p className="pilot-note">首期用范围可控的场景验证价值，再决定是否扩大投入。</p>
      </Slide>
    ),
  },
  {
    title: "把个人作品变成组织资产",
    duration: "1 分 30 秒",
    notes:
      "第三层价值，是把个人作品变成企业可复制的组织资产。优秀场景不仅要沉淀业务逻辑、数据结构、流程、权限、操作方法和指标，还要明确负责人、维护人和 30 天复盘节点。这样下一个部门才能基于模板继续使用，而不是重新从零搭建。",
    content: (
      <Slide className="slide-value-three">
        <BrandHeader label="第三层价值" />
        <div className="asset-hero">
          <div className="asset-heading">
            <p className="kicker">组织资产</p>
            <h2>把个人作品，<br />变成可复制的组织能力</h2>
          </div>
          <p className="asset-thesis">
            评比只是筛选机制
            <strong>复用才是长期回报</strong>
          </p>
        </div>

        <div className="asset-system">
          <section className="asset-package">
            <div className="asset-section-title">
              <span>标准资产包</span>
              <p>优秀场景必须完整沉淀六类内容</p>
            </div>
            <div className="asset-package-grid">
              <div>
                <b>业务标准</b>
                <span>场景说明</span>
                <span>字段口径</span>
                <span>流程规则</span>
              </div>
              <div>
                <b>运营标准</b>
                <span>权限设计</span>
                <span>操作指引</span>
                <span>复盘指标</span>
              </div>
            </div>
          </section>

          <section className="asset-mechanism">
            <span className="asset-mechanism-label">复制机制</span>
            <div>
              <b>模板入库</b>
              <p>优秀作品固化为可复用模板</p>
            </div>
            <div>
              <b>责任到人</b>
              <p>明确业务负责人和后续维护人</p>
            </div>
            <div>
              <b>30 天复盘</b>
              <p>检查使用、指标变化和推广条件</p>
            </div>
          </section>
        </div>

        <div className="asset-result">
          <div><span>起点</span><b>优秀作品</b></div>
          <i aria-hidden="true">进入</i>
          <div><span>沉淀</span><b>可运营模板</b></div>
          <i aria-hidden="true">复制</i>
          <div><span>结果</span><b>同类场景复用</b></div>
        </div>
      </Slide>
    ),
  },
  {
    title: "六周完成一轮价值验证",
    duration: "2 分 30 秒",
    notes:
      "启动前确认部门、30-50 名核心骨干、场景和指标。第 1-2 周实战培训，第 3-5 周陪跑共创，第 6 周成果评比。重点是谁解决了真实问题并具备推广条件。",
    content: (
      <Slide className="slide-timeline">
        <BrandHeader label="实施节奏" />
        <div className="timeline-heading">
          <p className="kicker">约 6 周</p>
          <h2>完成一轮从学习到成果的价值验证</h2>
        </div>
        <div className="timeline-line">
          {[
            ["启动前", "方向共识", "确认部门、人员、场景和指标"],
            ["第 1-2 周", "实战培训", "完成作业、场景说明和应用原型"],
            ["第 3-5 周", "场景共创", "筛选、陪跑、测试与修正"],
            ["第 6 周", "成果评比", "业务验收、复盘和推广计划"],
          ].map(([time, name, detail], i) => (
            <article key={name} style={{ "--timeline-index": i }}>
              <span>{time}</span>
              <i aria-hidden="true" />
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <div className="timeline-footer">
          <span>建议规模</span>
          <strong>30-50 名核心骨干</strong>
          <span>场景口径</span>
          <strong>通过验收，而非只看数量</strong>
        </div>
      </Slide>
    ),
  },
  {
    title: "用业务结果验收",
    duration: "2 分钟",
    notes:
      "学习结果和业务结果分开衡量。签到、测验和作业判断是否学会，业务价值、真实使用、方案完整性和推广潜力判断是否产生结果。没有基线时不承诺固定提效比例。",
    content: (
      <Slide className="slide-validation">
        <BrandHeader label="成果验收" />
        <div className="validation-layout">
          <div className="validation-copy">
            <p className="kicker">管理层验收口径</p>
            <h2>用业务结果验收，<br />不用热闹程度验收</h2>
            <div className="validation-points">
              {[
                ["人才能力", "谁能独立完成场景分析和原型搭建"],
                ["真实使用", "谁在用、使用频次、流程运行情况"],
                ["业务变化", "耗时、周期、遗漏或错误是否改善"],
                ["组织沉淀", "形成多少模板、骨干和推广计划"],
              ].map(([name, detail]) => (
                <div key={name}><b>{name}</b><span>{detail}</span></div>
              ))}
            </div>
          </div>
          <Visual
            className="dashboard-visual"
            src={ASSETS.dashboard}
            alt="钉钉 AI 表格仪表盘，包括利润、销售趋势、满意度和排行榜"
          />
        </div>
        <p className="validation-note">先记录基线，再比较变化。缺少基线时，不承诺固定提效比例。</p>
      </Slide>
    ),
  },
  {
    title: "企业最终购买和得到什么",
    duration: "2 分钟",
    notes:
      "企业购买的不是三堂课程，而是从人才能力到业务成果的转化项目。如果认可这条路径，下一步先确认项目意向，再开展管理层与试点部门访谈，形成正式交付与商务方案。",
    content: (
      <Slide className="slide-close">
        <div className="close-brand-row">
          <img src={ASSETS.dingtalk} alt="钉钉，AI 时代的工作方式" />
          <img src={ASSETS.tableLogo} alt="钉钉 AI 表格" />
        </div>
        <div className="close-layout">
          <div className="close-copy">
            <p className="kicker">企业最终购买的</p>
            <h2>不是三堂课程，<br />而是一套成果转化机制</h2>
            <p>培养一批人，跑通一批场景，沉淀一套方法。</p>
          </div>
          <div className="deliverables">
            {[
              "面向业务骨干的实战课程",
              "场景征集、筛选和验收方法",
              "真实场景的陪跑共创服务",
              "以业务成果为导向的技能评比",
              "可继续使用和推广的组织资产",
            ].map((item, i) => (
              <div key={item}><span>{i + 1}</span><b>{item}</b></div>
            ))}
          </div>
        </div>
        <div className="next-step">
          <span>建议下一步</span>
          <b>确认项目意向</b>
          <i aria-hidden="true" />
          <b>管理层与部门访谈</b>
          <i aria-hidden="true" />
          <b>明确交付与商务方案</b>
        </div>
      </Slide>
    ),
  },
];

function App() {
  const [index, setIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const touchStart = useRef(null);

  const goTo = useCallback((nextIndex) => {
    setIndex(Math.max(0, Math.min(slides.length - 1, nextIndex)));
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const handleKey = (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;

      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        next();
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        previous();
      } else if (event.key === "Home") {
        goTo(0);
      } else if (event.key === "End") {
        goTo(slides.length - 1);
      } else if (event.key.toLowerCase() === "n") {
        setNotesOpen((value) => !value);
      } else if (event.key.toLowerCase() === "o") {
        setOverviewOpen((value) => !value);
      } else if (event.key === "Escape") {
        setNotesOpen(false);
        setOverviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goTo, next, previous]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setNotesOpen(true);
    }
  };

  const handleTouchStart = (event) => {
    touchStart.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 60) {
      if (distance < 0) next();
      else previous();
    }
    touchStart.current = null;
  };

  return (
    <main className="deck-shell">
      <div
        className="deck-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slide-transition" key={index}>
          {slides[index].content}
        </div>

        <div className="deck-progress" aria-hidden="true">
          <span style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
        </div>

        {notesOpen && (
          <aside className="notes-panel" aria-label="讲者备注">
            <div>
              <span>讲者备注</span>
              <b>{slides[index].duration}</b>
            </div>
            <p>{slides[index].notes}</p>
            <button type="button" onClick={() => setNotesOpen(false)}>关闭</button>
          </aside>
        )}

        {overviewOpen && (
          <div className="overview-panel" role="dialog" aria-modal="true" aria-label="页面目录">
            <div className="overview-header">
              <div><span>页面目录</span><b>共 {slides.length} 页</b></div>
              <button type="button" onClick={() => setOverviewOpen(false)}>关闭</button>
            </div>
            <div className="overview-grid">
              {slides.map((slide, slideIndex) => (
                <button
                  type="button"
                  className={slideIndex === index ? "is-active" : ""}
                  key={slide.title}
                  onClick={() => {
                    goTo(slideIndex);
                    setOverviewOpen(false);
                  }}
                >
                  <span>{String(slideIndex + 1).padStart(2, "0")}</span>
                  <b>{slide.title}</b>
                  <small>{slide.duration}</small>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <nav className="deck-controls" aria-label="演示控制">
        <button type="button" onClick={previous} disabled={index === 0}>上一页</button>
        <button type="button" onClick={() => setOverviewOpen(true)}>目录</button>
        <span aria-live="polite">{index + 1} / {slides.length}</span>
        <button type="button" onClick={() => setNotesOpen((value) => !value)}>备注</button>
        <button type="button" onClick={toggleFullscreen}>全屏</button>
        <button type="button" onClick={next} disabled={index === slides.length - 1}>下一页</button>
      </nav>
    </main>
  );
}

export default App;
