import type { DiagnosisLogResult } from '@/data/gameData'
import { FILTER_OPTIONS, type FilterType } from './logConstants'
import type { LucideIcon } from 'lucide-react'

interface Props {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  logs: { result: DiagnosisLogResult }[]
}

export default function LogFilterBar({ filter, onFilterChange, logs }: Props) {
  return (
    <div className="flex border-b border-gray-700/30 bg-gray-900/40">
      {FILTER_OPTIONS.map(f => {
        const Icon = f.icon as LucideIcon
        const isActive = filter === f.key
        const count = f.key === 'all' ? logs.length : logs.filter(l => l.result === f.key).length
        return (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[9px] transition-colors ${
              isActive
                ? 'text-cyan-300 bg-cyan-900/20 border-b-2 border-cyan-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon className="w-3 h-3" />
            <span>{f.label}</span>
            <span className={`font-mono ${isActive ? 'text-cyan-400' : 'text-gray-600'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
