import clsx from "clsx";
import Image from "next/image";
interface Props {
  image?: string | null;
  size?: number;
  priority: boolean;
}

export default function ProfilePicture({ image, size, priority }: Props) {
  const defaultSize = 200; // Default size if not provided

  return (
    <>
      {image ? (
        <Image
          src={image}
          alt="profile picture"
          height={size ? size : defaultSize}
          width={size ? size : defaultSize}
          className="rounded-full"
          priority={priority}
        />
      ) : (
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </>
  );
}
