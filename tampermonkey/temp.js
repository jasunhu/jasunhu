(function() {
    'use strict';
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n={};
    var rCats=[];
    switch (lang){
        case "zh-CN":
            i18n={
                fetch:"开始下载小说或其他【Ctrl+F9】",
                info:"本文是使用懒人小说下载器（DownloadAllContent）脚本下载的",
                error:"该段内容获取失败",
                downloading:"已下载完成 %s 段，剩余 %s 段<br>正在下载 %s",
                complete:"已全部下载完成，共 %s 段",
                del:"设置小说干扰码的CSS选择器",
                custom:"自定义网址下载",
                reSort:"按标题名重新排序",
                reSortUrl:"按网址重新排序（优先）",
                setting:"懒人小说下载设置"
            };
            break;
        default:
            i18n={
                fetch:"Download All Content[Ctrl+F9]",
                info:"The TXT is downloaded by 'DownloadAllContent'",
                error:"Failed in downloading current chapter",
                downloading:"%s pages are downloaded, there are still %s pages left<br>Downloading %s ......",
                complete:"Completed! The pages totalled %s",
                del:"Set css selectors for delete",
                custom:"Custom url for download",
                reSort:"Resort by titles",
                reSortUrl:"Resort by URLs (higher priority)",
                setting:"DownloadAllContent Setting"
            };
            break;
    }
    var firefox=navigator.userAgent.toLowerCase().indexOf('firefox')!=-1;
    var rocketContent,txtDownContent,txtDownWords,txtDownQuit,txtDownDivInited=false;

    function initTxtDownDiv(){
        if(txtDownDivInited)return;
        txtDownDivInited=true;
        rocketContent=document.createElement("div");
        document.body.appendChild(rocketContent);
        rocketContent.outerHTML=`
        <div id="txtDownContent" style="display: none;">
            <div style="width:360px;height:70px;position:fixed;left:50%;top:50%;margin-top:-25px;margin-left:-150px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">
                <div id="txtDownWords" style="position:absolute;width:280px;height: 50px;border: 1px solid #f3f1f1;padding: 8px;border-radius: 10px;">
                </div>
                <div id="txtDownQuit" style="width:36px;height:28px;border-radius:10px;position:absolute;right:2px;top:2px;cursor: pointer;background-color:#ff5a5a;">
                    <span style="height:28px;line-height:28px;display:block;color:#FFF;text-align:center;font-size:20px;">╳</span>
                </div>
                <div style="position:absolute;right:2px;bottom:2px;cursor: pointer;">
                    <button id="tempSaveTxt" style="background: #008aff;border: 0;padding: 5px;border-radius: 10px;color: white;">保存</button>
                </div>
            </div>
        </div>`;
        txtDownContent=document.querySelector("#txtDownContent");
        txtDownWords=document.querySelector("#txtDownWords");
        txtDownQuit=document.querySelector("#txtDownQuit");
        txtDownQuit.onclick=function(){
            txtDownContent.style.display="none";
            txtDownContent.parentNode.removeChild(txtDownContent);
        };
        initTempSave();
    }

    function initTempSave(){
        var tempSavebtn = document.getElementById('tempSaveTxt');
        tempSavebtn.onclick = function(){
            var blob = new Blob([i18n.info+"\r\n"+document.title+"\r\n\r\n"+rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title+".txt");
        }
    }

    function indexDownload(aEles){
        if(aEles.length<1)return;
        initTxtDownDiv();
        // var j=0,rCats=[];
        var j=0;
        function getDocEle(str){
            var doc = null;
            try {
                doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = str;
            }
            catch (e) {
                console.log('parse error');
            }
            return doc;
        }
        function processDoc(i, aTag, doc){
            j++;
            rCats[i]=(aTag.innerText+"\r\n"+getPageContent(doc));
            txtDownContent.style.display="block";
            txtDownWords.innerHTML=getI18n("downloading",[j,(aEles.length-j),aTag.innerText]);
            if(j==aEles.length){
                txtDownWords.innerHTML=getI18n("complete",[j]);
                var blob = new Blob([i18n.info+"\r\n"+document.title+"\r\n\r\n"+rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
                saveAs(blob, document.title+".txt");
            }
        }
        for(let i=0;i<aEles.length;i++){
            let aTag=aEles[i];
            GM_xmlhttpRequest({
                method: 'GET',
                url: aTag.href,
                overrideMimeType:"text/html;charset="+document.charset,
                onload: function(result) {
                    var doc = getDocEle(result.responseText);
                    processDoc(i, aTag, doc);
                }
            });
        }
    }

    function getPageContent(doc){
        if(!doc)return i18n.error;
        if(doc.defaultView)
        [].forEach.call(doc.querySelectorAll("span,div"),function(item){
            var thisStyle=doc.defaultView.getComputedStyle(item);
            if(thisStyle && (thisStyle.display=="none"||thisStyle.fontSize=="0px"))
                item.parentNode.removeChild(item);
        });
        var i,j,k,rStr="",pageData=(doc.body?doc.body:doc).cloneNode(true),delList=[];
        [].forEach.call(pageData.querySelectorAll("font.jammer"),function(item){
            item.parentNode.removeChild(item);
        });
        var selectors=GM_getValue("selectors");
        if(selectors){
            [].forEach.call(pageData.querySelectorAll(selectors),function(item){
                item.parentNode.removeChild(item);
            });
        }
        [].forEach.call(pageData.querySelectorAll("script,style,link,img,noscript,iframe"),function(item){delList.push(item);});
        [].forEach.call(delList,function(item){item.parentNode.removeChild(item);});
        var largestContent,contents=pageData.querySelectorAll("span,div,article,p,td"),largestNum=0;
        for(i=0;i<contents.length;i++){
            let content=contents[i],hasText=false,allSingle=true,item,curNum=0;
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==3){
                    if(/^\s*$/.test(item.data))
                        item.parentNode.removeChild(item);
                    else hasText=true;
                }else if(/^(I|A|STRONG|B|FONT|P|DL|DD|H\d)$/.test(item.tagName))hasText=true;
            }
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==1 && !/^(I|A|STRONG|B|FONT|BR)$/.test(item.tagName) && /^\s*$/.test(item.innerHTML))
                    item.parentNode.removeChild(item);
            }
            if(content.childNodes.length>1){
                for(j=0;j<content.childNodes.length;j++){
                    item=content.childNodes[j];
                    if(item.nodeType==1){
                         for(k=0;k<item.childNodes.length;k++){
                             var childNode=item.childNodes[k];
                             if(childNode.nodeType!=3 && !/^(I|A|STRONG|B|FONT|BR)$/.test(childNode.tagName)){
                                 allSingle=false;
                                 break;
                             }
                         }
                        if(!allSingle)break;
                    }
                }
            }else{
                allSingle=false;
            }
            if(allSingle){
                curNum=(firefox?content.textContent.length:content.innerText.length);
            }else {
                if(!hasText)continue;
                if(pageData==document && content.offsetWidth<=0 && content.offsetHeight<=0)
                    continue;
                [].forEach.call(content.childNodes,function(item){
                    if(item.nodeType==3)curNum+=item.data.length;
                    else if(/^(I|A|STRONG|B|FONT|P|DL|DD|H\d)$/.test(item.tagName))curNum+=(firefox?item.textContent.length:item.innerText.length);
                });
            }
            if(curNum>largestNum){
                largestNum=curNum;
                largestContent=content;
            }
        }
        if(!largestContent)return i18n.error;
        var childlist=pageData.querySelectorAll(largestContent.tagName);//+(largestContent.className?"."+largestContent.className.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g, '.'):""));
        function getRightStr(ele, noTextEnable){
            let childNodes=ele.childNodes,cStr="\r\n",hasText=false;
            for(let j=0;j<childNodes.length;j++){
                let childNode=childNodes[j];
                if(childNode.nodeType==3 && childNode.data && !/^\s*$/.test(childNode.data))hasText=true;
                if(childNode.innerHTML){
                    childNode.innerHTML=childNode.innerHTML.replace(/\<\s*br\s*\>/gi,"\r\n").replace(/\n+/gi,"\n").replace(/\r+/gi,"\r");
                }
                if(childNode.textContent){
                    cStr+=childNode.textContent.replace(/ +/g,"  ").replace(/([^\r]|^)\n([^\r]|$)/gi,"$1\r\n$2");
                }
                if(childNode.nodeType!=3 && !/^(I|A|STRONG|B|FONT)$/.test(childNode.tagName))cStr+="\r\n";
            }
            if(hasText || noTextEnable || ele==largestContent)rStr+=cStr+"\r\n";
        }
        for(i=0;i<childlist.length;i++){
            var child=childlist[i];
            if(getDepth(child)==getDepth(largestContent)){
                if(!largestContent.className && child.className)continue;
                if((largestContent.className && largestContent.className==child.className)||largestContent.parentNode ==child.parentNode){
                    getRightStr(child, true);
                }else {
                    getRightStr(child, false);
                }
            }
        }
        return rStr;
    }

    function getI18n(key, args){
        var resultStr=i18n[key];
        if(args && args.length>0){
            args.forEach(function(item){
                resultStr=resultStr.replace(/%s/,item);
            });
        }
        return resultStr;
    }

    function getDepth(dom){
        var pa=dom,i=0;
        while(pa.parentNode){
            pa=pa.parentNode;
            i++;
        }
        return i;
    }

    function fetch(){
        var aEles=document.querySelectorAll("a"),list=[];
        for(var i=0;i<aEles.length;i++){
            var aEle=aEles[i],has=false;
            for(var j=0;j<list.length;j++){
                if(list[j].href==aEle.href){
                    list.splice(j,1);
                    list.push(aEle);
                    has=true;
                    break;
                }
            }
            if(!has && aEle.href && /^http/i.test(aEle.href) && /PART\b|Prologue|-\d+|分卷|Chapter\s*\d+|^\s*序\s*$|序\s*言|序\s*章|前\s*言|引\s*言|引\s*子|摘\s*要|楔\s*子|契\s*子|后\s*记|後\s*記|附\s*言|结\s*语|結\s*語|最終話|最终话|[\d|〇|零|一|二|三|四|五|六|七|八|九|十|百|千|万|萬|-]+\s*(、|）|\.\D|章|节|節|回|卷|折|篇|幕|集|话|話)/i.test(aEle.innerText)){
                list.push(aEle);
            }
        }
        if(list.length>2){
            if(GM_getValue("contentSort")){
                list.sort(function(a,b){
                    return parseInt(a.innerText.replace(/[^0-9]/ig,"")) - parseInt(b.innerText.replace(/[^0-9]/ig,""));
                });
            }
            if(GM_getValue("contentSortUrl")){
                list.sort(function(a,b){
                    return parseInt(a.href.replace(/[^0-9]/ig,"")) - parseInt(b.href.replace(/[^0-9]/ig,""));
                });
            }
            indexDownload(list);
        }else{
            var blob = new Blob([i18n.info+"\r\n"+document.title+"\r\n\r\n"+getPageContent(document)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title+".txt");
        }
    }

    document.addEventListener("keydown", function(e) {
        if(e.keyCode == 120 && e.ctrlKey) {
            fetch();
        }
    });
    function setDel(){
        var selValue=GM_getValue("selectors");
        var selectors=prompt(i18n.del,selValue?selValue:"");
        GM_setValue("selectors",selectors);
        GM_setValue("contentSort",window.confirm(i18n.reSort));
        GM_setValue("contentSortUrl",window.confirm(i18n.reSortUrl));
        var urls=window.prompt(i18n.custom,"https://xxx.xxx/book-[20-99].html, https://xxx.xxx/book-[01-10].html");
        if(urls){
            var processEles=[];
            [].forEach.call(urls.split(","),function(i){
                var varNum=/\[\d+\-\d+\]/.exec(i)[0].trim();
                var num1=/\[(\d+)/.exec(varNum)[1].trim();
                var num2=/(\d+)\]/.exec(varNum)[1].trim();
                var num1Int=parseInt(num1);
                var num2Int=parseInt(num2);
                var numLen=num1.length;
                var needAdd=num1.charAt(0)=="0";
                if(num1Int>=num2Int)return;
                for(var j=num1Int;j<=num2Int;j++){
                    var urlIndex=j.toString();
                    if(needAdd){
                        while(urlIndex.length<numLen)urlIndex="0"+urlIndex;
                    }
                    var curUrl=i.replace(/\[\d+\-\d+\]/,urlIndex).trim();
                    var curEle=document.createElement("a");
                    curEle.href=curUrl;
                    processEles.push(curEle);
                    curEle.innerText=processEles.length.toString();
                }
            });
            indexDownload(processEles);
        }
    }
    GM_registerMenuCommand(i18n.fetch, fetch);
    GM_registerMenuCommand(i18n.setting, setDel);
})();
