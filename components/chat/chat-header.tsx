"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Star } from "lucide-react"

interface ChatHeaderProps {
  isFacebookSelected: boolean
  onFacebookClick: () => void
  onClearChat: () => void
  onSettingsClick: () => void
}

export function ChatHeader({ isFacebookSelected, onFacebookClick, onClearChat, onSettingsClick }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-zinc-800 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-zinc-400" />
        </div>
        <span className="font-medium text-zinc-200">AI Assistant</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-0 rounded-lg px-3 py-2 h-8"
        >
          <Star className="w-3 h-3 mr-1.5" />
          <span className="text-xs font-medium">Upgrade</span>
        </Button>
      </div>
    </div>
  )
}
