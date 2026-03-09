#!/usr/bin/env python3
import http.server
import socketserver
import cgi
import os
import json
import time

PORT = 8000
IMAGE_DIR = "images"

# Ensure images directory exists
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)

class PortfolioUploadHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow cross-origin (in case of different ports)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.end_headers()

    def do_POST(self):
        if self.path == '/upload':
            try:
                content_type = self.headers.get('content-type', '')
                ctype, pdict = cgi.parse_header(content_type)
                if ctype == 'multipart/form-data':
                    # Parse the form
                    form = cgi.FieldStorage(
                        fp=self.rfile,
                        headers=self.headers,
                        environ={'REQUEST_METHOD': 'POST',
                                 'CONTENT_TYPE': content_type}
                    )

                    # Get the image file
                    fileitem = form['image']
                    if fileitem.filename:
                        # Create a safe filename with timestamp to avoid overwriting
                        filename = os.path.basename(fileitem.filename)
                        timestamp = int(time.time())
                        safe_filename = f"{timestamp}_{filename}"
                        filepath = os.path.join(IMAGE_DIR, safe_filename)

                        # Save the file
                        with open(filepath, 'wb') as f:
                            f.write(fileitem.file.read())

                        relative_filepath = f"{IMAGE_DIR}/{safe_filename}"

                        # Read all other fields
                        title = form.getvalue('title', 'Sin Título')
                        category = form.getvalue('category', 'paisajes')
                        location = form.getvalue('location', 'Desconocido')
                        date = form.getvalue('date', 'Reciente')
                        camera = form.getvalue('camera', '-')
                        lens = form.getvalue('lens', '-')
                        settings = form.getvalue('settings', '-')

                        # Update data.js
                        self.update_data_js({
                            'title': title,
                            'category': category,
                            'src': relative_filepath,
                            'location': location,
                            'date': date,
                            'camera': camera,
                            'lens': lens,
                            'settings': settings
                        })

                        # Respond success
                        self.send_response(200)
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        response = {'status': 'success', 'message': 'Foto subida correctamente'}
                        self.wfile.write(json.dumps(response).encode('utf-8'))
                        return
                    else:
                        self.send_error(400, 'No se proporcionó ninguna imagen')
                        return
            except Exception as e:
                print(f"Error: {e}")
                self.send_error(500, f'Error interno: {str(e)}')
                return
        
        # If not /upload, return 405 Method Not Allowed
        self.send_error(405, "Method Not Allowed")

    def update_data_js(self, photo_data):
        with open('data.js', 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the max ID
        # simple way: count existing 'id:' or use timestamp for unique id
        unique_id = int(time.time())

        # Construct the new photo object block
        photo_block = f"""        {{
            id: {unique_id},
            title: "{photo_data['title']}",
            category: "{photo_data['category']}",
            src: "{photo_data['src']}",
            thumb: "{photo_data['src']}",
            location: "{photo_data['location']}",
            date: "{photo_data['date']}",
            exif: {{ camera: "{photo_data['camera']}", lens: "{photo_data['lens']}", settings: "{photo_data['settings']}" }}
        }},
        // --- Añade tus fotos debajo de esta línea siguiendo el formato anterior ---"""

        # Replace the target line in data.js
        target_line = "// --- Añade tus fotos debajo de esta línea siguiendo el formato anterior ---"
        if target_line in content:
            new_content = content.replace(target_line, photo_block)
            with open('data.js', 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            print("Error: No se encontró la línea de inserción en data.js")

if __name__ == "__main__":
    Handler = PortfolioUploadHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Servidor iniciado en http://localhost:{PORT}")
        print("Puedes detenerlo cerrando esta ventana.")
        httpd.serve_forever()
