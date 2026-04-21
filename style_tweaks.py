import re

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/globals.css'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Glass effect on panel
content = content.replace("--panel-bg: rgba(17, 24, 39, 0.95);", "--panel-bg: rgba(17, 24, 39, 0.45);")
content = content.replace("--panel-border: rgba(255, 255, 255, 0.1);", "--panel-border: rgba(255, 255, 255, 0.06);")

# 2. Section horizontal subtle lines and blue gradients
section_shell_css = """.section-shell::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), rgba(59, 130, 246, 0.1), rgba(255, 255, 255, 0.06), transparent);
  pointer-events: none;
  z-index: 10;
}
.section-shell::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20vh;
  background: linear-gradient(0deg, rgba(59, 130, 246, 0.02), transparent);
  pointer-events: none;
  z-index: 0;
}"""
old_section_shell = """.section-shell::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    transparent;
}"""
content = content.replace(old_section_shell, section_shell_css)

# 3. Micro blue glows on important elements
content = content.replace("0 12px 36px rgba(88, 28, 135, 0.22)", "0 8px 32px rgba(59, 130, 246, 0.28)")
content = content.replace("0 18px 44px rgba(88, 28, 135, 0.3),\n    0 0 28px rgba(59, 130, 246, 0.18)", "0 16px 48px rgba(59, 130, 246, 0.35),\n    0 0 32px rgba(59, 130, 246, 0.24)")
content = content.replace("0 0 36px rgba(59, 130, 246, 0.08)", "0 0 42px rgba(59, 130, 246, 0.18)")

old_icon_shadow = """box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 10px 24px rgba(6, 11, 30, 0.28);"""
new_icon_shadow = """box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 10px 24px rgba(6, 11, 30, 0.28),
    0 0 16px rgba(59, 130, 246, 0.2);"""
content = content.replace(old_icon_shadow, new_icon_shadow)

with open(filepath, 'w') as f:
    f.write(content)

print("Styles tweaked.")
