import os

# Update globals.css
filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/globals.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("--background: #000000;", "--background: #0B0F14;")
content = content.replace("--panel-bg: rgba(6, 6, 6, 0.95);", "--panel-bg: rgba(17, 24, 39, 0.95);")
content = content.replace("background: #000000;", "background: #0B0F14;")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)


# Update Highlight components
highlight_sections = ['Services.tsx', 'FAQ.tsx', 'ContactSection.tsx', 'Differentials.tsx', 'Results.tsx']

for root, dirs, files in os.walk('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components'):
    for file in files:
        if file in highlight_sections:
            p = os.path.join(root, file)
            with open(p, 'r') as f:
                c = f.read()
            # Replace the first instance of 'section-shell' with 'section-shell bg-[#0F1720]' or we can just append it
            # actually better to just inject bg-[#0F1720]
            if "bg-[#0F1720]" not in c:
                c = c.replace('className="section-shell', 'className="section-shell bg-[#0F1720]')
            with open(p, 'w') as f:
                f.write(c)

print("Navy applied.")
