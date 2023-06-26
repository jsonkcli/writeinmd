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
    <div className="flex  pt-8 md:px-12 justify-between overflow-y-auto md:border-[0.5px] border-gray-300 rounded-md md:shadow-md shadow-white">
      {/* <div className=" basis-2/6"> */}
      {/*   <ChatPanel */}
      {/*     isLoading={isLoading} */}
      {/*     stop={stop} */}
      {/*     input={input} */}
      {/*     setInput={setInput} */}
      {/*     completion={completion} */}
      {/*     complete={complete} */}

      {/*   /> */}
      {/* </div> */}
        <ChatMessage completion={completion} />
    </div>
  )
}
