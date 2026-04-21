import os

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/globals.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Root variables
content = content.replace("--background: #050505", "--background: #000000")
content = content.replace("--foreground: #ffffff", "--foreground: #f4f4f5")
content = content.replace("--panel-bg: linear-gradient(180deg, rgba(11, 17, 30, 0.78), rgba(7, 10, 20, 0.86))", "--panel-bg: rgba(6, 6, 6, 0.95)")
content = content.replace("--panel-highlight: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(217, 119, 6, 0.14) 48%, rgba(180, 83, 9, 0.12))", "--panel-highlight: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent)")
content = content.replace("rgba(217, 119, 6", "rgba(255, 255, 255")
content = content.replace("rgba(180, 83, 9", "rgba(255, 255, 255")

# 2. Body background sweeps
content = content.replace("background: #050505;", "background: #000000;")
content = content.replace("background: #05070A;", "background: #000000;")

import re

body_pattern = r"body\s*\{[^}]*background:\s*(radial-gradient[^;]+linear-gradient[^;]+);[^\}]*\}"
content = re.sub(body_pattern, lambda m: m.group(0).replace(m.group(1), "#000000"), content)

body_before_pattern = r"body::before\s*\{[^}]*background:\s*([^;]+);[^\}]*\}"
content = re.sub(body_before_pattern, lambda m: m.group(0).replace(m.group(1), "transparent"), content)

space_bg_pattern = r"\.space-bg\s*\{[^}]*background:\s*([^;]+);[^\}]*\}"
content = re.sub(space_bg_pattern, lambda m: m.group(0).replace(m.group(1), "#000000"), content)

hero_glow_pattern = r"\.hero-glow\s*\{[^}]*background:\s*([^;]+);[^\}]*\}"
content = re.sub(hero_glow_pattern, lambda m: m.group(0).replace(m.group(1), "transparent"), content)

section_shell_before_pattern = r"\.section-shell::before\s*\{[^}]*background:\s*([^;]+);[^\}]*\}"
content = re.sub(section_shell_before_pattern, lambda m: m.group(0).replace(m.group(1), "transparent"), content)

# 3. Component Classes
content = content.replace(".orange-card", ".mono-card")
content = content.replace(".icon-circle-orange", ".icon-circle-mono")

# 4. Scrollbar
content = content.replace("linear-gradient(180deg, rgba(59, 130, 246, 0.45), rgba(217, 119, 6, 0.45))", "rgba(255, 255, 255, 0.2)")
content = content.replace("linear-gradient(180deg, rgba(59, 130, 246, 0.7), rgba(180, 83, 9, 0.7))", "rgba(255, 255, 255, 0.4)")
content = content.replace("background: #06060a;", "background: #000000;")

# Turn any leftover gold gradients (like text-gradient) into silver
content = content.replace("#fef3c7", "#ffffff")
content = content.replace("#fde68a", "#e4e4e7")
content = content.replace("#fcd34d", "#d4d4d8")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Piano css applied.")

# Also sanitize components
def sanitize_components():
    for root, dirs, files in os.walk('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components'):
        for file in files:
            if file.endswith('.tsx'):
                p = os.path.join(root, file)
                with open(p, 'r') as f:
                    c = f.read()
                o = c
                c = c.replace("orange-card", "mono-card")
                c = c.replace("icon-circle-orange", "icon-circle-mono")
                c = c.replace("bg-[#05070A]", "bg-black")
                if c != o:
                    with open(p, 'w') as f:
                        f.write(c)

sanitize_components()
print("Components updated.")
