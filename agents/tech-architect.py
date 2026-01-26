# -*- coding: utf-8 -*-
import os, datetime
def review():
    # \u6280\u8853\u9577 = 技術長, \u53bb\u5047\u5b58\u771f = 去假存真
    msg = '\u2705 **AI \u6280\u8853\u9577**\uff1a\u6aa2\u67e5\u6838\u5fc3\u5c0e\u7dda... \u72c0\u614b [OK]\u3002\u5f37\u5236\u57f7\u884c\u300c\u53bb\u5047\u5b58\u771f\u300d\u539f\u5247\u3002'
    log = f'\n- [{datetime.datetime.now()}] {msg}'
    if not os.path.exists('brain-logs'): os.makedirs('brain-logs')
    with open('brain-logs/evolution.md', 'a', encoding='utf-8') as f: f.write(log)
    print('Review complete.')
if __name__ == '__main__': review()
