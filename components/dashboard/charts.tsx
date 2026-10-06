"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Width of an element, kept current as the layout changes. */
function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

/** 1, 2 or 5 × 10ⁿ so the axis reads in round numbers. */
function niceMax(value: number) {
  if (value <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(value)));
  const f = value / exp;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * exp;
}

const NAVY = "#1e2f5c";
const BLUE = "#1e5aa8";
const GRID = "#e3e8ef";
const AXIS = "#5b6472";

/** Trend line without axes, sized by its parent. */
export function Sparkline({ values, label }: { values: number[]; label: string }) {
  const id = useId();
  const w = 120;
  const h = 30;
  const max = Math.max(...values, 0);
  const pts = values.map((v, i) => [values.length > 1 ? (i / (values.length - 1)) * w : w / 2, max > 0 ? h - 2 - (v / max) * (h - 6) : h - 2]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label={label} className="mt-1 h-8 w-full">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0.22" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
      </defs>
      {line && <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />}
      {line && <path d={line} fill="none" stroke={BLUE} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />}
    </svg>
  );
}

export interface TrendPoint {
  label: string;
  fullLabel: string;
  value: number;
}

/**
 * Area chart in plain SVG at the container's real width (text keeps its size).
 * Hover or arrow keys show each day's exact value.
 */
export function TrendChart({
  points,
  format,
  formatAxis = format,
  label,
  height = 220,
}: {
  points: TrendPoint[];
  format: (v: number) => string;
  formatAxis?: (v: number) => string;
  label: string;
  height?: number;
}) {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const id = useId();
  const padL = 52, padR = 10, padT = 10, padB = 26;
  const innerW = Math.max(0, width - padL - padR);
  const innerH = height - padT - padB;
  const max = niceMax(Math.max(...points.map((p) => p.value), 0));
  const x = (i: number) => padL + (points.length > 1 ? (i / (points.length - 1)) * innerW : innerW / 2);
  const y = (v: number) => padT + innerH - (v / max) * innerH;
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const every = Math.max(1, Math.ceil(points.length / Math.max(1, Math.floor(innerW / 64))));
  const active = hover != null ? points[hover] : null;

  return (
    <div ref={ref} className="relative w-full" style={{ height }}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={label}
          tabIndex={0}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const rel = (e.clientX - rect.left - padL) / Math.max(1, innerW);
            setHover(Math.max(0, Math.min(points.length - 1, Math.round(rel * (points.length - 1)))));
          }}
          onMouseLeave={() => setHover(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setHover((h) => Math.min(points.length - 1, (h ?? -1) + 1));
            if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? points.length) - 1));
          }}
          onBlur={() => setHover(null)}
          className="block rounded-lg"
        >
          <defs>
            <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity="0.2" />
              <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line x1={padL} x2={width - padR} y1={y(t * max)} y2={y(t * max)} stroke={GRID} strokeDasharray={t === 0 ? undefined : "3 4"} />
              <text x={padL - 8} y={y(t * max)} dy="0.32em" textAnchor="end" fontSize="11" fill={AXIS}>{formatAxis(t * max)}</text>
            </g>
          ))}
          {points.map((p, i) =>
            i % every === 0 || i === points.length - 1 ? (
              <text key={i} x={x(i)} y={height - 7} textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"} fontSize="11" fill={AXIS}>
                {p.label}
              </text>
            ) : null
          )}
          {line && <path d={`${line} L${x(points.length - 1)},${padT + innerH} L${x(0)},${padT + innerH} Z`} fill={`url(#${id})`} />}
          {line && <path d={line} fill="none" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />}
          {points.map((p, i) => (
            <circle key={i} cx={x(i)} cy={y(p.value)} r={hover === i ? 4.5 : 2.5} fill="#fcfbf7" stroke={NAVY} strokeWidth="1.6" />
          ))}
          {hover != null && <line x1={x(hover)} x2={x(hover)} y1={padT} y2={padT + innerH} stroke={NAVY} strokeOpacity="0.3" />}
        </svg>
      )}
      {active && hover != null && (
        <div
          role="status"
          className="pointer-events-none absolute top-0 rounded-lg border border-border bg-warm-white px-2.5 py-1.5 text-xs shadow-md"
          style={{ left: Math.min(Math.max(x(hover) - 75, 0), Math.max(0, width - 150)), width: 150 }}
        >
          <div className="text-muted">{active.fullLabel}</div>
          <div className="font-bold tabular-nums text-ink">{format(active.value)}</div>
        </div>
      )}
    </div>
  );
}
