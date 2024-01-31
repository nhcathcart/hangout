import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import ScrollWrapper from "./scroll-wrapper";
import Image from "next/image";
import ProfilePicture from "../profile/components/profile-picture";
import Link from "next/link";
import { dashify } from "@/utils/formaters";
import { LinkOrEmbed } from "./links/link-or-embed";
interface Props {
  title: string;
  id: number;
  image?: string | null;
  name?: string | null;
  link?: string | null;
  text?: string | null;
  totalComments?: number | null;
  createdAt: string;
}
export default function PostCard({
  id,
  title,
  link,
  text,
  name,
  createdAt,
  image,
  totalComments,
}: Props) {
  return (
    <ScrollWrapper>
      <div className="bg-neutral-50 overflow-hidden border-[1px] border-neutral-900 border-opacity-40 mb-4 rounded-sm">
        <div className="flex flex-col gap-4 px-4 pt-5 pb-3 w-full">
          <div className="flex w-full justify-between items-center">
            <Link href={`/${dashify(title)}/${id}`}>
              <h1 className="line-clamp-1 text-2xl font-extralight hover:text-neutral-400">
                {title}
              </h1>
            </Link>
          </div>

          {link ? <LinkOrEmbed link={link} /> : null}
          {text ? <p className="line-clamp-4">{text}</p> : null}

          <div className="flex justify-between items-center  mr-[-6px]">
            <div className="flex w-fit justify-start items-center gap-2">
              <ProfilePicture size={38} image={image} priority={false} />
              <div className="flex flex-col">
                <span className="text-base">{name}</span>
                <span className="text-xs">{createdAt}</span>
              </div>
            </div>
            <Link
              href={`/${dashify(title)}/${id}#comment`}
              className="hover:text-neutral-400 flex items-center mb-[-20px]"
            >
              <ChatBubbleBottomCenterTextIcon className="stroke-1 h-4 w-4 " />
              <span className="ml-1">6</span>
            </Link>
          </div>
        </div>
      </div>
    </ScrollWrapper>
  );
}
