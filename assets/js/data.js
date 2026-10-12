/* ============================================================
   Site content. Edit this file — nothing else — to update the site.
   ============================================================ */

/* ---------- Research threads (section 02) ---------- */
const THREADS = [
  {
    area: "LLM reasoning · RLVR",
    status: "active",
    title: "Where Should We Cut a Reasoning Trace?",
    sub: "Segment-level credit assignment for RL from verifiable rewards.",
    body: [
      "Segment-level RLVR has a <strong>missing control</strong>. Every method pairs its own rule for cutting a reasoning trace with its own estimator, so nobody can say whether the reported gains come from <em>where</em> the cuts land, from simply having more than one segment, or from the extra rollout compute that comes along for the ride.",
      "This work fixes the estimator and varies only the cut rule, then adds the two rungs the literature omits: random cuts at matched segment count, and an oracle variance upper bound. A front-loaded measurement study asks whether token entropy — what current methods cut on — actually tracks the per-step return variance it is standing in for."
    ],
    formula: "σ²ₜ = Var_{y∼π} [ V(sₜ ⊕ y) ]",
    venue: "Empirical paper in preparation"
  },
  {
    area: "Optimisation · continual learning",
    status: "active",
    title: "Shift-Aware SGD",
    sub: "A step size that can tell drift apart from gradient noise.",
    body: [
      "When the optimum moves while you are chasing it, the right learning rate balances two errors: lag behind the drift, and jitter from gradient noise. The question is which of <strong>drift, noise, and curvature</strong> an optimiser can actually identify from the gradient information it already sees.",
      "The method estimates the drift scale from the slope of the iterate variogram and the noise scale from minibatch disagreement, clips against a curvature bound, and holds the rate steady behind a change-point alarm. The theoretical centrepiece is a lower bound: right after a change, a single-query learner cannot distinguish drift from curvature at all."
    ],
    formula: "η* ≈ √( tr Q / tr Σ ),   clipped to c / λ_max",
    venue: "Theory + experiments in preparation"
  },
  {
    area: "Multi-agent RL",
    status: "review",
    title: "Self-Referenced Social Preferences",
    sub: "Cooperation without observing anyone else's reward.",
    body: [
      "Social preferences are a reliable route to cooperation in multi-agent RL, but nearly all of them assume an agent can read its peers' reward signals. People cannot do that. We watch what others <em>do</em> and how it turns out for them, and judge it by our own lights.",
      "Each agent learns a model of its own reward, applies that model to other agents' observed transitions, and feeds the resulting self-referenced assessments into standard social preferences. Across Escape Room, Clean Up, and Commons Harvest, agents learn to cooperate without reward access — and often divide the joint return <strong>more equitably</strong> than agents that can see the true rewards."
    ],
    formula: "r̂ⱼ = R̂ᵢ(sⱼ, aⱼ, s′ⱼ)   —   peer outcomes, own yardstick",
    venue: "Preprint and code to follow once review closes"
  },
  {
    area: "Agentic systems · infrastructure",
    status: "proposal",
    title: "KubeEvolve",
    sub: "Verifier-grounded RL and skill evolution for Kubernetes testing.",
    body: [
      "Operator defects hide in reconciliation timing, component interaction, and the gap between a cluster that reports healthy and an application that is not. KubeEvolve proposes an autonomous testing layer where an RL policy coordinates specialised models — context, state, experiment, oracle — and decides what to investigate, what to perturb, and when to stop.",
      "What makes it more than a memoised test suite is that the system learns reusable <strong>test generators</strong>, not individual tests, and nothing is promoted without independent execution, replay, and cleanup checks. A generated oracle is never allowed to approve its own result."
    ],
    formula: "R = αD + βΔCoverage − γCost − δInvalidity",
    venue: "Argo CD on EKS as the industrial case study"
  }
];

/* ---------- Writing (section 03) ----------
   NOTE: the multi-agent paper is listed without naming its venue, since
   advertising a double-blind submission can conflict with anonymity policy.
   Once it is accepted (or if you are comfortable now), set `venue` below. */
const PAPERS = [
  {
    year: "2026",
    kind: "Paper",
    title: "Self-Referenced Social Preferences: Cooperation without Observing Others' Rewards",
    venue: "",
    status: "Under review",
    abs: "Each agent learns a model of its own reward, applies it to peers' observed transitions, and feeds those self-referenced assessments into standard social preferences. Evaluated on three sequential social dilemmas — Escape Room, Clean Up, and Commons Harvest — covering volunteering, public-good contribution, and resource restraint."
  },
  {
    year: "2026",
    kind: "Working paper",
    title: "Where Should We Cut a Reasoning Trace?",
    venue: "",
    status: "In progress",
    abs: "An empirical study that fixes the advantage estimator and varies only the segmentation rule, adding the controls the segment-level RLVR literature leaves out: random cuts at matched segment count and an oracle variance bound."
  },
  {
    year: "2026",
    kind: "Working paper",
    title: "Shift-Aware Step Sizes for Non-Stationary SGD",
    venue: "",
    status: "In progress",
    abs: "Which of drift, noise, and curvature are identifiable from SGD's own gradient information, and what step-size rule built only from identifiable quantities achieves near-oracle tracking under distribution shift."
  },
  {
    year: "2024",
    kind: "Project report",
    title: "Online Dynamic Learning and Robust Control for Nonlinear Systems",
    venue: "Cable-driven parallel robots",
    status: "Code released",
    abs: "Can online RL learn the dynamics of non-stationary, nonlinear systems quickly enough to replace the inverse-dynamics term in a robust control architecture? Validated in simulation on 8-cable and 12-cable parallel robots under disturbance.",
    url: "https://github.com/mayman150/Online-Dynamic-Learning-and-Robust-Control-for-Nonlinear-Systems"
  }
];

/* ---------- Projects (section 04) ---------- */
const AREAS = ["Learning", "Systems", "Hardware", "Tools"];

const PROJECTS = [
  {
    name: "Online Dynamic Learning & Robust Control",
    repo: "Online-Dynamic-Learning-and-Robust-Control-for-Nonlinear-Systems",
    area: "Learning", lang: "MATLAB", stars: 2,
    desc: "Online RL learns nonlinear plant dynamics in place of the inverse-dynamics term in a robust controller. Three disturbance scenarios across 8- and 12-cable parallel robots."
  },
  {
    name: "Distributed System in Rust",
    repo: "Distributed-System-Project-using-Rust",
    area: "Systems", lang: "Rust", stars: 0,
    desc: "Three servers, two clients, UDP all the way down. Load balancing across live servers plus a peer-to-peer election that keeps the system serving through a node failure."
  },
  {
    name: "x86-64 Bootloader",
    repo: "BootLoader",
    area: "Hardware", lang: "Assembly", stars: 1,
    desc: "From BIOS to long mode by hand: GDT descriptors, CR4/CR3/CR0 and the EFER MSR, a full page table for the first 2 MB, then a walk of the PCI bus."
  },
  {
    name: "Pipelined RISC-V Processor",
    repo: "Pipelined-RISC-V-Processor-",
    area: "Hardware", lang: "Verilog", stars: 0,
    desc: "All 40 instructions of a pipelined RISC-V core in Verilog, with hazard detection, stalling, and flushing on taken branches."
  },
  {
    name: "Tomasulo's Algorithm Simulator",
    repo: "Simulating-Tomasulo-s-algorithm",
    area: "Hardware", lang: "C++", stars: 0,
    desc: "Cycle-accurate model of an out-of-order 16-bit RISC processor using Tomasulo's algorithm without speculation — reservation stations, register renaming, and a common data bus."
  },
  {
    name: "SafeBox",
    repo: "SafeBox",
    area: "Systems", lang: "C++", stars: 0,
    desc: "Gigabyte-scale file encryption with AES in CBC mode, built as an exercise in streaming transformation filters and spooled block processing."
  },
  {
    name: "Set-Associative Cache Simulator",
    repo: "Set-Associate-Cache-simulator",
    area: "Hardware", lang: "C++", stars: 0,
    desc: "A configurable cache simulator used to sweep associativity, line size, and capacity against different workloads and watch the miss rate move."
  },
  {
    name: "Fake News Detection",
    repo: "Fake-News-Detection",
    area: "Learning", lang: "Jupyter", stars: 0,
    desc: "Classifying misleading news articles with NLP preprocessing and deep sequence models, compared against classical text baselines."
  },
  {
    name: "Sentiment-Driven Trading Strategy",
    repo: "Trading-Strategy-with-Sentiment-Analysis",
    area: "Learning", lang: "Jupyter", stars: 0,
    desc: "Predicting close price from news and social sentiment features, then turning the signal into a strategy and asking whether it survives transaction costs."
  },
  {
    name: "EM & Affinity Propagation from Scratch",
    repo: "Expectation-Maximization-and-Afainity-Propgation-implementation-from-scratch",
    area: "Learning", lang: "Jupyter", stars: 0,
    desc: "Both clustering algorithms implemented from the maths up — no library calls — to see exactly where responsibilities and message passing come from."
  },
  {
    name: "TensorFlow vs PyTorch",
    repo: "A-Comparative-Study-between-TensorFlow-and-PyTorch",
    area: "Learning", lang: "Jupyter", stars: 0,
    desc: "Why do researchers reach for PyTorch? A comparative study on ergonomics and behaviour, with a companion analysis of closed issues in both repositories."
  },
  {
    name: "Data Science Case Studies",
    repo: "Data-Science-Case-studies",
    area: "Learning", lang: "Jupyter", stars: 0,
    desc: "A notebook collection working through statistics and machine learning techniques on real datasets, each ending in an actual conclusion."
  },
  {
    name: "CMOS SPICE Generator",
    repo: "CMOS-Circuit-SPICE-Generator",
    area: "Hardware", lang: "C++", stars: 0,
    desc: "Takes an arbitrary Boolean function and emits the SPICE netlist for a CMOS circuit that realises it."
  },
  {
    name: "Karnaugh Map Solver",
    repo: "Circuit-Minimization-Karnaugh-Map-Solver-main",
    area: "Hardware", lang: "C++", stars: 0,
    desc: "Circuit minimisation by Karnaugh map: prime implicants, essential cover selection, and a minimal sum-of-products expression."
  },
  {
    name: "Code Prodigy Library",
    repo: "Code-Prodigy-Library",
    area: "Tools", lang: "C++", stars: 0,
    desc: "A competitive-programming reference implementation set — algorithms, data structures, and helpers kept ready to paste under time pressure."
  },
  {
    name: "Premier League Database",
    repo: "PremierLeague",
    area: "Tools", lang: "Jupyter", stars: 0,
    desc: "Schema design, normalisation, and query work over football season data, with analysis notebooks on top of the relational model."
  },
  {
    name: "TensorTonic Solutions",
    repo: "TensorTonic-Solutions",
    area: "Tools", lang: "Python", stars: 0,
    desc: "Worked solutions to TensorTonic tensor-manipulation problems — a standing drill in getting shapes and broadcasting right the first time."
  }
];
