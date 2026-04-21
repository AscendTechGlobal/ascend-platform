import re
import os

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/globals.css'
with open(filepath, 'r') as f:
    content = f.read()

old_css = """.section-shell::before {
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

clean_css = """.section-shell::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: transparent;
}"""

content = content.replace(old_css, clean_css)

with open(filepath, 'w') as f:
    f.write(content)

# Apply the Holy Grail gradient directly on components!
components = ['Services.tsx', 'Results.tsx', 'Testimonials.tsx', 'Differentials.tsx']
perfect_bg = "bg-[linear-gradient(to_bottom,#0B0F14_0%,#0F1720_8%,#0F1720_92%,#0B0F14_100%)]"

for root, dirs, files in os.walk('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components'):
    for file in files:
        if file in components:
            p = os.path.join(root, file)
            with open(p, 'r') as f:
                c = f.read()
            # It currently has 'bg-[#0F1720]' from the last replace
            c = c.replace('bg-[#0F1720]', perfect_bg)
            with open(p, 'w') as f:
                f.write(c)

print("Bands removed, real gradient stops applied.")
