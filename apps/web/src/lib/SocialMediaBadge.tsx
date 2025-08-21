import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { SiHashnode, SiDevdotto } from "react-icons/si";

export const SOCIAL_ICONS: Record<string, IconType> = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  YouTube: FaYoutube,
  Hashnode: SiHashnode,
  "Dev.to": SiDevdotto,
};

export default function SocialMediaBadge({ name }: { name: string }) {
  const Icon = SOCIAL_ICONS[name];
  return (
    <div className="flex items-center  rounded bg-transparent">
      {Icon ? (
        <Icon className="w-4 h-4" />
      ) : (
        <span className="font-extrabold">{name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}
