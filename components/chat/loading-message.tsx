"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot } from "lucide-react"

export function LoadingMessage() {
  return (
    <div className="flex gap-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      <Avatar className="w-7 h-7 mt-1">
        <AvatarFallback className="bg-zinc-800 text-zinc-300">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <span className="text-sm font-medium text-zinc-300">Assistente</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <span className="text-xs text-zinc-500">Pensando...</span>
        </div>
      </div>
    </div>
  )
}
