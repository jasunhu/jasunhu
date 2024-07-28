(() => {
    //开始进行爬虫
    var link = {}

    link.css = () => {
        var h = document.createElement('div')
        h.style = `
    cursor:pointer;
    z-index:9999999999999;
    display:block;
    line-height:30px;
    position:fixed;
    width:40px;
    left:0px;
    top:10%;
    overflow:visible;
    `
        h.id = 'link'
        h.innerHTML = '提取内容'
        document.body.appendChild(h);
    }
    link.css1 = () => {
        var h1 = document.createElement('div')
        h1.style = `
    z-index:9999999999999;
        width:100px;
        height:300px;
        position:fixed;
        left:40px;
        top:9%;
        
        `
        h1.id = 'link_out'

        var h11 = document.createElement('div')
        h11.innerHTML = '总数据(seleter):<br><input type="text" id="txt1">'

        var h12 = document.createElement('div')
        h12.innerHTML = `分数据(seleter):<br>
    <input type="text" id="txt2" value="a[href]"><br>
    <input type="button" id ="but4" class="but" value="确认提取" style='background-color:#DD001B'>`
        document.body.appendChild(h1);
        h1.appendChild(h11);
        h1.appendChild(h12);
    }

    //监听点击事件
    link.operate = () => {
        document.getElementById('link').addEventListener('click', () => {
            if (document.getElementById('link_out') != null) {
                document.getElementById('link_out').remove()
            }
            else {

                link.css1()

                document.getElementById('but4').addEventListener('click', () => {
                    link.download = function (data_str) {
                        //将文件转化为文本
                        var blob = new Blob([data_str], { type: "text/plain;charset=utf-8" });

                        // 创建下载链接
                        var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                        save_link.href = URL.createObjectURL(blob);

                        //创建下载名
                        save_link.download = 'im.txt';

                        //鼠标自动化点击链接
                        var ev = new MouseEvent("click");
                        save_link.dispatchEvent(ev);
                    }

                    var t1 = document.getElementById("txt1").value;
                    var t2 = document.getElementById("txt2").value;


                    //获取所需数据
                    function link_get(t1, t2) {
                        var html1 = document.querySelector(t1)
                        var item = html1.querySelectorAll(t2)
                        var data_str = ''
                        var name = ""
                        var link = ''
                        var href = t2.split('[')[1].replace(']', '')


                        for (var i = 0; i < item.length; i++) {
                            name = item[i].innerText.replaceAll('\n', '')

                            // 判断取得链接的标签
                            if (href == 'href') {
                                link = item[i].href
                            }
                            else if (href == 'src') {
                                link = item[i].src
                            }
                            else {
                                link = item[i].getAttribute(href)
                            }
                            data_str += name
                            data_str += "\n"
                            data_str += link
                            data_str += "\n"
                        }
                        return data_str
                    }
                    data_str = link_get(t1, t2)
                    link.download(data_str);

                })
            }
        })
    }
    link.css();
    link.operate();
})()