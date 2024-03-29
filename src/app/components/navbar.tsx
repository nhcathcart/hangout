import Image from "next/image";
import MobileMenu from "./mobile-navbar";
import Link from "next/link";
import Chat from "./chat-slide-over";
import PostModal from "./post-modal/post-modal";

const linkArray: { linkText: string; href: string }[] = [
  {
    linkText: "home",
    href: "/",
  },
  {
    linkText: "profile",
    href: "/profile",
  },
];

export default async function Navbar() {
  
  return (
    <nav className="fixed top-0 w-full text-neutral-950 bg-neutral-200 z-40 opacity-90 border-b-[1px] border-opacity-40 border-neutral-900">
      <div className="min-h-[75px] max-h-[75px] flex items-center justify-end">
        {/* Open Mobile Menu */}
        {/* Logo */}
        <div className="ml-4 flex flex-1 items-center lg:flex-initial">
          <a href="/" className="text-3xl hover:text-neutral-400">
            hangout
          </a>
        </div>
        {/* Big Screen Links */}
        <div className="flex grow justify-end">
          <Chat />
          <PostModal />
        </div>
        <div className="hidden h-auto justify-end lg:flex gap-5 mr-4">
          {linkArray.map((link) => {
            if (link.linkText === "home") {
              return null;
            } else {
              return (
                <Link
                  key={`sidebar-link-${link.linkText}`}
                  href={link.href}
                  className="text-xl font-futura hover:text-neutral-400"
                >
                  {link.linkText}
                </Link>
              );
            }
          })}
        </div>

        <MobileMenu linkArray={linkArray} />
      </div>
    </nav>
  );
}
