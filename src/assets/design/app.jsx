/* global React, FullLogo, HorizontalCompact, MonogramMark, MonogramSolid, Favicon, AldiraGlyph, ALDIRA_COLORS, DesignCanvas, DCSection, DCArtboard */

const { EMERALD, EMERALD_DEEP, GOLD, GOLD_SOFT, IVORY, ON_DARK } = window.ALDIRA_COLORS;

/* ----------------- Display helpers ----------------- */

const cardLight = {
  background: IVORY,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 32,
  boxSizing: "border-box",
};
const cardDark = { ...cardLight, background: EMERALD_DEEP };
const cardWhite = { ...cardLight, background: "#FFFFFF" };
const cardCharcoal = { ...cardLight, background: "#0E0E0F" };

function ColorChip({ name, hex, contrast = "#0B0B0B" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
      <div style={{ width: 120, height: 120, borderRadius: 12, background: hex, boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }} />
      <div style={{ fontFamily: "'Inter Tight', system-ui, sans-serif", fontSize: 12, color: contrast, letterSpacing: 0.4 }}>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ opacity: 0.6, fontVariantNumeric: "tabular-nums" }}>{hex}</div>
      </div>
    </div>
  );
}

function ConstructionBoard() {
  // Show the glyph on a grid for "construction / clear-space" reference
  return (
    <div style={{ ...cardLight, flexDirection: "column", gap: 18 }}>
      <svg viewBox="0 0 320 320" width="340" style={{ background: "#FBF8F1", display: "block" }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0B5D3B" strokeOpacity="0.08" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="320" height="320" fill="url(#grid)" />
        <rect x="40" y="40" width="240" height="240" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="0.8" strokeDasharray="2 4" />
        <g transform="translate(60, 60)">
          <AldiraGlyph primary={EMERALD} accent={GOLD} />
        </g>
      </svg>
      <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, color: "#3a3a3a", letterSpacing: 0.4, textAlign: "center", maxWidth: 320 }}>
        Mark constructed on a 64-unit grid · minimum clear space = ½ glyph height
      </div>
    </div>
  );
}

function Typeboard() {
  return (
    <div style={{ ...cardLight, flexDirection: "column", alignItems: "flex-start", gap: 22, padding: 40 }}>
      <div style={{ fontFamily: "'Inter Tight', system-ui", fontSize: 11, letterSpacing: 3, color: EMERALD, opacity: 0.7 }}>TYPE SYSTEM</div>
      <div style={{ fontFamily: "'Inter Tight', system-ui", fontSize: 64, color: EMERALD, lineHeight: 1, letterSpacing: -2 }}>
        <span style={{ fontWeight: 700 }}>Aldira</span><span style={{ fontWeight: 400 }}>tech</span>
      </div>
      <div style={{ display: "flex", gap: 28, fontFamily: "'Inter Tight', system-ui", color: "#1a1a1a" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, opacity: 0.55 }}>WORDMARK</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Inter Tight · 700 / 400</div>
          <div style={{ fontSize: 13, opacity: 0.65 }}>Tracking −60 · pairs weight contrast</div>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, opacity: 0.55 }}>TAGLINE</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Inter Tight · 600</div>
          <div style={{ fontSize: 13, opacity: 0.65 }}>All caps · tracking +480</div>
        </div>
      </div>
      <div style={{ height: 1, background: GOLD, width: 80, marginTop: 4 }} />
    </div>
  );
}

function ColorBoard() {
  return (
    <div style={{ ...cardLight, flexDirection: "column", alignItems: "flex-start", gap: 26, padding: 40 }}>
      <div style={{ fontFamily: "'Inter Tight', system-ui", fontSize: 11, letterSpacing: 3, color: EMERALD, opacity: 0.7 }}>PALETTE</div>
      <div style={{ display: "flex", gap: 28 }}>
        <ColorChip name="Emerald" hex="#0B5D3B" />
        <ColorChip name="Forest" hex="#06281C" />
        <ColorChip name="Gold" hex="#D4AF63" />
        <ColorChip name="Ivory" hex="#F7F4ED" />
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, color: "#3a3a3a", letterSpacing: 0.4 }}>
        Emerald carries the brand. Gold is reserved — keystone moments only.
      </div>
    </div>
  );
}

function FaviconBoard() {
  return (
    <div style={{ ...cardWhite, flexDirection: "column", gap: 28 }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Favicon size={128} mode="solid" />
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: "#666" }}>128 px</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Favicon size={64} mode="solid" />
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: "#666" }}>64 px</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Favicon size={32} mode="solid" />
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: "#666" }}>32 px</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Favicon size={16} mode="solid" />
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: "#666" }}>16 px</div>
        </div>
      </div>
      <div style={{
        background: EMERALD_DEEP, borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <Favicon size={18} mode="solid" />
        <span style={{ fontFamily: "'Inter Tight', system-ui", fontSize: 12, color: ON_DARK, letterSpacing: 0.3 }}>aldiratech.com  ·  Browser tab preview</span>
      </div>
    </div>
  );
}

function BrowserTabPreview() {
  return (
    <div style={{ ...cardCharcoal, flexDirection: "column", gap: 0, padding: 0, alignItems: "stretch", justifyContent: "stretch" }}>
      {/* Mock browser chrome */}
      <div style={{ background: "#1c1c1e", borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
      </div>
      <div style={{ background: "#0E0E0F", padding: "10px 14px", display: "flex", gap: 8 }}>
        <div style={{
          background: "#2a2a2c", borderRadius: "8px 8px 0 0", padding: "8px 14px",
          display: "flex", alignItems: "center", gap: 8, color: "#EDEDED",
          fontFamily: "'Inter Tight', system-ui", fontSize: 12, letterSpacing: 0.2, maxWidth: 260,
        }}>
          <Favicon size={14} mode="solid" />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Aldiratech — ServiceNow Consulting</span>
          <span style={{ opacity: 0.5, marginLeft: 6 }}>×</span>
        </div>
      </div>
      <div style={{ flex: 1, background: "#0E0E0F", display: "flex", alignItems: "center", justifyContent: "center", color: "#5b5b5d", fontFamily: "'Inter Tight', system-ui", fontSize: 12 }}>
        — page —
      </div>
    </div>
  );
}

function StationeryCard({ mode = "light" }) {
  // Simple business-card lockup
  const bg = mode === "light" ? "#FFFFFF" : EMERALD_DEEP;
  const fg = mode === "light" ? EMERALD : ON_DARK;
  const accent = mode === "light" ? GOLD : GOLD_SOFT;
  const sub = mode === "light" ? "#5b5b5b" : "rgba(242,238,228,0.7)";
  return (
    <div style={{
      width: "100%", height: "100%", background: bg, padding: 36, boxSizing: "border-box",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      fontFamily: "'Inter Tight', system-ui",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <svg viewBox="0 0 200 200" width="44" height="44">
          <AldiraGlyph primary={fg} accent={accent} />
        </svg>
        <div>
          <div style={{ fontSize: 18, color: fg, letterSpacing: -0.3 }}>
            <span style={{ fontWeight: 700 }}>Aldira</span><span style={{ fontWeight: 400 }}>tech</span>
          </div>
          <div style={{ fontSize: 8.5, color: fg, opacity: 0.85, letterSpacing: 2.6, marginTop: 2 }}>
            SERVICENOW CONSULTING
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: fg, letterSpacing: -0.2 }}>Faisal Al-Harbi</div>
        <div style={{ fontSize: 11, color: sub, letterSpacing: 0.3, marginTop: 2 }}>Managing Partner · Riyadh</div>
        <div style={{ height: 1, background: accent, width: 36, margin: "12px 0" }} />
        <div style={{ fontSize: 10.5, color: sub, lineHeight: 1.7, fontVariantNumeric: "tabular-nums" }}>
          aldiratech.com<br />
          +966 11 416 0366<br />
          King Fahd Rd · Al Olaya · Riyadh 12212
        </div>
      </div>
    </div>
  );
}

/* ----------------- Transparent previews + Download ----------------- */

const checker = `repeating-conic-gradient(#e9e4d8 0% 25%, #f7f4ed 0% 50%) 50% / 18px 18px`;

function TransparentBoard({ children, label }) {
  return (
    <div style={{ width: "100%", height: "100%", background: checker, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, boxSizing: "border-box", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "transparent" }}>{children}</div>
      <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: "#3a3a3a", letterSpacing: 0.6 }}>{label}</div>
    </div>
  );
}

function downloadSVG(filename, jsxElement) {
  const inner = ReactDOMServer.renderToStaticMarkup(jsxElement);
  // The element returned IS the <svg>; just add xmlns
  const withNS = inner.replace(/^<svg /, '<svg xmlns="http://www.w3.org/2000/svg" ');
  const blob = new Blob([withNS], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function DownloadButton({ label, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, padding: "10px 14px", borderRadius: 8, border: `1px solid ${hover ? GOLD : "rgba(11,93,59,0.18)"}`,
        background: hover ? "#FFFFFF" : "#FBF8F1", color: EMERALD,
        fontFamily: "'Inter Tight', system-ui", fontSize: 12.5, fontWeight: 600,
        cursor: "pointer", letterSpacing: 0.1, width: "100%", textAlign: "left",
        transition: "border-color 120ms ease, background 120ms ease",
      }}
    >
      <span>{label}</span>
      <span style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: GOLD, letterSpacing: 0.4 }}>SVG ↓</span>
    </button>
  );
}

function DownloadPanel() {
  const items = [
    { label: "Full logo · Light · transparent",     fn: () => downloadSVG("aldiratech-full-light.svg",     <FullLogo mode="light" width={720} transparent />) },
    { label: "Full logo · Dark · transparent",      fn: () => downloadSVG("aldiratech-full-dark.svg",      <FullLogo mode="dark"  width={720} transparent />) },
    { label: "Compact · Light · transparent",       fn: () => downloadSVG("aldiratech-compact-light.svg",  <HorizontalCompact mode="light" width={560} transparent />) },
    { label: "Compact · Dark · transparent",        fn: () => downloadSVG("aldiratech-compact-dark.svg",   <HorizontalCompact mode="dark"  width={560} transparent />) },
    { label: "Monogram · Light · transparent",      fn: () => downloadSVG("aldiratech-monogram-light.svg", <MonogramMark mode="light" size={320} withRing={false} transparent />) },
    { label: "Monogram · Dark · transparent",       fn: () => downloadSVG("aldiratech-monogram-dark.svg",  <MonogramMark mode="dark"  size={320} withRing={false} transparent />) },
    { label: "App icon · Emerald tile",             fn: () => downloadSVG("aldiratech-appicon-emerald.svg",<MonogramSolid mode="light" size={320} />) },
    { label: "App icon · Forest tile",              fn: () => downloadSVG("aldiratech-appicon-forest.svg", <MonogramSolid mode="dark"  size={320} />) },
    { label: "Favicon · solid",                     fn: () => downloadSVG("aldiratech-favicon.svg",        <Favicon size={64} mode="solid" />) },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: IVORY, padding: 28, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 14, overflow: "auto" }}>
      <div style={{ fontFamily: "'Inter Tight', system-ui", fontSize: 11, letterSpacing: 3, color: EMERALD, opacity: 0.7 }}>DOWNLOAD · SVG</div>
      <div style={{ fontFamily: "'Inter Tight', system-ui", fontSize: 18, color: EMERALD, fontWeight: 600, letterSpacing: -0.2 }}>Transparent vector files</div>
      <div style={{ fontFamily: "'Inter Tight', system-ui", fontSize: 12, color: "#3a3a3a", lineHeight: 1.5, marginBottom: 6 }}>
        All marks export as crisp SVG with transparent background. Drop straight into Keynote, Figma, web, or print.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
        {items.map((it) => <DownloadButton key={it.label} label={it.label} onClick={it.fn} />)}
      </div>
    </div>
  );
}

/* ----------------- App ----------------- */

function App() {
  return (
    <DesignCanvas
      title="Aldiratech — Identity System"
      subtitle="Original logo design · emerald + gold · Vision 2030 sensibility"
    >
      <DCSection id="primary" title="01 · Primary Lockup">
        <DCArtboard id="full-light" label="Full logo · Light" width={780} height={260}>
          <div style={cardLight}>
            <FullLogo mode="light" width={680} />
          </div>
        </DCArtboard>
        <DCArtboard id="full-dark" label="Full logo · Dark" width={780} height={260}>
          <div style={cardDark}>
            <FullLogo mode="dark" width={680} />
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="horizontal" title="02 · Horizontal Compact">
        <DCArtboard id="hc-light" label="Compact · Light" width={620} height={200}>
          <div style={cardLight}>
            <HorizontalCompact mode="light" width={520} />
          </div>
        </DCArtboard>
        <DCArtboard id="hc-dark" label="Compact · Dark" width={620} height={200}>
          <div style={cardDark}>
            <HorizontalCompact mode="dark" width={520} />
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="monogram" title="03 · Icon-only Monogram">
        <DCArtboard id="mono-light" label="Monogram · Light" width={380} height={380}>
          <div style={cardLight}>
            <MonogramMark mode="light" size={300} />
          </div>
        </DCArtboard>
        <DCArtboard id="mono-dark" label="Monogram · Dark" width={380} height={380}>
          <div style={cardDark}>
            <MonogramMark mode="dark" size={300} />
          </div>
        </DCArtboard>
        <DCArtboard id="mono-solid" label="App icon · Emerald" width={380} height={380}>
          <div style={{ ...cardLight, background: "#EFEAE0" }}>
            <MonogramSolid mode="light" size={280} />
          </div>
        </DCArtboard>
        <DCArtboard id="mono-solid-dark" label="App icon · Forest" width={380} height={380}>
          <div style={{ ...cardLight, background: "#EFEAE0" }}>
            <MonogramSolid mode="dark" size={280} />
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="favicon" title="04 · Favicon">
        <DCArtboard id="fav-sizes" label="Favicon · 16 → 128" width={620} height={300}>
          <FaviconBoard />
        </DCArtboard>
        <DCArtboard id="fav-tab" label="In context · browser tab" width={520} height={300}>
          <BrowserTabPreview />
        </DCArtboard>
      </DCSection>

      <DCSection id="system" title="05 · System & Construction">
        <DCArtboard id="construction" label="Construction grid" width={420} height={460}>
          <ConstructionBoard />
        </DCArtboard>
        <DCArtboard id="type" label="Type" width={520} height={460}>
          <Typeboard />
        </DCArtboard>
        <DCArtboard id="color" label="Color" width={620} height={460}>
          <ColorBoard />
        </DCArtboard>
      </DCSection>

      <DCSection id="apply" title="06 · In Application">
        <DCArtboard id="card-light" label="Business card · Light" width={520} height={300}>
          <StationeryCard mode="light" />
        </DCArtboard>
        <DCArtboard id="card-dark" label="Business card · Dark" width={520} height={300}>
          <StationeryCard mode="dark" />
        </DCArtboard>
      </DCSection>

      <DCSection id="transparent" title="07 · Transparent SVGs">
        <DCArtboard id="t-full-light" label="Full · Light · transparent" width={780} height={260}>
          <TransparentBoard label="aldiratech-full-light.svg">
            <FullLogo mode="light" width={640} transparent />
          </TransparentBoard>
        </DCArtboard>
        <DCArtboard id="t-full-dark" label="Full · Dark · transparent" width={780} height={260}>
          <div style={{ width: "100%", height: "100%", background: "#1a1a1c", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, boxSizing: "border-box", flexDirection: "column", gap: 14 }}>
            <FullLogo mode="dark" width={640} transparent />
            <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: "#aaa", letterSpacing: 0.6 }}>aldiratech-full-dark.svg</div>
          </div>
        </DCArtboard>
        <DCArtboard id="t-mono-light" label="Monogram · Light · transparent" width={380} height={380}>
          <TransparentBoard label="aldiratech-monogram-light.svg">
            <MonogramMark mode="light" size={260} withRing={false} transparent />
          </TransparentBoard>
        </DCArtboard>
        <DCArtboard id="t-mono-dark" label="Monogram · Dark · transparent" width={380} height={380}>
          <div style={{ width: "100%", height: "100%", background: "#1a1a1c", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, boxSizing: "border-box", flexDirection: "column", gap: 14 }}>
            <MonogramMark mode="dark" size={260} withRing={false} transparent />
            <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, color: "#aaa", letterSpacing: 0.6 }}>aldiratech-monogram-dark.svg</div>
          </div>
        </DCArtboard>
        <DCArtboard id="downloads" label="Download all" width={420} height={500}>
          <DownloadPanel />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
