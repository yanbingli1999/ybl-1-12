import { useState } from 'react'
import { useGameStore } from '@/store/useGameStore'
import type { DiagnosisLog } from '@/data/gameData'
import LogFilterBar from './diagnosisLog/LogFilterBar'
import LogList from './diagnosisLog/LogList'
import LogDetailModal from './diagnosisLog/LogDetailModal'
import type { FilterType } from './diagnosisLog/logConstants'
import { ScrollText, ChevronDown, ChevronUp } from 'lucide-react'

export default function DiagnosisLogPanel() {
  const diagnosisLogs = useGameStore(s => s.diagnosisLogs)
  const [filter, setFilter] = useState<FilterType>('all')
  const [expanded, setExpanded] = useState(true)
  const [selectedLog, setSelectedLog] = useState<DiagnosisLog | null>(null)

  const filteredLogs = filter === 'all'
    ? diagnosisLogs
    : diagnosisLogs.filter(log => log.result === filter)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xs tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
          <ScrollText className="w-3.5 h-3.5" />
          诊疗日志
        </h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-600 hover:text-gray-400 transition-colors"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="bg-gray-800/30 rounded-lg border border-gray-700/30 overflow-hidden">
          <LogFilterBar
            filter={filter}
            onFilterChange={setFilter}
            logs={diagnosisLogs}
          />
          <div className="max-h-48 overflow-y-auto">
            <LogList logs={filteredLogs} onLogClick={setSelectedLog} />
          </div>
        </div>
      )}

      {selectedLog && (
        <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  )
}
