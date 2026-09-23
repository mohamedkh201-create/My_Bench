import os
import subprocess

app_dir = "/home/user/test/apps/cpro"
output_file = "/home/user/test/cpro_full_codebase.md"

exclude_dirs = {'node_modules', '.git', '__pycache__', 'build', 'dist', 'public', 'assets', 'env'}
exclude_exts = {'.pyc', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.lock', '.zip', '.tar', '.gz'}
exclude_files = {'yarn.lock', 'package-lock.json'}

with open(output_file, 'w', encoding='utf-8') as out:
    out.write("This document contains the complete codebase for the 'cpro' application.\n")
    out.write("The application consists of a Backend (Frappe/Python) and a Frontend (React/Vite).\n")
    out.write("Backend files are located primarily in the `cpro/` directory.\n")
    out.write("Frontend files are located in the `frontend/` directory.\n\n")
    out.write("Please review the following file tree and file contents to understand the codebase. I will ask you to make modifications afterwards.\n\n")
    
    # Directory Structure
    out.write("### Directory Tree\n\n")
    out.write("```\n")
    
    def generate_tree(dir_path, prefix=""):
        try:
            entries = os.listdir(dir_path)
        except OSError:
            return
            
        entries = sorted([e for e in entries if e not in exclude_dirs and e not in exclude_files and not e.startswith('.')])
        
        for i, entry in enumerate(entries):
            path = os.path.join(dir_path, entry)
            is_last = (i == len(entries) - 1)
            connector = "└── " if is_last else "├── "
            
            if os.path.isdir(path):
                out.write(prefix + connector + entry + "/\n")
                extension = "    " if is_last else "│   "
                generate_tree(path, prefix + extension)
            else:
                if not any(entry.endswith(ext) for ext in exclude_exts):
                    out.write(prefix + connector + entry + "\n")

    out.write("cpro/\n")
    generate_tree(app_dir)
    out.write("```\n\n")

    # File Contents
    out.write("### Code Files\n\n")

    for root, dirs, files in os.walk(app_dir):
        # Modify dirs in place to skip excluded directories and sort them
        dirs[:] = sorted([d for d in dirs if d not in exclude_dirs and not d.startswith('.')])
        
        for file in sorted(files):
            if file in exclude_files or file.startswith('.'):
                continue
            if any(file.endswith(ext) for ext in exclude_exts):
                continue
            
            filepath = os.path.join(root, file)
            relpath = os.path.relpath(filepath, app_dir)
            
            out.write(f"### {relpath}\n\n")
            
            # Determine language for markdown block
            ext = os.path.splitext(file)[1].lower()
            lang = ""
            if ext == '.py': lang = "python"
            elif ext in ['.js', '.jsx']: lang = "javascript"
            elif ext in ['.ts', '.tsx']: lang = "typescript"
            elif ext == '.html': lang = "html"
            elif ext == '.css': lang = "css"
            elif ext == '.json': lang = "json"
            elif ext == '.md': lang = "markdown"
            elif ext in ['.yml', '.yaml']: lang = "yaml"
            
            out.write(f"```{lang}\n")
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    out.write(f.read())
            except Exception as e:
                out.write(f"// Error reading file (possibly binary or wrong encoding): {e}\n")
            
            if not out.tell() or out.tell() == 0:
                out.write("\n")
            out.write("\n```\n\n")

print(f"Export completed. File saved at: {output_file}")
