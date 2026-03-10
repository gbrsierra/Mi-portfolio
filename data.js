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
        // --- Añade tus fotos debajo de esta línea siguiendo el formato anterior ---
    ]
};
