'use client'
import { ChatPanel } from './chat-panel'
import { type UseCompletionHelpers, useCompletion } from 'ai/react'
import ChatMessage from './chat-message'


export interface ChatPanelProps
  extends Pick<
    UseCompletionHelpers,
    | 'isLoading'
    | 'completion'
    | 'complete'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
}


export default function Editor() {

  const { completion, input, setInput, complete, isLoading, stop, error } = useCompletion({
    api: '/api/generate'
  });

  return (
    <div className="flex w-full  pt-8 px-12 justify-between overflow-y-auto border-[0.5px] border-gray-300 rounded-md shadow-md shadow-white">
      <div className=" basis-2/6">
        <ChatPanel
          isLoading={isLoading}
          stop={stop}
          input={input}
          setInput={setInput}
          completion={completion}
          complete={complete}

        />
      </div>
        <ChatMessage completion={completion} />
    </div>
  )
}
