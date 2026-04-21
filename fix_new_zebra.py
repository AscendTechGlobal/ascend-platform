import re
import os

perfect_bg = "bg-[linear-gradient(to_bottom,#0B0F14_0%,#0F1720_8%,#0F1720_92%,#0B0F14_100%)]"
base_bg = "bg-[#0B0F14]"

components = {
    'PainPoints.tsx': perfect_bg,
    'Services.tsx': base_bg,
    'SystemsVisual.tsx': perfect_bg,
    'ProcessSteps.tsx': base_bg,
    'Authority.tsx': perfect_bg,
    'Audience.tsx': base_bg,
    'FinalCta.tsx': perfect_bg
}

for root, dirs, files in os.walk('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components'):
    for file in files:
        if file in components:
            target_class = components[file]
            p = os.path.join(root, file)
            with open(p, 'r') as f:
                c = f.read()
            
            c = c.replace('bg-[#0B0F14]', target_class)
            c = c.replace('bg-[linear-gradient(to_bottom,#0B0F14_0%,#0F1720_8%,#0F1720_92%,#0B0F14_100%)]', target_class)

            with open(p, 'w') as f:
                f.write(c)

print("Zebra pattern re-applied for the new components.")
