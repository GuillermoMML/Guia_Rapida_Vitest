// src/data/vitestMatchers.data.js
export const VITEST_MATCHERS = {
  truth: {
    title: "Valores de Verdad",
    icon: "ShieldCheck",
    desc: "Útiles para comprobar estados de carga o visibilidad de componentes.",
    items: [
      {
        name: "toBeDefined()",
        usage: "Verifica si una variable o prop existe.",
        code: "const props = { title: 'Mi App' };\nexpect(props.title).toBeDefined();",
      },
      {
        name: "toBeNull()",
        usage: "Útil cuando un fetch no devuelve datos todavía.",
        code: "const user = null;\nexpect(user).toBeNull();",
      },
      {
        name: "toBeTruthy()",
        usage: "Verifica si un valor es 'truthy' (útil para toggles).",
        code: "const isVisible = true;\nexpect(isVisible).toBeTruthy();",
      },
      {
        name: "toBeFalsy()",
        usage:
          "Verifica si un valor es 'falsy' (false, 0, '', null, undefined o NaN). Útil para estados apagados o campos vacíos.",
        code: "const isOpen = false;\nexpect(isOpen).toBeFalsy();\n\nconst errorMsg = '';\nexpect(errorMsg).toBeFalsy();",
      },
      {
        name: "not",
        usage: "Propiedad para negar cualquier matcher.",
        code: "expect(10).not.toBe(5);\nexpect(null).not.toBeTruthy();",
      },
    ],
  },

  equality: {
    title: "Identidad vs Contenido",
    icon: "Equal",
    desc: "En JSX, solemos comparar objetos de configuración o props.",
    items: [
      { name: "toBe(value)", usage: "Igualdad estricta (primitivos).", code: "expect(count).toBe(0);\nexpect(label).toBe('Enviar');" },
      { name: "toEqual(object)", usage: "Igualdad de contenido (objetos/arrays).", code: "const style = { color: 'red' };\nexpect(style).toEqual({ color: 'red' });" },
    ],
  },

  numbers: {
    title: "UI & Textos",
    icon: "Type",
    desc: "Validación de contenidos de texto y recuentos de elementos.",
    items: [
      {
        name: "toMatch(pattern)",
        usage: "Verifica patrones en textos mediante strings o expresiones regulares.",
        code: "const msg = 'Bienvenido Usuario';\nexpect(msg).toMatch(/Bienvenido/);",
        extra:
          'Puedes usar: "abc" (coincidencia exacta), /abc/ (patrón con regex) o /abc/i (regex sin distinguir mayúsculas/minúsculas).',
      },
      { name: "toContain(string)", usage: "Verifica si una subcadena exacta está presente.", code: "expect('Vitest is fast').toContain('fast');" },
      { name: "toBeGreaterThan(n)", usage: "Útil para verificar que hay más de 0 elementos.", code: "const items = screen.getAllByRole('listitem');\nexpect(items.length).toBeGreaterThan(0);" },
    ],
  },

  collections: {
    title: "Arrays y Listas",
    icon: "Layers",
    desc: "Perfecto para verificar el estado de listas en tus componentes.",
    items: [
      { name: "toContain(item)", usage: "Verifica si un elemento está en la lista.", code: "const roles = ['admin', 'editor'];\nexpect(roles).toContain('admin');" },
      { name: "toHaveLength(n)", usage: "Verifica el número exacto de elementos.", code: "const users = [{id: 1}, {id: 2}];\nexpect(users).toHaveLength(2);" },
    ],
  },

  rtl: {
    title: "Testing Library",
    icon: "Layout",
    desc: "Aserciones específicas para componentes y el DOM.",
    items: [
      { name: "toBeInTheDocument()", usage: "Aserción principal para saber si un elemento se renderizó.", code: "const alert = screen.getByText('Error');\nexpect(alert).toBeInTheDocument();" },
      { name: "toBeDisabled()", usage: "Verifica si un botón o input está deshabilitado.", code: "const btn = screen.getByRole('button');\nexpect(btn).toBeDisabled();" },
    ],
  },

  mocks: {
    title: "Mocks & Spies",
    icon: "Ghost",
    desc: "Intercepción de funciones y llamadas a red.",
    items: [
      { name: "vi.spyOn(global, 'fetch')", usage: "Crea un espía sobre el fetch global.", code: "const fetchSpy = vi.spyOn(global, 'fetch');\nexpect(fetchSpy).toHaveBeenCalledWith('url');" },
      { name: "mockResolvedValue(data)", usage: "Simula una respuesta exitosa de una promesa.", code: "vi.spyOn(global, 'fetch').mockResolvedValue({\n  ok: true,\n  json: async () => ({ id: 1 }),\n});" },
    ],
  },

  advanced: {
    title: "Avanzados",
    icon: "Zap",
    desc: "Situaciones reales complejas.",
    items: [
      { name: "toBeCloseTo(n, p)", usage: "Compara números decimales con precisión.", code: "expect(0.1 + 0.2).toBeCloseTo(0.3, 5);" },
      { name: "objectContaining(obj)", usage: "Comprueba solo una parte de un objeto.", code: "expect(user).toEqual(expect.objectContaining({ id: 1 }));" },
    ],
  },

  errors: {
    title: "Excepciones",
    icon: "AlertTriangle",
    desc: "Verifica errores lanzados por funciones.",
    items: [{ name: "toThrow()", usage: "La función debe pasarse como referencia.", code: "expect(() => validate()).toThrow('Error');" }],
  },
};
