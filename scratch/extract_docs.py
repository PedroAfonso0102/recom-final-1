import docx
import os
import sys

folder = r'c:\Users\Outlet do Notebook\Documents\01_Projetos_Ativos\06_Recom\recom-mvp\MVPs\5\recom-final-1\instruçoes'
output = r'c:\Users\Outlet do Notebook\Documents\01_Projetos_Ativos\06_Recom\recom-mvp\MVPs\5\recom-final-1\scratch'

files = sorted([f for f in os.listdir(folder) if f.endswith('.docx')])

for fname in files:
    path = os.path.join(folder, fname)
    out_path = os.path.join(output, fname.replace('.docx', '.txt'))
    doc = docx.Document(path)
    
    with open(out_path, 'w', encoding='utf-8') as f:
        for para in doc.paragraphs:
            f.write(para.text + '\n')
    
    print(f"Extracted: {fname} -> {os.path.basename(out_path)}")
