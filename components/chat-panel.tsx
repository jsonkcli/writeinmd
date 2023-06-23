import { UseCompletionHelpers, type UseChatHelpers } from "ai/react"
import { Button } from "./shared/button"
import { Icons } from "@/utils/icons"
import { PromptForm } from "./prompt-form"
import Link from "next/link"
import { useState } from "react"
import { UploadDropzone } from "react-uploader"
import { Uploader } from 'uploader'


export interface ChatPanelProps
  extends Pick<
    UseCompletionHelpers,
    | 'isLoading'
    | 'completion'
    | 'stop'
    | 'input'
    | 'complete'
    | 'setInput'
  > {
  id?: string
}

const uploader = Uploader({
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY as string
});

const options = {
  maxFileCount: 1,
  editor: { images: { crop: false } },
  showFinishButton: true,
  styles: {
    colors: {
      primary: "#2563EB", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#fffe", // Secondary button text
      shade300: "#fffd", // Secondary button text (hover)
      shade400: "#fffc", // Welcome text
      shade500: "#fff9", // Modal close button
      shade600: "#fff7", // Border
      shade700: "#fff2", // Progress indicator background
      shade800: "#fff1", // File item background
      shade900: "#ffff", // Various (draggable crop buttons, etc.)
    },
  },
};

export function ChatPanel({
  isLoading,
  input,
  complete,
  setInput,
  completion
}: ChatPanelProps) {
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);

  return (

    <div className="hidden md:block">
      <div className="border-b text-white flex flex-col gap-8">
        <p className="">Write a few sentences about your project.</p>
        <div className="">
          <PromptForm
            complete={complete}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-full">
          <label htmlFor="photo" className="block text-sm font-medium leading-6 ">
            Avartar
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            <Icons name="user" className="h-12 w-12 text-gray-300" aria-hidden="true" />
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Change
            </button>
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 ">
            Add Project Demo
          </label>
          {/* <UploadDropzone */}
          {/*   uploader={uploader} */}
          {/*   options={options} */}
          {/*   onUpdate={files => console.log(files.map(x => x.fileUrl).join("\n"))} */}
          {/*   onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))} */}
          {/*   width="600px" */}
          {/*   height="375px" /> */}
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <Icons name="media" className="mx-auto h-12 w-12" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 ">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 ">
          Cancel
        </button>
        <Link
          href="/api/addproject"
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </Link>
      </div>
    </div >
  )
}
