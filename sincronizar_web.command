#!/bin/bash

# Moverse al directorio del proyecto
cd "$(dirname "$0")"

echo "------------------------------------------------"
echo "Sincronizando Portfolio con la Nube (GitHub/Vercel)..."
echo "------------------------------------------------"

# Añadir cambios (nuevas fotos, cambios en data.js, etc.)
git add .

# Crear el mensaje con la fecha actual
fecha=$(date +"%Y-%m-%d %H:%M")
git commit -m "Actualización de fotos: $fecha"

# Intentar subir los cambios
echo "Subiendo cambios a GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "------------------------------------------------"
    echo "¡ÉXITO! Tu web se está actualizando en internet."
    echo "En un minuto aproximadamente verás los cambios."
    echo "------------------------------------------------"
else
    echo "------------------------------------------------"
    echo "ERROR: No se pudo sincronizar."
    echo "Asegúrate de tener conexión a internet y de haber"
    echo "configurado el repositorio de GitHub correctamente."
    echo "------------------------------------------------"
fi

# Pausa para ver el resultado
echo "Presiona cualquier tecla para cerrar..."
read -n 1
