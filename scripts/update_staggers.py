import os, glob, re

stagger_pattern = re.compile(r'delay=\{\s*([^}\*]+)\s*\*\s*0\.(08|06)\s*\}|delay=\{\s*0\.(08|06)\s*\*\s*([^}\*]+)\s*\}')

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # If it contains our target stagger
    if not stagger_pattern.search(content) and '0.1 + i * 0.08' not in content:
        return

    # Check if we need to add the import
    has_import = 'import { DURATION } from "@/lib/motion"' in content or 'import { DURATION, EASE } from "@/lib/motion"' in content
    
    # Replace stagger
    new_content = stagger_pattern.sub(lambda m: f'delay={{{m.group(1) or m.group(4)} * DURATION.stagger}}', content)

    # Special case: delay={0.1 + i * 0.08}
    new_content = re.sub(r'delay=\{0\.1 \+ ([^}]+) \* 0\.08\}', r'delay={0.1 + \1 * DURATION.stagger}', new_content)

    if new_content != content:
        if not has_import:
            # Add import after the last import line or at top
            import_statement = 'import { DURATION } from "@/lib/motion";\n'
            # Find last import
            last_import = new_content.rfind('import ')
            if last_import != -1:
                end_of_line = new_content.find('\n', last_import)
                new_content = new_content[:end_of_line+1] + import_statement + new_content[end_of_line+1:]
            else:
                new_content = import_statement + new_content

        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {path}')

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            update_file(os.path.join(root, file))
