/* ============================================================
   Site content. Edit this file (and nothing else) to update the site.

   Only publicly released work appears here: peer-reviewed papers,
   public preprints, and public repositories. Unpublished and
   in-progress research is deliberately left off the site.
   ============================================================ */

/* ---------- Research areas (section 02) ---------- */
const THREADS = [
  {
    area: "Continual RL · environments",
    status: "primary",
    title: "Benchmarks for agents that never stop learning",
    sub: "Episodic benchmarks with task switches bolted on only capture abrupt change. AgarCL needs no episodes at all.",
    body: [
      "Continual RL expects an agent to keep learning rather than converge to a policy you freeze and then score. Studying that needs the right environment, and the options were poor. Modifying an episodic benchmark to inject task shifts mostly captures abrupt switches and still leans on episode boundaries, while the few purpose-built continual simulators were limited in scope or complexity.",
      "<strong>AgarCL</strong> is a research platform built on the game Agar.io: non-episodic, high-dimensional, and partially observable, with continuous actions and stochastic dynamics that keep evolving as the agent grows. There is no point where the problem settles down, and the agent's own growth changes what it is facing."
    ],
    marker: "non-episodic · continuous actions · partial observability",
    links: [
      { label: "Paper (arXiv)", url: "https://arxiv.org/abs/2505.18347" },
      { label: "Code", url: "https://github.com/machado-research/AgarCL" }
    ]
  },
  {
    area: "Continual RL · plasticity",
    status: "primary",
    title: "Which algorithms cope, and why the usual fixes don't",
    sub: "Standard RL struggles on AgarCL. So does the continual-learning toolkit built to rescue it.",
    body: [
      "An environment that keeps changing is only useful if you then measure honestly against it. DQN, PPO, and SAC all struggle on AgarCL's main challenge, and a suite of smaller tasks isolates which parts of the game cause which kind of trouble.",
      "The more telling result came from the continual-learning methods. Shrink and Perturb, ReDo, and Continual Backpropagation are all built to treat loss of plasticity, and none of them improved much on plain RL. That points somewhere uncomfortable: the difficulty here reaches <strong>beyond the stability-plasticity dilemma</strong>, which is where most of the field's attention currently sits."
    ],
    marker: "DQN / PPO / SAC   vs   Shrink-and-Perturb / ReDo / Continual Backprop",
    links: [
      { label: "Paper (arXiv)", url: "https://arxiv.org/abs/2505.18347" },
      { label: "Benchmark code", url: "https://github.com/machado-research/AgarCL-benchmark" }
    ]
  },
  {
    area: "Multi-agent RL · cognitive science",
    status: "primary",
    title: "Cooperation without observing anyone's reward",
    sub: "Borrowing the half of empathy that multi-agent RL left out.",
    body: [
      "Psychology splits empathy in two: working out how another agent is doing, and caring about it. Social preferences in multi-agent RL model the caring part well, then skip the working-out part by simply telling each agent what its peers earned. That channel exists in simulation and almost nowhere else, because a reward is private and nobody receives someone else's.",
      "So we give agents the move people actually use, which is to picture themselves in the other's place. Each agent learns a model of its own reward and applies it to the transitions it sees from others, asking what it would have earned there. Those estimates feed an ordinary social preference, and each policy still acts only on its own observation. Across Escape Room, Clean Up, and Commons Harvest this keeps cooperation going with no access to anyone's reward, and often splits the group's earnings <strong>more fairly</strong> than agents that can read the real ones."
    ],
    marker: "r̂ⱼ = R̂ᵢ(sⱼ, aⱼ, s′ⱼ)   ·   peer outcomes, own yardstick",
    links: [
      { label: "arXiv:2610.07881", url: "https://arxiv.org/abs/2610.07881" }
    ]
  },
  {
    area: "Earlier work · vision & language",
    status: "secondary",
    title: "Grounding language in 3D scenes",
    sub: "Chain-of-thought supervision for 3D visual grounding, and large-scale compositional 3D data.",
    body: [
      "Before moving to reinforcement learning I worked on 3D vision and language at KAUST. <strong>CoT3DRef</strong> breaks 3D visual grounding into steps you can inspect, finding the anchor objects first and the target second, which makes it far more data-efficient than predicting the answer in one shot.",
      "Alongside it, <strong>3DCoMPaT++</strong> contributed a large-scale 3D vision dataset for compositional recognition, where the job is to recognise not just objects but their parts and what those parts are made of."
    ],
    links: [
      { label: "CoT3DRef (ICLR 2024)", url: "https://arxiv.org/abs/2310.06214" },
      { label: "3DCoMPaT++ (TPAMI)", url: "https://arxiv.org/abs/2310.18511" }
    ]
  }
];

/* ---------- Publications (section 03) ---------- */
const PAPERS = [
  {
    year: "2026",
    kind: "Preprint",
    title: "Self-Referenced Social Preferences: Cooperation without Observing Others' Rewards",
    authors: "<b>Mohamed A. Mohamed</b>, Harshil Kotamreddy, Marcos Menon José",
    venue: "Preprint on arXiv:2610.07881",
    status: "Under review",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=5OnlOKMAAAAJ&citation_for_view=5OnlOKMAAAAJ:2osOgNQ5qMEC",
    abs: "Agents learn a model of their own reward, apply it to peers' observed transitions, and feed those self-referenced assessments into standard social preferences, producing cooperation, and often more equitable returns, without any access to others' reward signals.",
    url: "https://arxiv.org/abs/2610.07881"
  },
  {
    year: "2026",
    kind: "RLC",
    title: "The Cell Must Go On: Agar.io for Continual Reinforcement Learning",
    authors: "<b>Mohamed A. Mohamed</b>, Kateryna Nekhomiazh, Vedant Vyas, Marcos M. José, Andrew Patterson, Marlos C. Machado",
    venue: "Reinforcement Learning Conference · Reinforcement Learning Journal · arXiv:2505.18347",
    status: "Published",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=5OnlOKMAAAAJ&citation_for_view=5OnlOKMAAAAJ:9yKSN-GCB0IC",
    cites: 3,
    abs: "A continual RL research platform built on Agar.io: non-episodic, high-dimensional, partially observable, with continuous actions and dynamics that keep evolving. Benchmarks DQN, PPO, and SAC, plus three continual-learning methods that barely improve on them, which suggests the challenge reaches beyond the stability-plasticity dilemma.",
    url: "https://arxiv.org/abs/2505.18347"
  },
  {
    year: "2025",
    kind: "TPAMI",
    title: "3DCoMPaT++: An Improved Large-Scale 3D Vision Dataset for Compositional Recognition",
    authors: "Habib Slim, Xiang Li, Yuchen Li, Mahmoud Ahmed, <b>Mohamed Ayman</b>, et al.",
    venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    status: "Published",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=5OnlOKMAAAAJ&citation_for_view=5OnlOKMAAAAJ:u-x6o8ySG0sC",
    cites: 33,
    abs: "A large-scale 3D vision dataset for compositional recognition of objects together with their parts and the materials those parts are made of.",
    url: "https://arxiv.org/abs/2310.18511"
  },
  {
    year: "2024",
    kind: "ICLR",
    title: "CoT3DRef: Chain-of-Thoughts Data-Efficient 3D Visual Grounding",
    authors: "Eslam Abdelrahman, <b>Mohamed Ayman</b>, Mahmoud Ahmed, Habib Slim, Mohamed Elhoseiny",
    venue: "International Conference on Learning Representations",
    status: "Published",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=5OnlOKMAAAAJ&citation_for_view=5OnlOKMAAAAJ:u5HHmVD_uO8C",
    cites: 27,
    abs: "Recasting 3D visual grounding as an interpretable chain of steps, anchors first and then the target, which substantially improves data efficiency over predicting the referent directly.",
    url: "https://openreview.net/forum?id=ORUiqcLpV6"
  }
];

/* ---------- Experience (section 04) ---------- */
const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Amazon Web Services",
    period: "Sep 2025–Present",
    kind: "Industry",
    now: true,
    points: [
      "Cut AWS region build-model creation from days to about five minutes with an AI-driven code generation system on Amazon Bedrock.",
      "Started an AI automation program for EKS operational workflows, targeting the highest-volume repetitive work: build-model authoring, pipeline failure triage, ticket resolution, dashboard analysis.",
      "Built cross-partition observability infrastructure and data pipelines that adapt to regional constraints, enabling zero-touch deployments."
    ]
  },
  {
    role: "Graduate Research Assistant, Reinforcement Learning",
    org: "University of Alberta, Machado Lab",
    period: "Apr 2024–Aug 2025",
    kind: "Research",
    points: [
      "Built a C++/Python continual RL environment modelling gradual and abrupt distribution shift in episodic and non-episodic settings, across 15 simulation scenarios.",
      "Benchmarked DQN, PPO, and SAC on policy stability, convergence speed, and sample efficiency to validate the environment as a continual RL benchmark.",
      "Roughly doubled throughput via CUDA rendering and asynchronous inference: 1,200 to 2,200 steps/second on grid observations, and 800 to 1,600 on screen observations.",
      "Added quad-tree and precision-approximation structures to cut computational overhead, and a CNN feature-extraction pipeline for compact state representations.",
      "Containerised with Docker behind a CI/CD pipeline of 25+ automated tests; chased memory leaks with Valgrind and regressions with Google Benchmark."
    ]
  },
  {
    role: "Software Engineer (Contract)",
    org: "University of Alberta",
    period: "Oct 2024–Apr 2025",
    kind: "Industry",
    points: [
      "Built a distributed simulation module in C# and C++ against the High-Level Architecture standard, cutting communication latency by 20%.",
      "Designed a PostgreSQL schema managing ~500k records across six federates for centralised performance analysis and real-time monitoring.",
      "Embedded the CPython interpreter in a C# application so Python analysis and ML workflows could run inside the .NET environment."
    ]
  },
  {
    role: "Machine Learning Research Intern",
    org: "KAUST",
    period: "Feb 2023–Oct 2023",
    kind: "Research",
    points: [
      "Implemented chain-of-thought ground-truth generation and a rule-based anchors parser for 3D visual grounding, published at ICLR 2024.",
      "Improved 3DCoMPaT++ segmentation with PointNet++ and diffusion-based refinement; co-authored the TPAMI paper on the dataset."
    ]
  },
  {
    role: "Undergraduate Research Assistant",
    org: "American University in Cairo",
    period: "Sep 2022–Apr 2023",
    kind: "Research",
    points: [
      "Designed an inverted-index query execution engine for disk-based approximate nearest-neighbour search, reaching a 6× speedup over Microsoft's SPANN at comparable recall.",
      "Improved retrieval accuracy with autoencoder and transformer embeddings over billion-scale datasets."
    ]
  },
  {
    role: "Applied Scientist Intern",
    org: "Microsoft, Zcode team",
    period: "Jul 2022–Sep 2022",
    kind: "Research",
    points: [
      "Developed a meta-learning data distillation algorithm cutting dataset size by 99.9% while holding ~95% of model performance across transformer architectures.",
      "Benchmarked across NLP datasets, improving on the state of the art in machine translation, classification, and named-entity recognition."
    ]
  },
  {
    role: "Software Engineer",
    org: "Suitera",
    period: "Sep 2021–Apr 2022",
    kind: "Industry",
    points: [
      "Found the bottleneck in slab data processing for complex circuit and multi-die package simulations, then wrote C++ approximation algorithms that simplify the geometry while preserving the structure that matters.",
      "Built aggregation for similar slab segments, cutting simulation runtime; validated with custom GoogleTest fixtures and profiled with gdb and Valgrind.",
      "Wrote OpenGL 3D visualisations modelling circuit structure and current flow."
    ]
  },
  {
    role: "Full-Stack Software Engineering Intern",
    org: "Envelope.network",
    period: "Jun 2021–Aug 2021",
    kind: "Industry",
    points: [
      "Built a cross-browser extension and a five-stage recommendation pipeline ranking content from behavioural analysis for 500+ users, at 0.76 precision.",
      "Wrote 10+ RESTful endpoints in Scala with Finatra, and wired PostgreSQL through the Slick functional relational mapper."
    ]
  }
];

const EDUCATION = [
  {
    degree: "MSc, Computer Science (Artificial Intelligence)",
    school: "University of Alberta",
    period: "2023–2025",
    detail: "GPA 4.0 / 4.0 · Supervisor: Prof. Marlos C. Machado · Travel Award 2024/25, Graduate Research Assistantship"
  },
  {
    degree: "BSc, Computer Engineering (Minor in Mathematics)",
    school: "American University in Cairo",
    period: "2018–2023",
    detail: "GPA 3.97 / 4.0 · Dean's List, four consecutive years · Al-Ghurair Scholarship · Bronze Medal, ECPC 2023"
  }
];

const SKILLS = [
  { group: "Languages", items: ["Python", "C / C++", "C#", "Java", "Scala", "Rust", "JavaScript", "SQL"] },
  { group: "ML / AI", items: ["PyTorch", "JAX", "TensorFlow", "Lightning", "Hugging Face", "scikit-learn", "XGBoost"] },
  { group: "RL", items: ["CleanRL", "PFRL", "Stable-Baselines3", "RLlib", "Gymnasium"] },
  { group: "NLP / CV", items: ["Transformers", "spaCy", "NLTK", "OpenCV", "PointNet++"] },
  { group: "Infrastructure", items: ["AWS (CDK, Lambda, EC2)", "Docker", "Kubernetes", "CI/CD", "PostgreSQL", "CUDA", "gRPC"] },
  { group: "Low-level", items: ["x86-64 asm", "RISC-V", "Verilog", "OpenMP", "OpenGL", "CMake", "Valgrind"] }
];

/* ---------- Teaching (section 04) ---------- */
const TEACHING = [
  {
    role: "Graduate Teaching Assistant",
    org: "University of Alberta",
    courses: ["Fundamentals of Reinforcement Learning", "Introduction to Machine Learning", "Fundamentals of Databases", "Introduction to Networks"]
  },
  {
    role: "Undergraduate Teaching Assistant",
    org: "American University in Cairo",
    courses: ["Introduction to Machine Learning", "Deep Learning in Practice", "Analysis & Design of Algorithms", "Fundamentals of Computing II"]
  }
];

/* ---------- Projects (section 05) ---------- */
const AREAS = ["Learning", "Systems", "Hardware", "Tools"];

const PROJECTS = [
  {
    name: "AgarCL",
    repo: "AgarCL", owner: "machado-research",
    area: "Learning", lang: "C++", stars: 28,
    desc: "Agar.io as a continual reinforcement learning environment: high-dimensional observations, dynamics that change as the agent grows, and no natural episode boundary to reset behind."
  },
  {
    name: "AgarCL Benchmark",
    repo: "AgarCL-benchmark", owner: "machado-research",
    area: "Learning", lang: "Python", stars: 4,
    desc: "Benchmark harness and baselines for AgarCL, covering value-based and policy-gradient methods under gradual and abrupt distribution shift."
  },
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
    desc: "Cycle-accurate model of an out-of-order 16-bit RISC processor using Tomasulo's algorithm without speculation, with reservation stations, register renaming, and a common data bus."
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
    name: "EM & Affinity Propagation from Scratch",
    repo: "Expectation-Maximization-and-Afainity-Propgation-implementation-from-scratch",
    area: "Learning", lang: "Jupyter", stars: 0,
    desc: "Both clustering algorithms implemented from the maths up, with no library calls, to see exactly where responsibilities and message passing come from."
  },
  {
    name: "Sentiment-Driven Trading Strategy",
    repo: "Trading-Strategy-with-Sentiment-Analysis",
    area: "Learning", lang: "Jupyter", stars: 0,
    desc: "Predicting close price from news and social sentiment features, then turning the signal into a strategy and asking whether it survives transaction costs."
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
    desc: "A competitive-programming reference implementation set: algorithms, data structures, and helpers kept ready to paste under time pressure."
  },
  {
    name: "Premier League Database",
    repo: "PremierLeague",
    area: "Tools", lang: "Jupyter", stars: 0,
    desc: "Schema design, normalisation, and query work over football season data, with analysis notebooks on top of the relational model."
  }
];
