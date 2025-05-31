"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface Config {
  model: string
  temperature: number
  maxTokens: number
}

interface ConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: Config
  onConfigChange: (config: Config) => void
}

export function ConfigDialog({ open, onOpenChange, config, onConfigChange }: ConfigDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-zinc-200">Modelo</Label>
            <Select value={config.model} onValueChange={(value) => onConfigChange({ ...config, model: value })}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectItem value="gpt-4" className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100">
                  GPT-4
                </SelectItem>
                <SelectItem value="gpt-3.5-turbo" className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100">
                  GPT-3.5 Turbo
                </SelectItem>
                <SelectItem value="claude-3" className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100">
                  Claude 3
                </SelectItem>
                <SelectItem value="gemini-pro" className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100">
                  Gemini Pro
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-200">Temperatura: {config.temperature}</Label>
            <Slider
              value={[config.temperature]}
              onValueChange={(value) => onConfigChange({ ...config, temperature: value[0] })}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-200">Max Tokens: {config.maxTokens}</Label>
            <Slider
              value={[config.maxTokens]}
              onValueChange={(value) => onConfigChange({ ...config, maxTokens: value[0] })}
              max={4096}
              min={256}
              step={256}
              className="w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
