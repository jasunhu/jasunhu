import json,requests,os

def push(text,wecom_touid='@all'):
    # 企业id
    WECOM_CID = os.environ['WECOM_CID']  
    # 应用id
    WECOM_AID = os.environ['WECOM_AID']
    WECOM_SECRET = os.environ['WECOM_SECRET']


    get_token_url = f"https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid={WECOM_CID}&corpsecret={WECOM_SECRET}"
    response = requests.get(get_token_url).content
    access_token = json.loads(response).get('access_token')
    if access_token and len(access_token) > 0:
        send_msg_url = f'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token={access_token}'
        data = {
            "touser":wecom_touid,
            "agentid":WECOM_AID,
            "msgtype":"text",
            "text":{
                "content":text
            },
            "duplicate_check_interval":600
        }
        response = requests.post(send_msg_url,data=json.dumps(data)).content
        return response
    else:
        return False

def main():
    msg = """早（6点半-）:
        6点打卡，控制在15分钟以内
        8点40上班，整理待办/撰写感受

中（11点半-）:
        午饭、整理待办/撰写感受，午休

晚（17点半-）:
        晚饭，整理待办/撰写感受
        anki做题
        8点酒测，锻炼
        9点半洗漱后开始攻坚（争取12点结束！）
"""
    push(msg,"HuZhiCheng")

if __name__ == '__main__':
   main()

