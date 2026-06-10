import { getBreed, getMedicine, type DiagnosisLog } from '@/data/gameData'
import { actionIcons, actionLabels, resultColors, formatTime, formatCaseId } from './logConstants'
import { Clock, Pill, FileText, type LucideIcon } from 'lucide-react'

interface Props {
  log: DiagnosisLog
  onClick: () => void
}

export default function LogItem({ log, onClick }: Props) {
  const breed = getBreed(log.breedId)
  const ActionIcon = actionIcons[log.actionTaken] as LucideIcon
  const usedMed = log.medicineUsed ? getMedicine(log.medicineUsed) : null

  return (
    <button
      onClick={onClick}
      className="w-full p-2 text-left hover:bg-gray-700/30 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{breed?.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-200 font-medium truncate">
              {log.petName}
            </span>
            <span className={`text-[9px] px-1 py-0.5 rounded border flex-shrink-0 ${resultColors[log.result]}`}>
              {log.result === 'success' ? '治愈' : log.result === 'misdiagnosis' ? '误诊' : '不足'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
            <FileText className="w-2 h-2 flex-shrink-0 text-cyan-600" />
            <span className="font-mono text-cyan-600 flex-shrink-0">{formatCaseId(log.caseId)}</span>
            <span>·</span>
            <span className="truncate">{log.diseaseName}</span>
            <span>·</span>
            <ActionIcon className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="flex-shrink-0">{actionLabels[log.actionTaken]}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`text-xs font-mono ${log.income >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {log.income >= 0 ? '+' : ''}{log.income}⬡
          </div>
          <div className="text-[9px] text-gray-600 flex items-center justify-end gap-0.5">
            <Clock className="w-2 h-2" />
            {formatTime(log.timestamp)}
          </div>
        </div>
      </div>
      {usedMed && (
        <div className="flex items-center gap-1 mt-1 ml-8">
          <Pill className="w-2 h-2 text-purple-400" />
          <span className="text-[9px] text-purple-400">{usedMed.name}</span>
        </div>
      )}
    </button>
  )
}
