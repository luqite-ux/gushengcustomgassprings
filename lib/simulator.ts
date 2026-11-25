export type SeriesId = 'GB' | 'GH' | 'GS' | 'GU'

export interface SeriesSimConfig {
  id: SeriesId
  label: string
  sampleModel: string
  descriptor: string
  boreMm: number
  rodMm: number
  strokeMm: number
  initialForceDaN: number
  finalForceDaN: number
  chargePressureMpa: number
  accent: string
  scene: {
    boreRadius: number
    rodRadius: number
    strokeLength: number
    bodyHeight: number
  }
}

export const MAX_STROKE_PERCENT = 90

export const seriesSimConfigs: Record<SeriesId, SeriesSimConfig> = {
  GB: {
    id: 'GB',
    label: 'GB Series',
    sampleModel: 'GB1500-50',
    descriptor: 'Ultra-Compact High-Force (GB170–GB9500)',
    boreMm: 63,
    rodMm: 36,
    strokeMm: 50,
    initialForceDaN: 1500,
    finalForceDaN: 2400,
    chargePressureMpa: 15,
    accent: '#0b4da2',
    scene: { boreRadius: 1.05, rodRadius: 0.56, strokeLength: 1.45, bodyHeight: 2.3 },
  },
  GH: {
    id: 'GH',
    label: 'GH Series',
    sampleModel: 'GH3000-50',
    descriptor: 'Compact-Structure (GH300–GH7500)',
    boreMm: 95,
    rodMm: 50,
    strokeMm: 50,
    initialForceDaN: 3000,
    finalForceDaN: 4500,
    chargePressureMpa: 15,
    accent: '#2563eb',
    scene: { boreRadius: 1.25, rodRadius: 0.65, strokeLength: 1.45, bodyHeight: 2.5 },
  },
  GS: {
    id: 'GS',
    label: 'GS Series',
    sampleModel: 'GS1500-100',
    descriptor: 'ISO International Standard (GS250–GS10000)',
    boreMm: 75,
    rodMm: 36,
    strokeMm: 100,
    initialForceDaN: 1500,
    finalForceDaN: 2300,
    chargePressureMpa: 15,
    accent: '#0284c7',
    scene: { boreRadius: 1.12, rodRadius: 0.52, strokeLength: 2.2, bodyHeight: 3.0 },
  },
  GU: {
    id: 'GU',
    label: 'GU Series',
    sampleModel: 'GU7500-50',
    descriptor: 'Super High-Force Compact (GU420–GU18300)',
    boreMm: 95,
    rodMm: 55,
    strokeMm: 50,
    initialForceDaN: 7500,
    finalForceDaN: 11000,
    chargePressureMpa: 15,
    accent: '#1d4ed8',
    scene: { boreRadius: 1.45, rodRadius: 0.84, strokeLength: 1.35, bodyHeight: 2.15 },
  },
}

export const seriesOrder: SeriesId[] = ['GB', 'GH', 'GS', 'GU']

export function computeTelemetry(series: SeriesSimConfig, strokePercent: number) {
  const clamped = Math.min(Math.max(strokePercent, 0), MAX_STROKE_PERCENT)
  const p = clamped / MAX_STROKE_PERCENT
  const force = series.initialForceDaN + (series.finalForceDaN - series.initialForceDaN) * (0.78 * p + 0.22 * p * p)
  const pressureMpa = series.chargePressureMpa * (force / series.initialForceDaN)
  return {
    travelMm: series.strokeMm * (clamped / 100),
    forceDaN: force,
    forceRiseDaN: force - series.initialForceDaN,
    pressureMpa,
    chamberRatio: 1 - 0.34 * p,
  }
}
