"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Facebook, Zap, ArrowUp, Mic } from "lucide-react"
import { FileAttachment, type AttachedFile } from "./file-attachment"
import { forwardRef } from "react"
// import { IconPing } from "./icon-ping" // Removed import

interface ChatInputProps {
  input: string
  onInputChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (fileId: string) => void
  attachedFiles: AttachedFile[]
  isLoading: boolean
  isFacebookSelected: boolean
  onFacebookToggle: () => void
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  (
    {
      input,
      onInputChange,
      onSend,
      onKeyPress,
      onFileSelect,
      onRemoveFile,
      attachedFiles,
      isLoading,
      isFacebookSelected,
      onFacebookToggle,
    },
    ref,
  ) => {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Arquivos anexados preview */}
          {attachedFiles.length > 0 && (
            <div className="space-y-2">
              {attachedFiles.map((file) => (
                <FileAttachment key={file.id} file={file} onRemove={onRemoveFile} showRemove={true} size="sm" />
              ))}
            </div>
          )}

          {/* Container com fundo glass que engloba header e input */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.1)] relative overflow-hidden">
            {/* Efeito de brilho na borda */}
            <div className="absolute inset-0 rounded-xl border border-zinc-700/20 shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]"></div>

            {/* Header com Pro plan e extensions */}
            <div className="flex items-center justify-between px-4 pt-3 pb-4 z-10 relative border-b border-zinc-800/30">
              <div className="flex items-center gap-2 text-zinc-500">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Unlock more features with the Pro plan.</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                </span>
                <span className="text-sm text-zinc-500">Active extensions</span>
              </div>
            </div>

            {/* Input principal */}
            <div className="relative px-4 py-3">
              <input
                type="file"
                multiple
                onChange={onFileSelect}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt,.json,.csv"
                id="file-input"
              />

              <div className="flex items-center gap-4 z-10 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 h-8 w-8 p-0 rounded-lg"
                  disabled={isLoading}
                >
                  <Plus className="w-5 h-5" />
                </Button>

                <Input
                  ref={ref}
                  value={input}
                  onChange={(e) => onInputChange(e.target.value)}
                  onKeyPress={onKeyPress}
                  placeholder="Ask anything ..."
                  className="flex-1 bg-transparent border-0 text-zinc-100 placeholder:text-zinc-500 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 px-0 text-base"
                  disabled={isLoading}
                />

                {isFacebookSelected && (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-[#1877F2]/20 rounded-full">
                    <Facebook className="w-3 h-3 text-[#1877F2]" />
                    <span className="text-xs text-[#1877F2]">FB</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 h-8 w-8 p-0 rounded-lg"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>

                  <div className="w-px h-5 bg-zinc-700/50"></div>

                  <Button
                    onClick={onSend}
                    disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
                    className="text-zinc-300 hover:text-zinc-100 bg-transparent hover:bg-transparent disabled:text-zinc-600 h-8 w-8 p-0 rounded-lg"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

ChatInput.displayName = "ChatInput"
