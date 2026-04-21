import re

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/globals.css'
with open(filepath, 'r') as f:
    content = f.read()

old_css = """.section-shell::before {
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

# A massive, soft blending block that removes any block divisions.
new_css = """.section-shell::before {
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

content = content.replace(old_css, new_css)

with open(filepath, 'w') as f:
    f.write(content)

import os
# Edit fix_transitions components to relax "via-30%" to a smoother 50% automatic peak!
components = ['Services.tsx', 'Results.tsx', 'Testimonials.tsx', 'Differentials.tsx']
for root, dirs, files in os.walk('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components'):
    for file in files:
        if file in components:
            p = os.path.join(root, file)
            with open(p, 'r') as f:
                c = f.read()
            c = c.replace('via-30%', 'via-50%')
            with open(p, 'w') as f:
                f.write(c)

print("Fade transitions enhanced.")
