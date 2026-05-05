import { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, Save, RefreshCw, CheckCircle2, AlertCircle, Lock, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PASSCODE = "Aldira@2026";
type Lang = "en" | "ar";

const GITHUB_OWNER = import.meta.env.VITE_GH_OWNER || "Technoladders";
const GITHUB_REPO = import.meta.env.VITE_GH_REPO || "aldiratech-website";
const WEBHOOK_SECRET = import.meta.env.VITE_GH_WEBHOOK_SECRET || "";

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
type AnyObj = Record<string, unknown>;

// ─── Passcode Gate ───────────────────────────────────────────────────────────
function PasscodeGate({ onAuth }: { onAuth: () => void }) {
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const submit = () => pass === PASSCODE ? onAuth() : setErr(true);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm glass-strong rounded-3xl p-10 gold-edge text-center">
        <div className="w-16 h-16 rounded-2xl gradient-emerald flex items-center justify-center mx-auto mb-6 shadow-soft">
          <Lock className="w-8 h-8 text-gold" />
        </div>
        <h1 className="font-display font-bold text-2xl mb-1">Content Editor</h1>
        <p className="text-xs text-muted-foreground mb-8">Aldiratech admin — enter your passcode</p>
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            value={pass}
            onChange={(e) => { setPass(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Admin passcode"
            className={`w-full h-12 px-4 pr-12 rounded-2xl bg-background border text-sm focus:outline-none focus:border-primary transition-colors ${err ? "border-destructive" : "border-border-solid"}`}
          />
          <button onClick={() => setShow(!show)} className="absolute right-3 top-3 text-muted-foreground">
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {err && <p className="text-xs text-destructive mb-4">Incorrect passcode.</p>}
        <Button variant="hero" className="w-full" onClick={submit}>Unlock Editor</Button>
        <p className="text-xs text-muted-foreground mt-5">Changes commit to GitHub and rebuild the site in ~90s</p>
      </div>
    </div>
  );
}

// ─── String field (auto multiline) ──────────────────────────────────────────
function StringField({ value, onChange, isAr }: { value: string; onChange: (v: string) => void; isAr: boolean }) {
  const multiline = value.length > 80 || value.includes("\n");
  const cls = `w-full px-4 rounded-xl bg-background border border-border-solid text-sm focus:outline-none focus:border-primary transition-colors ${isAr ? "font-arabic text-right" : ""}`;
  return multiline
    ? <textarea rows={Math.min(10, Math.ceil(value.length / 70) + 1)} value={value} onChange={e => onChange(e.target.value)} dir={isAr ? "rtl" : "ltr"} className={`${cls} py-3 resize-y`} />
    : <input type="text" value={value} onChange={e => onChange(e.target.value)} dir={isAr ? "rtl" : "ltr"} className={`${cls} h-11`} />;
}

// ─── String array (add/remove items) ────────────────────────────────────────
function StringArrayField({ value, onChange, isAr }: { value: string[]; onChange: (v: string[]) => void; isAr: boolean }) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-3 text-[9px] font-bold text-primary">{i + 1}</span>
          <StringField value={item} onChange={v => { const a = clone(value); a[i] = v; onChange(a); }} isAr={isAr} />
          <button onClick={() => onChange(value.filter((_, j) => j !== i))} className="mt-3 text-muted-foreground hover:text-destructive transition-colors shrink-0">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...value, ""])} className="flex items-center gap-1.5 text-xs text-primary hover:opacity-70 transition-opacity mt-1">
        <Plus className="w-3.5 h-3.5" /> Add item
      </button>
    </div>
  );
}

// ─── Recursive object editor ─────────────────────────────────────────────────
function ObjectEditor({ data, onChange, isAr, depth = 0 }: {
  data: AnyObj; onChange: (v: AnyObj) => void; isAr: boolean; depth?: number;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const set = (key: string, val: unknown) => { const n = clone(data); n[key] = val; onChange(n); };

  return (
    <div className={`space-y-3 ${depth > 0 ? "pl-3 border-l-2 border-primary/10" : ""}`}>
      {Object.entries(data).map(([key, val]) => {
        const label = key.replace(/_/g, " ");
        const isStr = typeof val === "string";
        const isStrArr = Array.isArray(val) && val.every(v => typeof v === "string");
        const isObjArr = Array.isArray(val) && val.length > 0 && typeof val[0] === "object" && val[0] !== null;
        const isObj = !Array.isArray(val) && typeof val === "object" && val !== null;

        if (isStr) return (
          <div key={key} className="bg-surface/50 border border-border-solid rounded-xl p-4">
            <div className="flex gap-2 mb-2">
              <code className="text-[10px] text-muted-foreground bg-surface px-1.5 py-0.5 rounded">{key}</code>
              <span className="text-xs font-semibold capitalize">{label}</span>
            </div>
            <StringField value={val as string} onChange={v => set(key, v)} isAr={isAr} />
          </div>
        );

        if (isStrArr) return (
          <div key={key} className="bg-surface/50 border border-border-solid rounded-xl p-4">
            <div className="flex gap-2 mb-3">
              <code className="text-[10px] text-muted-foreground bg-surface px-1.5 py-0.5 rounded">{key}</code>
              <span className="text-xs font-semibold capitalize">{label} <span className="text-muted-foreground font-normal">(list)</span></span>
            </div>
            <StringArrayField value={val as string[]} onChange={v => set(key, v)} isAr={isAr} />
          </div>
        );

        if (isObjArr) return (
          <ObjectArrayEditor key={key} fieldKey={key} items={val as AnyObj[]} onChange={v => set(key, v)} isAr={isAr} depth={depth} />
        );

        if (isObj) {
          const open = !collapsed[key];
          return (
            <div key={key} className="border border-border-solid rounded-xl overflow-hidden">
              <button onClick={() => setCollapsed(c => ({ ...c, [key]: open }))}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-primary/5 transition-colors">
                <span className="font-display font-semibold text-sm capitalize">{label}</span>
                {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>
              {open && (
                <div className="px-4 pb-4 pt-2 border-t border-border-solid/40">
                  <ObjectEditor data={val as AnyObj} onChange={v => set(key, v)} isAr={isAr} depth={depth + 1} />
                </div>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

// ─── Array of objects ────────────────────────────────────────────────────────
function ObjectArrayEditor({ fieldKey, items, onChange, isAr, depth }: {
  fieldKey: string; items: AnyObj[]; onChange: (v: AnyObj[]) => void; isAr: boolean; depth: number;
}) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpenItems(p => ({ ...p, [i]: !p[i] }));
  const getLabel = (item: AnyObj, i: number) => {
    for (const k of ["title", "q", "name", "slug", "step"]) {
      if (typeof item[k] === "string") return item[k] as string;
    }
    return `Item ${i + 1}`;
  };
  return (
    <div className="border border-primary/20 rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
        <span className="font-display font-semibold text-sm capitalize">{fieldKey.replace(/_/g, " ")}</span>
        <span className="text-xs text-muted-foreground">{items.length} items</span>
      </div>
      <div className="p-3 space-y-2">
        {items.map((item, i) => {
          const isOpen = !!openItems[i];
          return (
            <div key={i} className="border border-border-solid rounded-xl overflow-hidden">
              <button onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-primary/5 transition-colors">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0">{i + 1}</span>
                  <span className={`text-sm font-medium truncate max-w-xs ${isAr ? "font-arabic" : ""}`}>{getLabel(item, i)}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <button onClick={e => { e.stopPropagation(); onChange(items.filter((_, j) => j !== i)); }}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-border-solid/40">
                  <ObjectEditor
                    data={item}
                    onChange={v => { const a = clone(items); a[i] = v; onChange(a); }}
                    isAr={isAr}
                    depth={depth + 1}
                  />
                </div>
              )}
            </div>
          );
        })}
        <button onClick={() => onChange([...items, {}])}
          className="flex items-center gap-1.5 text-xs text-primary hover:opacity-70 transition-opacity px-3 py-2">
          <Plus className="w-3.5 h-3.5" /> Add {fieldKey.replace(/s$/, "")}
        </button>
      </div>
    </div>
  );
}

// ─── Section metadata ────────────────────────────────────────────────────────
const SECTION_META: Record<string, { label: string; icon: string }> = {
  meta: { label: "Page Meta (SEO)", icon: "🔍" },
  nav: { label: "Navigation", icon: "🔗" },
  hero: { label: "Homepage Hero", icon: "🏠" },
  trust: { label: "Trust Bar", icon: "⭐" },
  services: { label: "Services — ALL fields", icon: "⚙️" },
  industries: { label: "Industries — ALL fields", icon: "🏭" },
  solutions: { label: "Solutions — ALL fields", icon: "💡" },
  why: { label: "Why Aldiratech", icon: "✅" },
  cases: { label: "Case Studies", icon: "📋" },
  about: { label: "About Us — ALL fields", icon: "ℹ️" },
  contact: { label: "Contact — ALL fields", icon: "📞" },
  faq: { label: "FAQ — ALL Q&A", icon: "❓" },
  cta: { label: "CTA Banner", icon: "📢" },
  footer: { label: "Footer", icon: "📄" },
  theme: { label: "Theme Labels", icon: "🎨" },
};

// ─── Main App ────────────────────────────────────────────────────────────────
export default function ContentEditor() {
  const [authed, setAuthed] = useState(false);
  const [enData, setEnData] = useState<AnyObj>({});
  const [arData, setArData] = useState<AnyObj>({});
  const [activeLang, setActiveLang] = useState<Lang>("en");
  const [activeSection, setActiveSection] = useState("nav");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [unsaved, setUnsaved] = useState(false);

  useEffect(() => {
    if (!authed) return;
    Promise.all([import("@/content/en.json"), import("@/content/ar.json")]).then(([en, ar]) => {
      setEnData(clone(en.default as unknown as AnyObj));
      setArData(clone(ar.default as unknown as AnyObj));
    });
  }, [authed]);

  const activeData = activeLang === "en" ? enData : arData;
  const setActiveData = activeLang === "en" ? setEnData : setArData;

  const handleSectionChange = useCallback((section: string, value: unknown) => {
    setUnsaved(true);
    setActiveData(prev => ({ ...prev, [section]: value }));
  }, [setActiveData]);

  const handleSave = async () => {
    setStatus("saving"); setStatusMsg("Committing to GitHub…");
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`, {
        method: "POST",
        headers: { Accept: "application/vnd.github+json", "Content-Type": "application/json", Authorization: `Bearer ${WEBHOOK_SECRET}` },
        body: JSON.stringify({ event_type: "content-update", client_payload: { secret: WEBHOOK_SECRET, en: JSON.stringify(enData, null, 2), ar: JSON.stringify(arData, null, 2) } }),
      });
      if (res.status === 204 || res.ok) { setStatus("success"); setStatusMsg("Done! Live in ~90 seconds."); setUnsaved(false); }
      else throw new Error(`GitHub ${res.status}`);
    } catch (err) { setStatus("error"); setStatusMsg(`Error: ${err instanceof Error ? err.message : "Unknown"}`); }
    setTimeout(() => setStatus("idle"), 10000);
  };

  if (!authed) return <PasscodeGate onAuth={() => setAuthed(true)} />;

  const sections = Object.keys(SECTION_META).filter(k => k in activeData);
  const sectionData = activeData[activeSection];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-50 glass-strong border-b border-border-solid h-16 flex items-center px-5 gap-3">
        <div className="font-display font-bold text-lg shrink-0">Aldira<span className="text-gold">tech</span> <span className="text-sm font-normal text-muted-foreground">Content Editor</span></div>
        <div className="flex items-center gap-1 glass rounded-full p-1">
          {(["en", "ar"] as Lang[]).map(l => (
            <button key={l} onClick={() => setActiveLang(l)} className={`px-3 h-7 rounded-full text-xs font-semibold transition-all ${activeLang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              {l === "en" ? "🇬🇧 EN" : "🇸🇦 AR"}
            </button>
          ))}
        </div>
        {unsaved && <span className="text-xs text-amber-500 font-medium hidden sm:block">● Unsaved</span>}
        <div className="ml-auto flex items-center gap-3">
          {status !== "idle" && (
            <div className={`hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full ${status === "saving" ? "bg-primary/10 text-primary" : status === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`}>
              {status === "saving" && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              {status === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
              {status === "error" && <AlertCircle className="w-3.5 h-3.5" />}
              {statusMsg}
            </div>
          )}
          <Button variant="hero" size="sm" onClick={handleSave} disabled={status === "saving"}>
            {status === "saving" ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
            {unsaved ? "Save ●" : "Save & Publish"}
          </Button>
        </div>
      </div>

      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 shrink-0 border-r border-border-solid fixed top-16 bottom-0 overflow-y-auto bg-surface/60 backdrop-blur-sm">
          <div className="p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3 px-1">All Sections</div>
            <nav className="space-y-0.5">
              {sections.map(s => {
                const m = SECTION_META[s] || { label: s, icon: "📝" };
                return (
                  <button key={s} onClick={() => setActiveSection(s)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all ${activeSection === s ? "bg-primary/10 text-primary font-semibold" : "text-foreground/70 hover:text-primary hover:bg-primary/5"}`}>
                    <span className="text-base">{m.icon}</span>
                    <span className="text-xs">{m.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main */}
        <div className="ml-64 flex-1 p-6 lg:p-10">
          <div className="max-w-4xl">
            <div className="mb-8">
              <div className="text-xs text-muted-foreground mb-1">{SECTION_META[activeSection]?.icon} Editing</div>
              <h2 className="font-display font-bold text-2xl mb-1">{SECTION_META[activeSection]?.label}</h2>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{activeLang === "en" ? "🇬🇧 English" : "🇸🇦 Arabic"}</span>
                {" · "}All fields, arrays, nested objects and list items are editable.
              </p>
            </div>

            {sectionData && typeof sectionData === "object" && !Array.isArray(sectionData) ? (
              <ObjectEditor
                data={sectionData as AnyObj}
                onChange={val => handleSectionChange(activeSection, val)}
                isAr={activeLang === "ar"}
              />
            ) : (
              <p className="text-muted-foreground text-sm">No editable fields here.</p>
            )}

            <div className="mt-14 pt-8 border-t border-border-solid flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="hero" size="lg" onClick={handleSave} disabled={status === "saving"} className="btn-shimmer">
                {status === "saving" ? <RefreshCw className="w-5 h-5 animate-spin" /> : null}
                Save & Publish All Changes
              </Button>
              <p className="text-xs text-muted-foreground">
                Commits both <code className="bg-surface px-1.5 py-0.5 rounded">en.json</code> + <code className="bg-surface px-1.5 py-0.5 rounded">ar.json</code> to <code className="bg-surface px-1.5 py-0.5 rounded">main</code> → builds → live in ~90s
              </p>
            </div>

            {status !== "idle" && (
              <div className={`mt-4 sm:hidden flex items-center gap-2 text-xs px-4 py-2 rounded-full w-fit ${status === "saving" ? "bg-primary/10 text-primary" : status === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`}>
                {statusMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}