import ScrollWrapper from "@/app/components/scroll-wrapper";
import ProfilePicture from "@/app/profile/components/profile-picture";

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
export default function PostView({
  title,
  id,
  image,
  name,
  link,
  text,
  totalComments,
  createdAt,
}: Props) {
  return (
    <ScrollWrapper>
      <div className="bg-neutral-50 overflow-hidden border-[1px] border-neutral-900 border-opacity-40 mb-4 rounded-sm w-full">
        <div className="flex flex-col gap-4 px-4 py-5">
          <h1 className="text-2xl font-extralight">{title}</h1>
          <div className="flex w-full justify-start items-center gap-2">
            <ProfilePicture size={38} image={image} priority={false} />
            <div className="flex flex-col">
              <span className="text-base">{name}</span>
              <span className="text-xs">{createdAt}</span>
            </div>
          </div>
          {link ? <a href={link}>{link}</a> : null}
          {text ? <p>{text}</p> : null}
        </div>
      </div>
    </ScrollWrapper>
  );
}
