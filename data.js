/**
 * Portfolio Data - ¡GESTIONA TUS FOTOS AQUÍ!
 * Para añadir una foto: Copia el bloque de ejemplo, pégalo en el array 'photos' y rellena los datos.
 * Para eliminar las de muestra: Borra todos los bloques que hay actualmente en 'photos'.
 */

const portfolioData = {
    photographer: "Gabriel Sierra",
    categories: [
        { id: "aves", name: "Aves" },
        { id: "fauna", name: "Fauna" },
        { id: "paisajes", name: "Paisajes" },
        { id: "macro", name: "Macro" },
        { id: "urbana", name: "Urbana" },
        { id: "nocturnas", name: "Nocturnas" }
    ],
    /**
     * ARRAY DE FOTOS: Aquí es donde añades tus imágenes.
     * Importante: Guarda tus fotos en la carpeta 'images/' de este proyecto.
     */
    photos: [
        // --- COMIENZO DE FOTOS DE MUESTRA (Bórralas cuando quieras) ---
        {
            id: 1773070025,
            title: "Garceta común (Egretta garzetta)",
            category: "aves",
            src: "images/1773070025__2182211.jpg",
            thumb: "images/1773070025__2182211.jpg",
            location: "Getafe (Madrid)",
            date: "Marzo 2026",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773256895,
            title: "Milano negro",
            category: "aves",
            src: "images/1773256895_GSS_04-07-25.jpg",
            thumb: "images/1773256895_GSS_04-07-25.jpg",
            location: "Pescueza (Cáceres)",
            date: "Abril 2025",
            exif: { camera: "Olimpus OMD EM1 Mark II", lens: "M.100-400 + MC-1.4", settings: "f/9, 1/1000s, ISO640" }
        },
                {
            id: 1773257418,
            title: "Morito común",
            category: "aves",
            src: "images/1773257418_GSS_05-07-25 78.jpg",
            thumb: "images/1773257418_GSS_05-07-25 78.jpg",
            location: "Pinto (Madrid)",
            date: "julio 2025",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773257481,
            title: "Flamencos",
            category: "aves",
            src: "images/1773257481_GSS_05-07-25 90.jpg",
            thumb: "images/1773257481_GSS_05-07-25 90.jpg",
            location: "Pinto (Madrid)",
            date: "Julio 2025",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773257555,
            title: "Abejaruco",
            category: "aves",
            src: "images/1773257555_GSS_09-04-23 303.jpg",
            thumb: "images/1773257555_GSS_09-04-23 303.jpg",
            location: "Pescueza (Cáceres)",
            date: "Abril 2023",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773257653,
            title: "Espátula",
            category: "aves",
            src: "images/1773257653_GSS_12-08-25 99 copia.jpg",
            thumb: "images/1773257653_GSS_12-08-25 99 copia.jpg",
            location: "Pescueza (Cáceres)",
            date: "Agosto 2025",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773257723,
            title: "Cormorán",
            category: "aves",
            src: "images/1773257723_GSS_14-02-25 18.jpg",
            thumb: "images/1773257723_GSS_14-02-25 18.jpg",
            location: "Getafe (Madrid)",
            date: "Febrero 2025",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773257807,
            title: "Papamoscas cerrojillo",
            category: "aves",
            src: "images/1773257807_GSS_14-09-25 3 1.jpg",
            thumb: "images/1773257807_GSS_14-09-25 3 1.jpg",
            location: "Pescueza (Cáceres)",
            date: "Septiembre 2025",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773257863,
            title: "Milano real",
            category: "aves",
            src: "images/1773257862_GSS_15-12-23 178.jpg",
            thumb: "images/1773257862_GSS_15-12-23 178.jpg",
            location: "Getafe (Madrid)",
            date: "Diciembre 2023",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773257919,
            title: "Busardo ratonero",
            category: "aves",
            src: "images/1773257919_GSS_18-10-2025(74)_DxO.jpg",
            thumb: "images/1773257919_GSS_18-10-2025(74)_DxO.jpg",
            location: "Getafe (Madrid)",
            date: "Octubre 2025",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773257987,
            title: "Aguilucho lagunero",
            category: "aves",
            src: "images/1773257987_GSS_23-02-24 19.jpg",
            thumb: "images/1773257987_GSS_23-02-24 19.jpg",
            location: "Leganés (Madrid)",
            date: "Febrero 2024",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773258077,
            title: "Pinzón",
            category: "aves",
            src: "images/1773258077_GSS_27-02-23 321.jpg",
            thumb: "images/1773258077_GSS_27-02-23 321.jpg",
            location: "Pescueza (Cáceres)",
            date: "Febrero 2023",
            exif: { camera: "", lens: "", settings: "" }
        },
                {
            id: 1773838177,
            title: "Meloncillo",
            category: "fauna",
            src: "images/1773838177_GSS_04-09-24 168.jpeg",
            thumb: "images/1773838177_GSS_04-09-24 168.jpeg",
            location: "Cachorrilla-Cáceres",
            date: "Septiembre 2024",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
                {
            id: 1773838229,
            title: "Meloncillo",
            category: "fauna",
            src: "images/1773838229_GSS_04-09-24 170.jpeg",
            thumb: "images/1773838229_GSS_04-09-24 170.jpeg",
            location: "Cachorrilla-Cáceres",
            date: "Septiembre 2024",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
                {
            id: 1773838273,
            title: "Zorro",
            category: "fauna",
            src: "images/1773838273_GSS_04-09-24 174.jpeg",
            thumb: "images/1773838273_GSS_04-09-24 174.jpeg",
            location: "Cachorrilla-Cáceres",
            date: "Septiembre 2024",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
                {
            id: 1773838314,
            title: "Zorro",
            category: "fauna",
            src: "images/1773838314_GSS_04-09-24 175.jpeg",
            thumb: "images/1773838314_GSS_04-09-24 175.jpeg",
            location: "Cachorrilla-Cáceres",
            date: "Septiembre 2024",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
                {
            id: 1773838369,
            title: "Ciervo",
            category: "fauna",
            src: "images/1773838369_GSS_10-03-24 64.jpeg",
            thumb: "images/1773838369_GSS_10-03-24 64.jpeg",
            location: "Cachorrilla-Cáceres",
            date: "Marzo 2024",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
        // --- Añade tus fotos debajo de esta línea siguiendo el formato anterior ---
    ]
};
