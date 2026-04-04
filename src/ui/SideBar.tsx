import { DocumentIcon } from "../icons/documentIcon";
import { LinkIcon } from "../icons/link";
import { TagIcon } from "../icons/tag";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItems } from "./SIdeBarItems";

export function SideBar() {
  return (
    <div className="hidden md:flex md:fixed left-0 top-0 md:h-screen md:w-72 bg-white border-r border-slate-200 shadow-lg overflow-y-auto flex-col">
      <div className="sticky top-0 bg-white z-10 px-6 py-8 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-15 h-12 rounded-lg bg-gradient-to-br from-purple-600 flex items-center justify-center flex-shrink-0">
            <img src="./public/logo.png" alt="Logo" className="h-15 w-12" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-slate-900 text-lg truncate">
              Second Brain
            </h1>
            <p className="text-xs text-slate-500 truncate">Save your ideas</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 space-y-2">
        <SideBarItems text="Twitter" icon={<TwitterIcon />} />
        <SideBarItems text="Youtube" icon={<YoutubeIcon />} />
        <SideBarItems text="Documents" icon={<DocumentIcon />} />
        <SideBarItems text="Links" icon={<LinkIcon />} />
        <SideBarItems text="Tags" icon={<TagIcon />} />
      </div>
    </div>
  );
}
