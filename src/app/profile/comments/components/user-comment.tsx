import ScrollWrapper from "@/app/components/scroll-wrapper";
import { dashify } from "@/utils/formaters";
import Link from "next/link";
import ProfilePicture from "../../components/profile-picture";
import { CommentArrayByUserId } from "@/app/actions";
export default function UserComment({
  title,
  name,
  id,
  text,
  createdAt,
  updatedAt,
  postId,
  image,
}: CommentArrayByUserId[number]) {
  return (
    <ScrollWrapper>
      <div className="bg-neutral-50 overflow-hidden border-[1px] border-neutral-900 border-opacity-40 mb-4 rounded-sm">
        <div className="flex flex-col gap-4 px-4 pt-5 pb-3">
          <div className="flex items-center justify-between w-full">
            <h1 className="line-clamp-1 text-2xl font-extralight ">{title}</h1>
            <div className="flex flex-col items-end">
              <Link href={`/${dashify(title)}/${postId}`}>
                <span className="text-sm hover:text-neutral-400">See post</span>
              </Link>
              <Link href={`/${dashify(title)}/${postId}#${id}`}>
                <span className="text-sm hover:text-neutral-400">
                  See comment
                </span>
              </Link>
            </div>
          </div>

          <div className="flex w-full justify-start items-center gap-2">
            <ProfilePicture size={38} image={image} priority={false} />
            <div className="flex flex-col">
              <span className="text-base">{name}</span>
              <span className="text-xs">{createdAt}</span>
            </div>
          </div>
          <Link href={`/${dashify(title)}/${postId}#${id}`}>
            <p className="line-clamp-4">{text}</p>
          </Link>
        </div>
      </div>
    </ScrollWrapper>
  );
}
