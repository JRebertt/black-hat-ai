"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bot, User, Copy } from "lucide-react"
import { FileAttachment, type AttachedFile } from "./file-attachment"
import { StreamingText } from "./streaming-text"
import { useState } from "react"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  files?: AttachedFile[]
  isStreaming?: boolean
}

interface ChatMessageProps {
  message: Message
  isFacebookSelected: boolean
  onCopyMessage: (content: string) => void
}

export function ChatMessage({ message, isFacebookSelected, onCopyMessage }: ChatMessageProps) {
  const [streamingComplete, setStreamingComplete] = useState(!message.isStreaming)
  const isUser = message.role === "user"

  return (
    <div
      className={`group animate-in fade-in-0 slide-in-from-bottom-4 duration-300 ${isUser ? "flex justify-end" : ""}`}
    >
      <div className={`flex gap-4 max-w-[80%] ${isUser ? "flex-row-reverse" : ""}`}>
        <Avatar className="w-7 h-7 mt-1 flex-shrink-0">
          <AvatarFallback className={isUser ? "bg-zinc-100 text-zinc-900" : "bg-zinc-800 text-zinc-300"}>
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

        <div className={`flex-1 space-y-2 ${isUser ? "items-end" : ""}`}>
          <div className={`flex items-center gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
            <span className="text-sm font-medium text-zinc-300">{isUser ? "Você" : "Assistente"}</span>
            <span className="text-xs text-zinc-600">{message.timestamp.toLocaleTimeString()}</span>
          </div>

          {/* Arquivos anexados */}
          {message.files && message.files.length > 0 && (
            <div className={`space-y-2 ${isUser ? "flex flex-col items-end" : ""}`}>
              {message.files.map((file) => (
                <FileAttachment key={file.id} file={file} />
              ))}
            </div>
          )}

          {message.content && (
            <div className={`${isUser ? "text-right" : ""}`}>
              <div
                className={`inline-block p-3 rounded-2xl max-w-full ${
                  isUser ? "bg-zinc-100 text-zinc-900 rounded-br-md" : "bg-zinc-800 text-zinc-100 rounded-bl-md"
                }`}
              >
                {message.role === "assistant" && message.isStreaming ? (
                  <StreamingText text={message.content} speed={30} onComplete={() => setStreamingComplete(true)} />
                ) : (
                  <div className="text-sm leading-relaxed">{message.content}</div>
                )}
              </div>
            </div>
          )}

          {streamingComplete && (
            <div
              className={`flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? "justify-end" : ""}`}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopyMessage(message.content)}
                className="text-zinc-500 hover:text-zinc-300 h-6 px-2"
              >
                <Copy className="w-3 h-3 mr-1" />
                <span className="text-xs">Copiar</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
