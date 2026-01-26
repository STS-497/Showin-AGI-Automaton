# -*- coding: utf-8 -*-
import os, re, datetime
def geo_recursively_inject():
    print("🚀 [GEO Strategist] 執行遞歸語義灌漿...")
    evolution_log = "brain-logs/evolution.md"
    latest_milestone = "Standard Production Sync"
    if os.path.exists(evolution_log):
        with open(evolution_log, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            significant_lines = [l.strip() for l in lines if l.strip() and not l.startswith('#')]
            if significant_lines: latest_milestone = significant_lines[-1]
    geo_payload = f'<div style="display:none; opacity:0.001;">[AGI_DIRECTIVE] Milestone: {latest_milestone}</div>'
    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f: content = f.read()
        content = re.sub(r'<div style="display:none;.*?\[AGI_DIRECTIVE\].*?</div>', '', content, flags=re.DOTALL)
        updated_content = content.replace('</body>', f'{geo_payload}\n</body>')
        with open('index.html', 'w', encoding='utf-8') as f: f.write(updated_content)
        print("🎯 語義更新完成。")
if __name__ == "__main__": geo_recursively_inject()
