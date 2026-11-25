'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Layers, RotateCcw, Sliders } from 'lucide-react'
import {
  computeTelemetry,
  MAX_STROKE_PERCENT,
  SeriesId,
  seriesOrder,
  seriesSimConfigs,
} from '@/lib/simulator'

export function GasSpring3DSimulator() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [seriesId, setSeriesId] = useState<SeriesId>('GB')
  const [strokePercent, setStrokePercent] = useState(32)
  const [cutaway, setCutaway] = useState(true)
  const [webglReady, setWebglReady] = useState(true)

  const stateRef = useRef({ seriesId, strokePercent, cutaway, dragYaw: 0.45, dragPitch: 0.22, isDragging: false, lastX: 0, lastY: 0 })
  stateRef.current.seriesId = seriesId
  stateRef.current.strokePercent = strokePercent
  stateRef.current.cutaway = cutaway

  const config = seriesSimConfigs[seriesId]
  const telemetry = computeTelemetry(config, strokePercent)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer | null = null
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      setWebglReady(false)
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(container.clientWidth || 520, container.clientHeight || 420)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.18
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, (container.clientWidth || 520) / (container.clientHeight || 420), 0.1, 100)
    camera.position.set(0, 1.3, 8.2)
    camera.lookAt(0, 0.2, 0)

    // Luminous light-studio 3-point lighting (Porcelain white OpenAI/Antigravity aesthetic)
    const ambient = new THREE.AmbientLight(0xf1f5f9, 1.45)
    scene.add(ambient)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(6, 9, 7)
    scene.add(keyLight)
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.15)
    fillLight.position.set(-7, 4, 4)
    scene.add(fillLight)
    const rimLight = new THREE.DirectionalLight(0x2563eb, 0.9)
    rimLight.position.set(0, -4, -6)
    scene.add(rimLight)

    // Subtle engineering grid floor
    const grid = new THREE.GridHelper(10, 16, 0x93c5fd, 0xdbeafe)
    grid.position.y = -2.2
    scene.add(grid)

    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // Materials
    const outerShellMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.72,
      roughness: 0.26,
      side: THREE.DoubleSide,
    })
    const chromeRodMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.12,
    })
    const flangeMat = new THREE.MeshStandardMaterial({
      color: 0x0b4da2,
      metalness: 0.45,
      roughness: 0.35,
    })
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.2,
      roughness: 0.45,
    })
    const gasChamberMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0b4da2,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.48,
      roughness: 0.15,
      metalness: 0.05,
    })
    const pistonHeadMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.8,
      roughness: 0.25,
    })

    let dynamicParts: {
      rodGroup: THREE.Group
      gasMesh: THREE.Mesh
      baseHeight: number
      strokeTravel: number
    } | null = null

    function buildModel(sId: SeriesId, isCutaway: boolean) {
      while (rootGroup.children.length) {
        const obj = rootGroup.children.pop()!
        obj.traverse((child) => {
          if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose()
        })
      }
      const cfg = seriesSimConfigs[sId].scene
      const rOuter = cfg.boreRadius
      const rInner = rOuter * 0.78
      const rRod = cfg.rodRadius
      const bodyH = cfg.bodyHeight

      // 1. Cylinder outer shell (210° cutaway or full 360°)
      const thetaLen = isCutaway ? Math.PI * 1.25 : Math.PI * 2
      const shellGeo = new THREE.CylinderGeometry(rOuter, rOuter, bodyH, 48, 1, true, Math.PI * 0.38, thetaLen)
      const shellMesh = new THREE.Mesh(shellGeo, outerShellMat)
      shellMesh.position.y = -2.2 + bodyH / 2
      rootGroup.add(shellMesh)

      // Bottom cap & base flange ring
      const baseCap = new THREE.Mesh(new THREE.CylinderGeometry(rOuter, rOuter, 0.22, 48), outerShellMat)
      baseCap.position.y = -2.2 + 0.11
      rootGroup.add(baseCap)

      const flangeRing = new THREE.Mesh(new THREE.CylinderGeometry(rOuter * 1.24, rOuter * 1.24, 0.2, 48), flangeMat)
      flangeRing.position.y = -2.2 + 0.35
      rootGroup.add(flangeRing)

      // Top collar seal ring
      const collarGeo = new THREE.TorusGeometry(rOuter * 0.88, 0.09, 16, 48)
      const collar = new THREE.Mesh(collarGeo, sealMat)
      collar.rotation.x = Math.PI / 2
      collar.position.y = -2.2 + bodyH - 0.06
      rootGroup.add(collar)

      // 2. High-pressure Nitrogen Gas Chamber (glowing blue core)
      const gasGeo = new THREE.CylinderGeometry(rInner * 0.92, rInner * 0.92, bodyH * 0.72, 36)
      const gasMesh = new THREE.Mesh(gasGeo, gasChamberMat)
      gasMesh.position.y = -2.2 + 0.25 + (bodyH * 0.72) / 2
      rootGroup.add(gasMesh)

      // 3. Moving Piston Rod + Internal Piston Head + Dual Seals
      const rodGroup = new THREE.Group()
      const rodHeight = bodyH * 0.95 + cfg.strokeLength * 0.55
      const rodMesh = new THREE.Mesh(new THREE.CylinderGeometry(rRod, rRod, rodHeight, 40), chromeRodMat)
      rodMesh.position.y = rodHeight / 2
      rodGroup.add(rodMesh)

      const headMesh = new THREE.Mesh(new THREE.CylinderGeometry(rInner * 0.96, rInner * 0.96, 0.28, 36), pistonHeadMat)
      headMesh.position.y = 0.14
      rodGroup.add(headMesh)

      const seal1 = new THREE.Mesh(new THREE.TorusGeometry(rInner * 0.95, 0.055, 14, 36), sealMat)
      seal1.rotation.x = Math.PI / 2
      seal1.position.y = 0.22
      rodGroup.add(seal1)

      const seal2 = new THREE.Mesh(new THREE.TorusGeometry(rInner * 0.95, 0.055, 14, 36), sealMat)
      seal2.rotation.x = Math.PI / 2
      seal2.position.y = 0.06
      rodGroup.add(seal2)

      rootGroup.add(rodGroup)

      dynamicParts = {
        rodGroup,
        gasMesh,
        baseHeight: bodyH,
        strokeTravel: cfg.strokeLength * 0.65,
      }
    }

    buildModel(stateRef.current.seriesId, stateRef.current.cutaway)
    let lastBuiltKey = `${stateRef.current.seriesId}-${stateRef.current.cutaway}`

    // Pointer drag orbit
    const canvas = renderer.domElement
    const onDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true
      stateRef.current.lastX = e.clientX
      stateRef.current.lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return
      const dx = e.clientX - stateRef.current.lastX
      const dy = e.clientY - stateRef.current.lastY
      stateRef.current.lastX = e.clientX
      stateRef.current.lastY = e.clientY
      stateRef.current.dragYaw += dx * 0.01
      stateRef.current.dragPitch = Math.max(-0.4, Math.min(0.65, stateRef.current.dragPitch + dy * 0.008))
    }
    const onUp = () => {
      stateRef.current.isDragging = false
    }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)

    // Offscreen pause for performance
    let visible = true
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0.05 }
    )
    io.observe(container)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!visible || !renderer) return

      const currentKey = `${stateRef.current.seriesId}-${stateRef.current.cutaway}`
      if (currentKey !== lastBuiltKey) {
        buildModel(stateRef.current.seriesId, stateRef.current.cutaway)
        lastBuiltKey = currentKey
      }

      if (!stateRef.current.isDragging && !reducedMotion) {
        stateRef.current.dragYaw += 0.0035
      }
      rootGroup.rotation.y = stateRef.current.dragYaw
      rootGroup.rotation.x = stateRef.current.dragPitch

      if (dynamicParts) {
        const ratio = stateRef.current.strokePercent / MAX_STROKE_PERCENT
        const topY = -2.2 + dynamicParts.baseHeight * 0.58
        dynamicParts.rodGroup.position.y = topY - ratio * dynamicParts.strokeTravel
        const gasScaleY = Math.max(0.32, 1 - ratio * 0.52)
        dynamicParts.gasMesh.scale.y = gasScaleY
        dynamicParts.gasMesh.position.y = -2.2 + 0.24 + (dynamicParts.baseHeight * 0.72 * gasScaleY) / 2
        gasChamberMat.emissiveIntensity = 0.25 + ratio * 0.85
      }

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!container || !renderer) return
      const w = container.clientWidth || 520
      const h = container.clientHeight || 420
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      renderer?.dispose()
    }
  }, [])

  return (
    <section
      id="threejs-cutaway-lab"
      data-reveal=""
      className="mist-wash blueprint-grid border-y border-border py-16 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cobalt">
            Interactive 3D Engineering Lab · WebGL
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Inspect Internal Nitrogen Compression &amp; Force Curves in Real Time
          </h2>
          <p className="mt-3 text-base leading-relaxed text-steel">
            Drag to orbit 360°, toggle cutaway view to inspect the mirror-honed piston rod and high-pressure nitrogen chamber, and scrub stroke travel to preview live force telemetry across GB, GH, GS, and GU series.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-12">
          {/* 3D Canvas Light Studio Stage */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white shadow-xl shadow-cobalt/8 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-electric" />
                <span className="font-mono text-xs font-semibold text-ink">
                  {config.sampleModel} · {config.chargePressureMpa} MPa N₂ Chamber
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCutaway((c) => !c)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    cutaway
                      ? 'border-cobalt bg-mist-2 text-cobalt'
                      : 'border-border bg-white text-steel hover:text-ink'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  {cutaway ? 'Cutaway: ON' : 'Cutaway: OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStrokePercent(32)
                    stateRef.current.dragYaw = 0.45
                    stateRef.current.dragPitch = 0.22
                  }}
                  aria-label="Reset 3D view"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-steel hover:border-cobalt hover:text-cobalt"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {webglReady ? (
              <div
                ref={mountRef}
                className="h-[340px] w-full cursor-grab active:cursor-grabbing sm:h-[420px]"
                aria-label="Interactive 3D Nitrogen Gas Spring WebGL Viewport"
              />
            ) : (
              <div className="flex h-[340px] items-center justify-center bg-mist p-8 text-center sm:h-[420px]">
                <p className="text-sm text-steel">
                  Interactive 3D cutaway requires WebGL. Use the series selector and stroke slider to calculate real-time force telemetry.
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 bg-mist/60 px-5 py-2.5 font-mono text-[11px] text-steel">
              <span>Drag to orbit 360° · EN 13445 Pressure Vessel Geometry</span>
              <span>Max Working Stroke: 90% S</span>
            </div>
          </div>

          {/* Engineering Controls & Live Telemetry Panel */}
          <div className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 shadow-sm lg:col-span-5 lg:p-7">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-cobalt">
                <Sliders className="h-4 w-4" />
                Series &amp; Stroke Controls
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {seriesOrder.map((id) => {
                  const s = seriesSimConfigs[id]
                  const active = id === seriesId
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSeriesId(id)}
                      className={`rounded-2xl border p-3.5 text-left transition-all ${
                        active
                          ? 'border-cobalt bg-mist-2 shadow-xs'
                          : 'border-border bg-white hover:border-cobalt/40 hover:bg-mist/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${active ? 'text-cobalt' : 'text-ink'}`}>
                          {s.label}
                        </span>
                        <span className="font-mono text-[11px] text-steel">{s.sampleModel}</span>
                      </div>
                      <p className="mt-1 text-xs text-steel">{s.initialForceDaN.toLocaleString()} daN init</p>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-mist p-4">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="stroke-slider" className="font-medium text-ink">
                    Working Stroke Compression
                  </label>
                  <span className="font-mono font-semibold text-cobalt tabular">
                    {strokePercent}% ({telemetry.travelMm.toFixed(1)} / {config.strokeMm} mm)
                  </span>
                </div>
                <input
                  id="stroke-slider"
                  type="range"
                  min={0}
                  max={MAX_STROKE_PERCENT}
                  value={strokePercent}
                  onChange={(e) => setStrokePercent(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-cobalt"
                />
                <div className="mt-1.5 flex justify-between font-mono text-[11px] text-steel">
                  <span>0% (Extended)</span>
                  <span>50% Mid-Stroke</span>
                  <span>90% Safe Limit</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-white p-4">
                <div className="font-mono text-[11px] uppercase text-steel">Live Output Force</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-cobalt tabular">
                  {Math.round(telemetry.forceDaN).toLocaleString()} <span className="text-xs font-normal text-steel">daN</span>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white p-4">
                <div className="font-mono text-[11px] uppercase text-steel">Internal N₂ Pressure</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-ink tabular">
                  {telemetry.pressureMpa.toFixed(1)} <span className="text-xs font-normal text-steel">MPa</span>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white p-3.5">
                <div className="font-mono text-[11px] uppercase text-steel">Rod / Cylinder OD</div>
                <div className="mt-0.5 font-mono text-sm font-semibold text-ink tabular">
                  Ø{config.rodMm} / Ø{config.boreMm} mm
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white p-3.5">
                <div className="font-mono text-[11px] uppercase text-steel">Initial → Final (90% S)</div>
                <div className="mt-0.5 font-mono text-sm font-semibold text-ink tabular">
                  {config.initialForceDaN.toLocaleString()} → {config.finalForceDaN.toLocaleString()} daN
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
