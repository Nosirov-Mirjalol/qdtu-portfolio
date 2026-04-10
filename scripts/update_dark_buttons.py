from pathlib import Path
import re
root = Path(r'C:/Users/user/OneDrive/Desktop/New folder/src')
patterns = {
    r'bg-red-50 text-red-600 hover:bg-red-100': 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-900 hover:bg-red-100',
    r'bg-blue-50 text-blue-700 hover:bg-blue-100': 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-900 hover:bg-blue-100',
    r'bg-green-50 text-green-700 hover:bg-green-100': 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300 dark:hover:bg-green-900 hover:bg-green-100',
}
changed = []
for path in root.rglob('*.tsx'):
    text = path.read_text(encoding='utf-8')
    new_text = text
    for pat, repl in patterns.items():
        new_text = re.sub(pat, repl, new_text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        changed.append(str(path.relative_to(root)))
print('changed files:', changed)
