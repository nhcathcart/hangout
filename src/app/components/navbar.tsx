

import Image from 'next/image';
import MobileMenu from './mobile-navbar';
import Link from 'next/link';
import Chat from './chat-slide-over';

const linkArray: { linkText: string; href: string }[] = [
  {
    linkText: 'home',
    href: '/',
  },
  {
    linkText: 'profile',
    href: '/profile/posts',
  },
  
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full text-neutral-950 bg-neutral-200 z-40 opacity-90 border-b-[1px] border-neutral-900">
      <div className="min-h-[10vh] max-h-[10vh] flex items-center justify-end">
        {/* Open Mobile Menu */}
        {/* Logo */}
        <div className="ml-4 flex flex-1 items-center lg:flex-initial">
          <a href="/" className='text-3xl'>
            hangout
          </a>
        </div>
        {/* Big Screen Links */}
        <div className="hidden h-auto flex-1 justify-end lg:flex gap-5 mr-4">
          {linkArray.map((link) => (
            <Link
              key={`sidebar-link-${link.linkText}`}
              href={link.href}
              className="text-2xl font-futura hover:text-neutral-400"
            >
              {link.linkText}
            </Link>
          ))}
        </div>
        <Chat/>
        <MobileMenu linkArray={linkArray} />
      </div>
    </nav>
  );
}
