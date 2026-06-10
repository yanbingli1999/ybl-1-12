import type { DiagnosisLog } from '@/data/gameData'
import LogItem from './LogItem'
import { ScrollText } from 'lucide-react'

interface Props {
  logs: DiagnosisLog[]
  onLogClick: (log: DiagnosisLog) => void
}

export default function LogList({ logs, onLogClick }: Props) {
  if (logs.length === 0) {
    return (
      <div className="py-6 text-center text-gray-600">
        <ScrollText className="w-6 h-6 mx-auto mb-2 opacity-30" />
        <p className="text-xs">暂无记录</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-700/30">
      {logs.map(log => (
        <LogItem key={log.id} log={log} onClick={() => onLogClick(log)} />
      ))}
    </div>
  )
}
