import React, { useState, useEffect } from 'react';
import './App.css'

import { 
  ShieldCheck, 
  Equal, 
  Type, 
  Layers, 
  Layout, 
  Ghost, 
  Zap, 
  AlertTriangle,
  Copy,
  Check,
  Search,
  Trash2,
  ChevronDown
} from 'lucide-react';

// --- DATA DEFINITION ---
const DATA = {
  truth: {
    title: "Valores de Verdad",
    icon: <ShieldCheck className="w-5 h-5" />,
    desc: "Útiles para comprobar estados de carga o visibilidad de componentes.",
    items: [
      { name: "toBeDefined()", usage: "Verifica si una variable o prop existe.", code: "const props = { title: 'Mi App' };\nexpect(props.title).toBeDefined();" },
      { name: "toBeNull()", usage: "Útil cuando un fetch no devuelve datos todavía.", code: "const user = null;\nexpect(user).toBeNull();" },
      { name: "toBeTruthy()", usage: "Verifica si un valor es 'truthy' (útil para toggles).", code: "const isVisible = true;\nexpect(isVisible).toBeTruthy();" },
      { name: "not", usage: "Propiedad para negar cualquier matcher.", code: "expect(10).not.toBe(5);\nexpect(null).not.toBeTruthy();" }
    ]
  },
  equality: {
    title: "Identidad vs Contenido",
    icon: <Equal className="w-5 h-5" />,
    desc: "En JSX, solemos comparar objetos de configuración o props.",
    items: [
      { name: "toBe(value)", usage: "Igualdad estricta (primitivos).", code: "expect(count).toBe(0);\nexpect(label).toBe('Enviar');" },
      { name: "toEqual(object)", usage: "Igualdad de contenido (objetos/arrays).", code: "const style = { color: 'red' };\nexpect(style).toEqual({ color: 'red' });" }
    ]
  },
  numbers: {
    title: "UI & Textos",
    icon: <Type className="w-5 h-5" />,
    desc: "Validación de contenidos de texto y recuentos de elementos.",
    items: [
      { 
        name: "toMatch(pattern)", 
        usage: "Verifica patrones en textos mediante strings o expresiones regulares.", 
        code: "const msg = 'Bienvenido Usuario';\nexpect(msg).toMatch(/Bienvenido/);",
        extra: "Puedes usar: \"abc\" (coincidencia exacta), /abc/ (patrón con regex) o /abc/i (regex sin distinguir mayúsculas/minúsculas)."
      },
      { name: "toContain(string)", usage: "Verifica si una subcadena exacta está presente.", code: "expect('Vitest is fast').toContain('fast');" },
      { name: "toBeGreaterThan(n)", usage: "Útil para verificar que hay más de 0 elementos.", code: "const items = screen.getAllByRole('listitem');\nexpect(items.length).toBeGreaterThan(0);" }
    ]
  },
  collections: {
    title: "Arrays y Listas",
    icon: <Layers className="w-5 h-5" />,
    desc: "Perfecto para verificar el estado de listas en tus componentes.",
    items: [
      { name: "toContain(item)", usage: "Verifica si un elemento está en la lista.", code: "const roles = ['admin', 'editor'];\nexpect(roles).toContain('admin');" },
      { name: "toHaveLength(n)", usage: "Verifica el número exacto de elementos.", code: "const users = [{id: 1}, {id: 2}];\nexpect(users).toHaveLength(2);" }
    ]
  },
  rtl: {
    title: "Testing Library",
    icon: <Layout className="w-5 h-5" />,
    desc: "Aserciones específicas para componentes y el DOM.",
    items: [
      { name: "toBeInTheDocument()", usage: "Aserción principal para saber si un elemento se renderizó.", code: "const alert = screen.getByText('Error');\nexpect(alert).toBeInTheDocument();" },
      { name: "toBeDisabled()", usage: "Verifica si un botón o input está deshabilitado.", code: "const btn = screen.getByRole('button');\nexpect(btn).toBeDisabled();" }
    ]
  },
  mocks: {
    title: "Mocks & Spies",
    icon: <Ghost className="w-5 h-5" />,
    desc: "Intercepción de funciones y llamadas a red.",
    items: [
      { name: "vi.spyOn(global, 'fetch')", usage: "Crea un espía sobre el fetch global.", code: "const fetchSpy = vi.spyOn(global, 'fetch');\nexpect(fetchSpy).toHaveBeenCalledWith('url');" },
      { name: "mockResolvedValue(data)", usage: "Simula una respuesta exitosa de una promesa.", code: "vi.spyOn(global, 'fetch').mockResolvedValue({\n  ok: true,\n  json: async () => ({ id: 1 }),\n});" }
    ]
  },
  advanced: {
    title: "Avanzados",
    icon: <Zap className="w-5 h-5" />,
    desc: "Situaciones reales complejas.",
    items: [
      { name: "toBeCloseTo(n, p)", usage: "Compara números decimales con precisión.", code: "expect(0.1 + 0.2).toBeCloseTo(0.3, 5);" },
      { name: "objectContaining(obj)", usage: "Comprueba solo una parte de un objeto.", code: "expect(user).toEqual(expect.objectContaining({ id: 1 }));" }
    ]
  },
  errors: {
    title: "Excepciones",
    icon: <AlertTriangle className="w-5 h-5" />,
    desc: "Verifica errores lanzados por funciones.",
    items: [
      { name: "toThrow()", usage: "La función debe pasarse como referencia.", code: "expect(() => validate()).toThrow('Error');" }
    ]
  }
};

// --- COMPONENTS ---

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
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

    const highlighted = escaped.replace(
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

    return highlighted.split("\n").map((line, i) => (
        <div
        key={i}
        className="leading-6"
        dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
        />
    ));
    };


  return (
    <div className="relative group mt-4">
      <div className="bg-[#1a1a1a] rounded-xl p-5 font-mono text-sm overflow-x-auto border border-slate-800 text-slate-300 shadow-inner">
        {highlightCode(code)}
      </div>
      <button 
        onClick={handleCopy}
        className={`absolute top-3 right-3 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${copied ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'} text-white shadow-sm`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

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
  const [activeTab, setActiveTab] = useState('truth');

  const category = DATA[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <header className="bg-slate-900 text-white py-12 px-6 shadow-xl border-b-4 border-indigo-500">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-indigo-500 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <Zap className="text-white fill-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Vitest <span className="text-indigo-400">Mastery</span></h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl">
            La guía definitiva de aserciones para componentes React y lógica avanzada.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="flex flex-wrap gap-2 p-2 bg-white rounded-2xl shadow-lg border border-slate-200 mb-10 overflow-x-auto no-scrollbar">
          {Object.entries(DATA).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === key 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {value.icon}
              {value.title}
            </button>
          ))}
        </div>

        <section className="space-y-8 min-h-[500px]">
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                {category.icon}
              </span>
              {category.title}
            </h2>
            <p className="text-slate-500 mt-2 text-lg leading-relaxed">{category.desc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {category.items.map((item, idx) => (
              <MatcherCard key={idx} item={item} />
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
                Utiliza siempre <code className="bg-slate-100 px-1 font-semibold rounded">getByRole</code> antes que selectores de texto. Ayuda a asegurar que tu UI sea accesible para todos los usuarios.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <h3 className="font-bold text-emerald-600 flex items-center gap-2 mb-3">
                <Trash2 size={18} /> Aislamiento de Mocks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Asegúrate de ejecutar <code className="bg-slate-100 px-1 font-semibold rounded">vi.clearAllMocks()</code> en el ciclo <code className="bg-slate-100 px-1 rounded">afterEach</code> para evitar falsos positivos.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}