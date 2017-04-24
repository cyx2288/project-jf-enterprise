/**
 * 左侧tab页和右侧tab标签iframe交互以及相关
 * 陈羽翔
 * 2016.9.20
 */


//嘉福判断pc浏览器模块

var getPcExplorer = {

    getExplorer: function () {
        var explorer = window.navigator.userAgent;

        if (explorer.indexOf("MSIE") >= 0) {//ie

            var browser = navigator.appName;
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            var trim_Version = version[1].replace(/[ ]/g, "");

            if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
                return "IE 6.0"
            }
            else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
                return "IE 7.0"
            }
            else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
                return "IE 8.0"
            }
            else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
                return "IE 9.0"
            }
            else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE10.0") {
                return "IE 10.0"
            }
            else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE11.0") {
                return "IE 11.0"
            }
            else {
                return "IE"
            }
        }

        else if (explorer.indexOf("Firefox") >= 0) {//firefox
            return "Firefox"
        }

        else if (explorer.indexOf("Chrome") >= 0) {//Chrome
            return "Chrome";
        }

        else if (explorer.indexOf("Opera") >= 0) {//Opera
            return "Opera";
        }

        else if (explorer.indexOf("Safari") >= 0) {//Safari
            return "Safari";
        }
    },

    isPC: function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

};

void function () {

    var clickTab = document.getElementById('accordion1').getElementsByClassName('panel-body');                           //右侧所有tab
    var tabView = document.getElementById('iframeNavdiv');                                                                //上部tab
    var iframeUrl = document.getElementById('iframeTt');                                                                 //iframe父元素
    var tabPositoin = 0;                                                                                                   //tab相对位置


    for (var i = 0; i < clickTab.length; i++) {                                                                          //批量加监听点击事件
        clickTab[i].addEventListener("click", clickTabChange, false);
    }

    document.getElementById('closs_all_tabs').addEventListener("click", clickCloseAll, false);


    //--------------------------------------------------------------------------------------------------------------------关闭所有tab选项---------------
    function clickCloseAll(event) {
        var closeEle = document.getElementById('iframeNavdiv').getElementsByTagName('span');

        for (var i = closeEle.length - 1; i >= 1; i--) {
            if (closeEle[i].className != 'sp_display')
                deleteTab(closeEle[i],event);
        }
        changeTabPositon(-9999, 300);

    }


    /*---------------------------------------------------------------------------------------------------------------------点击事件----------------------
     * */
    function clickTabChange() {
        var clickTabSelect = document.getElementById('accordion1').getElementsByClassName('panel-select');               //左侧选中的tab
        clickTabSelect[0].className = 'panel-body';                                                                       //原有的去掉样式
        this.className = 'panel-body panel-select';                                                                       //选中的增加样式

        var tabViewOne = tabView.childNodes;                                                                              //右侧iframe的tab
        var pdType = 0;                                                                                                   //开关

        for (var ii = 0; ii < tabViewOne.length; ii++)                                                                   //查找点击的元素是否已经存在
        {

            if (this.innerHTML.indexOf('首页') >= 0)                                                                    //是否是首页
            {
                pdType = 1;                                                                                              //存在就开
                break;
            }

            else if (tabViewOne[ii].nodeType == 1 && tabViewOne[ii].className.indexOf('other_raw') < 0)                //是否是标签元素 是否是浮动元素
            {
                if (tabViewOne[ii].title == this.innerHTML)                                                             //判断此元素是否已经存在
                {
                    pdType = 1;                                                                                           //存在就开
                    break;
                }
            }

        }

        if (pdType) {                                                                                                    //存在发生的事件

            clearTabClass();                                                                                              //清除上侧选中样式
            tabViewOne[ii].className = 'sp_display';                                                                      //选中样式添加
            rightIframeHide(this.innerHTML);                                                                             //关闭所有的div

            hasTabChangePosition(tabViewOne[ii]);                                                                         //移动元素

        }

        else {                                                                                                           //不存在发生的事件

            /*-----------------------------------------------------------------------------------------------------------上侧tab----------------------------
             * */
            clearTabClass();                                                                                             //清除上侧选中样式
            var newEle = addElement('span', '', '', this.innerHTML, 'iframeNavdiv', '');
            newEle.innerHTML = this.innerHTML + '<i></i>';                                                               //不存在时增加一个span
            setTimeout(function () {
                newEle.className = 'sp_display';
            }, 10);


            changeTabPositon(-9999, 300);                                                                                //因为添加新元素，改变tab位置，向右移动


            /*--------------------------------------------------------------------------------------------------------------增加监听------------------------
             点击icon删除该父节点*/

            newEle.getElementsByTagName('i')[0].addEventListener('click', deleteTabIcon, false);

            function deleteTabIcon(event) {

                var farEle = this.parentNode;                                                                             //需要操作的元素


                if (this.parentNode.className == 'sp_display') {                                                       //如果删除的是选中元素
                    var farBroEle = farEle.previousSibling;
                    clearTabClass();                                                                                     //清除上侧选中样式
                    farBroEle.className = 'sp_display';                                                                  //如果删除正在选中的tab 上一个节点选中
                    rightIframeHide(farBroEle.title, 0);                                                                 //如果删除正在选中的tab 选中该对应的iframe

                    deleteTab(farEle,event);                                                                                          //删除元素

                    hasTabChangePosition(farBroEle);                                                                     //如果删除正在选中的tab 定位在前一个
                    rtabToLtab(farBroEle);                                                                                   //反向选中

                }

                else {                                                                                                  //如果删除的不是选中元素

                    deleteTab(farEle,event);                                                                                         //删除元素

                    var lastChildTar = tabView.lastChild;
                    var fatherWidth = document.getElementById('iframeNavFather').offsetWidth;
                    var bottomRightPosition = lastChildTar.offsetWidth + lastChildTar.offsetLeft;

                    setTimeout(function () {

                        if (bottomRightPosition > fatherWidth && (fatherWidth - bottomRightPosition) > tabPositoin) {
                            hasTabChangePosition(tabView.getElementsByClassName('sp_display')[0]);
                        }
                        else if (bottomRightPosition <= fatherWidth) {
                            changeTabPositon(-9999, 300);                                                               //如果删除后显示宽度小于div宽度 则自动顶到头
                        }

                    }, 100);
                }


            }



            /*------------------------------------------------------------------------------------------------------------增加监听
             *                                                                                                             点击切换tab 切换iframe */

            newEle.addEventListener('click', changeTabSelect, false);


            /*-----------------------------------------------------------------------------------------------------------右侧iframe*/
            rightIframeHide(0, 0);
            var newIframe = addElement('div', '', '', this.innerHTML, 'iframeTt', '');                                  //添加新元素
            var iframeUrlGet = this.attributes['taburl'].nodeValue;                                                     //获取自定义属性的地址
            newIframe.innerHTML = '<iframe scrolling="auto" frameborder="0" src="' + iframeUrlGet + '"></iframe>';        //增加一个iframe


            newIframe.className = 'transtion_move';                                                                      //过度动画
            newIframe.getElementsByTagName('iframe')[0].src = iframeUrlGet;                                              //强制刷新iframe
            setTimeout(function () {
                newIframe.className = '';
            }, 100)

        }

    }

    tabView.firstChild.addEventListener('click', changeTabSelect, false);                                              //增加第一个首页的监听

    document.getElementById('jf_company_name').addEventListener('click', function () {                                  //增加tab上方的点击事件，回到首页
        tabView.firstChild.click();
    }, false);


    //------------------------------------------------------------------------------------------------------------------选中一个tab方法
    function changeTabSelect() {
        clearTabClass();                                                                                                //清除上侧选中样式
        this.className = 'sp_display';                                                                                 //这个节点选中
        rightIframeHide(this.title, 0);                                                                                //选中该iframe

        rtabToLtab(this);                                                                                              //反向选中

    }


    //--------------------------------------------------------------------------------------------------------------------反向选中

    function rtabToLtab(thisEle) {

        selectLeftTab(thisEle.title);                                                                                     //选中的该文案

    }




    //-------------------------------------------------------------------------------------------------------------------删除tab方法，删除改元素，删除对应的iframe，防止事件冒泡
    function deleteTab(thisEle,event) {
        removeElement(thisEle);                                                                                          //删除该节点
        rightIframeHide(thisEle.title, 1);                                                                               //删除该iframe
        stopPro(event);                                                                                                       //防止事件冒泡
    }


    //-------------------------------------------------------------------------------------------------------------------已存在的元素，移动至居中位置.

    //参数为移动的元素
    function hasTabChangePosition(thisEle) {

        var tabWidth = thisEle.offsetWidth;                                                                              //该tab宽度

        var tabLeft = thisEle.offsetLeft;                                                                               //该tab离左边的距离

        var faWidth = parseInt(document.getElementById('iframeNavFather').style.width);                                  //父元素的宽度；


        var pointPosition = tabLeft - (faWidth - tabWidth) / 2;                                                         //最终位置

        var reletivePosition = 0 - tabPositoin - pointPosition;                                                         //位移位置


        changeTabPositon(reletivePosition, 500);                                                                         //导入位移函数

    }


    //-------------------------------------------------------------------------------------------------------------------防止事件冒泡
    function stopPro(e) {
       // window.event ? window.event.cancelBubble = true : e.stopPropagation();
        if (e) //停止事件冒泡
            e.stopPropagation();
        else
            window.event.cancelBubble = true;
    }

    //-------------------------------------------------------------------------------------------------------------------清除iframe上面tab的选择状态
    function clearTabClass() {
        var changeEleClassName = document.getElementById('iframeNav').getElementsByClassName('sp_display')[0];           //删除原来的样式

        changeEleClassName.className = changeEleClassName.className.replace("sp_display", "");

    }

    //--------------------------------------------------------------------------------------------------------------------隐藏其他所有右侧iframe。
    // 参数可以保留那个title的div不隐藏,参数二可以选择删除该iframe
    function rightIframeHide(titleChange, isdeleteele) {
        var iframeViewOne = iframeUrl.childNodes;
        for (var j = 0; j < iframeViewOne.length; j++) {

            if (iframeViewOne[j].nodeType == 1 && iframeViewOne[j].tagName == 'DIV') {

                if (titleChange && iframeViewOne[j].title == titleChange)                                               //判断参数
                {
                    if (isdeleteele) {
                        removeElement(iframeViewOne[j]);
                    }
                    else {
                        iframeViewOne[j].style.display = 'block';

                        iframeViewOne[j].className = 'transtion_move';


                        if( iframeViewOne[j].title=='首页') {                                                           //首页的话会刷新

                            var thisIframeSrc = iframeViewOne[j].getElementsByTagName('iframe')[0].src;

                            iframeViewOne[j].getElementsByTagName('iframe')[0].src = thisIframeSrc;

                        }

                        var thisIframe = iframeViewOne[j];                                                                 //把当前的元素带进去

                        setTimeout(function () {
                            thisIframe.className = '';

                        }, 100)
                    }
                }

                else if (!isdeleteele)                                                                                  //关闭
                {
                    iframeViewOne[j].style.display = 'none';
                }

            }

        }
    }

    //-------------------------------------------------------------------------------------------------------------------删除节点
    //参数为该节点
    function removeElement(_element) {
        var _parentElement = _element.parentNode;
        if (_parentElement) {
            _parentElement.removeChild(_element);
        }
    }


    //-------------------------------------------------------------------------------------------------------------------增加元素的方法
    //参数分别为标签的属性值
    function addElement(tag, type, id, titlename, fatherEle, classname) {
        var obj = document.createElement(tag);
        if (type) {
            obj.type = type;
        }
        if (id) {
            obj.id = id;
        }
        if (classname) {
            obj.className = classname;
        }
        if (titlename) {
            obj.title = titlename;
        }
        //增加的位置
        if (fatherEle == 'document.body') {
            document.body.appendChild(obj);
        }
        else if (fatherEle) {
            document.getElementById(fatherEle).appendChild(obj);
        }

        return obj;                                                                                                     //返回增加的这个元素
    }

    //-------------------------------------------------------------------------------------------------------------------获取css样式
    //参数分别为对象元素和对应的属性值
    function getStyle(obj, attr) {
        var ie = !+"\v1";                                                                                               //简单判断ie6~8
        if (attr == "backgroundPosition") {                                                                             //IE6~8不兼容backgroundPosition写法，识别backgroundPositionX/Y
            if (ie) {
                return obj.currentStyle.backgroundPositionX + " " + obj.currentStyle.backgroundPositionY;
            }
        }
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        else {
            return document.defaultView.getComputedStyle(obj, null)[attr];
        }
    }

    //------------------------------------------------------------------------------------------------------------------改变窗口响应
    //iframe的窗口大小
    function ReFl() {
        var x2 = '';
        var x3 = '';
        var x1 = 0;
        var windowHeight = document.body.clientHeight;
        var windowWidth = document.body.clientWidth;

        var iframeWidth = 'auto';
        if (parseInt(windowWidth) > 1024) {
            x1 = parseInt(windowHeight) - 124;
            x2 = x1 + 'px';
            x3 = x1 + 40 + 'px';


        }
        else {
            x2 = (parseInt(windowHeight) - 45) + 'px';
            x3 = 'auto';

        }

        var id = 'iframeCss';
        var s = document.getElementById(id);
        if (!s) {
            s = addElement("style", "text/css", 'iframeCss', '', 'document.body', '')
        }
        s.innerHTML = '#iframeTt iframe{height:' + x2 + '!important;}.sidebar-wrap{height:' + x3 + '!important;}';
    }

    ReFl();

    window.addEventListener('resize', ReFl, false);


    //-------------------------------------------------------------------------------------------------------------------tab滑块
    function changeFatherDiv() {
        var maxwidth = document.getElementById('iframeNav').offsetWidth - 130-116;
        document.getElementById('iframeNavFather').style.width = maxwidth + 'px';
    }

    changeFatherDiv();

    window.addEventListener('resize', changeFatherDiv, false);


    /*
     ---------------------------------------------------------------------------------------------------------------------改变tab位置   输入相对位置可以到达指定位置   到边界会自动停止
     参数： 移动距离 ， 过渡时间
     */
    function changeTabPositon(pxNum, timer1) {

        var targetEle = tabView;                                                                                        //变化的元素


        pxNum = parseInt(tabPositoin) + parseInt(pxNum);                                                                 //左边位置相加  =  上一次位置 + 本次位移


        var fatherWidth = document.getElementById('iframeNavFather').offsetWidth;                                        //父元素的宽度

        var lastChildTar = targetEle.lastChild;                                                                         //最后一个元素

        var bottomRightPosition = lastChildTar.offsetWidth + lastChildTar.offsetLeft;                                   //最后一个元素的右侧位置


        if (bottomRightPosition > fatherWidth) {                                                                        //判断是否激活移动

            if (pxNum <= 0 && (fatherWidth - bottomRightPosition) <= pxNum)                                              //如果在边界内 则略过 ，两部操作省为一部操作
            {
            }
            else if (pxNum > 0)                                                                                        //左侧移动边界
            {
                pxNum = 0;
            }

            else if ((fatherWidth - bottomRightPosition) > pxNum) {                                                     //右侧移动边界
                pxNum = fatherWidth - bottomRightPosition;
            }


        }

        else {
            pxNum = 0;                                                                                                   //临界位置归零，比如未填满

        }

        changePosition(timer1);                                                                                          //改变位置
        tabPositoin = pxNum;                                                                                             //存储匿名函数中全局变量，记录位置

        function changePosition(timer1) {                                                                              //改变位移位置

            targetEle.style.transform = 'translateX(' + pxNum + 'px)';                                                   //修改距离
            targetEle.style.transition = 'transform  ' + timer1 + 'ms';                                                  //平滑过渡

            setTimeout(function ()                                                                                     //删除平滑过渡
            {
                targetEle.style.transition = '';
            }, parseInt(timer1));

        }


    }

    document.getElementById('turnLeft').addEventListener('click', function () {
            changeTabPositon(parseInt(document.getElementById('iframeNavFather').style.width) / 2, 300);                 //只移动父元素的一半宽度
        }
        , false);

    document.getElementById('turnRight').addEventListener('click', function () {
            changeTabPositon((0 - parseInt(document.getElementById('iframeNavFather').style.width) / 2), 300);           //只移动父元素一半宽度
        }
        , false);


    //点击小按钮
    document.getElementById('overviewSidebarTrigger').addEventListener('click', clickSidebarTriggerAll, false);

    function clickSidebarTriggerAll() {

        clickSidebarTrigger();

        setTimeout(function () {

            document.getElementsByTagName('footer')[0].addEventListener('click', clickSidebarTrigger, false);
            document.getElementsByTagName('nav')[0].addEventListener('click', clickSidebarTrigger, false);
            document.getElementById('bg-overview').addEventListener('click', clickSidebarTrigger, false);

            var thisEle = document.getElementById('accordion').getElementsByClassName('panel-collapse');
            for (var i = 0; i < thisEle.length; i++) {
                thisEle[i].addEventListener('click', clickSidebarTrigger, false);
            }

        }, 100);


    }

    //-------------------------------------------------------------------------------------------------------------------箭头变化和左tab弹出js 移动端使用
    function clickSidebarTrigger() {

        var thisEle = document.getElementById('overviewSidebarTrigger').getElementsByTagName('span')[0];

        var thisEleClassName = thisEle.className;

        if (thisEleClassName == 'material-design-hamburger__layer') {//初始状态-箭头

            thisEle.className = thisEleClassName + ' material-design-hamburger__icon--to-arrow';

            document.getElementById('overviewSidebar').style.transform = 'translateX(0px)';

            document.getElementById('bg-overview').style.display = 'block';

            setTimeout(function () {
                document.getElementById('bg-overview').className = 'show';
            }, 10);


        }

        else if (thisEleClassName.indexOf('material-design-hamburger__icon--to-arrow') > 0) {                          //箭头-长条

            thisEle.className = thisEleClassName.replace('material-design-hamburger__icon--to-arrow', 'material-design-hamburger__icon--from-arrow');

            document.getElementById('overviewSidebar').style.transform = '';

            document.getElementById('bg-overview').className = '';

            document.getElementById("bg-overview").addEventListener("transitionend", myTraFunction);
            document.getElementById("bg-overview").addEventListener("webkitTransitionEnd", myTraFunction);


            function myTraFunction() {
                document.getElementById('bg-overview').style.display = '';


                document.getElementsByTagName('footer')[0].removeEventListener('click', clickSidebarTrigger, false);
                document.getElementsByTagName('nav')[0].removeEventListener('click', clickSidebarTrigger, false);
                document.getElementById('bg-overview').removeEventListener('click', clickSidebarTrigger, false);
                document.getElementById("bg-overview").removeEventListener("webkitTransitionEnd", myTraFunction);
                document.getElementById("bg-overview").removeEventListener("transitionend", myTraFunction);


                var thisEle = document.getElementById('accordion').getElementsByClassName('panel-collapse');
                for (var i = 0; i < thisEle.length; i++) {
                    thisEle[i].removeEventListener('click', clickSidebarTrigger, false);
                }

            }


        }

        else if (thisEleClassName.indexOf('material-design-hamburger__icon--from-arrow') > 0) {                        //长条-箭头

            thisEle.className = thisEleClassName.replace('material-design-hamburger__icon--from-arrow', 'material-design-hamburger__icon--to-arrow');

            document.getElementById('overviewSidebar').style.transform = 'translateX(0px)';

            document.getElementById('bg-overview').style.display = 'block';

            setTimeout(function () {
                document.getElementById('bg-overview').className = 'show';
            }, 10);


        }

    }


    //--------------------------------------------------------------------------------------------------------------------解决左边点击大框太小的问题

    clickRightTab();

    function clickRightTab() {

        var thisClassEle = document.getElementById('accordion').getElementsByClassName('panel-heading');

        for (var i = 0; i < thisClassEle.length; i++) {
            thisClassEle[i].addEventListener('click', function () {
                    this.getElementsByTagName('a')[0].click();
                }
                , false);
        }

    }


//safari，window，pc的兼容性
    //嘉福判断pc浏览器模块结束
    if(getPcExplorer.isPC()&&getPcExplorer.getExplorer()=='Safari'){
        var newStyle =  addElement('style','','safari_pc','','document.body');
        newStyle.innerHTML = '.guide-overview{margin-left:0}';
    }


}();


//-----------------------------------------------------------------------------------------------------------------------通过文案，选择出右边的tab,便于iframe子页面调用
function selectLeftTab(thisTextHtml) {

    var clickTab = document.getElementById('accordion1').getElementsByClassName('panel-body');                          //右侧所有tab

    var thisIframe=document.getElementById('iframeTt').getElementsByTagName("div");                                      //获取iframe

    for (var i = 0; i < clickTab.length; i++) {

        if (clickTab[i].innerHTML == thisTextHtml) {                                                                    //判断是否选中该文案的div

            if (clickTab[i].parentNode.className.indexOf('in') < 0) {                                                   //判断是否展开
                clickTab[i].parentNode.parentNode.getElementsByTagName('h4')[0].getElementsByTagName('a')[0].click();   //模拟点击展开
            }

            clickTab[i].click();                                                                                         //模拟点击选项
            break;

        }
    }

}

/*点击页面中某个按钮实现删除*/
function deleteselectTab(thisTextHtml,event){

    var thisallEle = document.getElementById('iframeNavdiv').getElementsByTagName("span");//当前已经打开的所有网页

    for(var i=0;i<thisallEle.length;i++){

        if(thisallEle[i].getAttribute('title')==thisTextHtml){

            thisallEle[i].getElementsByTagName('i')[0].click();//找到当前下面的关闭按钮，模拟被点击

        }

    }

}


//-----------------------------------------------------------------------------------------------------------------------通过文案，选择出右边的tab,便于iframe子页面调用
function selectLeftTabone(thisTextHtml,thisUrl) {

    var clickTab = document.getElementById('accordion1').getElementsByClassName('panel-body');                          //右侧所有tab

    var thisIframe=document.getElementById('iframeTt').getElementsByTagName("div");                                      //获取iframe

    for (var i = 0; i < clickTab.length; i++) {

        if (clickTab[i].innerHTML == thisTextHtml) {                                                                    //判断是否选中该文案的div

            if (clickTab[i].parentNode.className.indexOf('in') < 0) {                                                   //判断是否展开
                clickTab[i].parentNode.parentNode.getElementsByTagName('h4')[0].getElementsByTagName('a')[0].click();   //模拟点击展开
            }

            clickTab[i].click();                                                                                         //模拟点击选项
            break;

        }
    }

    for(var j = 0; j < thisIframe.length; j++){

        if(thisIframe[j].getAttribute('title')==thisTextHtml){                                                          //判断是否等于当前title的iframe

            thisIframe[j].getElementsByTagName("iframe")[0].src=thisUrl;                                             //更改当前的地址

            break
        }

    }
}




//-----------------------------------------------------------------------------------------------------------------------嘉福客服模块
var jfCustomerService = {

    init: function (service) {//初始化

        if (!$("#MEIQIA-PANEL-HOLDER").length > 0) {


            function jfServiceSwitch(visibility) {
                if (visibility === 'visible') {
                    $('#MEIQIA-PANEL-HOLDER').removeClass('hide').addClass('show');
                    setTimeout(
                        function () {
                            $('#MEIQIA-PANEL-HOLDER').removeClass('show')
                        }
                        , 300)
                }

                else {
                    // --------------------------------------------------------------------------------------------------你可以根据自己的需求编写相应的代码
                    $('#MEIQIA-PANEL-HOLDER').addClass('hide');
                }
            }

            (function (m, ei, q, i, a, j, s) {
                m[i] = m[i] || function () {
                        (m[i].a = m[i].a || []).push(arguments)
                    };
                j = ei.createElement(q);
                s = ei.getElementsByTagName(q)[0];
                j.async = true;
                j.charset = 'UTF-8';
                j.src = '//static.meiqia.com/dist/meiqia.js';
                s.parentNode.insertBefore(j, s);
            })(window, document, 'script', '_MEIQIA');
            _MEIQIA('entId', '39750');

            // ----------------------------------------------------------------------------------------------------------在这里开启手动模式（必须紧跟美洽的嵌入代码）
            _MEIQIA('manualInit');


            // ----------------------------------------------------------------------------------------------------------你可以自己的代码中选择合适的时机来调用手动初始化
            _MEIQIA('withoutBtn');                                                                                      //不使用插件按钮
            _MEIQIA('allSet', jfServiceSwitch);                                                                         //初始设置
            _MEIQIA('getPanelVisibility', jfServiceSwitch);                                                              //改变状态后设置
            _MEIQIA('init');                                                                                             //初始化


            //-----------------------------------------------------------------------------------------------------------用户信息导入
            _MEIQIA('metadata', service);
        }
    },
    click: function () {                                                                                               //导入使用
        _MEIQIA('showPanel')
    }
};

//嘉福客服模块结束






//console.log('%c\u6b64\u6d4f\u89c8\u5668\u529f\u80fd\u4e13\u4f9b\u5f00\u53d1\u8005\u4f7f\u7528\u3002\u8bf7\u4e0d\u8981\u5728\u6b64\u7c98\u8d34\u6267\u884c\u4efb\u4f55\u5185\u5bb9\uff0c\u8fd9\u53ef\u80fd\u4f1a\u5bfc\u81f4\u60a8\u7684\u8d26\u6237\u53d7\u5230\u653b\u51fb\uff0c\u7ed9\u60a8\u5e26\u6765\u635f\u5931\u0020\uff01      \u5609\u798f\u0055\u0045\u0044\u7ec4', 'font-size:12px;color:#ff0000;');
