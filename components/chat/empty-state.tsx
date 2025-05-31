"use client"

import { RefreshCw } from "lucide-react"

interface EmptyStateProps {
  model: string
  isFacebookSelected: boolean
}

export function EmptyState({ model, isFacebookSelected }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
          <RefreshCw className="w-8 h-8 text-zinc-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-100">Olá! É bom te ver!</h1>
          <h2 className="text-xl text-zinc-300">Como posso hackear sua produtividade hoje?</h2>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-zinc-500">Estou disponível 24/7 para responder qualquer pergunta</p>
          <p className="text-xs text-zinc-600">
            Por motivos de segurança, todas as conversas são automaticamente deletadas
          </p>
        </div>
      </div>
    </div>
  )
}
