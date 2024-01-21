"use client";
import ScrollWrapper from "@/app/components/scroll-wrapper";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import ProfilePicture from "@/app/profile/components/profile-picture";
import { useEffect, useState } from "react";
import { createComment } from "@/app/actions";
import { getComments } from "@/app/actions";
import { FlatComments } from "@/app/actions";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

interface Props {
  postId: number;
  username?: string | null;
  userAvatar?: string | null;
}
export default function Comments({ postId, username, userAvatar }: Props) {
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState<FlatComments>([]);
  const [commentCount, setCommentCount] = useState<number>(0);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createComment(postId, comment);
    setCommentCount((prev) => prev + 1);
    setComment("");
  }
  useEffect(() => {
    const getCommentsArray = async () => {
      const comments = await getComments(postId);
      setCommentArray(comments);
    };
    getCommentsArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentCount]);

  return (
    <>
      <ScrollWrapper>
        <div className="bg-neutral-50 overflow-hidden border-[1px] border-neutral-900 border-opacity-40 mb-4 rounded-sm w-full">
          <div className="flex flex-col gap-4 px-4 py-5">
            <div className="flex items-start space-x-4">
              <div className="min-w-0 flex-1">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="overflow-hidden rounded-sm shadow-sm border border-neutral-900 border-opacity-40">
                    <div className="flex gap-2 items-center flex-shrink-0 m-4">
                      <ProfilePicture
                        priority={false}
                        image={userAvatar}
                        size={30}
                      />
                      <span>{username}</span>
                    </div>
                    <label htmlFor="comment" className="sr-only">
                      Add your comment
                    </label>
                    <textarea
                      rows={3}
                      name="comment"
                      id="comment"
                      className="block w-full h-48 resize-none border-0 bg-transparent px-4 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                      placeholder="Add your comment..."
                      value={comment}
                      onChange={handleChange}
                    />

                    {/* Spacer element to match the height of the toolbar */}
                    <div className="py-2" aria-hidden="true">
                      {/* Matches height of button in toolbar (1px border + 36px content height) */}
                      <div className="py-px">
                        <div className="h-9" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                    <div className="flex items-center space-x-5">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-500"
                        >
                          <PaperClipIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Attach a file</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="submit"
                        className="bg-neutral-200 hover:bg-neutral-300 rounded px-3 py-2 text-lg"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* consider making this another component for readability */}
            <div className="flex flex-col p-2 gap-4">
              {commentArray.map((comment, index) => {
                console.log(comment);
                return (
                  <Comment key={comment.id} {...comment}/>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollWrapper>
    </>
  );
}

interface CommentProps {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: Date;
  name: string | null;
  image: string | null;
  
}
function Comment({
  id,
  text,
  createdAt,
  updatedAt,
  name,
  image,
  
}: CommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ScrollWrapper classNames="flex flex-col gap-4 p-4" key={id}>
      <div className="flex gap-2 items-center">
        <ProfilePicture priority={false} image={image} size={30} />
        <span className="text-xs">{name}</span>
      </div>
      <div className="pl-[38px] w-full flex flex-col gap-2">
        <p>{text}</p>
        <button className="flex gap-1 text-xs self-start"><ChatBubbleBottomCenterTextIcon className="h-4 w-4 stroke-1"/>Reply</button>
      </div>

      {/* {!isLast ? (
        <div className="border-b w-[calc(100%-76px)] border-neutral-900 border-opacity-20 self-center" />
      ) : null} */}
    </ScrollWrapper>
  );
}
