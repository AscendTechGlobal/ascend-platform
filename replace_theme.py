import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()

    original_content = content

    # Component classes replacements
    content = content.replace("text-amber-200", "text-blue-400")
    content = content.replace("text-amber-300", "text-blue-500")
    content = content.replace("text-amber-400", "text-blue-500")
    content = content.replace("text-amber-500", "text-blue-600")
    content = content.replace("text-amber-600", "text-blue-600")
    content = content.replace("text-amber-700", "text-blue-700")

    content = content.replace("bg-amber-100", "bg-blue-100")
    content = content.replace("bg-amber-200", "bg-blue-200")
    content = content.replace("bg-amber-300", "bg-blue-300")
    content = content.replace("bg-amber-400", "bg-blue-400")
    content = content.replace("bg-amber-500", "bg-[#3B82F6]")
    content = content.replace("bg-orange-500", "bg-[#3B82F6]")

    content = content.replace("border-amber-300", "border-blue-400")
    content = content.replace("border-amber-400", "border-blue-500")
    content = content.replace("border-amber-500/20", "border-blue-500/20")
    content = content.replace("border-orange-500/20", "border-blue-500/20")
    content = content.replace("border-amber-200/20", "border-blue-400/20")
    content = content.replace("shadow-amber-500/20", "shadow-blue-500/20")

    content = content.replace("from-amber-200", "from-blue-400")
    content = content.replace("to-amber-500", "to-blue-600")
    content = content.replace("from-orange-400", "from-[#3B82F6]")
    content = content.replace("to-orange-600", "to-blue-700")
    content = content.replace("via-amber-400", "via-[#3B82F6]")

    content = content.replace("btn-gold-outline", "btn-blue-outline")
    content = content.replace("btn-orange", "btn-blue")

    # RGB and HEX manual spots
    # 245, 158, 11 -> amber-500, converting to 59, 130, 246
    content = content.replace("245,158,11", "59,130,246")
    content = content.replace("245, 158, 11", "59, 130, 246")
    # Old radial glows
    content = content.replace("14,165,233", "59,130,246")
    
    # Specific hex colors
    content = content.replace("#fcd34d", "#60a5fa") # amber-300 to blue-400
    content = content.replace("#fbbf24", "#3b82f6") # amber-400 to blue-500
    content = content.replace("#d97706", "#2563eb") # amber-600 to blue-600
    content = content.replace("#f59e0b", "#3B82F6") # amber-500 to blue-500

    if original_content != content:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    base_dir = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web'
    process_directory(os.path.join(base_dir, 'src'))
    process_file(os.path.join(base_dir, 'tailwind.config.ts'))
