import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  link?: string | null;
  text?: string | null;
  totalComments?: number | null;
}
export default function PostCard({ title, link, text, totalComments }: Props) {
  return (
    <div className="bg-neutral-50 overflow-hidden border-[1px] border-neutral-900 mb-4 rounded-sm">
      <div className="flex flex-col gap-4 px-4 pt-5 pb-3">
        <h1 className="line-clamp-1 text-2xl font-extralight">{title}</h1>
        {link ? <a href={link}>{link}</a> : null}
        {text ? <p className="line-clamp-4">{text}</p> : null}
        <div className="flex justify-end items-center mb-[-6px] mr-[-6px]">
          <ChatBubbleBottomCenterTextIcon className="stroke-1 h-4 w-4" />
          <span className="ml-1">6</span>
        </div>
      </div>
    </div>
  );
}
