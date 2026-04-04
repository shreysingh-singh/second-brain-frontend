import { DeleteBinIcon } from "../icons/deletIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { ShareIcon } from "../icons/shareIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
  title: string;
  link: string;
  icon: "youtube" | "twitter" | "notes";
  onDelete: () => void;
  type: "youtube" | "twitter" | "document";
}

const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

export function Card({ title, link, onDelete, type, icon }: CardProps) {
  return (
    <div className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 hover:border-purple-200 flex flex-col h-full">
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 bg-slate-50 rounded-lg text-slate-600 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors flex-shrink-0">
              {icon === "twitter" && <TwitterIcon />}
              {icon === "youtube" && <YoutubeIcon />}
              {icon === "notes" && <DocumentIcon />}
            </div>
            <h3 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-2">
              {title}
            </h3>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 sm:p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
            >
              <ShareIcon />
            </a>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this content?")) {
                  onDelete();
                }
              }}
              className="p-1 sm:p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600"
            >
              <DeleteBinIcon />
            </button>
          </div>
        </div>
        <div className="mt-2 sm:mt-4 flex-1">
          <div className="overflow-hidden rounded-lg bg-slate-50">
            {type === "youtube" && (
              <iframe
                className="w-full h-32 sm:h-40 md:h-48 border-0"
                src={getYouTubeEmbedUrl(link)}
                allowFullScreen
              ></iframe>
            )}
          </div>
          {type === "twitter" && (
            <div className="overflow-hidden h-32 sm:h-40 md:h-48 rounded-lg">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}
        </div>
      </div>
      <div className="px-3 sm:px-5 py-3 sm:py-4 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block bg-purple-50 text-purple-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium">
            #productive
          </span>
          <span className="text-xs text-slate-500 flex-shrink-0">Today</span>
        </div>
      </div>
    </div>
  );
}
