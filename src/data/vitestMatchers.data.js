// src/data/vitestMatchers.data.js
export const VITEST_MATCHERS = {
  theory: {
    title: "Teoría Fundamental",
    icon: "BookOpen",
    desc: "Conceptos clave que todo desarrollador debe dominar antes de escribir su primer test.",
    isTheory: true,
    items: [
      {
        name: "La Pirámide de Testing (guía práctica)",
        usage: "Regla orientativa para decidir qué tipo de tests escribir más a menudo.",
        content: [
          {
            t: "Unitarios (≈70%)",
            d: "Prueban una sola pieza en aislamiento (una función o un componente). No dependen de red ni BD (se mockean). Ej: 'sum(2,3) devuelve 5' o 'Button llama onClick al hacer click'. Son los más rápidos."
          },
          {
            t: "Integración (≈20%)",
            d: "Prueban varias piezas juntas sin llegar al navegador real. Ej: 'Formulario + validación + llamada a API mockeada' o 'Componente con su store/context'. Más realistas, algo más lentos."
          },
          {
            t: "E2E / UI (≈10%)",
            d: "Prueban el flujo completo como un usuario en un navegador (normalmente con backend real o un entorno de test). Ej: 'registro → login → crear tarea'. Detectan fallos reales, pero son los más lentos y frágiles."
          },
        ],
      },
      {
        name: "Patrón AAA (Arrange, Act, Assert)",
        usage: "Estructura lógica de un caso de prueba.",
        content: [
          { t: "Arrange (Preparar)", d: "Configurar el estado, renderizar componente y preparar mocks." },
          { t: "Act (Actuar)", d: "Ejecutar la acción: un click, escribir en un input o llamar a una función." },
          { t: "Assert (Afirmar)", d: "Comprobar que el resultado obtenido es el esperado." },
        ],
      },
      {
        name: "Principios F.I.R.S.T.",
        usage: "Cualidades de un buen test.",
        content: [
          { t: "Fast", d: "Deben ejecutarse en segundos." },
          { t: "Independent", d: "Un test no debe depender del resultado de otro." },
          { t: "Repeatable", d: "Deben dar el mismo resultado en cualquier entorno." },
          { t: "Self-validating", d: "Pasan o fallan por sí mismos, sin interpretación manual." },
          { t: "Thorough", d: "Deben cubrir casos de éxito, error y bordes (edge cases)." },
        ],
      },
    ],
  },
  strategies: {
    title: "Estrategias de Prueba",
    icon: "strategies",
    desc: "Qué probar primero y cuándo usar mocks para dependencias externas.",
    isTheory: true,
    items: [
      {
        name: "Prueba comportamiento (no implementación)",
        usage: "Asegura lo que el usuario puede hacer y ver en la pantalla.",
        content: [
          { t: "Evita", d: "Probar detalles internos: useState, nombres de funciones (handleClick), clases CSS internas, etc." },
          { t: "Prefiere", d: "Probar resultados visibles: texto, botones habilitados/deshabilitados, elementos que aparecen/desaparecen." },
          { t: "Ejemplo", d: "Al hacer click en “Añadir al carrito”, aparece el panel del carrito y el contador sube a 1." },
        ],
      },
      {
        name: "Cubre 3 tipos de casos",
        usage: "No te quedes solo con el caso perfecto.",
        content: [
          { t: "Caso correcto", d: "Datos válidos → la acción funciona. Ej: login correcto → navega a /dashboard." },
          { t: "Caso de error", d: "Datos inválidos o fallo externo → muestra mensaje. Ej: login incorrecto → aparece “credenciales inválidas”." },
          { t: "Caso límite", d: "Bordes raros pero posibles. Ej: input vacío, texto muy largo, doble click rápido, lista vacía." },
        ],
      },
      {
        name: "Cuándo mockear (y cuándo no)",
        usage: "Mockear no es “hacer una API falsa” (aunque a veces se usa para eso). Mockear significa: sustituir una parte real por una versión controlada para que el test sea estable y puedas forzar escenarios.",
        content: [
          { t: "NO mockees", d: "Código tuyo y rápido: funciones puras, utilidades, componentes simples (Button, Badge), validaciones." },
          { t: "Mockea", d: "Dependencias externas o variables: fetch/APIs, BD, localStorage, Date.now, Math.random, geolocalización." },
          { t: "Regla práctica", d: "Si es lento, inestable o no depende de ti, mockéalo. Si es tu lógica, pruébalo real." },
        ],
      },
    ],
  },
  truth: {
    title: "Valores de Verdad",
    icon: "ShieldCheck",
    desc: "Útiles para comprobar estados (carga, visibilidad, datos vacíos, etc.).",
    items: [
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
        name: "toBeNull()",
        usage: "Útil cuando un fetch no devuelve datos todavía.",
        code: "const user = null;\nexpect(user).toBeNull();",
      },
      {
        name: "toBeDefined()",
        usage: "Verifica si una variable o prop existe.",
        code: "const props = { title: 'Mi App' };\nexpect(props.title).toBeDefined();",
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
    desc: "Comparaciones típicas en JS/React (primitivos vs objetos/arrays).",
    items: [
      { name: "toBe(value)", usage: "Igualdad estricta (primitivos).", code: "expect(count).toBe(0);\nexpect(label).toBe('Enviar');" },
      { name: "toEqual(object)", usage: "Igualdad de contenido (objetos/arrays).", code: "const style = { color: 'red' };\nexpect(style).toEqual({ color: 'red' });" },
    ],
  },

  // 🔁 Renombrado desde `numbers` -> `uiText`
  uiText: {
    title: "UI & Textos",
    icon: "Type",
    desc: "Validación de contenidos de texto y recuentos de elementos.",
    items: [
      { name: "toContain(string)", usage: "Verifica si una subcadena exacta está presente.", code: "expect('Vitest is fast').toContain('fast');" },
      {
        name: "toMatch(pattern)",
        usage: "Verifica patrones en textos mediante strings o expresiones regulares.",
        code: "const msg = 'Bienvenido Usuario';\nexpect(msg).toMatch(/Bienvenido/);",
        extra:
          'Puedes usar: "abc" (coincidencia exacta), /abc/ (patrón con regex) o /abc/i (regex sin distinguir mayúsculas/minúsculas).',
      },
      {
        name: "toBeGreaterThan(n)",
        usage: "Útil para verificar que hay más de 0 elementos.",
        code: "const items = screen.getAllByRole('listitem');\nexpect(items.length).toBeGreaterThan(0);"
      },
    ],
  },

  collections: {
    title: "Arrays y Listas",
    icon: "Layers",
    desc: "Perfecto para verificar el estado de listas en tus componentes.",
    items: [
      { name: "toHaveLength(n)", usage: "Verifica el número exacto de elementos.", code: "const users = [{id: 1}, {id: 2}];\nexpect(users).toHaveLength(2);" },
      { name: "toContain(item)", usage: "Verifica si un elemento está en la lista.", code: "const roles = ['admin', 'editor'];\nexpect(roles).toContain('admin');" },
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

  events: {
    title: "Interacciones",
    icon: "events",
    desc: "Simulación de acciones del usuario de forma realista.",
    items: [
      {
        name: "userEvent.click()",
        usage: "Simula un click real (incluye focus y eventos intermedios).",
        code: "const user = userEvent.setup();\nconst button = screen.getByRole('button');\nawait user.click(button);\nexpect(onClick).toHaveBeenCalled();"
      },
      {
        name: "userEvent.type()",
        usage: "Simula la escritura teclado a teclado.",
        code: "const input = screen.getByRole('textbox');\nawait user.type(input, 'Hola mundo');\nexpect(input).toHaveValue('Hola mundo');"
      }
    ]
  },

  errors: {
    title: "Excepciones",
    icon: "AlertTriangle",
    desc: "Verifica errores lanzados por funciones.",
    items: [
      { name: "toThrow()", usage: "La función debe pasarse como referencia.", code: "expect(() => validate()).toThrow('Error');" }
    ],
  },

  async: {
    title: "Asincronía (APIs)",
    icon: "async",
    desc: "Cómo manejar elementos que no aparecen inmediatamente en el DOM.",
    items: [
      {
        name: "findByRole()",
        usage: "La opción preferida para elementos asíncronos.",
        code: "// Espera hasta 1000ms por defecto\nconst user = await screen.findByRole('heading', { name: /juan/i });\nexpect(user).toBeInTheDocument();"
      },
      {
        name: "waitFor()",
        usage: "Para aserciones complejas que dependen de promesas.",
        code: "await waitFor(() => {\n  expect(screen.getByText('Carga completa')).toBeInTheDocument();\n}, { timeout: 2000 });"
      }
    ]
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
      { name: "objectContaining(obj)", usage: "Comprueba solo una parte de un objeto.", code: "expect(user).toEqual(expect.objectContaining({ id: 1 }));" },
      { name: "toBeCloseTo(n, p)", usage: "Compara números decimales con precisión.", code: "expect(0.1 + 0.2).toBeCloseTo(0.3, 5);" },
    ],
  },
};
