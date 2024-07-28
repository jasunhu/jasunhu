(() => {
    var video = {}

    // 视频解析网站
    video.player_nodes = [
        { url: "v.qq.com", node: "#mod_player" },
        { url: "www.iqiyi.com", node: "#flashbox" },
        { url: "v.youku.com", node: "#player" },
        { url: "w.mgtv.com", node: "#mgtv-player-wrap" },
        { url: "www.mgtv.com", node: "#mgtv-player-wrap" },
        { url: "tv.sohu.com", node: "#player" },
        { url: "film.sohu.com", node: "#playerWrap" },
        { url: "www.le.com", node: "#le_playbox" },
        { url: "video.tudou.com", node: ".td-playbox" },
        { url: "v.pptv.com", node: "#pptv_playpage_box" },
        { url: "vip.pptv.com", node: ".w-video" },
        { url: "www.wasu.cn", node: "#flashContent" },
        { url: "www.acfun.cn", node: "#ACPlayer" },
        { url: "vip.1905.com", node: "#player" },
        { url: "play.tudou.com", node: "#player" },
        { url: "www.bilibili.com/video", node: "#bilibiliPlayer" },
        { url: "www.bilibili.com/bangumi", node: "#player_module" },
    ];
    var node = "";
    for (var m in video.player_nodes) {
        if (window.location.href.indexOf(video.player_nodes[m].url) != -1) {
            node = video.player_nodes[m].node;
        }
    }
    if (node != "") {
        // 解析方法加入
        video.defaultSource = [
            {
                "name": "纯净解析",
                "url": "https://z1.m1907.cn/?jx="
            },
            {
                "name": "高速接口",
                "url": "https://api.sigujx.com/?url="
            },
            {
                "name": "B站解析1",
                "url": "https://vip.parwix.com:4433/player/?url="
            },
            {
                "name": "B站解析2",
                "url": "https://www.cuan.la/m3u8.php?url="
            },
            {
                "name": "Ckplayer",
                "url": "https://www.ckplayer.vip/jiexi/?url="
            },
            {
                "name": "BL",
                "url": "https://vip.bljiex.com/?v="
            },
            {
                "name": "大侠",
                "url": "https://api.10dy.net/?url="
            },
            {
                "name": "ELW",
                "url": "https://jx.elwtc.com/vip/?url="
            },
            {
                "name": "爱跟",
                "url": "https://vip.2ktvb.com/player/?url="
            },
            {
                "name": "冰豆",
                "url": "https://api.bingdou.net/?url="
            },
            {
                "name": "八八",
                "url": "https://jiexi.q-q.wang/?url="
            },
            {
                "name": "百域",
                "url": "https://jx.618g.com/?url="
            },
            {
                "name": "ckmov",
                "url": "https://www.ckmov.vip/api.php?url="
            },
            {
                "name": "大幕",
                "url": "https://jx.52damu.com/dmjx/jiexi.php?url="
            },
            {
                "name": "迪奥",
                "url": "https://123.1dior.cn/?url="
            },
            {
                "name": "福星",
                "url": "https://jx.popo520.cn/jiexi/?url="
            },
            {
                "name": "跟剧",
                "url": "https://www.5igen.com/dmplayer/player/?url="
            },
            {
                "name": "RDHK",
                "url": "https://jx.rdhk.net/?v="
            },
            {
                "name": "H8",
                "url": "https://www.h8jx.com/jiexi.php?url="
            },
            {
                "name": "豪华",
                "url": "https://api.lhh.la/vip/?url="
            },
            {
                "name": "黑云",
                "url": "https://jiexi.380k.com/?url="
            },
            {
                "name": "蝴蝶",
                "url": "https://api.hdworking.top/?url="
            },
            {
                "name": "IK",
                "url": "https://vip.ikjiexi.top/?url="
            },
            {
                "name": "解析la",
                "url": "https://api.jiexi.la/?url="
            },
            {
                "name": "久播",
                "url": "https://jx.jiubojx.com/vip.php?url="
            },
            {
                "name": "九八",
                "url": "https://jx.youyitv.com/?url="
            },
            {
                "name": "老板",
                "url": "https://vip.laobandq.com/jiexi.php?url="
            },
            {
                "name": "乐喵",
                "url": "https://jx.hao-zsj.cn/vip/?url="
            },
            {
                "name": "M3U8",
                "url": "https://jx.m3u8.tv/jiexi/?url="
            },
            {
                "name": "MUTV",
                "url": "https://jiexi.janan.net/jiexi/?url="
            },
            {
                "name": "明日",
                "url": "https://jx.yingxiangbao.cn/vip.php?url="
            },
            {
                "name": "磨菇",
                "url": "https://jx.wzslw.cn/?url="
            },
            {
                "name": "诺诺",
                "url": "https://www.ckmov.com/?url="
            },
            {
                "name": "诺讯",
                "url": "https://www.nxflv.com/?url="
            },
            {
                "name": "OK",
                "url": "https://okjx.cc/?url="
            },
            {
                "name": "思云",
                "url": "https://jx.ap2p.cn/?url="
            },
            {
                "name": "思古",
                "url": "https://api.sigujx.com/?url="
            },
            {
                "name": "思古2",
                "url": "https://api.bbbbbb.me/jx/?url="
            },
            {
                "name": "思古3",
                "url": "https://jsap.attakids.com/?url="
            },
            {
                "name": "tv920",
                "url": "https://api.tv920.com/vip/?url="
            },
            {
                "name": "维多",
                "url": "https://jx.ivito.cn/?url="
            },
            {
                "name": "我爱",
                "url": "https://vip.52jiexi.top/?url="
            },
            {
                "name": "无名",
                "url": "https://www.administratorw.com/video.php?url="
            },
            {
                "name": "小蒋",
                "url": "https://www.kpezp.cn/jlexi.php?url="
            },
            {
                "name": "小狼",
                "url": "https://jx.yaohuaxuan.com/?url="
            },
            {
                "name": "智能",
                "url": "https://vip.kurumit3.top/?v="
            },
            {
                "name": "星驰",
                "url": "https://vip.cjys.top/?url="
            },
            {
                "name": "星空",
                "url": "http://60jx.com/?url="
            },
            {
                "name": "月亮",
                "url": "https://api.yueliangjx.com/?url="
            },
            {
                "name": "云端",
                "url": "https://jx.ergan.top/?url="
            },
            {
                "name": "云析",
                "url": "https://jx.yparse.com/index.php?url="
            },
            {
                "name": "17云",
                "url": "https://www.1717yun.com/jx/ty.php?url="
            },
            {
                "name": "33t",
                "url": "https://www.33tn.cn/?url="
            },
            {
                "name": "41",
                "url": "https://jx.f41.cc/?url="
            },
            {
                "name": "66",
                "url": "https://api.3jx.top/vip/?url="
            },
            {
                "name": "116",
                "url": "https://jx.116kan.com/?url="
            },
            {
                "name": "200",
                "url": "https://vip.66parse.club/?url="
            },
            {
                "name": "4080",
                "url": "https://jx.urlkj.com/4080/?url="
            },
            {
                "name": "973",
                "url": "https://jx.973973.xyz/?url="
            },
            {
                "name": "8090",
                "url": "https://www.8090g.cn/?url="
            }
        ]

        video.css = () => {
            //创建主界面
            var h = document.createElement('div')

            h.style = `
            position:fixed;
            z-index:999999;
            background-color:#ccc;
            cursor:pointer;
            top:10%;
            left:0px;
            padding:5px 0px; 
            width:40px;
            `

            var h1 = document.createElement('div')
            h1.style = `
            cursor:pointer;
            width:100%;    
            text-align:center;
            font-size:12px;
            padding:10px 1px;
            color:#FFF;
            background-color:#DD001B;
            `
            h1.innerHTML = '网页内播放'
            h1.id = 'html_in'

            var h2 = document.createElement('div')
            h2.style = `
            cursor:pointer;
            width:100%;    
            text-align:center;
            font-size:12px;
            padding:10px 1px;
            color:#FFF;
            background-color:#DD001B;
            `
            h2.innerHTML = '跳过广告'
            h2.id = 'ad_out'

            document.body.appendChild(h)
            h.appendChild(h1)
            h.appendChild(h2)
        }

        video.css1 = () => {
            // 界面加入

            var h11 = document.createElement('div')
            // 放置table表
            h11.style = `
            left:40px;
            top:-20px;
            width:250px;
            height:400px;
            position:absolute;
            overflow:auto;
            `
            h11.id = 'table_out'

            var h111 = document.createElement('div')
            // table表内容位置
            h111.style = `
            width:95%;
            height:100%;
            padding-left:5px;
            overflow:auto;
            `
            h111.id = 'table_in'

            // 添加table border-spacing:5px 5px;
            var h1111 = "<table id='table1'>"

            // 添加table内容
            for (let i = 0; i < video.defaultSource.length; i++) {
                if (i % 5 == 0) {
                    h1111 += "<tr>"
                }
                h1111 += "<td data_url='" + video.defaultSource[i].url + "'>" + video.defaultSource[i].name + "</td>";
                if ((i + 1) % 5 == 0) {
                    h1111 += "</tr>"
                }
                if (i == video.defaultSource.length && (i + 1) % 5 != 0) {
                    h1111 += "</tr>"
                }
            }
            h1111 += '</table>'

            h111.innerHTML = h1111

            // 添加table中批量td的style
            var style1 = document.createElement('style')
            style1.innerHTML = `
                #table1{
                width:100%;
                border-spacing:3px;
                border-collapse:separate;
                }
                #table1 td{

                height:25px;
                color:#fff;
                font-size:12px;
                text-align:center;
                vertical-align:middle;
                cursor:pointer;
                background-color:#DD001B;
                box-shadow:2px 2px 5px #fff;
                border-radius:3px;
                }
                #table1 td:hover{
                color:#260033;
                background-color:#D6717C;
                };

                `
            document.getElementById('html_in').appendChild(h11)
            h11.appendChild(style1)
            h11.appendChild(h111)
        }

        // 视频破解方法
        video.pojie_operate = () => {

            // 设置ui
            document.getElementById('html_in').addEventListener('click', () => {
                if (document.getElementById('table_out') != null) {
                    document.getElementById('table_out').remove()
                } else {
                    video.css1()

                    // 替换原视频界面



                    document.getElementById('table_in').addEventListener('click', (event) => {

                        if (document.getElementById('play-outer') != null) {
                            document.getElementById('play-outer').remove()
                        }
                        var playHtml = `<div id='play-outer' 
                        style='width:100%;height:100%'>
                        <iframe allowtransparency=true frameborder='0' scrolling='no' 
                        allowfullscreen=true allowtransparency=true name='jx_play' 
                        style='height:100%;width:100%' 
                        id='play-iframe'></iframe></div>`

                        document.querySelector(node).innerHTML = playHtml
                        var iframeSrc = event.target.getAttribute('data_url') + window.location.href
                        document.getElementById('play-iframe').setAttribute('src', iframeSrc)
                    })
                }





            })


        }

        // 网站视频广告跳过/加速方法
        video.ad_operate = () => {
            document.getElementById('ad_out').addEventListener('click', () => {
                switch (window.location.host) {
                    case 'www.iqiyi.com':

                        //广告跳过
                        if (document.getElementsByClassName("skippable-after")[0] != null) {
                            document.getElementsByClassName("skippable-after")[0].style.display = 'block'

                            document.getElementsByClassName("skippable-after")[0].click();
                            document.getElementsByClassName("skippable-after")[0].style.display = 'none'

                        }
                        // 广告加速
                        if (document.getElementsByClassName("skippable-after")[0] == null) {

                            unsafeWindow.rate = 0;
                            unsafeWindow.Date.now = () => {
                                return new unsafeWindow.Date().getTime() + (unsafeWindow.rate += 900);
                            }
                            setInterval(() => {
                                unsafeWindow.rate = 0;
                            }, 6000);

                        }

                        if (document.getElementsByClassName("qy-player-vippay-popup")[0] != null) {
                            document.getElementsByClassName("qy-player-vippay-popup")[0].style.display = "none";
                        }
                        if (document.getElementsByClassName("black-screen")[0] != null) {
                            document.getElementsByClassName("black-screen")[0].style.display = "none";
                        }

                        break;

                    case 'v.qq.com':
                        //广告加速
                        var qq_ad = document.querySelectorAll('.txp_ad > txpdiv > video')
                        var qq_ad_interval = setInterval(() => {
                            if (document.getElementsByClassName('txp_ad')[0].getElementsByTagName('video') == null) {

                                clearInterval(qq_ad_interval)
                            }
                            qq_ad[0].currentTime = 1000
                            qq_ad[1].currentTime = 1000


                        }, 500)
                        break;

                    case 'v.youku.com':
                        try {

                            if (!document.getElementsByTagName('video')[0]) {
                                setInterval(() => {
                                    document.getElementsByTagName('video')[1].playbackRate = 16;
                                }, 100)

                            }
                            var H5 = document.querySelector(".h5-ext-layer > div")
                            var control_btn_play = document.querySelector(".control-left-grid .control-play-icon");
                            if (H5.length != 0) {
                                H5.remove();
                                if (control_btn_play.getAttribute("data-tip") == "播放") {
                                    document.getElementsByClassName("h5player-dashboard")[0].style.display = "block";
                                    control_btn_play.click();
                                    document.getElementsByClassName("h5player-dashboard")[0].style.display = "none";
                                }
                            }
                            document.getElementsByClassName("information-tips")[0].style.display = "none";

                        } catch (e) { }
                        break;

                    case 'tv.sohu.com':
                        try {
                            document.getElementsByClassName("x-video-adv")[0].style.display = "none";
                            document.getElementsByClassName("x-player-mask")[0].style.display = "none";
                            document.getElementById("player_vipTips").style.display = "none";

                        } catch (e) { }
                        break;
                }
            })
        }

        // 视频解析执行
        video.css();
        video.pojie_operate();
        video.ad_operate();
    }
})()
