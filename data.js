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
                {
            id: 1774105956,
            title: "Amanecer en Getafe",
            category: "nocturnas",
            src: "images/1774105956_GSS_06-10-25 3.jpeg",
            thumb: "images/1774105956_GSS_06-10-25 3.jpeg",
            location: "Desconocido",
            date: "Octubre de 2025",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
        // --- Añade tus fotos debajo de esta línea siguiendo el formato anterior ---
        {
            id: 1774027266,
            title: "Busardo ratonero",
            category: "aves",
            src: "images/1774027266_GSS_04-03-2026(08).jpg",
            thumb: "images/1774027266_GSS_04-03-2026(08).jpg",
            location: "Desconocido",
            date: "Marzo 2026",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
        {
            id: 1774027172,
            title: "Busardo ratonero",
            category: "aves",
            src: "images/1774027172_GSS_04-03-2026(88) (1).jpg",
            thumb: "images/1774027172_GSS_04-03-2026(88) (1).jpg",
            location: "Desconocido",
            date: "Marzo 2026",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
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
            id: 1774027103,
            title: "Papamoscas cerrojillo",
            category: "aves",
            src: "images/1774027103_GSS_26-10-2025(24).jpeg",
            thumb: "images/1774027103_GSS_26-10-2025(24).jpeg",
            location: "Desconocido",
            date: "Octubre 2025",
            exif: { camera: "-", lens: "-", settings: "-" }
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
            id: 1773846406,
            title: "Ciervo",
            category: "fauna",
            src: "images/1773846406_GSS_14-09-25 4.jpeg",
            thumb: "images/1773846406_GSS_14-09-25 4.jpeg",
            location: "Pescueza-Cáceres",
            date: "Septiembre 2025",
            exif: { camera: "-", lens: "-", settings: "-" }
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
            id: 1774027062,
            title: "Cogujada",
            category: "aves",
            src: "images/1774027061_GSS_20-05-25 46.jpeg",
            thumb: "images/1774027061_GSS_20-05-25 46.jpeg",
            location: "Desconocido",
            date: "Mayo 2025",
            exif: { camera: "-", lens: "-", settings: "-" }
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
            id: 1773846554,
            title: "Zorro",
            category: "fauna",
            src: "images/1773846554_GSS_21-04-24 105.jpeg",
            thumb: "images/1773846554_GSS_21-04-24 105.jpeg",
            location: "Cachorrilla-Cáceres",
            date: "Abril 2024",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
        {
            id: 1773846498,
            title: "Zorro",
            category: "fauna",
            src: "images/1773846498_GSS_21-04-24 108.jpeg",
            thumb: "images/1773846498_GSS_21-04-24 108.jpeg",
            location: "Cachorrilla-Cáceres",
            date: "Abril 2024",
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
            id: 1773846897,
            title: "Ciervo",
            category: "fauna",
            src: "images/1773846897_GSS_30-09-23.jpeg",
            thumb: "images/1773846897_GSS_30-09-23.jpeg",
            location: "Cachorrilla-Cáceres",
            date: "Septiembre 2023",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
        {
            id: 1773846258,
            title: "Liebre",
            category: "fauna",
            src: "images/1773846258_GSS_10-06-23 272.jpeg",
            thumb: "images/1773846258_GSS_10-06-23 272.jpeg",
            location: "Pescueza- Cáceres",
            date: "Junio 2023",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
        {
            id: 1773846214,
            title: "Liebre",
            category: "fauna",
            src: "images/1773846214_GSS_10-06-23 269.jpeg",
            thumb: "images/1773846214_GSS_10-06-23 269.jpeg",
            location: "Pescueza-Cáceres",
            date: "Junio 2023",
            exif: { camera: "-", lens: "-", settings: "-" }
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
            id: 1773846360,
            title: "Liebre",
            category: "fauna",
            src: "images/1773846360_GSS_13-01-23 348.jpeg",
            thumb: "images/1773846360_GSS_13-01-23 348.jpeg",
            location: "Pescueza-Cáceres",
            date: "Enero 2023",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
        {
            id: 1773846615,
            title: "Cabra montés",
            category: "fauna",
            src: "images/1773846615_GSS_21-11-22 361.jpeg",
            thumb: "images/1773846615_GSS_21-11-22 361.jpeg",
            location: "Madrid",
            date: "Diciembre 2022",
            exif: { camera: "-", lens: "-", settings: "-" }
        },
        {
            id: 1773846313,
            title: "Conejo",
            category: "fauna",
            src: "images/1773846313_GSS_12-01-21 665.jpeg",
            thumb: "images/1773846313_GSS_12-01-21 665.jpeg",
            location: "Getafe-Madrid",
            date: "Enero 2021",
            exif: { camera: "-", lens: "-", settings: "-" }
        }
    ]
};
