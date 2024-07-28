import json,requests
def push(text,wecom_touid='@all'):
    # 企业id
    wecom_cid = "wwa872c89327cec783"  
    # 应用id
    wecom_aid = "1000003"
    wecom_secret = "PKd-d_k__zmA0YXE7ld6VmMDU2RKA8-XEP9cn49mVTY"


    get_token_url = f"https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid={wecom_cid}&corpsecret={wecom_secret}"
    response = requests.get(get_token_url).content
    access_token = json.loads(response).get('access_token')
    if access_token and len(access_token) > 0:
        send_msg_url = f'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token={access_token}'
        data = {
            "touser":wecom_touid,
            "agentid":wecom_aid,
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

if __name__ == '__main__':
    message="This is a test...."
    push(message,"HuZhiCheng")
