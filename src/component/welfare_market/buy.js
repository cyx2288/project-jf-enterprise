/**
 * Created by Qiaodan on 2017/8/31.
 */



    //福利集市买入卖出加减
var WelfareMarketBuy={

    changePrice:function(ele) {/*买入卖出页面加减金额*/
        var thisValue = document.getElementsByClassName('inputele')[0].value;

        var thisMaxPrice = document.getElementsByClassName('inputele')[0].getAttribute('max-price');

        if (ele.className.indexOf('reduce') > -1) {

            thisValue=parseFloat(thisValue)-0.001;

            if (thisValue <= 0.001) {//最小值为0.001

                thisValue = 0.001;

                ele.style.opacity = "0.4";

                ele.style.cursor = "not-allowed";
            } else {
                ele.style.opacity = "1"
            }

            document.getElementsByClassName('add')[0].style.opacity = "1";

            document.getElementsByClassName('add')[0].style.cursor = "pointer";

            document.getElementsByClassName('inputele')[0].value = parseFloat(thisValue).toFixed(3)

        }
        else if (ele.className.indexOf('add') > -1) {

            thisValue = parseFloat(thisValue) + 0.001;

            if (thisValue >= thisMaxPrice) {//最大值

                thisValue = thisMaxPrice;

                ele.style.cursor = "not-allowed";

                ele.style.opacity = "0.4"

            } else {
                ele.style.opacity = "1"
            }

            document.getElementsByClassName('inputele')[0].value = parseFloat(thisValue).toFixed(3);

            document.getElementsByClassName('reduce')[0].style.opacity = "1";

            document.getElementsByClassName('reduce')[0].style.cursor = "pointer";
        }
        else {

            if (parseFloat(thisValue) >= parseFloat(thisMaxPrice)) {//最大值为10

                thisValue = thisMaxPrice;

                document.getElementsByClassName('add')[0].style.opacity = "0.1";

                document.getElementsByClassName('add')[0].style.cursor = "not-allowed";

                document.getElementsByClassName('inputele')[0].value = thisValue;


            } else if (thisValue < 0 && thisValue) {

                thisValue = 0.001;

                document.getElementsByClassName('inputele')[0].value = parseFloat(thisValue).toFixed(3);;

                document.getElementsByClassName('reduce')[0].style.opacity = "0.1";
            }
            else {
                document.getElementsByClassName('add')[0].style.opacity = "1";

                document.getElementsByClassName('reduce')[0].style.opacity = "1";
            }

        }


    },

    showTips:function(ele,text) {//提示出现

        var _this=this;

        var thisValue = document.getElementsByClassName('inputele')[0].value;

        var thisMaxPrice = document.getElementsByClassName('inputele')[0].getAttribute('max-price');

        var thisCleckEle = $(ele);

        thisCleckEle.tooltip({
            title: text
        });

        thisCleckEle.tooltip('show');

    },
    removeTips:function(ele){//删除提示

        var _this=this;

        var thisCleckEle=$(ele);

       // thisCleckEle.tooltip('hide');

        thisCleckEle.tooltip('destroy')//提示信息隐藏;

    }

};
