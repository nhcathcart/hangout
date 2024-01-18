"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


type Tab = {
  name: string;
  href: string;
};

export default function ProfileTabs() {
    
  const tabs: Tab[] = [
    { name: "posts", href: "/profile" },
    { name: "messages", href: "/profile/messages" },
    { name: "comments", href: "/profile/comments" },
  ];

  const initialState = tabs.reduce((acc, tab) => {
    acc[tab.name] = tab.name === "posts"; // Set "posts" as the default selected tab
    return acc;
  }, {} as { [key: string]: boolean });

  const resetState = tabs.reduce((acc, tab) => { // Set all tabs to false
    acc[tab.name] = false;
    return acc;
  }, {} as { [key: string]: boolean });

  const [selected, setSelected] = useState(initialState);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  const pathName = usePathname();

  useEffect(() => {
    const pathNameArray = pathName.split('/');
    const currSelect = pathNameArray[pathNameArray.length - 1];
  
    setSelected((prev) => {
      if (currSelect === "profile") {
        return {
            ...resetState, // Reset all tabs to false
            posts: true, // Set the posts tab to true
        }
      }else{
        return {
            ...resetState, // Reset all tabs to false
            [currSelect]: true, // Set the current tab to true
          };
      } 
      
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);
  

  return (
    <>
      
      <div className="block max-w-full overflow-auto">
        <nav className="flex gap-1 md:gap-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={classNames(
                selected[tab.name] ? "bg-neutral-200" : " hover:bg-neutral-100 hover:text-neutral-950",
                "rounded px-3 py-2 text-lg"
              )}
              aria-current={selected[tab.name] ? "page" : undefined}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}


