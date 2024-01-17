"use client";

import { useState } from "react";

export default function ProfileTabs() {
  const tabs = [
    { name: "posts", href: "/profile/posts"},
    { name: "messages", href: "/profile/messages"},
    { name: "comments", href: "/profile/comments"},
  ];
  const initialState = {
    posts: false,
    messages: false,
    comments: true,
  };
  const [selected, setSelected] = useState(initialState);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

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
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                selected[tab.name] = tab.current
                  ? "bg-custom-green text-neutral-50"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
