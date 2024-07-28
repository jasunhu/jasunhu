import requests
import time


class cloud189:
    def __init__(self):
        self.username = "13805660097"
        self.password = "HZCa5197568"


    def sign(self):
        session = requests.Session()

        rand = str(round(time.time() * 1000))
        print(rand)
        surl = f"https://api.cloud.189.cn/mkt/userSign.action?rand={rand}&clientType=TELEANDROID&version=8.6.3&model=SM-G930K"
        url = "https://m.cloud.189.cn/v2/drawPrizeMarketDetails.action?taskId=TASK_SIGNIN&activityId=ACT_SIGNIN"
        url2 = "https://m.cloud.189.cn/v2/drawPrizeMarketDetails.action?taskId=TASK_SIGNIN_PHOTOS&activityId=ACT_SIGNIN"
        headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; SM-G930K Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.136 Mobile Safari/537.36 Ecloud/8.6.3 Android/22 clientId/355325117317828 clientModel/SM-G930K imsi/460071114317824 clientChannelId/qq proVersion/1.0.6",
            "Referer": "https://m.cloud.189.cn/zhuanti/2016/sign/index.jsp?albumBackupOpened=1",
            "Host": "m.cloud.189.cn",
            "Accept-Encoding": "gzip, deflate",
        }
        session.cookies.update(
            {
                "COOKIE_LOGIN_USER": "485EE619C59350849A6FF4787F5AD70D8209911159E11D3B39B4D565D4556BFFEE227A6B14228801031EB81050F46ABF0F4D9D7A12B91D44"
            }
        )

        response = session.get(url=surl, headers=headers)

        netdiskbonus = response.json().get("netdiskBonus")
        if response.json().get("isSign") == "false":
            msg = f"签到结果: 未签到，签到获得 {netdiskbonus}M 空间"
        else:
            msg = f"签到结果: 已经签到过了，签到获得 {netdiskbonus}M 空间"
        response = session.get(url=url, headers=headers)
        if "errorCode" in response.text:
            msg += f"\n第一次抽奖: {response.json().get('errorCode')}"
        else:
            description = response.json().get("description", "")
            if description in ["1", 1]:
                description = "50M空间"
            msg += f"\n第一次抽奖: 获得{description}"
        response = session.get(url=url2, headers=headers)
        if "errorCode" in response.text:
            msg += f"\n第二次抽奖: {response.json().get('errorCode')}"
        else:
            description = response.json().get("description", "")
            if description in ["1", 1]:
                description = "50M空间"
            msg += f"\n第二次抽奖: 获得{description}"

        return msg

    def main(self):
        

        msg = "天翼网盘打卡\n"
        msg += self.sign()

        return msg


if __name__ == "__main__":

    print(cloud189().main())
