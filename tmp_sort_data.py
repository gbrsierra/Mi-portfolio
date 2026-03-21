import re
import json

def get_photo_date_value(date_str):
    if not date_str or date_str == "-": return 0
    if date_str.lower().strip() == "reciente": return 999999
    month_names = {
        "enero": 1, "febrero": 2, "marzo": 3, "abril": 4, "mayo": 5, "junio": 6,
        "julio": 7, "agosto": 8, "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
    }
    parts = date_str.strip().lower().split()
    if len(parts) >= 2:
        month = month_names.get(parts[0], 0)
        try:
            year = int(parts[-1])
            return year * 100 + month
        except:
            pass
    return 0

file_path = 'data.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract photos array content
# Find the start of the photos array: 'photos: ['
start_marker = 'photos: ['
start_idx = content.find(start_marker) + len(start_marker)

# Find the end of the array (the matching ']')
# For simplicity, we assume the array is followed by '];' or similar at the end of the file.
end_idx = content.rfind(']')

# Extract the content between markers
photos_section = content[start_idx:end_idx].strip()

# Better object parser: look for { ... } blocks
photo_blocks = re.findall(r'\{[^{}]*?id:\s*\d+.*?\}(?=\s*,|\s*\]|\s*//|$)', photos_section, re.DOTALL)

def parse_photo_block(block):
    # Field extraction
    try:
        id_val = int(re.search(r'id:\s*(\d+)', block).group(1))
        title = re.search(r'title:\s*"(.*?)"', block).group(1)
        category = re.search(r'category:\s*"(.*?)"', block).group(1)
        src = re.search(r'src:\s*"(.*?)"', block).group(1)
        thumb = re.search(r'thumb:\s*"(.*?)"', block).group(1)
        location = re.search(r'location:\s*"(.*?)"', block).group(1)
        date = re.search(r'date:\s*"(.*?)"', block).group(1)
        # Exif
        camera = re.search(r'camera:\s*"(.*?)"', block).group(1)
        lens = re.search(r'lens:\s*"(.*?)"', block).group(1)
        settings = re.search(r'settings:\s*"(.*?)"', block).group(1)
        
        return {
            'id': id_val,
            'title': title,
            'category': category,
            'src': src,
            'thumb': thumb,
            'location': location,
            'date': date,
            'camera': camera,
            'lens': lens,
            'settings': settings
        }
    except Exception as e:
        # print(f"Error parsing block: {e}")
        return None

parsed_photos = []
for b in photo_blocks:
    p = parse_photo_block(b)
    if p:
        parsed_photos.append(p)

# Sort them
parsed_photos.sort(key=lambda p: (get_photo_date_value(p['date']), p['id']), reverse=True)

# Reconstruct
new_photos_list = []
for p in parsed_photos:
    new_photos_list.append(f"""        {{
            id: {p['id']},
            title: "{p['title']}",
            category: "{p['category']}",
            src: "{p['src']}",
            thumb: "{p['thumb']}",
            location: "{p['location']}",
            date: "{p['date']}",
            exif: {{ camera: "{p['camera']}", lens: "{p['lens']}", settings: "{p['settings']}" }}
        }}""")

comment_line = "        // --- Añade tus fotos debajo de esta línea siguiendo el formato anterior ---"
all_photos_content = "\n" + comment_line + ",\n" + ",\n".join(new_photos_list) + "\n    "

# Replace the whole section
new_content = content[:start_idx] + all_photos_content + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done.")
