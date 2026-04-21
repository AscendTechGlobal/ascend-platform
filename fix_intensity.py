import re

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/globals.css'
with open(filepath, 'r') as f:
    content = f.read()

old_css = """.section-shell::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(180deg, #0B0F14 0%, transparent 100%);
  pointer-events: none;
  z-index: 10;
}
.section-shell::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(0deg, #0B0F14 0%, transparent 100%);
  pointer-events: none;
  z-index: 10;
}"""

new_css = """.section-shell::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(180deg, #0B0F14 0%, #0B0F14 15%, transparent 100%);
  pointer-events: none;
  z-index: 10;
}
.section-shell::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(0deg, #0B0F14 0%, #0B0F14 15%, transparent 100%);
  pointer-events: none;
  z-index: 10;
}"""

content = content.replace(old_css, new_css)

with open(filepath, 'w') as f:
    f.write(content)

print("Intensity adjusted by 10/15%.")
