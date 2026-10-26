// Edit file ini untuk personalize website. URL harus full https://
export const site = {
  name: "rizzhold",
  status: "lagi ngulik sesuatu",
  description: "An Indonesian SMK RPL student exploring software engineering, linguistics, the web, and whatever catches my curiosity.",
  note: "made with curiosity, somewhere in Indonesia.",
  avatar: "assets/avatar-cat.jpg",

  // Analytics opsional. Isi setelah website terdaftar di Umami Cloud.
  // Jangan pernah memasukkan password atau API secret ke frontend.
  analytics: {
    provider: "umami",
    scriptUrl: "https://cloud.umami.is/script.js",
    websiteId: "",
    publicDashboardUrl: ""
  },

  aboutTitle: "Still figuring things out.",
  about: "Anak Indonesia yang lagi belajar RPL di SMK. Suka ngulik web, Android, tools, automation, open source, dan bahasa. Masih eksplor banyak hal—pelan-pelan dibikin nyata.",
  tags: ["SMK · RPL", "software engineering", "linguistics", "web & Android", "tools / automation", "open source"],
  quote: "Keep learning. Make things. Stay curious.",
  quoteCredit: "a small reminder",
  ticker: ["RPL", "WEB DEVELOPMENT", "ANDROID", "LINGUISTICS", "OPEN SOURCE", "AUTOMATION", "LITTLE EXPERIMENTS"],

  passions: [
    { icon: "assets/software-web.svg", title: "Software & web", description: "Learning by building websites, interfaces, and small experiments." },
    { icon: "assets/linguistics.svg", title: "Linguistics", description: "Curious about language, how people use it, and how meaning works." },
    { icon: "assets/android-devices.svg", title: "Android & devices", description: "Exploring Android, device communities, and the little details of tech." },
    { icon: "assets/tools-automation.svg", title: "Tools & automation", description: "Finding ways to make repetitive things simpler and workflows more useful." },
    { icon: "assets/open-source.svg", title: "Open source", description: "Learning from projects, sharing ideas, and exploring what the community builds." },
    { icon: "assets/music-internet.svg", title: "Music & internet", description: "Keeping a soundtrack nearby while exploring the internet." }
  ],

  music: {
    title: "Kasih Arahan",
    artist: "YouTube Music",
    url: "https://music.youtube.com/watch?v=WjHJGmQYKYo&si=OoblHDiX877h9SWj",
    artwork: "assets/music-cover.svg"
  },

  socials: [
    { label: "GitHub", url: "https://github.com/rizzhold", mark: "↗" },
    { label: "Telegram", url: "https://t.me/rizzhold", mark: "↗" }
  ]
};
