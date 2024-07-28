from cloud189 import cloud189
from pojie52 import pojie52
from weibo import weibo
from push import push


def main():
    msg = "每日打卡\n"
    msg += cloud189.cloud189().main()
    msg += "\n"
    msg += weibo.weibo().main()
    msg += "\n"
    msg += pojie52.Pojie52().main()
    

    push.push(msg, "HuZhiCheng")


if __name__ == "__main__":
    main()
