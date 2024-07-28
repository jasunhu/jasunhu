import smtplib
from email.mime.text import MIMEText as mt
from email.header import Header



def sendEmail(toadd,title,message):

    mail_host="smtp.qq.com"
    mail_user="1477816483@qq.com"
    mail_pass="gzwunzsojnrzjega"
    mail_port=465


    msg=mt(message,'plain','utf-8')
    msg['From']=Header(mail_user,'utf-8')
    msg['to']=Header(toadd,'utf-8')
    msg['Subject']=Header(title,'utf-8')

    try:
        server=smtplib.SMTP_SSL(mail_host, mail_port)
        server.login(mail_user,mail_pass)
        server.sendmail(mail_user,toadd,msg.as_string())
        return True
    except Exception as e:
        print(e)
        return False

if __name__ == '__main__':
    toadd ="1477816483@qq.com"
    title="test"
    message="This is a test. oops"
    sendEmail(toadd,title,message)