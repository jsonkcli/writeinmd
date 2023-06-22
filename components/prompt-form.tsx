import * as React from 'react'
import Link from 'next/link'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers, UseCompletionHelpers } from 'ai/react'

import { useEnterSubmit } from '@/hooks/use-enter-submit'
import { cn } from '@/utils/shared'
import { Button, buttonVariants } from './shared/button'
import { Icons } from '@/utils/icons'

export interface PromptProps
  extends Pick<UseCompletionHelpers, 'input' | 'setInput'> {
  complete: (value: string) => void
  isLoading: boolean
}

export function PromptForm({
  setInput,
  complete,
  input,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])


  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (input === '') {
          return
        }
        setInput('')
        await complete(input)
      }}

      // onSubmit={onSubmit}
      ref={formRef}
    >
      <div className="relative flex w-full grow  sm:rounded-md sm:border">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[50px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Button
            type="submit"
            size="default"
            disabled={isLoading || input === ''}
          >
            <Icons name="send" />
          </Button>
        </div>
      </div>
    </form>
  )
}
