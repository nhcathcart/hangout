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
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300"
          defaultValue={"posts"}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={classNames(
                selected[tab.name] ? "bg-neutral-400 text-neutral-50" : "text-neutral-900 hover:bg-neutral-300 hover:text-neutral-950",
                "rounded-md px-3 py-2 text-lg"
              )}
              aria-current={selected[tab.name] ? "page" : undefined}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}


