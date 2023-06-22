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

  console.log(completion)

  return (
    <div className="flex flex-grow pt-8 h-full justify-between overflow-y-scroll">
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
      <div
        className="">
        <ChatMessage completion={completion} />
      </div>
    </div>
  )
}
