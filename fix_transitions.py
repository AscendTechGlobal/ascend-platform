import os

components = {
    'Services.tsx': 'bg-gradient-to-b from-[#0B0F14] via-[#0F1720] via-30% to-[#0B0F14]',
    'Results.tsx': 'bg-gradient-to-b from-[#0B0F14] via-[#0F1720] via-30% to-[#0B0F14]',
    'Testimonials.tsx': 'bg-gradient-to-b from-[#0B0F14] via-[#0F1720] via-30% to-[#0B0F14]',
    'Differentials.tsx': 'bg-gradient-to-b from-[#0B0F14] via-[#0F1720] via-30% to-[#0B0F14]'
}

for root, dirs, files in os.walk('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components'):
    for file in files:
        if file in components:
            target_class = components[file]
            p = os.path.join(root, file)
            with open(p, 'r') as f:
                c = f.read()
            
            # Revert the hard block
            c = c.replace('bg-[#0F1720]', target_class)

            with open(p, 'w') as f:
                f.write(c)

print("Smooth fades applied.")
