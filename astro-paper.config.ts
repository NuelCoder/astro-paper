import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://iseoluwa-badejo.vercel.app/", // <-- Your new professional URL goes here
    title: "Iseoluwa Badejo | Backend Engineer",
    description: "Backend Developer specializing in Java, Spring Boot, and event-driven architectures.",
    author: "Iseoluwa Badejo Emmanuel",
    profile: "https://github.com/NuelCoder",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Africa/Lagos",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/NuelCoder" },
    { name: "linkedin", url: "https://www.linkedin.com/in/iseoluwa-badejo-340421321" },
    { name: "mail",     url: "mailto:badejoiseoluwa@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});