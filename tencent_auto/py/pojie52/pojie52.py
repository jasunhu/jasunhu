# -*- coding: utf-8 -*-
import re
import requests
import time


class Pojie52:
    def __init__(self):

        self.cookies = f"__gads=ID=aaa18411ffb611ba-22326cf74dca0046:T=1626106410:RT=1626106410:S=ALNI_MarxDeHlQypJqvyVfVjaH8zcy3R4g;  htVD_2132_saltkey=MsAa01V4;  htVD_2132_auth=08985IfHVvGbWoE1XAkPetZCay8kdVge884%2F9lJF0ZGR9XT8P9xT61DfAiOcfVuB2pIcCxm6UyyITyE9oIA4R8Ljl2Wm; htVD_2132_connect_is_bind=1; htVD_2132_ttask=1625912%7C20210715; htVD_2132_seccodecSApQP=6057152.64791c5a25af5abc79; htVD_2132_checkpm=1; htVD_2132_lastact=1626352197%09home.php%09task"

    def sign(self):
        msg = ""
        pojie = False
        while pojie is False:
            try:
                session = requests.session()
                headers = {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
                    "Cookie": self.cookies,
                    "ContentType": "text/html;charset=gbk",
                }
                session.get(
                    url="https://www.52pojie.cn/home.php?mod=task&do=apply&id=2",
                    headers=headers,
                )
                resp = session.get(
                    url="https://www.52pojie.cn/home.php?mod=task&do=draw&id=2",
                    headers=headers,
                )
                content = re.findall(r'<div id="messagetext".*?\n<p>(.*?)</p>', resp.text)[
                    0
                ]
                if "您需要先登录才能继续本操作" in resp.text:
                    msg += "吾爱破解 cookie 失效"
                elif "安域防护节点" in resp.text:
                    msg += "触发吾爱破解安全防护，访问出错。自行修改脚本运行时间和次数，总有能访问到的时间"
                elif "恭喜" in resp.text:
                    msg += "吾爱破解签到成功"
                elif "不是进行中的任务" in resp.text:
                    msg += "已完成签到"
                else:
                    msg += content
                pojie = True
            except Exception as e:
                time.sleep(10)
                print("签到错误", e)
                msg += "吾爱破解出错"
                pojie = False
        return msg

    def main(self):
        msg = "吾爱破解打卡\n"
        msg += self.sign()

        return msg

if __name__ == "__main__":

    print(Pojie52().main())
