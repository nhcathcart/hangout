"use client";
import ScrollWrapper from "@/app/components/scroll-wrapper";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import ProfilePicture from "@/app/profile/components/profile-picture";
import { useEffect, useState } from "react";
import {
  createComment,
  createReply,
  getCommentsRecursive,
  NestedComment,
} from "@/app/actions";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

interface Props {
  postId: number;
  username?: string | null;
  userAvatar?: string | null;
}
//Individual comment referenced here is compoenent is below 
export default function Comments({ postId, username, userAvatar }: Props) {

  //states
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState<NestedComment[]>([]);
  const [commentCount, setCommentCount] = useState<number>(0);
  
  //form handlers
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createComment(postId, comment);
    incrementCommentCount();
    setComment("");
  }
  function incrementCommentCount() { //this is a hacky solution to the problem of the comments not updating when a new comment is added.
    setCommentCount((prev) => prev + 1);
  }

  //effects
  useEffect(() => {
    //runs on mount, and any time there is a new comment
    const getCommentsArray = async () => {
      // const comments = await getComments(postId);
      const comments = await getCommentsRecursive(postId);
      setCommentArray(comments);
      scrollToComment();
      clearCommentIdFromUrl()
    };
    getCommentsArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentCount]);

  //effect helpers
  const scrollToComment = () => {
    const commentId = window.location.hash.substring(1); // Extract the fragment identifier (whatever is after the # in the URL)
    const targetElement = document.getElementById(commentId);
    const headerOffset = 90;

    if (targetElement) {
      //scroll into view accounting for the navbar
      const top = targetElement.getBoundingClientRect().top;
      var offsetPosition = top - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  //clears the comment id from the url may want to move this to the submit functions from the effects so that page refreshes stay at the correct location.
  const clearCommentIdFromUrl = () => {
    setTimeout(() => {
      window.history.replaceState(
        {},
        "",
        window.location.pathname + window.location.search
      );
    }, 1000); // Adjust the delay as needed (must be a setTimeout to work)
  };
  
  return (
    <>
      <ScrollWrapper>
        <div
          className="bg-neutral-50 overflow-hidden border-[1px] border-neutral-900 border-opacity-40 mb-4 rounded-sm w-full scroll-mt-[10vh]"
          id="comment"
        >
          <div className="flex flex-col gap-4 px-4 py-5 w-full">
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
            {/* This logic for the comment component is below */}
            <div className="flex flex-col p-2 gap-4 w-full">
              {commentArray.map((comment, index) => {
                return (
                  <Comment
                    key={comment.id}
                    {...comment}
                    userAvatar={userAvatar}
                    username={username}
                    postId={postId}
                    incrementCommentCount={incrementCommentCount}
                  />
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
  updatedAt: string;
  name: string | null;
  image: string | null;
  userAvatar?: string | null;
  username?: string | null;
  postId: number;
  isChild?: boolean;
  replies?: CommentProps[];
  incrementCommentCount?: () => void; //this requires revisiting. not sure why it must be optional
}
function Comment({
  id,
  text,
  createdAt,
  updatedAt,
  name,
  image, //the image of the user who made the comment
  userAvatar, //the image of the user who is logged in
  username,
  postId,
  replies,
  isChild,
  incrementCommentCount,
}: CommentProps) {
  //states
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");

  //form handlers
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createReply(postId, comment, id);
    incrementCommentCount!();
    setComment("");
    setIsOpen(false);
  }
  return (
    <ScrollWrapper classNames="flex flex-col gap-4 p-3 pr-0 w-full " key={id}>
      <div className="flex gap-2 items-center" id={id.toString()}>
        <ProfilePicture priority={false} image={image} size={30} />
        <span className="text-xs">{name}</span>
      </div>
      <div className="w-full pl-[14px]">
        <div className="pl-[19px] w-full flex flex-col gap-2 border-l border-b pb-[19px] mb-2 border-neutral-900 border-opacity-10 rounded-bl-md mr-8 ">
          <p>{text}</p>
          <button
            className="flex gap-1 text-xs self-start"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChatBubbleBottomCenterTextIcon className="h-4 w-4 stroke-1" />
            Reply
          </button>
          {isOpen ? (
            <form onSubmit={handleSubmit} className="relative">
              <div className="rounded-sm shadow-sm border border-neutral-900 border-opacity-40">
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
                      <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
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
          ) : null}
          {replies
            ? replies.map((reply) => (
                <Comment
                  key={reply.id}
                  {...reply}
                  userAvatar={userAvatar}
                  username={username}
                  postId={postId}
                  incrementCommentCount={incrementCommentCount}
                />
              ))
            : null}
        </div>
      </div>
    </ScrollWrapper>
  );
}
