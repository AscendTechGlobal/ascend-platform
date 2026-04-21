import re

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/app/[locale]/(public)/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace imports
imports = """import Hero from '@/components/sections/Hero'
import PainPoints from '@/components/sections/PainPoints'
import Services from '@/components/sections/Services'
import SystemsVisual from '@/components/sections/SystemsVisual'
import ProcessSteps from '@/components/sections/ProcessSteps'
import Authority from '@/components/sections/Authority'
import Audience from '@/components/sections/Audience'
import FinalCta from '@/components/sections/FinalCta'"""

# We'll just replace the whole imports block
content = re.sub(r"import Hero from '@/components/sections/Hero'.*?import About from '@/components/sections/About'", imports, content, flags=re.DOTALL)

# Replace the assembly
assembly = """    <>
      <section id="hero">
        <Hero settings={settings} />
      </section>

      <section id="pain-points">
        <PainPoints />
      </section>

      <section id="services">
        <Services services={services} />
      </section>

      <section id="systems-visual">
        <SystemsVisual />
      </section>

      <section id="process-steps">
        <ProcessSteps />
      </section>

      <section id="authority">
        <Authority />
      </section>

      <section id="audience">
        <Audience />
      </section>

      <section id="final-cta">
        <FinalCta />
      </section>
    </>"""

content = re.sub(r'<>.*?<>', assembly, content, flags=re.DOTALL) # wait this will fail since <> is multiple

content = re.sub(r"<>\s*<section id=\"hero\">.*?</>", assembly, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)

print("Page assembled.")
