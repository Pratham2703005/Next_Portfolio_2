export const projects = [
  {
    image: "/project/prithview.png",
    title: "PrithView - SIH 2024 Finalist Project",
    description:
      "🏆 PROBLEM: ISRO needed an efficient way to analyze satellite imagery for urban planning and environmental monitoring, but existing tools were complex and inaccessible to non-experts. SOLUTION: Built an intuitive web platform that democratizes satellite image analysis through semantic segmentation. Users can simply select an ROI on satellite imagery and get automated feature detection (urban areas, forests, water bodies) with exportable results. IMPACT: Selected as top 48/1200+ teams in Smart India Hackathon 2024. Reduces satellite image analysis time from hours to minutes, making geospatial intelligence accessible to researchers and planners nationwide.",
    repoLink: "https://github.com/Pratham2703005/Semantic-Segmentation-SIH",
    liveLink: "https://semantic-segmentation-sih.vercel.app/",
    techStack: ["/skills/React.svg", "/skills/tail.svg", "/skills/python.svg", "/skills/mui.svg", "/skills/js.svg", "/skills/firebase.svg"],
  },
  {
    image: "/project/meetCollab.png",
    title: "MeetCollab - Real-Time Collaborative Meeting Platform",
    description:
      "🎥 PROBLEM: Remote teams need more than just video calls — they need shared code editors, whiteboards, and role-controlled collaboration in a single space. SOLUTION: Built a full-stack meeting platform with WebSocket-powered real-time presence, WebRTC video/audio, a shared Monaco code editor, collaborative canvas, and a role-based permission engine (Admin/Editor/Viewer). Integrated an AI companion for meeting summaries and code assistance. Subscription gating via Stripe with free/pro plan enforcement. IMPACT: End-to-end demonstration of systems-level thinking — distributed state sync, Redis-backed session management, WebRTC signaling, AI cost isolation, and multi-tenant architecture — all shipped as a single cohesive product.",
    repoLink: "https://github.com/Pratham2703005/MeetCollab",
    liveLink: "",
    techStack: ["/skills/next.svg", "/skills/React.svg", "/skills/TypeScript.svg", "/skills/Node.js.svg", "/skills/socketio.svg", "/skills/mongo.svg", "/skills/redis.svg"],
  },
  {
    image: "/project/agraEcom.png",
    title: "AgraEcom - Modern E-commerce Platform",
    description:
      "🛒 PROBLEM: Local businesses lacked a scalable, user-friendly e-commerce solution to showcase and manage their products online. SOLUTION: Built a full-stack e-commerce platform with real-time search, advanced filtering, secure checkout, and dynamic offers. Developed using Next.js 15, Prisma, and MongoDB with responsive design and admin management. IMPACT: Enabled a local store to receive 100+ orders within the first month, while offering complete admin control over inventory, orders, and branding through an intuitive dashboard.",
    repoLink: "https://github.com/Pratham2703005/AgraEcom",
    liveLink: "https://agraecom.vercel.app/products",
    techStack: ["/skills/next.svg", "/skills/React.svg", "/skills/prisma.svg", "/skills/cloudinary.svg", "/skills/TypeScript.svg", "/skills/tail.svg", "/skills/mongo.svg"],
  },
  {
    image: "/project/robotToast.png",
    title: "robot-toast - Published npm Package",
    description:
      "📦 PROBLEM: Toast notification libraries are either too opinionated or too bare-bones, and none bring any personality to developer tooling. SOLUTION: Built and published a zero-dependency, framework-agnostic toast library featuring an animated robot companion — fully draggable, typewriter-style messages, 4 transitions, 6 positions, 3 themes, and 16 built-in robot variants. SSR-safe with Next.js/Nuxt support, ESM + CJS builds, and complete TypeScript declarations out of the box. IMPACT: Live on npm as robot-toast. Actively maintained with a dedicated demo site. Demonstrates end-to-end open-source ownership — from API design and TypeScript authoring to package publishing and documentation.",
    repoLink: "https://www.npmjs.com/package/robot-toast",
    liveLink: "https://robot-toast.vercel.app/",
    techStack: ["/skills/TypeScript.svg", "/skills/js.svg", "/skills/next.svg"],
  },
  {
    image: "/project/pdfAnalyzer.png",
    title: "PDF Analyzer - AI Powered Document Processing",
    description:
      "📄 PROBLEM: Semantic chunking of PDFs is an unsolved challenge in document AI due to inconsistent formats and weak structural cues. SOLUTION: Built a powerful AI system using OpenAI & Xenova models to semantically chunk, summarize, and enable contextual chat over PDFs. Designed intelligent hooks for each stage — extraction, embedding, and response generation. IMPACT: Capable of processing 1000+ page PDFs with 90% faster query resolution. Featured in 100 AI Agents Hackathon Winner Gallery for solving a critical document AI bottleneck.",
    repoLink: "https://github.com/Pratham2703005/PDF_analyzer",
    liveLink: "https://pdf-analyzer-blond.vercel.app/",
    techStack: ["/skills/next.svg", "/skills/React.svg", "/skills/TypeScript.svg", "/skills/tail.svg", "/skills/prisma.svg", "/skills/mongo.svg", "/skills/openai.svg"],
  },
  {
    image: "/project/animeQuiz.png",
    title: "Anime Quiz Platform",
    description:
      "🎯 PROBLEM: Anime fans lacked an engaging, competitive platform to test their knowledge while connecting with the community. Existing quiz apps were basic and didn't capture the excitement of anime culture. SOLUTION: Developed a full-stack quiz platform with real-time leaderboards, lifeline systems, and social features. Implemented advanced state management for seamless user experience and scalable architecture supporting thousands of concurrent users. IMPACT: Created an addictive gaming experience with category selection, achievement systems, and community competition driving repeat engagement.",
    liveLink: "https://anime-quiz-next.vercel.app/",
    repoLink: "https://github.com/Pratham2703005/Anime-Quiz-Next-",
    techStack: ["/skills/next.svg", "/skills/React.svg", "/skills/prisma.svg", "/skills/zustand.svg", "/skills/mongo.svg", "/skills/tail.svg"],
  },
  {
    image: "/project/canvasStudio.png",
    title: "Canvas Studio - Browser-Based Drawing Tool",
    description:
      "🎨 PROBLEM: Digital artists needed a lightweight, browser-based drawing tool without expensive software or complex setups. SOLUTION: Built a drawing application with custom brush engines, multi-page support, and advanced export capabilities — engineered from scratch using the HTML5 Canvas API with optimized performance for both desktop and mobile. IMPACT: A zero-install creative tool accessible from any device, with an intuitive interface covering the core feature set most artists actually use day-to-day.",
    repoLink: "https://github.com/Pratham2703005/Canvas-studio",
    liveLink: "https://canvas-studio-pk.vercel.app/",
    techStack: ["/skills/React.svg", "/skills/tail.svg", "/skills/js.svg", "/skills/html.svg", "/skills/css.svg"],
  },
];