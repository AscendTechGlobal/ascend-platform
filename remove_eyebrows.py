import re
import os

directory = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components/sections'
deleted_count = 0

pattern = re.compile(r'<span[^>]*className="[^"]*eyebrow[^"]*"[^>]*>.*?</span>', re.DOTALL | re.IGNORECASE)

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            p = os.path.join(root, file)
            with open(p, 'r') as f:
                content = f.read()
            
            new_content, count = pattern.subn('', content)
            
            if count > 0:
                with open(p, 'w') as f:
                    f.write(new_content)
                deleted_count += count
                print(f"Removed {count} eyebrows in {file}")

print(f"Total eyebrows removed: {deleted_count}")

# Cleanup CSS
css_path = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/globals.css'
with open(css_path, 'r') as f:
    css_content = f.read()

# Make sure they definitely don't show up if there are stragglers
css_content += "\n.eyebrow { display: none !important; }\n"

with open(css_path, 'w') as f:
    f.write(css_content)

