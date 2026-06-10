import type { ActionType, DiagnosisLogResult } from '@/data/gameData'
import { Pill, Search, Syringe, Utensils, Shield, ScrollText, Heart, AlertTriangle, Coins, type LucideIcon } from 'lucide-react'

export const actionIcons: Record<ActionType, LucideIcon> = {
  examine: Search,
  medicate: Pill,
  inject: Syringe,
  feed: Utensils,
  isolate: Shield,
}

export const actionLabels: Record<ActionType, string> = {
  examine: '检查',
  medicate: '用药',
  inject: '打针',
  feed: '喂食',
  isolate: '隔离',
}

export const resultLabels: Record<DiagnosisLogResult, string> = {
  success: '治愈',
  misdiagnosis: '误诊',
  funds: '星币不足',
}

export const resultColors: Record<DiagnosisLogResult, string> = {
  success: 'text-green-400 bg-green-900/30 border-green-700/30',
  misdiagnosis: 'text-red-400 bg-red-900/30 border-red-700/30',
  funds: 'text-yellow-400 bg-yellow-900/30 border-yellow-700/30',
}

export const resultTextColors: Record<DiagnosisLogResult, string> = {
  success: 'text-green-400',
  misdiagnosis: 'text-red-400',
  funds: 'text-yellow-400',
}

export type FilterType = 'all' | DiagnosisLogResult

export interface FilterOption {
  key: FilterType
  label: string
  icon: LucideIcon
}

export const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', label: '全部', icon: ScrollText },
  { key: 'success', label: '治愈', icon: Heart },
  { key: 'misdiagnosis', label: '误诊', icon: AlertTriangle },
  { key: 'funds', label: '不足', icon: Coins },
]

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export function formatCaseId(caseId: string): string {
  return `#${caseId.slice(-6)}`
}
