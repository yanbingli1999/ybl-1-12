import { useState } from 'react'
import { useGameStore } from '@/store/useGameStore'
import { getBreed, getMedicine, getSymptom, type DiagnosisLog, type DiagnosisLogResult } from '@/data/gameData'
import { ScrollText, ChevronDown, ChevronUp, X, Clock, Pill, Syringe, Utensils, Shield, Search, Heart, AlertTriangle, Coins } from 'lucide-react'

const actionIcons: Record<string, typeof Pill> = {
  examine: Search,
  medicate: Pill,
  inject: Syringe,
  feed: Utensils,
  isolate: Shield,
}

const actionLabels: Record<string, string> = {
  examine: '检查',
  medicate: '用药',
  inject: '打针',
  feed: '喂食',
  isolate: '隔离',
}

const resultLabels: Record<DiagnosisLogResult, string> = {
  success: '治愈',
  misdiagnosis: '误诊',
  funds: '星币不足',
}

const resultColors: Record<DiagnosisLogResult, string> = {
  success: 'text-green-400 bg-green-900/30 border-green-700/30',
  misdiagnosis: 'text-red-400 bg-red-900/30 border-red-700/30',
  funds: 'text-yellow-400 bg-yellow-900/30 border-yellow-700/30',
}

const resultTextColors: Record<DiagnosisLogResult, string> = {
  success: 'text-green-400',
  misdiagnosis: 'text-red-400',
  funds: 'text-yellow-400',
}

type FilterType = 'all' | DiagnosisLogResult

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

function LogDetailModal({ log, onClose }: { log: DiagnosisLog; onClose: () => void }) {
  const breed = getBreed(log.breedId)
  const symptoms = log.symptomIds.map(id => getSymptom(id)).filter(Boolean)
  const usedMed = log.medicineUsed ? getMedicine(log.medicineUsed) : null
  const correctMed = log.correctMedicine ? getMedicine(log.correctMedicine) : null
  const ActionIcon = actionIcons[log.actionTaken] || Search
  const CorrectActionIcon = actionIcons[log.correctAction] || Search

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
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-200 font-medium">{log.petName}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${resultColors[log.result]}`}>
                {resultLabels[log.result]}
              </span>
            </div>
            <p className="text-xs text-gray-500">{breed?.name} · {log.diseaseName}</p>
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
              {symptoms.map((symptom, i) => (
                <div key={symptom!.id} className="bg-gray-800/60 rounded-lg p-2 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-200 font-medium">{symptom!.name}</span>
                  </div>
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

export default function DiagnosisLogPanel() {
  const diagnosisLogs = useGameStore(s => s.diagnosisLogs)
  const [filter, setFilter] = useState<FilterType>('all')
  const [expanded, setExpanded] = useState(true)
  const [selectedLog, setSelectedLog] = useState<DiagnosisLog | null>(null)

  const filteredLogs = filter === 'all'
    ? diagnosisLogs
    : diagnosisLogs.filter(log => log.result === filter)

  const filters: { key: FilterType; label: string; icon: typeof Heart }[] = [
    { key: 'all', label: '全部', icon: ScrollText },
    { key: 'success', label: '治愈', icon: Heart },
    { key: 'misdiagnosis', label: '误诊', icon: AlertTriangle },
    { key: 'funds', label: '不足', icon: Coins },
  ]

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
          <div className="flex border-b border-gray-700/30 bg-gray-900/40">
            {filters.map(f => {
              const Icon = f.icon
              const isActive = filter === f.key
              const count = f.key === 'all' ? diagnosisLogs.length : diagnosisLogs.filter(l => l.result === f.key).length
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
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

          <div className="max-h-48 overflow-y-auto">
            {filteredLogs.length === 0 ? (
              <div className="py-6 text-center text-gray-600">
                <ScrollText className="w-6 h-6 mx-auto mb-2 opacity-30" />
                <p className="text-xs">暂无记录</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700/30">
                {filteredLogs.map(log => {
                  const breed = getBreed(log.breedId)
                  const ActionIcon = actionIcons[log.actionTaken] || Search
                  const usedMed = log.medicineUsed ? getMedicine(log.medicineUsed) : null

                  return (
                    <button
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
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
                              {resultLabels[log.result]}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
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
                          <div className="text-[9px] text-gray-600 flex items-center gap-0.5">
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
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedLog && (
        <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </div>
  )
}
