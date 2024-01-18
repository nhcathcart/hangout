"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckIcon,
  PlusIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function PostModal() {
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpen(false);
    //logic to submit post
  }
  return (
    <>
      <button
        className="flex text-xl justify-end lg:flex gap-5 mr-4 text-neutral-900 hover:text-neutral-400"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="h-6 w-6 " aria-hidden="true" />
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-60"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-70"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-70"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 sm:px-6 lg:px-8 text-center sm:items-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-[864px] h-full p-6 transform overflow-hidden rounded bg-neutral-50 px-4 pb-4 pt-5 text-left shadow-xl transition-all h-70vh">
                  <form className="[&>*]:mt-4" onSubmit={handleSubmit}>
                    <label
                      htmlFor="title"
                      className="block text-sm leading-6 text-neutral-900"
                    >
                      Title
                    </label>
                    <div className="relative mt-2 rounded  shadow-sm">
                      <input
                        type="title"
                        name="title"
                        id="title"
                        className="block w-full rounded border-0 p-2 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        placeholder="Title"
                        aria-invalid="true"
                        aria-describedby="title-error"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-red-600" id="title-error">
                      Post must have a title
                    </p>
                    <label
                      htmlFor="link"
                      className="block text-sm leading-6 text-neutral-900"
                    >
                      Link
                    </label>
                    <div className="relative mt-2 rounded  shadow-sm">
                      <input
                        type="link"
                        name="link"
                        id="link"
                        className="block w-full rounded border-0 p-2 pr-10 text-neutral-900 ring-1 ring-inset ring-neutral-300 sm:text-sm sm:leading-6"
                        placeholder="Your link goes here"
                        aria-invalid="true"
                        aria-describedby="title-error"
                      />
                    </div>
                    <label
                      htmlFor="text"
                      className="block text-sm leading-6 text-gray-900"
                    >
                      Text
                    </label>
                    <div className="mt-2">
                      <textarea
                        rows={4}
                        name="text"
                        id="text"
                        className="block w-full rounded  border-0 p-2 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400  sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                    <div className="flex justify-around">
                      <button
                        className="flex rounded px-3 py-2 text-lg bg-green-500 hover:bg-green-600"
                        type="submit"
                      >
                        Submit Post
                      </button>
                      <button
                        className="flex justify-center rounded px-3 py-2 text-lg bg-red-500 hover:bg-red-600 w-[119.45px]"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
