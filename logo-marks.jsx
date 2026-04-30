/* global React */

// ======================================================================
// ALDIRATECH MARK — v2 with naturalistic palm crown
// ----------------------------------------------------------------------
// The geometric "A" reads as a trunk and is crowned with a Saudi date-palm
// canopy: 7 drooping fronds with leaflet detail, gold dates clustered at
// the heart. The trunk's crossbar is the only modernist note — keeping
// the architectural / "tech" precision against the organic crown.
// ======================================================================

const EMERALD = "#0B5D3B";
const EMERALD_DEEP = "#06281C";
const GOLD = "#D4AF63";
const GOLD_SOFT = "#E6C786";
const IVORY = "#F7F4ED";
const ON_DARK = "#F2EEE4";

/* ---------- Palm canopy (drawn around apex of the A) ---------- */
function PalmCanopy({ cx, cy, color, accent, scale = 1 }) {
  // 7 fronds: outer ones droop heavily, center stands tall.
  // Each frond = a curved spine with leaflets on both sides.
  const fronds = [
    { angle: -82, len: 56, droop: 22 },
    { angle: -58, len: 60, droop: 16 },
    { angle: -30, len: 58, droop: 8  },
    { angle:   0, len: 62, droop: 0  },
    { angle:  30, len: 58, droop: 8  },
    { angle:  58, len: 60, droop: 16 },
    { angle:  82, len: 56, droop: 22 },
  ];

  const buildFrond = ({ angle, len, droop }) => {
    const rad = (angle * Math.PI) / 180;
    // Frond points "up", rotated by angle from vertical
    // Tip in local up-coords:
    const tipLocal = { x: 0, y: -len };
    // Apply droop (bend away from vertical at the tip)
    const droopedTipLocal = { x: tipLocal.x + droop * Math.sign(angle || 0.001), y: tipLocal.y + droop * 0.45 };
    // Mid control point for cubic
    const c1Local = { x: 0, y: -len * 0.45 };
    const c2Local = { x: droopedTipLocal.x * 0.55, y: droopedTipLocal.y * 0.85 };

    // Rotate around origin (apex), then translate to (cx, cy)
    const rot = (p) => ({
      x: p.x * Math.cos(rad) - p.y * Math.sin(rad) + cx,
      y: p.x * Math.sin(rad) + p.y * Math.cos(rad) + cy,
    });

    const start = { x: cx, y: cy };
    const c1 = rot(c1Local);
    const c2 = rot(c2Local);
    const tip = rot(droopedTipLocal);

    return { start, c1, c2, tip, angle, len, droop };
  };

  const built = fronds.map(buildFrond);

  // Leaflets along each spine — tiny ticks perpendicular to the curve
  const leafletsFor = (f) => {
    const ticks = [];
    const N = 7;
    for (let i = 1; i < N; i++) {
      const t = i / N;
      // De Casteljau on cubic
      const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      const a1 = lerp(f.start, f.c1, t);
      const b1 = lerp(f.c1, f.c2, t);
      const c1 = lerp(f.c2, f.tip, t);
      const a2 = lerp(a1, b1, t);
      const b2 = lerp(b1, c1, t);
      const p  = lerp(a2, b2, t);
      // Tangent
      const dx = b2.x - a2.x;
      const dy = b2.y - a2.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const leafLen = 6.5 * (1 - t * 0.45); // shorter near tip
      // Leaflets on the OUTER side only for outermost fronds (more natural),
      // both sides for inner ones
      const sides = Math.abs(f.angle) > 60 ? [1] : [-1, 1];
      sides.forEach((s) => {
        ticks.push({
          x1: p.x,
          y1: p.y,
          x2: p.x + nx * leafLen * s,
          y2: p.y + ny * leafLen * s,
        });
      });
    }
    return ticks;
  };

  return (
    <g>
      {/* Spines */}
      {built.map((f, i) => (
        <path
          key={`spine-${i}`}
          d={`M ${f.start.x} ${f.start.y} C ${f.c1.x} ${f.c1.y}, ${f.c2.x} ${f.c2.y}, ${f.tip.x} ${f.tip.y}`}
          fill="none"
          stroke={color}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ))}
      {/* Leaflets */}
      {built.flatMap((f, i) =>
        leafletsFor(f).map((t, j) => (
          <line
            key={`leaf-${i}-${j}`}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))
      )}
      {/* Frond tip dots — keeps each spine resolved */}
      {built.map((f, i) => (
        <circle key={`tip-${i}`} cx={f.tip.x} cy={f.tip.y} r="1.4" fill={color} />
      ))}
      {/* Date cluster at the heart — 5 small gold drupes */}
      <g>
        <circle cx={cx - 4}  cy={cy + 3} r="2.4" fill={accent} />
        <circle cx={cx + 4}  cy={cy + 3} r="2.4" fill={accent} />
        <circle cx={cx}      cy={cy - 1} r="2.6" fill={accent} />
        <circle cx={cx - 7}  cy={cy + 6} r="1.8" fill={accent} />
        <circle cx={cx + 7}  cy={cy + 6} r="1.8" fill={accent} />
      </g>
    </g>
  );
}

/* ---------- The core glyph (200x200 viewbox) ---------- */
function AldiraGlyph({ primary = EMERALD, accent = GOLD }) {
  const apex = { x: 100, y: 76 }; // moved down to leave room for canopy
  return (
    <g>
      {/* Palm canopy ABOVE the A */}
      <PalmCanopy cx={apex.x} cy={apex.y} color={primary} accent={accent} />

      {/* The A — trunk geometry */}
      <path d="M 100 86 L 38 188 L 60 188 L 100 120 Z" fill={primary} />
      <path d="M 100 86 L 162 188 L 140 188 L 100 120 Z" fill={primary} />
      {/* Crossbar */}
      <path d="M 76 152 L 124 152 L 119 162 L 81 162 Z" fill={primary} />
      {/* Inner counter */}
      <path d="M 100 132 L 93 146 L 107 146 Z" fill={primary} />
    </g>
  );
}

/* ---------- Wordmark ---------- */
function AldiratechWordmark({ color = EMERALD, accentColor = GOLD, showTagline = true, partner = true }) {
  return (
    <g>
      <text x="0" y="56" fontFamily="'Inter Tight', 'Inter', system-ui, sans-serif" fontWeight="600" fontSize="62" letterSpacing="-2" fill={color}>
        <tspan fontWeight="700">Aldira</tspan><tspan fontWeight="400">tech</tspan>
      </text>
      {showTagline && (
        <text x="2" y="84" fontFamily="'Inter Tight', 'Inter', system-ui, sans-serif" fontWeight="600" fontSize="13" letterSpacing="4.8" fill={color} opacity="0.92">
          SERVICENOW CONSULTING
        </text>
      )}
      {partner && (
        <>
          <line x1="2" y1="98" x2="60" y2="98" stroke={accentColor} strokeWidth="1.4" />
          <text x="68" y="103" fontFamily="'Inter Tight', 'Inter', system-ui, sans-serif" fontWeight="500" fontSize="10" letterSpacing="2.6" fill={color} opacity="0.7">
            RIYADH · GLOBAL
          </text>
        </>
      )}
    </g>
  );
}

/* ---------- Composed lockups ---------- */

function FullLogo({ mode = "light", width = 720, partner = true, transparent = false }) {
  const bg = transparent ? "transparent" : (mode === "light" ? IVORY : EMERALD_DEEP);
  const fg = mode === "light" ? EMERALD : ON_DARK;
  const accent = mode === "light" ? GOLD : GOLD_SOFT;
  return (
    <svg viewBox="0 0 720 240" width={width} style={{ display: "block", background: bg }}>
      <g transform="translate(40, 18)">
        <AldiraGlyph primary={fg} accent={accent} />
      </g>
      <g transform="translate(260, 70)">
        <AldiratechWordmark color={fg} accentColor={accent} partner={partner} />
      </g>
    </svg>
  );
}

function HorizontalCompact({ mode = "light", width = 560, transparent = false }) {
  const bg = transparent ? "transparent" : (mode === "light" ? IVORY : EMERALD_DEEP);
  const fg = mode === "light" ? EMERALD : ON_DARK;
  const accent = mode === "light" ? GOLD : GOLD_SOFT;
  return (
    <svg viewBox="0 0 560 160" width={width} style={{ display: "block", background: bg }}>
      <g transform="translate(28, -8) scale(0.78)">
        <AldiraGlyph primary={fg} accent={accent} />
      </g>
      <text x="220" y="92" fontFamily="'Inter Tight', 'Inter', system-ui, sans-serif" fontWeight="600" fontSize="50" letterSpacing="-1.6" fill={fg}>
        <tspan fontWeight="700">Aldira</tspan><tspan fontWeight="400">tech</tspan>
      </text>
      <text x="222" y="114" fontFamily="'Inter Tight', 'Inter', system-ui, sans-serif" fontWeight="600" fontSize="10" letterSpacing="3.6" fill={fg} opacity="0.85">
        SERVICENOW CONSULTING
      </text>
      <line x1="222" y1="125" x2="260" y2="125" stroke={accent} strokeWidth="1.2" />
    </svg>
  );
}

function MonogramMark({ mode = "light", size = 320, withRing = true, transparent = false }) {
  const bg = transparent ? "transparent" : (mode === "light" ? IVORY : EMERALD_DEEP);
  const fg = mode === "light" ? EMERALD : ON_DARK;
  const accent = mode === "light" ? GOLD : GOLD_SOFT;
  return (
    <svg viewBox="0 0 320 320" width={size} height={size} style={{ display: "block", background: bg }}>
      {withRing && (
        <>
          <circle cx="160" cy="160" r="142" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.35" />
          <circle cx="160" cy="160" r="148" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.55" strokeDasharray="1 5" />
        </>
      )}
      <g transform="translate(60, 60)">
        <AldiraGlyph primary={fg} accent={accent} />
      </g>
    </svg>
  );
}

function MonogramSolid({ mode = "light", size = 320 }) {
  const bg = mode === "light" ? EMERALD : EMERALD_DEEP;
  const fg = mode === "light" ? IVORY : ON_DARK;
  const accent = GOLD_SOFT;
  return (
    <svg viewBox="0 0 320 320" width={size} height={size} style={{ display: "block" }}>
      <rect x="0" y="0" width="320" height="320" rx="64" fill={bg} />
      <rect x="10" y="10" width="300" height="300" rx="56" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
      <g transform="translate(60, 60)">
        <AldiraGlyph primary={fg} accent={accent} />
      </g>
    </svg>
  );
}

function Favicon({ size = 64, mode = "solid" }) {
  // Tiny size — single canopy bar + bold A. Naturalistic palm wouldn't read at 16px.
  const bg = mode === "solid" ? EMERALD : "transparent";
  const fg = mode === "solid" ? IVORY : EMERALD;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={{ display: "block" }}>
      {mode === "solid" && <rect x="0" y="0" width="64" height="64" rx="14" fill={bg} />}
      {/* miniature palm crown — 3 strokes */}
      <path d="M 32 22 C 22 18 18 14 16 12" stroke={fg} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 32 22 C 42 18 46 14 48 12" stroke={fg} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M 32 22 L 32 12" stroke={fg} strokeWidth="2.2" strokeLinecap="round" />
      {/* A */}
      <path d="M 32 24 L 14 54 L 21 54 L 32 36 Z" fill={fg} />
      <path d="M 32 24 L 50 54 L 43 54 L 32 36 Z" fill={fg} />
      <rect x="22" y="44" width="20" height="3.4" fill={fg} />
      {/* gold dates */}
      <circle cx="32" cy="22" r="2" fill={GOLD} />
    </svg>
  );
}

/* ---------- Renderers to static SVG strings (for download) ---------- */
function renderToSVGString(reactElement) {
  // Use ReactDOMServer if available, else build manually via a temporary container
  if (typeof ReactDOMServer !== "undefined" && ReactDOMServer.renderToStaticMarkup) {
    return ReactDOMServer.renderToStaticMarkup(reactElement);
  }
  // Fallback: render to a detached div
  const tmp = document.createElement("div");
  // eslint-disable-next-line no-undef
  const r = ReactDOM.createRoot(tmp);
  r.render(reactElement);
  // synchronous-ish — give a microtask
  return tmp.innerHTML;
}

/* expose */
Object.assign(window, {
  AldiraGlyph,
  PalmCanopy,
  AldiratechWordmark,
  FullLogo,
  HorizontalCompact,
  MonogramMark,
  MonogramSolid,
  Favicon,
  renderToSVGString,
  ALDIRA_COLORS: { EMERALD, EMERALD_DEEP, GOLD, GOLD_SOFT, IVORY, ON_DARK },
});
