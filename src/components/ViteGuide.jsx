import React, { useState } from "react";
import { 
  Copy, 
  Check, 
  Search, 
  Trash2, 
  Zap, 
  Layout, 
  Info, 
  BookOpen 
} from "lucide-react"; 

// Nota: He mantenido tus imports originales. 
// Para que esto funcione, asegúrate de que VITEST_MATCHERS incluya la clave "theory"
// y que ICONS tenga un icono para "theory" (ej: BookOpen).
import { VITEST_MATCHERS } from "../data/vitestMatchers.data.js";
import { ICONS } from "../ui/icons";
import "./ViteGuide.css";
// --- DATA DEFINITION ---
const DATA = VITEST_MATCHERS;

// --- COMPONENTS ---
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar", err);
    }
    document.body.removeChild(textArea);
  };

  const escapeHtml = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const wrap = (cls, txt) => `<span class="${cls}">${txt}</span>`;

  const TOKEN_RE =
    /(\/\/.*$)|(\/(?:\\\/|[^\/\n])+\/[gimsuy]*)|('(?:\\'|[^'\n])*'|"(?:\\"|[^"\n])*")|\b(const|let|var|function|throw|new|return|await|async)\b|\b(expect|toBe\w+|toEqual|toMatch|toContain|toHave\w+|toThrow|vi|render|screen)\b/gm;

  const highlightCode = (text) => {
    const escaped = escapeHtml(text);

    return escaped.replace(
      TOKEN_RE,
      (match, comment, regexLit, strLit, kw, api) => {
        if (comment) return wrap("text-slate-500 italic", match);
        if (regexLit) return wrap("text-pink-400 font-bold", match);
        if (strLit) return wrap("text-orange-400", match);
        if (kw) return wrap("text-blue-400 font-semibold", match);
        if (api) return wrap("text-yellow-200 font-medium", match);
        return match;
      }
    );
  };

  return (
    <div className="relative group mt-4">
      <div className="bg-[#1a1a1a] rounded-xl p-5 overflow-x-auto border border-slate-800 text-slate-300 shadow-inner">
        <pre
          className="font-mono text-sm leading-6 whitespace-pre text-left"
          style={{ tabSize: 2 }}
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </div>

      <button
        onClick={handleCopy}
        className={`absolute top-3 right-3 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
          copied ? "bg-green-600" : "bg-slate-700 hover:bg-slate-600"
        } text-white shadow-sm`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

// Nuevo componente para la sección teórica
const TheoryItem = ({ item }) => (
  <div className="bg-white border-l-4 border-indigo-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
    <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
      <Info size={18} className="text-indigo-500" />
      {item.name}
    </h3>
    <p className="text-slate-500 text-sm mb-4 italic">{item.usage}</p>
    <div className="space-y-3">
      {item.content && item.content.map((c, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-3 border-b border-slate-50 pb-2 last:border-0">
          <span className="font-bold text-indigo-600 min-w-[140px] text-sm uppercase tracking-wider">{c.t}</span>
          <span className="text-slate-600 text-sm leading-relaxed">{c.d}</span>
        </div>
      ))}
    </div>
  </div>
);

const MatcherCard = ({ item }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-500">
    <div className="flex items-center justify-between mb-3">
      <code className="text-base font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
        {item.name}
      </code>
    </div>

    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{item.usage}</p>
    <CodeBlock code={item.code} />

    {item.extra && (
      <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-800 flex gap-2 items-center">
        <Zap size={14} className="shrink-0 text-indigo-500" />
        {item.extra}
      </div>
    )}
  </div>
);

export default function App() {
  // Cambiamos el estado inicial a 'theory' para que sea lo primero que vean los alumnos
  const [activeTab, setActiveTab] = useState("theory");

  const category = DATA[activeTab] || DATA[Object.keys(DATA)[0]];
  const CategoryIcon = ICONS[category.icon] || BookOpen;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <header className="bg-slate-900 text-white py-12 px-6 shadow-xl border-b-4 border-indigo-500">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-indigo-500 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <Zap className="text-white fill-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              Vitest <span className="text-indigo-400">Mastery</span>
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl">
            La guía definitiva de aserciones para componentes React y lógica
            avanzada.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="flex flex-wrap gap-2 p-2 bg-white rounded-2xl shadow-lg border border-slate-200 mb-10 overflow-x-auto no-scrollbar">
          {Object.entries(DATA).map(([key, value]) => {
            const TabIcon = ICONS[value.icon] || Info;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeTab === key
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                <TabIcon className="w-5 h-5" />
                {value.title}
              </button>
            );
          })}
        </div>

        <section className="space-y-8 min-h-[500px]">
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <CategoryIcon className="w-5 h-5" />
              </span>
              {category.title}
            </h2>
            <p className="text-slate-500 mt-2 text-lg leading-relaxed">
              {category.desc}
            </p>
          </div>

          {/* Renderizado condicional según si es Teoría o Matchers */}
          <div className={category.isTheory ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-2 gap-6"}>
            {category.items.map((item, idx) => (
              category.isTheory 
                ? <TheoryItem key={idx} item={item} /> 
                : <MatcherCard key={idx} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-20 pt-10 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <Search className="text-indigo-500" />
            Consejos de Arquitectura
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <h3 className="font-bold text-indigo-600 flex items-center gap-2 mb-3">
                <Layout size={18} /> Prioridad RTL
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Utiliza siempre{" "}
                <code className="bg-slate-100 px-1 font-semibold rounded">
                  getByRole
                </code>{" "}
                antes que selectores de texto. Ayuda a asegurar que tu UI sea
                accesible para todos los usuarios.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <h3 className="font-bold text-emerald-600 flex items-center gap-2 mb-3">
                <Trash2 size={18} /> Aislamiento de Mocks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Asegúrate de ejecutar{" "}
                <code className="bg-slate-100 px-1 font-semibold rounded">
                  vi.clearAllMocks()
                </code>{" "}
                en el ciclo{" "}
                <code className="bg-slate-100 px-1 rounded">afterEach</code>{" "}
                para evitar falsos positivos.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}