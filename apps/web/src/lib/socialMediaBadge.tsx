import { SOCIAL_MEDIA_ICONS } from "@/lib/social-media-icons";

export default function SocialMediaBadge({ 
  platform, 
  url,
  size = "default" 
}: { 
  platform: string;
  url?: string;
  size?: "small" | "default" | "large";
}) {
  const Icon = SOCIAL_MEDIA_ICONS[platform];
  
  const sizeClasses = {
    small: "w-4 h-4 text-xs px-2 py-1",
    default: "w-4 h-4 text-sm px-3 py-1", 
    large: "w-5 h-5 text-base px-4 py-2"
  };

  const content = (
    <div className={`flex items-center gap-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors ${sizeClasses[size]}`}>
      {Icon ? (
        <Icon className={sizeClasses[size].split(' ')[0] + ' ' + sizeClasses[size].split(' ')[1]} />
      ) : (
        <span className="font-extrabold">{platform.charAt(0).toUpperCase()}</span>
      )}
      <span className="truncate">{platform}</span>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:scale-105 transition-transform"
      >
        {content}
      </a>
    );
  }

  return content;
}