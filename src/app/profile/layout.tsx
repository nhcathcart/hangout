import PaddedContainer from "../components/padded-container";
import ProfilePicture from "./components/profile-picture";
import ProfileTabs from "./components/profile-tabs";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PaddedContainer>
      <div className="flex flex-col w-full items-center px-2 py-8 md:p-8 border-[1px] border-neutral-900 rounded">
        <div className="pictureAndNameContainer w-full flex flex-col md:flex-row gap-8 items center justify-between items-center">
          <ProfilePicture />
          <div className="flex grow justify-center">
            <h2 className="text-4xl text-center">Name goes here</h2>
          </div>
        </div>
        <div className="py-12 w-full">
          <div className="border-t border-neutral-400 w-full" />
        </div>
        <ProfileTabs />
        {children}
      </div>
    </PaddedContainer>
  );
}
