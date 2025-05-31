"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SecurityAlert } from "@/components/chat/security-alert"
import { ChatHeader } from "@/components/chat/chat-header"
import { FacebookBadge } from "@/components/chat/facebook-badge"
import { ChatMessage, type Message } from "@/components/chat/chat-message"
import { LoadingMessage } from "@/components/chat/loading-message"
import { EmptyState } from "@/components/chat/empty-state"
import { ChatInput } from "@/components/chat/chat-input"
import { ConfigDialog, type Config } from "@/components/chat/config-dialog"
import type { AttachedFile } from "@/components/chat/file-attachment"

export default function ChatPlayground() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const [config, setConfig] = useState<Config>({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 2048,
  })
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const isFacebookSelected = searchParams.get("facebook") === "true"

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const fileUrl = URL.createObjectURL(file)
      const newFile: AttachedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
      }
      setAttachedFiles((prev) => [...prev, newFile])
    })

    // Reset file input
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const removeFile = (fileId: string) => {
    setAttachedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url)
      }
      return prev.filter((f) => f.id !== fileId)
    })
  }

  const handleSend = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
      files: attachedFiles.length > 0 ? [...attachedFiles] : undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setAttachedFiles([])
    setIsLoading(true)

    // Simular resposta da IA com streaming
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Recebi sua mensagem${userMessage.files ? ` com ${userMessage.files.length} arquivo(s)` : ""}. Usando ${config.model} com temperatura ${config.temperature}${isFacebookSelected ? " via Facebook Messenger" : ""}. Esta é uma simulação - integre com sua API de IA preferida para processar arquivos e criar respostas mais inteligentes.`,
        role: "assistant",
        timestamp: new Date(),
        isStreaming: true,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleFacebookClick = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (isFacebookSelected) {
      params.delete("facebook")
    } else {
      params.set("facebook", "true")
    }

    const newUrl = params.toString() ? `?${params.toString()}` : ""
    router.push(newUrl)
  }

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      <ChatHeader
        isFacebookSelected={isFacebookSelected}
        onFacebookClick={handleFacebookClick}
        onClearChat={clearChat}
        onSettingsClick={() => setShowConfigDialog(true)}
      />

      <SecurityAlert show={true} />

      <FacebookBadge isSelected={isFacebookSelected} onToggle={handleFacebookClick} />

      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <EmptyState model={config.model} isFacebookSelected={isFacebookSelected} />
        ) : (
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
            <div className="max-w-3xl mx-auto py-6 space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isFacebookSelected={isFacebookSelected}
                  onCopyMessage={copyMessage}
                />
              ))}

              {isLoading && <LoadingMessage />}
            </div>
          </ScrollArea>
        )}

        <ChatInput
          ref={inputRef}
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          onFileSelect={handleFileSelect}
          onRemoveFile={removeFile}
          attachedFiles={attachedFiles}
          isLoading={isLoading}
          isFacebookSelected={isFacebookSelected}
          onFacebookToggle={handleFacebookClick}
        />
      </div>

      <ConfigDialog
        open={showConfigDialog}
        onOpenChange={setShowConfigDialog}
        config={config}
        onConfigChange={setConfig}
      />
    </div>
  )
}
