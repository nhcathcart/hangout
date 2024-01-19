import PaddedContainer from "../components/padded-container";
import ProfilePicture from "./components/profile-picture";
import ProfileTabs from "./components/profile-tabs";
import { auth } from "@/auth";
export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <PaddedContainer>
      <div className="flex flex-col w-full items-center md:items-start  px-2 py-8 md:p-8 border-[1px] border-neutral-900 border-opacity-40 rounded">
        <div className="pictureAndNameContainer w-full flex flex-col md:flex-row gap-12 md:gap-18 items center justify-start items-center">
          <ProfilePicture image={session?.user.image} priority />
          <div className="flex justify-center">
            <h2 className="text-4xl text-center">{session?.user.name}</h2>
          </div>
        </div>
        <div className="pt-8 pb-10 w-full">
          <div className="border-t border-neutral-400 w-full" />
        </div>
        <ProfileTabs />
        <div className="flex flex-col w-full pt-10">{children}</div>
      </div>
    </PaddedContainer>
  );
}
