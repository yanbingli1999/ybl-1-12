import { getBreed, getMedicine, getSymptom, type DiagnosisLog } from '@/data/gameData'
import { actionIcons, actionLabels, resultColors, resultLabels, resultTextColors, formatTime, formatCaseId } from './logConstants'
import { X, Clock, Heart, Pill, FileText } from 'lucide-react'

interface Props {
  log: DiagnosisLog
  onClose: () => void
}

export default function LogDetailModal({ log, onClose }: Props) {
  const breed = getBreed(log.breedId)
  const symptoms = log.symptomIds.map(id => getSymptom(id)).filter(Boolean)
  const usedMed = log.medicineUsed ? getMedicine(log.medicineUsed) : null
  const correctMed = log.correctMedicine ? getMedicine(log.correctMedicine) : null
  const ActionIcon = actionIcons[log.actionTaken]
  const CorrectActionIcon = actionIcons[log.correctAction]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-gray-900 border border-cyan-700/30 rounded-2xl p-5 max-w-sm w-full mx-4 shadow-2xl shadow-cyan-900/20 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-base text-cyan-300 tracking-wide">
            诊疗详情
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700/50">
          <span className="text-2xl">{breed?.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-200 font-medium">{log.petName}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${resultColors[log.result]}`}>
                {resultLabels[log.result]}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {breed?.name} · {log.diseaseName}
            </p>
            <p className="text-[10px] text-cyan-600 font-mono mt-0.5 flex items-center gap-1">
              <FileText className="w-2.5 h-2.5" />
              病例 {formatCaseId(log.caseId)}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1">
              <Clock className="w-3 h-3" />时间
            </h4>
            <p className="text-sm text-gray-300">{formatTime(log.timestamp)}</p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1">
              <Heart className="w-3 h-3" />当时症状
            </h4>
            <div className="space-y-1.5">
              {symptoms.map((symptom) => (
                <div key={symptom!.id} className="bg-gray-800/60 rounded-lg p-2 border border-gray-700/50">
                  <span className="text-xs text-gray-200 font-medium">{symptom!.name}</span>
                  <p className="text-[10px] text-gray-400 mt-0.5">{symptom!.description}</p>
                  <p className="text-[10px] text-cyan-400 font-mono mt-1">{symptom!.vitals}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
                你的操作
              </h4>
              <div className="bg-gray-800/60 rounded-lg p-2 border border-gray-700/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <ActionIcon className={`w-3.5 h-3.5 ${resultTextColors[log.result]}`} />
                  <span className="text-xs text-gray-200">{actionLabels[log.actionTaken]}</span>
                </div>
                {usedMed && (
                  <div className="flex items-center gap-1 text-[10px] text-purple-400">
                    <Pill className="w-2.5 h-2.5" />
                    <span>{usedMed.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
                正确方案
              </h4>
              <div className="bg-green-900/20 rounded-lg p-2 border border-green-700/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <CorrectActionIcon className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs text-green-300">{actionLabels[log.correctAction]}</span>
                </div>
                {correctMed && (
                  <div className="flex items-center gap-1 text-[10px] text-green-400">
                    <Pill className="w-2.5 h-2.5" />
                    <span>{correctMed.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
              收入
            </h4>
            <div className={`text-sm font-display ${log.income >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {log.income >= 0 ? '+' : ''}{log.income} ⬡
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-lg bg-cyan-900/30 border border-cyan-700/30 text-cyan-300 text-xs font-display tracking-wide hover:bg-cyan-900/50 transition-colors"
        >
          关闭
        </button>
      </div>
    </div>
  )
}
