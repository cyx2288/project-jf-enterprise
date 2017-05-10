/**
 * Created by Qiaodan on 2016/10/21.
 */


    $(document).ready(function parentGoTop() {
        parent.scrollTo(0, 0);
    });



//select标签兼容性解决
$(document).ready(function(){

    var selectEle=$('select');

    var selectchoose='<span>▼</span>';

    selectEle.parent().addClass('select-input');

    selectEle.parent().append(selectchoose);

    selectEle.addClass('form-control-selectinput');
})

    //-----------点击时获取短信验证码
    function getmessage(obj,limitTime) {//参数一为选取的该元素，参数二是限制的时间范围

        var countdown = limitTime;
        settime();
        function settime() {
            var timer;
            if (countdown == 0) {
                $(obj).attr("disabled", false).css("color", "black");
                $(obj).text('点击发送');
                countdown = limitTime;
                return;
            } else {
                $(obj).attr("disabled", "true").css({"color": "white", "padding": "6px 0"});
                $(obj).text('重新发送' + '(' + countdown + ')');
                countdown--;
            }
            timer = setTimeout(function () {
                    settime()
                }
                , 1000)
        }
    }


   //分页点击事件
   function jfpagechange(obj){//参数为选择的当前元素

    var thispagenum=$(obj).text();

    var thisactivediv=$('.active');

    var thispagediv=$('.pagination');

    thisactivediv.removeClass('active');
    $(obj).addClass('active');

    if(thispagenum==1){//如果选择第一页，返回上一页不能选

        thispagediv.find('li:first').addClass('disabled')

    }else if(thispagenum==30){//如果选择最后一页，返继续一页不能选

        thispagediv.find('li:last').addClass('disabled')

    }else {
        thispagediv.find('li').removeClass('disabled')
    }

}



//密码强度验证事件---新版
var jfPasdShow={

    //focus事件,验证条元素出现
    jfPasdValidateshow:function(obj){//参数为当前元素
        var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";

        $(obj).parent().append(pasdinput);

    },

    //keyup事件验证密码强度
    jfPasdValidate:function (obj){//参数为当前元素

        var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";

        var strongRegex = new RegExp("^(?=.{12,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");
        var mediumRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");


        var farEle = $('span.pasdbar00');
        var textEle = $('span.pasdtext00');
        var thisInputPassword = $(obj);

        if (!thisInputPassword.val() || thisInputPassword.val().length < 6 || thisInputPassword.val().length > 20) {
            textEle.text('密码长度需6-20位大小写英文字母和数字');
            farEle.removeClass('barstyong').removeClass('barmid').removeClass('barweak');
        }
        else if (strongRegex.test(thisInputPassword.val())) {//密码为12位及以上并且大小写字母数字三项都包括,强度最强
            textEle.addClass('textstrong').text('密码强度：高').removeClass('textmid').removeClass('textweak');
            farEle.addClass('barstyong').removeClass('barmid').removeClass('barweak');
        }
        else if (mediumRegex.test(thisInputPassword.val())) { //密码为8位及以上并且大小写字母数字三项都包括，强度是中等
            textEle.addClass('textmid').text('密码强度：中');
            farEle.addClass('barmid').removeClass('barstyong').removeClass('barweak');
        }
        else if(enoughRegex.test(thisInputPassword.val())){  //如果密码为6位，并且大小写字母数字三项都包括，强度是弱的
            textEle.addClass('textweak').text('密码强度：弱');
            farEle.addClass('barweak').removeClass('barmid');
        }

        return true;
    },
    //失焦事件移除密码验证条
    PasdValidateRemove:function(obj){//参数为当前元素
        var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";
        $(obj).siblings(".validatepasd").remove()
    }



};



//密码强度验证事件
//focus事件，添加验证条
function jfPasdValidateshow(obj) {//参数为当前元素

    var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";

    $(obj).parent().append(pasdinput);

}

//keyup事件验证密码强度
function jfPasdValidate(obj) {//参数为当前元素

    var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";

    var strongRegex = new RegExp("^(?=.{12,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");
    var mediumRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");


    var farEle = $('span.pasdbar00');
    var textEle = $('span.pasdtext00');
    var thisInputPassword = $(obj);

    if (!thisInputPassword.val() || thisInputPassword.val().length < 6 || thisInputPassword.val().length > 20) {
        textEle.text('密码长度需6-20位大小写英文字母和数字');
        farEle.removeClass('barstyong').removeClass('barmid').removeClass('barweak');
    }
    else if (strongRegex.test(thisInputPassword.val())) {//密码为12位及以上并且大小写字母数字三项都包括,强度最强
        textEle.addClass('textstrong').text('密码强度：高').removeClass('textmid').removeClass('textweak');
        farEle.addClass('barstyong').removeClass('barmid').removeClass('barweak');
    }
    else if (mediumRegex.test(thisInputPassword.val())) { //密码为8位及以上并且大小写字母数字三项都包括，强度是中等
        textEle.addClass('textmid').text('密码强度：中');
        farEle.addClass('barmid').removeClass('barstyong').removeClass('barweak');
    }
    else if(enoughRegex.test(thisInputPassword.val())){  //如果密码为6位，并且大小写字母数字三项都包括，强度是弱的
        textEle.addClass('textweak').text('密码强度：弱');
        farEle.addClass('barweak').removeClass('barmid');
    }

    return true;

}

//失焦事件移除密码验证条
function PasdValidateRemove(obj) {//参数为当前元素

    var pasdinput = "<span class='validatepasd'><span class='pasdtext00'></span><span class='pasdbar00'></span></span>";
    $(obj).siblings(".validatepasd").remove()

}

//文本框输入验证事件
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

//loading，success,fail的模态框调用
    var jfModelFrame = {

        //-----------------------------loanding的模态框
        loadingModelShow: function (loadingtitle, loadingtext) {//参数一是模态框的标题，参数二是模态框的显示中间文本（成功或者失败）

            var textloading = '<div class="modal fade" id="modal_loading_frame" tabindex="-1" aria-labelledby="modal_loadingLabel" aria-hidden="true" data-backdrop="static"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title" id="modal_loadingLabel">' + loadingtitle + '</h4></div><div class="modal-body"><div class="title-success"><div class="loadEffect"><span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span></div><div class="wenan-zy">' + loadingtext + '</div></div></div></div></div></div>';

            $('body').append(textloading);

            var loading = $('#modal_loading_frame');

            setTimeout(function () {
                loading.modal({
                    'show': true,
                    'backdrop': 'static',
                    'keyboard': false
                })
            }, 300);

            windowBanEvent.bundling();

        },
        //---------------------------loanding的模态框（移除）
        loadingModelRemove: function () {

            windowBanEvent.unbundling();

            var loading = $('#modal_loading_frame');

            loading.modal('hide');
            loading.on('hidden.bs.modal', function (e) {
                loading.remove();
            });

        },

        //--------------------------success的模态框（移除）
        successModelShow: function (successtitle, successtext,contentone) {//参数一是模态框的标题，参数二是模态框的显示中间文本（成功或者失败），参数三是详细信息

            var textsuccess = '<div class="modal fade" id="modal_success_demo" tabindex="-1" aria-labelledby="modal_successLabel" aria-hidden="true" data-backdrop="static"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span></span></button><h4 class="modal-title" id="modal_successLabel">' + successtitle + '</h4></div><div class="modal-body"><div class="title-success"><div class="swal2-icon swal2-success animate"><span class="line tip animate-success-tip"></span> <span class="line long animate-success-long"></span><div class="placeholder"></div><div class="fix"></div></div><div class="wenan-zy">' + successtext + '</div><div class="details_content"><span>' + contentone + '</span></div></div><div class="modal-footer" style="text-align:center"><button type="button" class="btn btn-primary btn-primary-zy model-change1" data-dismiss="modal">确认</button> </div></div></div></div></div>';

            $('body').append(textsuccess);

            var success = $('#modal_success_demo');

            setTimeout(function () {
                success.modal({
                    'show': true,
                    'backdrop': 'static',
                    'keyboard': false
                })


            }, 300);

            success.on('hidden.bs.modal', function (e) {
                success.remove();
            });

        },

        //--------------------------------fail的模态框（移除）
        failModelShow: function (failtitle, failtext,contentone) {//参数一是模态框的标题，参数二是模态框的显示中间文本（成功或者失败），参数三是详细信息
            var textfail = '<div class="modal fade" id="modal_fail" tabindex="-1" aria-labelledby="modal_failLabel" aria-hidden="true" data-backdrop="static"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span></span></button><h4 class="modal-title" id="modal_failLabel">' + failtitle + '</h4></div><div class="modal-body"><div class="title-success"><div class="swal2-icon swal2-error animate-error-icon" style="display:block"><span class="x-mark animate-x-mark"><span class="line left"></span> <span class="line right"></span></span></div><div class="wenan-zy">' + failtext + '</div><div class="details_content"><span>' + contentone + '</span></div></div><div class="modal-footer" style="text-align:center"><button type="button" class="btn btn-primary btn-primary-zy model-change1" data-dismiss="modal">关闭</button></div></div></div></div></div>';

            $('body').append(textfail);

            var fail = $('#modal_fail');

            setTimeout(function () {
                fail.modal({
                    'show': true,
                    'backdrop': 'static',
                    'keyboard': false
                })

            }, 300);

            fail.on('hidden.bs.modal', function (e) {
                fail.remove();
            });


        }

    };
//绑定浏览器事件以及解除
    var windowBanEvent = {

        bundling: function () {
            var _self = this;
            $(window).bind('click touchstart touchmove touchend scroll keydown keypress keyup mousedown mouseup mouseover', _self.Canceling);//绑定禁止事件
        },

        unbundling: function () {
            var _self = this;
            $(window).unbind('click touchstart touchmove touchend scroll keydown keypress keyup mousedown mouseup mouseover', _self.Canceling);//解除绑定事件

        },

        Canceling: function (evt) {

            var evt = evt || window.event; //阻止事件
            if (evt.preventDefault) {
                evt.preventDefault();
                evt.stopPropagation();
            } else {
                evt.returnValue = false;
                evt.cancelBubble = true;
            }
        }

    };



//管理员信息页面手机号修改模态框(2个表格模态框)

    function twoinfoModel(modeloneid, modeloneclose, modeltwoid, modeltwoclose) {//参数一第一个模态框ID选择器，参数二第一个模态框关闭按钮选择器，参数三第二个模态框ID选择器，参数二第二个模态框关闭按钮选择器
    }

//通用文本1个模态框弹出（每个模态框内容不一样，不包括跳转结果）

    function modelInfo(modelid) {//参数一：模态框id选择器

        setTimeout(function () {
            $(modelid).modal({
                'show': true,
                'backdrop': 'static',
                'keyboard': false
            })
        }, 100);

    }


//公司基本信息页面，input输入变化的方法
function modifyNickName(buttontextone,buttontexttwo,clickbutton,changInput,showwrongtext){//参数一是按钮初始文本，参数二是文本变化文本，参数三为点击的按钮ID选择器，参数四为变化的input的class选择器，参数五是报错的文本

    var thisButton=$(clickbutton);//点击按钮

    var thisChangeInput=$(clickbutton).prev(changInput);//变化的input元素

    if(thisButton.text()==buttontextone){//如果当前文本是最初显示文本

        thisButton.css({"color": "white", "background": "#3498db"});//当前样式改变

        thisChangeInput.addClass('modifyname').removeAttr('readonly').focus();//当前input框自动处于焦点状态

        thisChangeInput[0].select();

        thisButton.text(buttontexttwo);//修改此时的文本

    }else{
        if( thisChangeInput.val()==""){//如果当前输入款为空值

            jfValidateInput.validateRemove(changInput);//如果联系点击完成，会先移除一次，

            jfValidateInput.validateWrong(changInput,showwrongtext);//调用报错方法

            thisChangeInput.focus(function(){//当input框处于焦点状态，报错消失

                jfValidateInput.validateRemove(changInput)
            })

        }else {

            thisChangeInput.removeClass('modifyname').attr('readonly','true');//移除边框，只读状态

            thisButton.css({"color": "#555", "background-color": "#eee"});//变回原来的样式

            thisButton.text(buttontextone);//文本变成最初显示文本
        }

    }
}

//---------------------------

    thisPageWidthIos();

    function thisPageWidthIos() {

        var u = navigator.userAgent;
        var iso = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        if (iso) {

            setInterval(setFarPageWidth, 200);

            function setFarPageWidth() {

                var windowWidth = $(window.parent).width();

                if (windowWidth <= 1024)

                    $('.qiao').width($(window.parent).width()-40);//iframe的宽度

                else {
                    $('.qiao').width()
                }
            }
        }

    };



/*判断输入金额的方法*/
function MoneyInputNum(obj){

    var thisInputEle=document.getElementById('money_num');

    var thisNumlength=thisInputEle.value.length;//获取当前输入金额的长度


    //输入规则
    if(thisNumlength==1&&thisInputEle.value=="."){//如果当前只输入一位，且是小数点，默认为0

        thisInputEle.value=0
    }
    else if(thisInputEle.value.indexOf('.')>-1){//小数点存在，不能有2个小数点以及小数点后面的只能有2位数

        var j=0

        for(var i=0;i<thisNumlength;i++){

            if(thisInputEle.value[i]=="."){
                j++
            }

            if(j==1){

                if(thisNumlength-i-1>2){//小数位数不能超过2位

                    jfValidateInput.validateRemove(obj);//先清空一次

                    jfValidateInput.validateWrong(obj,'小数位数不能超过2位');//参数一为选取的该元素，参数二为出现的提示信息

                    break
                }
            }
            else if(j==2)//出现2位小数点
            {
                jfValidateInput.validateRemove(obj);//先清空一次

                jfValidateInput.validateWrong(obj,'不能出现两个小数点');//参数一为选取的该元素，参数二为出现的提示信息

                break
            }
            else {
                jfValidateInput.validateRemove(obj);//清空所有
            }
        }


    }
    else if(thisNumlength==2&&thisInputEle.value[0]=="0"){//如果当前第一位是0，则第二位必须是小数点，

        thisInputEle.value="0.";//默认覆盖
    }


}



/*企业转账金额tab切换*/
$('button.transfer_out_btn').on("click",function(){

    $('button.transfer_in_btn').addClass('release_record_tabbtn1').removeClass('release_record_tabbtn11');

    $(this).addClass('release_record_tabbtn22').removeClass('release_record_tabbtn2');

    $('.transfer_out_page').css('display','block');

    $('.transfer_in_page').css('display','none')

})

$('button.transfer_in_btn').on("click",function(){

    $('button.transfer_out_btn').addClass('release_record_tabbtn2').removeClass('release_record_tabbtn22');

    $(this).addClass('release_record_tabbtn11').removeClass('release_record_tabbtn1');

    $('.transfer_out_page').css('display','none');

    $('.transfer_in_page').css('display','block')

})


/*登录注册页面js*/
function ReFl() {
    var x2 = '';
    var x3 = '';
    var x1 = 0;
    var windowHeight = document.body.clientHeight;
    var windowWidth = document.body.clientWidth;

    var iframeWidth = 'auto';
    if (parseInt(windowWidth) > 1024) {
        x1 = parseInt(windowHeight) - 124;
        x2 = x1 + 40 + 'px';
        x3=x1 + 40 + 'px'
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
    s.innerHTML = '#iframeTt iframe{height:' + x2 + '!important;}';
}

ReFl();

window.addEventListener('resize', ReFl, false);

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

//-------------------------------日历插件的JS开始


!function( $ ) {

    // Picker object

    var Datepicker = function(element, options){
        this.element = $(element);
        this.format = DPGlobal.parseFormat(options.format||this.element.data('date-format')||'mm/dd/yyyy');
        this.picker = $(DPGlobal.template)
            .appendTo('body')
            .on({
                click: $.proxy(this.click, this)//,
                //mousedown: $.proxy(this.mousedown, this)
            });
        this.isInput = this.element.is('input');
        this.component = this.element.is('.date') ? this.element.find('.add-on') : false;

        if (this.isInput) {
            this.element.on({
                focus: $.proxy(this.show, this),
                //blur: $.proxy(this.hide, this),
                keyup: $.proxy(this.update, this)
            });
        } else {
            if (this.component){
                this.component.on('click', $.proxy(this.show, this));
            } else {
                this.element.on('click', $.proxy(this.show, this));
            }
        }

        this.minViewMode = options.minViewMode||this.element.data('date-minviewmode')||0;
        if (typeof this.minViewMode === 'string') {
            switch (this.minViewMode) {
                case 'months':
                    this.minViewMode = 1;
                    break;
                case 'years':
                    this.minViewMode = 2;
                    break;
                default:
                    this.minViewMode = 0;
                    break;
            }
        }
        this.viewMode = options.viewMode||this.element.data('date-viewmode')||0;
        if (typeof this.viewMode === 'string') {
            switch (this.viewMode) {
                case 'months':
                    this.viewMode = 1;
                    break;
                case 'years':
                    this.viewMode = 2;
                    break;
                default:
                    this.viewMode = 0;
                    break;
            }
        }
        this.startViewMode = this.viewMode;
        this.weekStart = options.weekStart||this.element.data('date-weekstart')||0;
        this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
        this.onRender = options.onRender;
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
    };

    Datepicker.prototype = {
        constructor: Datepicker,

        show: function(e) {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.place();
            $(window).on('resize', $.proxy(this.place, this));
            if (e ) {
                e.stopPropagation();
                e.preventDefault();
            }
            if (!this.isInput) {
            }
            var that = this;
            $(document).on('mousedown', function(ev){
                if ($(ev.target).closest('.datepicker').length == 0) {
                    that.hide();
                }
            });
            this.element.trigger({
                type: 'show',
                date: this.date
            });
        },

        hide: function(){
            this.picker.hide();
            $(window).off('resize', this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                $(document).off('mousedown', this.hide);
            }
            //this.set();
            this.element.trigger({
                type: 'hide',
                date: this.date
            });
        },

        set: function() {
            var formated = DPGlobal.formatDate(this.date, this.format);
            if (!this.isInput) {
                if (this.component){
                    this.element.find('input').prop('value', formated);
                }
                this.element.data('date', formated);
            } else {
                this.element.prop('value', formated);
            }
        },

        setValue: function(newDate) {
            if (typeof newDate === 'string') {
                this.date = DPGlobal.parseDate(newDate, this.format);
            } else {
                this.date = new Date(newDate);
            }
            this.set();
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
            this.fill();
        },

        place: function(){
            var offset = this.component ? this.component.offset() : this.element.offset();
            this.picker.css({
                top: offset.top + this.height,
                left: offset.left
            });
        },

        update: function(newDate){
            this.date = DPGlobal.parseDate(
                typeof newDate === 'string' ? newDate : (this.isInput ? this.element.prop('value') : this.element.data('date')),
                this.format
            );
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
            this.fill();
        },

        fillDow: function(){
            var dowCnt = this.weekStart;
            var html = '<tr>';
            while (dowCnt < this.weekStart + 7) {
                html += '<th class="dow">'+DPGlobal.dates.daysMin[(dowCnt++)%7]+'</th>';
            }
            html += '</tr>';
            this.picker.find('.datepicker-days thead').append(html);
        },

        fillMonths: function(){
            var html = '';
            var i = 0
            while (i < 12) {
                html += '<span class="month">'+DPGlobal.dates.monthsShort[i++]+'</span>';
            }
            this.picker.find('.datepicker-months td').append(html);
        },

        fill: function() {
            var d = new Date(this.viewDate),
                year = d.getFullYear(),
                month = d.getMonth(),
                currentDate = this.date.valueOf();
            this.picker.find('.datepicker-days th:eq(1)')
                .text(DPGlobal.dates.months[month]+' '+year);
            var prevMonth = new Date(year, month-1, 28,0,0,0,0),
                day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
            prevMonth.setDate(day);
            prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
            var nextMonth = new Date(prevMonth);
            nextMonth.setDate(nextMonth.getDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName,
                prevY,
                prevM;
            while(prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getDay() === this.weekStart) {
                    html.push('<tr>');
                }
                clsName = this.onRender(prevMonth);
                prevY = prevMonth.getFullYear();
                prevM = prevMonth.getMonth();
                if ((prevM < month &&  prevY === year) ||  prevY < year) {
                    clsName += ' old';
                } else if ((prevM > month && prevY === year) || prevY > year) {
                    clsName += ' new';
                }
                if (prevMonth.valueOf() === currentDate) {
                    clsName += ' active';
                }
                html.push('<td class="day '+clsName+'">'+prevMonth.getDate() + '</td>');
                if (prevMonth.getDay() === this.weekEnd) {
                    html.push('</tr>');
                }
                prevMonth.setDate(prevMonth.getDate()+1);
            }
            this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
            var currentYear = this.date.getFullYear();

            var months = this.picker.find('.datepicker-months')
                .find('th:eq(1)')
                .text(year)
                .end()
                .find('span').removeClass('active');
            if (currentYear === year) {
                months.eq(this.date.getMonth()).addClass('active');
            }

            html = '';
            year = parseInt(year/10, 10) * 10;
            var yearCont = this.picker.find('.datepicker-years')
                .find('th:eq(1)')
                .text(year + '-' + (year + 9))
                .end()
                .find('td');
            year -= 1;
            for (var i = -1; i < 11; i++) {
                html += '<span class="year'+(i === -1 || i === 10 ? ' old' : '')+(currentYear === year ? ' active' : '')+'">'+year+'</span>';
                year += 1;
            }
            yearCont.html(html);
        },

        click: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var target = $(e.target).closest('span, td, th');
            if (target.length === 1) {
                switch(target[0].nodeName.toLowerCase()) {
                    case 'th':
                        switch(target[0].className) {
                            case 'switch':
                                this.showMode(1);
                                break;
                            case 'prev':
                            case 'next':
                                this.viewDate['set'+DPGlobal.modes[this.viewMode].navFnc].call(
                                    this.viewDate,
                                    this.viewDate['get'+DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) +
                                    DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1)
                                );
                                this.fill();
                                this.set();
                                break;
                        }
                        break;
                    case 'span':
                        if (target.is('.month')) {
                            var month = target.parent().find('span').index(target);
                            this.viewDate.setMonth(month);
                        } else {
                            var year = parseInt(target.text(), 10)||0;
                            this.viewDate.setFullYear(year);
                        }
                        if (this.viewMode !== 0) {
                            this.date = new Date(this.viewDate);
                            this.element.trigger({
                                type: 'changeDate',
                                date: this.date,
                                viewMode: DPGlobal.modes[this.viewMode].clsName
                            });
                        }
                        this.showMode(-1);
                        this.fill();
                        this.set();
                        break;
                    case 'td':
                        if (target.is('.day') && !target.is('.disabled')){
                            var day = parseInt(target.text(), 10)||1;
                            var month = this.viewDate.getMonth();
                            if (target.is('.old')) {
                                month -= 1;
                            } else if (target.is('.new')) {
                                month += 1;
                            }
                            var year = this.viewDate.getFullYear();
                            this.date = new Date(year, month, day,0,0,0,0);
                            this.viewDate = new Date(year, month, Math.min(28, day),0,0,0,0);
                            this.fill();
                            this.set();
                            this.element.trigger({
                                type: 'changeDate',
                                date: this.date,
                                viewMode: DPGlobal.modes[this.viewMode].clsName
                            });
                        }
                        break;
                }
            }
        },

        mousedown: function(e){
            e.stopPropagation();
            e.preventDefault();
        },

        showMode: function(dir) {
            if (dir) {
                this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
            }
            this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
        }
    };

    $.fn.datepicker = function ( option, val ) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('datepicker'),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults,options))));
            }
            if (typeof option === 'string') data[option](val);
        });
    };

    $.fn.datepicker.defaults = {
        onRender: function(date) {
            return '';
        }
    };
    $.fn.datepicker.Constructor = Datepicker;

    var DPGlobal = {
        modes: [
            {
                clsName: 'days',
                navFnc: 'Month',
                navStep: 1
            },
            {
                clsName: 'months',
                navFnc: 'FullYear',
                navStep: 1
            },
            {
                clsName: 'years',
                navFnc: 'FullYear',
                navStep: 10
            }],
        dates:{
            days: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
            daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        },
        isLeapYear: function (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
        },
        getDaysInMonth: function (year, month) {
            return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        },
        parseFormat: function(format){
            var separator = format.match(/[.\/\-\s].*?/),
                parts = format.split(/\W+/);
            if (!separator || !parts || parts.length === 0){
                throw new Error("Invalid date format.");
            }
            return {separator: separator, parts: parts};
        },
        parseDate: function(date, format) {
            var parts = date.split(format.separator),
                date = new Date(),
                val;
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            if (parts.length === format.parts.length) {
                var year = date.getFullYear(), day = date.getDate(), month = date.getMonth();
                for (var i=0, cnt = format.parts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10)||1;
                    switch(format.parts[i]) {
                        case 'dd':
                        case 'd':
                            day = val;
                            date.setDate(val);
                            break;
                        case 'mm':
                        case 'm':
                            month = val - 1;
                            date.setMonth(val - 1);
                            break;
                        case 'yy':
                            year = 2000 + val;
                            date.setFullYear(2000 + val);
                            break;
                        case 'yyyy':
                            year = val;
                            date.setFullYear(val);
                            break;
                    }
                }
                date = new Date(year, month, day, 0 ,0 ,0);
            }
            return date;
        },
        formatDate: function(date, format){
            var val = {
                d: date.getDate(),
                m: date.getMonth() + 1,
                yy: date.getFullYear().toString().substring(2),
                yyyy: date.getFullYear()
            };
            val.dd = (val.d < 10 ? '0' : '') + val.d;
            val.mm = (val.m < 10 ? '0' : '') + val.m;
            var date = [];
            for (var i=0, cnt = format.parts.length; i < cnt; i++) {
                date.push(val[format.parts[i]]);
            }
            return date.join(format.separator);
        },
        headTemplate: '<thead>'+
        '<tr>'+
        '<th class="prev">&lsaquo;</th>'+
        '<th colspan="5" class="switch"></th>'+
        '<th class="next">&rsaquo;</th>'+
        '</tr>'+
        '</thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
    };
    DPGlobal.template = '<div class="datepicker dropdown-menu">'+
        '<div class="datepicker-days">'+
        '<table class=" table-condensed">'+
        DPGlobal.headTemplate+
        '<tbody></tbody>'+
        '</table>'+
        '</div>'+
        '<div class="datepicker-months">'+
        '<table class="table-condensed">'+
        DPGlobal.headTemplate+
        DPGlobal.contTemplate+
        '</table>'+
        '</div>'+
        '<div class="datepicker-years">'+
        '<table class="table-condensed">'+
        DPGlobal.headTemplate+
        DPGlobal.contTemplate+
        '</table>'+
        '</div>'+
        '</div>';

}( window.jQuery );











//-----------------------------------------------------日历插件结束


/*福利增值-余利宝 tab切换
 周文彬 2017/2/9
 */
$("#btn_first").click(function(){
    $(this).addClass("out_around");

    $("#btn_second,#btn_third,#btn_four").removeClass("out_around");
    $('#area_second,#area_third,#area_four').css('display','none');
    $('#area_first').css('display','block')
});

$("#btn_second").click(function(){

    $("#btn_first,#btn_third,#btn_four").removeClass("out_around");

    $('#area_first,#area_third,#area_four').css('display','none');

    $('#area_second').css('display','block')

    $(this).addClass("out_around")

});

$("#btn_third").click(function(){
    $("#area_first,#area_second,#area_four").css('display','none');
    $(this).addClass("out_around");
    $("#btn_first,#btn_second,#btn_four").removeClass("out_around");

    $('#area_third').css('display','block')
});

$("#btn_four").click(function(){
    $("#area_first,#area_second,#area_third").css('display','none');
    $(this).addClass("out_around");
    $("#btn_first,#btn_second,#btn_third").removeClass("out_around");

    $('#area_four').css('display','block')
});
//*——————*




/*canvas表格*/
var drawChar = {

    drawChartFinance: function (data, canvasId ) {

        var canvas = document.getElementById(canvasId);

        var context = canvas.getContext('2d');

        context.clearRect(0,0,canvas.width,canvas.height);

        var grc = context.createLinearGradient(0, 0, 0, 230);

        grc.addColorStop(0, "#00a5db");

        grc.addColorStop(0.5, "#00a5db");

        grc.addColorStop(1, "#89e2ff");

        context.beginPath();

        var thisBlock = document.getElementsByClassName('finance_table_canvas')[0].clientWidth;

        context.moveTo(thisBlock / 14, 230);

        for (var i = 0, nowDis = 0; i < data.length; i++) {

            context.lineTo(nowDis + thisBlock / 14, (1 - data[i].yield / 5) * 230);

            nowDis += thisBlock / 7

        }

        nowDis -= thisBlock / 7;

        context.lineTo(nowDis + thisBlock / 14, 230);

        context.lineTo(0, 230);

        context.closePath();

        context.fillStyle = grc;

        context.fill();

    }

};