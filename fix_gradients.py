import re
import os

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/globals.css'
with open(filepath, 'r') as f:
    content = f.read()

old_css = """.section-shell::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 250px;
  background: linear-gradient(180deg, #0B0F14 0%, rgba(11, 15, 20, 0.4) 40%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}
.section-shell::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 250px;
  background: linear-gradient(0deg, #0B0F14 0%, rgba(11, 15, 20, 0.4) 40%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}"""

new_css = """.section-shell::before {
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

content = content.replace(old_css, new_css)

with open(filepath, 'w') as f:
    f.write(content)

components = ['Services.tsx', 'Results.tsx', 'Testimonials.tsx', 'Differentials.tsx']
for root, dirs, files in os.walk('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components'):
    for file in files:
        if file in components:
            p = os.path.join(root, file)
            with open(p, 'r') as f:
                c = f.read()
            c = c.replace('bg-gradient-to-b from-[#0B0F14] via-[#0F1720] via-50% to-[#0B0F14]', 'bg-[#0F1720]')
            with open(p, 'w') as f:
                f.write(c)

print("Gradients narrowed and colors prioritized.")
