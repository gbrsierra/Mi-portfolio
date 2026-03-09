#!/bin/bash

# Moverse al directorio donde está el script
cd "$(dirname "$0")"

echo "Iniciando el servidor del Portfolio Fotográfico..."
echo "La web se abrirá automáticamente en tu navegador."

# Abrir el navegador en Mac
sleep 1 && open http://localhost:8000 &

# Iniciar el servidor Python
python3 server.py
