/**
 * Created by 陈羽翔 on 2016/12/13.
 * 企业端登录页
 */



//----------激活手机active
document.addEventListener('touchstart', function () {
}, false);


//----------固定磨砂玻璃模块
backgroundImgBlur();

window.addEventListener('resize', backgroundImgBlur, false);                                                           //在页面改变长宽的时候，激活时间

window.addEventListener('load', backgroundImgBlur, false);

function backgroundImgBlur() {

    var thisDiv = document.getElementById('background_blur').getElementsByTagName('div')[0];

    var divPositionLeft = thisDiv.offsetLeft;                                                                           //元素离左边的距离
    var divPositionTop = thisDiv.offsetTop;                                                                             //元素离上部的距离

    var imgPositionLeft;
    var imgPositionTop;

    var screenWidth = document.body.clientWidth;
    var screenHeight = document.body.clientHeight;

    var imgLargePositionLeft = (screenWidth - 2000) * .3;
    var imgLargePositionTop = (screenHeight - 1333) * .5;

    if (screenWidth >= 1400) {                                                                                            //页面宽度宽于1400px的情况

        imgPositionLeft = (screenWidth - 2000) * .3 - divPositionLeft;                                                  //计算公式： 偏移量 =（页面宽度-图片宽度）* 固定比例 - 元素本身距离左边的距离
        imgPositionTop = (screenHeight - 1333) * .3 - divPositionTop;

        imgLargePositionTop = (screenHeight - 1333) * .3;

    }

    else if (screenWidth >= 1100) {                                                                                     //页面宽度大于1100px小于1400px的情况

        imgPositionLeft = (screenWidth - 2000) * .3 - divPositionLeft;
        imgPositionTop = (screenHeight - 1333) * .5 - divPositionTop;

    }

    else if (screenWidth < 1100) {                                                                                      //页面宽度小于1100px的情况

        var thisDivPosition = thisDiv;

        if (screenWidth < 550) {                                                                                        //页面宽度小于550px的时候 固定吊牌的宽度
            var thisWidth = screenWidth * .9;
            thisDivPosition.style.width = thisWidth + 'px';                                                               //吊牌宽度等于页面宽度的90%
        }
        else {                                                                                                          //页面宽度大于550px小于1100px时 吊牌宽度为490px
            thisDivPosition.style.width = '490px';
        }

        thisDivPosition.style.left = '0px';                                                                               //定位left值，兼容性问题

        divPositionLeft = thisDivPosition.offsetLeft;                                                                      //重新计算位置
        divPositionTop = thisDivPosition.offsetTop;

        imgPositionLeft = (screenWidth - 2000) * .3 - divPositionLeft;
        imgPositionTop = (screenHeight - 1333) * .5 - divPositionTop;

    }


    thisDiv.style.backgroundPositionX = imgPositionLeft + 'px';                                                          //定位位置
    thisDiv.style.backgroundPositionY = imgPositionTop + 'px';

    
    var thisImg = document.getElementById('background_blur').getElementsByTagName('img')[0];
    thisImg.style.left = imgLargePositionLeft + 'px';                                                                    //定位位置
    thisImg.style.top = imgLargePositionTop + 'px';
}

//----------导航栏平滑过渡


window.addEventListener('load', navShow, false);                                                                        //页面加载完后，移除loadding模块

function navShow() {

    var thisNav = document.body.getElementsByTagName('nav')[0];
    var thisFooter = document.body.getElementsByTagName('footer')[0];
    var thisLoading = document.getElementById('background_init');
    setTimeout(function () {                                                                                           //整体延迟一秒

        if (thisNav && thisNav.className == 'init_nav') {                                                                          //移除导航的过渡
            setTimeout(function () {
                thisNav.className = '';
            }, 1500)
        }
        if (thisFooter && thisFooter.className == 'init_footer') {                                                                    //移除底部的过渡
            setTimeout(function () {
                thisFooter.className = '';
            }, 1500)
        }
        if (thisLoading && thisLoading.className == 'init_loading') {                                                                  //移除load模块
            thisLoading.className = '';
            document.body.scrollTop = 800;                                                                               //页面输入框默认底部
            setTimeout(function () {
                removeElement(thisLoading);                                                                              //一秒后移除loading元素
            }, 1000)
        }

    }, 500);
}

//----------删除元素方法
function removeElement(_element) {
    var _parentElement = _element.parentNode;
    if (_parentElement) {
        _parentElement.removeChild(_element);
    }
}


//----------嘉福客服模块
var jfCustomerService = {

    init: function (service) {                                                                                          //初始化


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

        // --------------------------------------------------------------------------------------------------------------在这里开启手动模式（必须紧跟美洽的嵌入代码）
        _MEIQIA('manualInit');


        // --------------------------------------------------------------------------------------------------------------你可以自己的代码中选择合适的时机来调用手动初始化
        _MEIQIA('withoutBtn');                                                                                           //不使用插件按钮
        _MEIQIA('init');                                                                                                 //初始化

        //---------------------------------------------------------------------------------------------------------------用户信息导入
        _MEIQIA('metadata', service);
        //}
    },
    click: function () {                                                                                               //导入使用
        _MEIQIA('showPanel')
    }
};

//----------嘉福客服模块结束


//----------追踪鼠标事件

void function () {


    var isMouseStart = -1000;                                                                                               //判断是否是第一步 第一次移动

    var isMouseMove = false;                                                                                               //控制每100毫秒触发一次

    var isMouseDelay = true;                                                                                               //控制是否进入setTimeout事件

    var thisDiv = document.getElementById('background_blur').getElementsByTagName('div')[0];

    var thisImg = document.getElementById('background_blur').getElementsByTagName('img')[0];

    document.addEventListener('mousemove', function (event) {

        if (isMouseStart == -1000) {                                                                                        //第一次移动时，保存这次鼠标位置，下次调用

            isMouseStart = event.pageX;

            thisImg.style.transform = 'translateX(0px)';

        }

        else if (!isMouseMove) {                                                                                           //每一百毫秒才跳过一次

            if (isMouseDelay) {

                setTimeout(function () {

                    isMouseMove = true;

                }, 100);

                isMouseDelay = false;
            }
        }

        else {                                                                                                              //正常执行的方法

            var thisPositionLeft = event.pageX;                                                                             //记录本次鼠标的位置

            var thisPositionLast = (isMouseStart - thisPositionLeft) / 140;                                                 // 修改的位置  =  -（本次位置-上次位置）/140

            var thisDisLeft0 = thisImg.style.transform;                                                                  // 获取本次已经位移的位置

            var thisDisLeft1 = thisDiv.style.backgroundPositionX;                                                       //获取玻璃背景位移的位置

            thisDisLeft0 = parseFloat(thisDisLeft0.substring(11, thisDisLeft0.length - 3));

            thisDisLeft1 = parseFloat(thisDisLeft1.substring(0, thisDisLeft1.length - 2));

            thisImg.style.transform = 'translateX(' + (thisDisLeft0 + thisPositionLast) + 'px)';

            thisDiv.style.backgroundPositionX = (thisDisLeft1 + thisPositionLast / 4) + 'px';

            isMouseStart = event.pageX;                                                                                     //记录本次位置，下次调用使用

            isMouseMove = false;                                                                                             //关闭，一百豪秒后打开

            isMouseDelay = true;
        }

    }, false);

}();


//----------追踪输入框是否有文案

window.addEventListener('load', inputInitChange, false);

function inputInitChange() {

    var thisInput = document.body.getElementsByTagName('section')[0].getElementsByClassName('section_middle_input')[0].getElementsByTagName('input');

    for (var i = 0; i < thisInput.length; i++) {

        if (thisInput[i].type != 'button') {                                                                            //检查是不是非按钮元素

            inputChangeText();

            thisInput[i].addEventListener('blur', inputChangeText, false);

            function inputChangeText() {                                                                               //如果输入后，value有值，则改变样式

                if (this.value || this.value != '') {
                    this.className = 'has_text'
                }
                else {
                    this.removeAttribute('class');
                }
            }
        }

    }
}

function logonInputHasError(thisEle, errorText) {                                                                       //报错方法 参数一为报错的input元素， 参数二为报错的文案
    thisEle.className = 'has_error';
    var tatalEle = thisEle.nextSibling;
    for (var i = 0; i < 1000; i++) {
        if (tatalEle.className && tatalEle.className.indexOf('input_text_switch') > -1 && tatalEle.className.indexOf('red') > -1) {
            tatalEle.innerHTML = errorText;
        }
        else {
            tatalEle = tatalEle.nextSibling;
        }
    }
}


window.addEventListener('load', iosInputPosition, false);

function iosInputPosition() {                                                                                          //解决ios系统input组件错位问题

    var userAgentInfo = navigator.userAgent;

    if (userAgentInfo.indexOf('iPhone') > -1 || userAgentInfo.indexOf('iPad') > -1) {

        var obj = document.createElement('style');
        obj.type = 'text/css';
        obj.innerHTML = '@media screen and (max-width: 1100px){section .section_middle_input input[type=text], section .section_middle_input input[type=password]{margin-top:8px}}';
        document.body.appendChild(obj);
    }

}
//-------------------input无值状态登录按钮为disabled
function logonInputDisabled () {

    var thisInput = document.getElementsByTagName('input');

    for (var i = 0; i < thisInput.length; i++) {

        if (thisInput[i].type == 'text') {

            thisInput[i].addEventListener('input', judgeInputValue, false);

            thisInput[i].addEventListener('propertychange', judgeInputValue, false); //兼容ie
        }
    }
    function judgeInputValue() {

        var isTrue = false;

        for (var i = 0; i < thisInput.length; i++) {

            if (thisInput[i].type == 'text') {

                if (!thisInput[i].value) {

                    isTrue = false;

                    break;//退出循环
                }
                else {

                    isTrue = true;

                }
            }
        }

        if (isTrue) {

            document.getElementsByClassName('login_button')[0].removeAttribute('disabled')
        }
        else {

            document.getElementsByClassName('login_button')[0].setAttribute('disabled', 'disabled')
        }
    }

}

// --------------------------------模态框咿呀咿呀------------------------------------------------------------------------

//输入报错验证
$(".input_valiate").on({

    //-----------change事件出现提示信息
    change: function () {

        jfValidateInput.validateWrong(this, '输入错误');//参数一为选取的该元素，参数二为出现的提示信息
    },

    //-----------再次焦点事件提示信息删除
    focus: function () {
        jfValidateInput.validateRemove(this);//参数为选取的该元素
    }
});

//-----------------------密码验证(第一次新密码)
$("input.new_password").each(function () {

    $(this).on({

        //---------密码验证条出现以及识别当前密码强度
        focus: function () {

            jfPasdValidateshow(this);                                                                                   //参数表示选择的该元素

            jfPasdValidate(this);                                                                                       //参数表示选择的该元素
        },

        //----------密码强度
        keyup: function () {
            jfPasdValidate(this);                                                                                       //参数表示选择的该元素
        },

        //--------密码强度移除
        blur: function () {
            PasdValidateRemove(this);                                                                                   //参数表示选择的该元素
        }
    })
});
//---------------------------密码强度验证事件

//----------------------------focus事件，添加验证条
function jfPasdValidateshow(obj) {                                                                                      //--------------------参数为当前元素

    var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";

    $(obj).parent().append(pasdinput);

}

//-----------------------------keyup事件验证密码强度
function jfPasdValidate(obj) {                                                                                         //--------------------参数为当前元素

    var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");
    var mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");


    var farEle = $('span.pasdbar00');
    var textEle = $('span.pasdtext00');
    var thisInputPassword = $(obj);

    if (!thisInputPassword.val() || thisInputPassword.val().length < 6 || thisInputPassword.val().length > 20) {
        textEle.text('密码长度需6-20位英文字母和数字');
        farEle.removeClass('barstyong').removeClass('barmid').removeClass('barweak');
    }
    else if (strongRegex.test(thisInputPassword.val())) {//密码为8位及以上并且字母数字特殊字符三项都包括,强度最强
        textEle.addClass('textstrong').text('密码强度：高').removeClass('textmid').removeClass('textweak');
        farEle.addClass('barstyong').removeClass('barmid').removeClass('barweak');
    }
    else if (mediumRegex.test(thisInputPassword.val())) { //密码为8位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
        textEle.addClass('textmid').text('密码强度：中');
        farEle.addClass('barmid').removeClass('barstyong').removeClass('barweak');
    }
    else {  //如果密码为8位，就算字母、数字、特殊字符三项都包括，强度也是弱的
        textEle.addClass('textweak').text('密码强度：弱');
        farEle.addClass('barweak').removeClass('barmid');
    }

    return true;

}

//---------------------------------------失焦事件移除密码验证条
function PasdValidateRemove(obj) {//--------------------参数为当前元素

    var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";
    $(obj).siblings(".validatepasd").remove()

}

//-----------点击时获取短信验证码
function getMessage(obj,limitTime,fontColor,paddingStyle) {                                                                              //参数一为选取的该元素，参数二是限制的时间范围

    var countdown = limitTime;
    var color1 = fontColor;
    var a = paddingStyle;
    settime();
    function settime() {
        var timer;
        if (countdown == 0) {
            $(obj).attr("disabled", false).css("color", "color1");
            $(obj).text('点击发送');
            countdown = limitTime;
            return;
        } else {
            $(obj).attr("disabled", "true").css({"color": "#ababab", "padding": "a"});
            $(obj).text('重新发送' + '(' + countdown + ')').css('cursor', 'not-allowed');
            countdown--;
        }
        timer = setTimeout(function () {
                settime()
            }
            , 1000)
    }
}

//--------------------------------------文本框输入验证事件
var jfValidateInput = {

//----------------------------------------change事件输入报错提示
    validateWrong: function (obj, textWrong) {//参数一为选取的该元素，参数二为出现的提示信息

        var redWrong = '<span style="color:red;display: block;" class="validatepp"><span class="validate_wrong">×</span> <span style="width:60px;display: inline">' + textWrong + '</span></span>';
        $(obj).parent().append(redWrong);

    },
//--------------------------------------change事件输入正确提示
    validateRight: function (obj, textRight) {//参数一为选取的该元素，参数二为出现的提示信息

        var greenRight = '<span style="color:green;display: block;" class="validatepp"><span class="validate_right">√</span> <span style="width:60px;display: inline">' + textRight + '</span></span>';
        $(obj).parent().append(greenRight);

    },
//------------------------------------focus事件移除输入验证信息
    validateRemove: function (obj) {//参数一为选取的该元素

        $(obj).siblings(".validatepp").remove();
        
    }
};

// --------------------------------模态框结束------------------------------------------------------------------------


//-------------------input无值状态登录按钮为disabled
function confirmInputDisabled() {

    var thisInputPassword = document.getElementById('password_input');

    thisInputPassword.addEventListener('input', judgeInputPasswordValue, false);

    thisInputPassword.addEventListener('propertychange', judgeInputPasswordValue, false); //兼容ie

    function judgeInputPasswordValue() {

        if (thisInputPassword.value != '') {

            document.getElementsByClassName('login_button')[0].removeAttribute('disabled')

        }
        else {

            document.getElementsByClassName('login_button')[0].setAttribute('disabled', 'disabled')

        }
    }
}
