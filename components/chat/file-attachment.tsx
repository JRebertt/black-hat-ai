"use client"

import { Button } from "@/components/ui/button"
import { File, ImageIcon, FileText, X } from "lucide-react"

export interface AttachedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
}

interface FileAttachmentProps {
  file: AttachedFile
  onRemove?: (fileId: string) => void
  showRemove?: boolean
  size?: "sm" | "md"
}

export function FileAttachment({ file, onRemove, showRemove = false, size = "md" }: FileAttachmentProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    if (type.includes("text") || type.includes("document")) return <FileText className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  const imageSize = size === "sm" ? "w-10 h-10" : "w-12 h-12"

  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-800 border border-zinc-700 rounded-lg">
      <div className="text-zinc-400">{getFileIcon(file.type)}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-zinc-200 truncate">{file.name}</p>
        <p className="text-xs text-zinc-500">{formatFileSize(file.size)}</p>
      </div>
      {file.type.startsWith("image/") && (
        <img
          src={file.url || "/placeholder.svg"}
          alt={file.name}
          className={`${imageSize} object-cover rounded border border-zinc-600`}
        />
      )}
      {showRemove && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(file.id)}
          className="text-zinc-500 hover:text-zinc-300 h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
