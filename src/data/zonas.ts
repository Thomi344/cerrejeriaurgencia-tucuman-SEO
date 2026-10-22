// src/data/zonas.ts

export interface Zona {
    nombre: string;
    region: string;
    barrios: string[];
}

// Genera el segmento de URL de cada zona/barrio (Ej: "Barrio Norte" -> "cerrajero-zona-barrio-norte")
// Es la única fuente de verdad para las rutas dinámicas y los enlaces del directorio
export const slugZona = (texto: string) => {
    const limpio = texto.toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "") // Quita acentos
        .replace(/[^a-z0-9]+/g, '-') // Cambia espacios por guiones
        .replace(/(^-|-$)+/g, ''); // Quita guiones de los bordes
    return `cerrajero-zona-${limpio}`;
};

export const zonas: Zona[] = [
    {
        nombre: 'San Miguel de Tucumán',
        region: 'Capital',
        barrios: ['Barrio Norte', 'Barrio Sur', 'El Bosque', 'Ciudadela', 'Villa Luján', 'Plazoleta Mitre', 'Villa Alem', 'Barrio Modelo', 'Villa Amalia']
    },
    {
        nombre: 'Yerba Buena',
        region: 'Gran San Miguel',
        barrios: ['Yerba Buena Centro', 'Marcos Paz', 'San José', 'El Corte', 'La Rinconada']
    },
    {
        nombre: 'Tafí Viejo',
        region: 'Gran San Miguel',
        barrios: ['Tafí Viejo Centro', 'Lomas de Tafí', 'Los Pocitos', 'Villa Carmela']
    },
    {
        nombre: 'Las Talitas',
        region: 'Gran San Miguel',
        barrios: ['Villa Mariano Moreno', 'El Gráfico', 'Las Acacias', 'Villa Los Pinos']
    },
    {
        nombre: 'Banda del Río Salí',
        region: 'Zona Este',
        barrios: ['Banda Centro', 'Lastenia', 'Barrio San Juan', 'Barrio El Palomar']
    },
    {
        nombre: 'Alderetes',
        region: 'Zona Este',
        barrios: ['Alderetes Centro', 'Los Gutiérrez', 'El Corte (Alderetes)', 'Barrio San Nicolás']
    },
    {
        nombre: 'Concepción',
        region: 'Interior Sur',
        barrios: ['Concepción Centro', 'Barrio Alvear', 'Barrio Municipal', 'Villa Las Rosas']
    },
    {
        nombre: 'Aguilares',
        region: 'Interior Sur',
        barrios: ['Aguilares Centro', 'Barrio Independencia', 'Villa Nueva', 'Barrio San Martín']
    },
    {
        nombre: 'Monteros',
        region: 'Interior Sur',
        barrios: ['Monteros Centro', 'Barrio Belgrano', 'Barrio Mutual', 'Villa Alcira']
    },
    {
        nombre: 'Tafí del Valle',
        region: 'Valles Calchaquíes',
        barrios: ['Tafí del Valle Centro', 'El Mollar', 'La Banda', 'Los Cuartos']
    }
];
