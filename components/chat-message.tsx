'use client'

import { FC, memo, useState } from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/utils/shared'
import { CodeBlock } from '@/components/codeblock'
import ReactMarkdown, { Options } from 'react-markdown'
import useLocalStorage from '@/hooks/use-local-storage'
import { CONTENT } from "@/components/content"


const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
)


export default function ChatMessage({ completion, ...props }) {
  const [content, setContent] = useLocalStorage(
    "content",
    CONTENT,
  );

  return (
    <div
      className={cn('group relative h-full overflow-y-scroll mb-4 ')}
      {...props}
    >
      <div className="space-y-2 px-1 ">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {completion.length ? completion : CONTENT}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
}
