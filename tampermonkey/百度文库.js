(() => {
    if (document.getElementsByClassName('reader-word-layer')[0] != null) {
        var wenku = {}

        wenku.css = () => {

            // 界面加入
            var h = document.createElement('div')
            var h1 = document.createElement('div')
            h.style = `
            position:fixed;
            z-index:999999;
            background-color:#ccc;
            cursor:pointer;
            top:40%;
            left:0px;
            `
            h1.style = `
                font-size:12px;
                padding:8px 2px;
                color:#FFF;
                background-color:#FE8A23;
                `
            h1.innerHTML = '复制文字'
            h1.id = 'copy'
            document.body.appendChild(h)
            h.appendChild(h1)
        }

        // 新页面添加
        wenku.css1 = () => {

            var copy1 = document.createElement('div')
            copy1.id = 'copy1'
            copy1.style = `
            display=none
            width:100%;
            height:100%;
            position: fixed;
            z-index: 9999;
            display: block;
            top: 0px;
            left: 0px;
            background:rgba(255,255,255);
            -webkit-backdrop-filter: blur(20px);
            display: flex;
            justify-content:center;
            align-items:center;
            `

            var copy11 = document.createElement('div')
            copy11.id = 'copy11'
            copy11.style = `
            width:100%;
            height:100%;
            position:fixed;
            top:0px;
            left:0px;
            `

            var copy12 = document.createElement('div')
            copy12.id = 'copy2'
            copy12.style = `
            font-size:16px;
            margin-top:20px;
            text-align:center;
            `
            copy12.innerHTML = '点击文本外关闭弹框'

            var copy13 = document.createElement('pre')
            copy13.id = 'copy13'
            copy13.style = `
            padding:20px;
            border:1px solid #CCC;
            border-radius:4px;
            width:60%;
            font-size:16px;
            line-height:22px;
            z-index:10000;
            white-space:pre-wrap;
            white-space:-moz-pre-wrap;
            white-space:-pre-wrap;
            white-space:-o-pre-wrap;
            word-wrap:break-word;
            word-break:break-all;
            max-height:70%;
            overflow:auto;
             `
            document.body.appendChild(copy1)
            copy1.appendChild(copy11)
            copy11.appendChild(copy12)
            copy1.appendChild(copy13)
        }
        wenku.oprate = () => {
            //打开折叠网页
            if (document.getElementsByClassName('read-all')[0] != null) {
                document.getElementsByClassName('read-all')[0].click()
            }

            // 监控点击

            document.getElementById('copy').addEventListener('click',() =>{
                // 提取文字
                var txt1 = document.getElementsByClassName('reader-word-layer')
                var txt2 = document.getElementsByClassName('p-txt')
                var txt = ''

                if (txt1.length > 0) {
                    for (i = 0; i < txt1.length; i++) {
                        txt += txt1[i].innerHTML
                    }
                }
                if (txt2.length > 0) {
                    for (i = 0; i < txt2.length; i++) {
                        txt += txt2[i].innerHTML
                    }
                }

                if (document.getElementById('copy1') != null) {
                    document.getElementById('copy1').remove();
                }


                //新页面处理
                wenku.css1();
                copy13.innerHTML = txt
                document.getElementById('copy11').addEventListener('click',() =>{
                    document.getElementById('copy1').remove()
                })
            })

        }
        wenku.css();
        wenku.oprate();
    }
})()
