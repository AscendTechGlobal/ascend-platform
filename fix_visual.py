import re

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components/sections/SystemsVisual.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# We need to replace the entire <motion.div> abstract mockup with an image
mockup_start = "          {/* Abstract System UI Mockup */}"
mockup_end = "          </motion.div>\n\n        </div>"

# Use regex to replace between mockup_start and mockup_end
new_mockup = """          {/* System Dashboard Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full aspect-[4/3] rounded-[2rem] border border-white/10 shadow-[0_20px_80px_rgba(37,99,235,0.15)] overflow-hidden"
          >
            <img 
              src="/images/dashboard.png" 
              alt="Ascend Tech Global Systems Dashboard" 
              className="w-full h-full object-cover"
            />
            {/* Overlay Glass Flare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </motion.div>

        </div>"""

# Replace
pattern = re.escape(mockup_start) + r".*?" + r"^\s*</motion\.div>\s*\n\s*</div>"
content = re.sub(pattern, new_mockup, content, flags=re.DOTALL | re.MULTILINE)

# Save
with open(filepath, 'w') as f:
    f.write(content)

# create the public directory if it doesnt exist
import os
os.makedirs('/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/public/images', exist_ok=True)

print("Visual replaced.")
