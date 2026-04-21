import os

components = {
    'Services.tsx': 'bg-[#0F1720]',
    'Results.tsx': 'bg-[#0F1720]',
    'Testimonials.tsx': 'bg-[#0F1720]',
    'Differentials.tsx': 'bg-[#0F1720]',
    'FinalCta.tsx': 'bg-[#0B0F14]',
    'ContactSection.tsx': 'bg-[#0B0F14]'
}

for root, dirs, files in os.walk('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components'):
    for file in files:
        if file in components:
            target_class = components[file]
            p = os.path.join(root, file)
            with open(p, 'r') as f:
                c = f.read()
            
            # Wipe potential preexisting specific backgrounds
            c = c.replace('bg-[#0F1720]', '')
            c = c.replace('bg-[#0B0F14]', '')
            
            # Re-inject the correct one
            c = c.replace('className="section-shell', f'className="section-shell {target_class}')
            
            # Additional fallback if section-shell is missing
            if 'className="section-shell' not in c:
                c = c.replace('<section className="', f'<section className="{target_class} ')
                c = c.replace('<section id', f'<section className="{target_class}" id')

            with open(p, 'w') as f:
                f.write(c)

print("Zebra fix applied.")
