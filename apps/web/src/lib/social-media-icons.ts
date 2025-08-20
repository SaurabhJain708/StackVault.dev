import { IconType } from "react-icons/lib";
import {
  SiLinkedin,
  SiGithub,
  SiInstagram,
  SiFacebook,
  SiYoutube,
  SiHashnode,
  SiDevdotto,
  SiDiscord,
  SiReddit,
  SiTelegram,
  SiWhatsapp,
  SiSlack,
  SiMedium,
  SiStackoverflow,
  SiTiktok,
  SiSnapchat,
  SiTwitch,
  SiSpotify,
  SiBehance,
  SiDribbble,
  SiCodepen,
  SiGitlab,
  SiBitbucket,
  SiMastodon,
  SiPinterest,
  SiThreads,
  SiX,
} from "react-icons/si";
import { FaGlobe } from "react-icons/fa";

export const SOCIAL_MEDIA_ICONS: Record<string, IconType> = {
  // Professional Networks
  LinkedIn: SiLinkedin,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Bitbucket: SiBitbucket,
  "Stack Overflow": SiStackoverflow,
  
  // Social Media Platforms
  Twitter: SiX, // Twitter is now X
  X: SiX,
  Instagram: SiInstagram,
  Facebook: SiFacebook,
  YouTube: SiYoutube,
  TikTok: SiTiktok,
  Snapchat: SiSnapchat,
  Pinterest: SiPinterest,
  Threads: SiThreads,
  Mastodon: SiMastodon,
  
  // Messaging Platforms
  Discord: SiDiscord,
  Telegram: SiTelegram,
  WhatsApp: SiWhatsapp,
  Slack: SiSlack,
  
  // Content Platforms
  Medium: SiMedium,
  "Dev.to": SiDevdotto,
  Hashnode: SiHashnode,
  Reddit: SiReddit,
  
  // Creative Platforms
  Behance: SiBehance,
  Dribbble: SiDribbble,
  CodePen: SiCodepen,
  
  // Entertainment
  Twitch: SiTwitch,
  Spotify: SiSpotify,
  
  // Default/Fallback
  Website: FaGlobe,
  Other: FaGlobe,
};

// Updated social platforms list with better organization and more platforms
export const SOCIAL_PLATFORMS = [
  { name: "LinkedIn", url: "https://linkedin.com/in/", category: "Professional" },
  { name: "GitHub", url: "https://github.com/", category: "Professional" },
  { name: "GitLab", url: "https://gitlab.com/", category: "Professional" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/", category: "Professional" },
  { name: "Twitter", url: "https://twitter.com/", category: "Social" },
  { name: "X", url: "https://x.com/", category: "Social" },
  { name: "Instagram", url: "https://instagram.com/", category: "Social" },
  { name: "Facebook", url: "https://facebook.com/", category: "Social" },
  { name: "YouTube", url: "https://youtube.com/", category: "Content" },
  { name: "TikTok", url: "https://tiktok.com/@", category: "Social" },
  { name: "Medium", url: "https://medium.com/@", category: "Content" },
  { name: "Dev.to", url: "https://dev.to/", category: "Content" },
  { name: "Hashnode", url: "https://hashnode.com/@", category: "Content" },
  { name: "Discord", url: "https://discord.gg/", category: "Community" },
  { name: "Reddit", url: "https://reddit.com/u/", category: "Community" },
  { name: "Behance", url: "https://behance.net/", category: "Creative" },
  { name: "Dribbble", url: "https://dribbble.com/", category: "Creative" },
  { name: "CodePen", url: "https://codepen.io/", category: "Creative" },
  { name: "Twitch", url: "https://twitch.tv/", category: "Entertainment" },
  { name: "Spotify", url: "https://open.spotify.com/user/", category: "Entertainment" },
];