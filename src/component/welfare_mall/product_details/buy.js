/**
 * Created by Qiaodan on 2017/8/24.
 */


var welfareMallBuy={

    changeValue:function(ele) {/*买入卖出页面加减金额*/
        var thisValue = document.getElementsByClassName('inputele')[0].value;

        var thisMaxPrice = document.getElementsByClassName('inputele')[0].getAttribute('max_data');

        var thisTips = document.getElementsByClassName('show_error')[0];

        if (ele.className.indexOf('reduce') > -1) {

            thisValue = parseFloat(thisValue) - 1;

            if (thisValue <= 1) {//最小值为0.01

                thisValue = 1;

                ele.style.opacity = "0.4";

                ele.style.cursor = "not-allowed";
            } else {
                ele.style.opacity = "1"
            }

            document.getElementsByClassName('add')[0].style.opacity = "1";

            document.getElementsByClassName('add')[0].style.cursor = "pointer";

            document.getElementsByClassName('inputele')[0].value = thisValue

        }
        else if (ele.className.indexOf('add') > -1) {

            thisValue = parseFloat(thisValue) + 1;

            if (thisValue >= thisMaxPrice) {//最大值

                thisValue = thisMaxPrice;

                ele.style.cursor = "not-allowed";

                ele.style.opacity = "0.4"

            } else {
                ele.style.opacity = "1"
            }

            document.getElementsByClassName('inputele')[0].value = thisValue;

            document.getElementsByClassName('reduce')[0].style.opacity = "1";

            document.getElementsByClassName('reduce')[0].style.cursor = "pointer";
        }
        else {

            if (parseFloat(thisValue) >= parseFloat(thisMaxPrice)) {//最大值为10

                thisValue = thisMaxPrice;

                document.getElementsByClassName('add')[0].style.opacity = "0.1";

                document.getElementsByClassName('add')[0].style.cursor = "not-allowed";

                document.getElementsByClassName('inputele')[0].value = thisValue;


            } else if (thisValue <= 1 && thisValue) {

                thisValue = 1;

                document.getElementsByClassName('inputele')[0].value = thisValue;

                document.getElementsByClassName('reduce')[0].style.opacity = "0.1";
            }
            else {
                document.getElementsByClassName('add')[0].style.opacity = "1";

                document.getElementsByClassName('reduce')[0].style.opacity = "1";

                document.getElementsByClassName('add')[0].style.cursor = "pointer";

                document.getElementsByClassName('reduce')[0].style.cursor = "pointer";
            }

        }


    },

    showError:function(error){/*报错方法，2s后会自动移除-------参数为报错的文本*/
        var showError=document.getElementsByClassName('show_error')[0];

        var errorText=showError.getElementsByClassName('error_text')[0];

        showError.style.display="block";

        setTimeout(function(){
            showError.className="show_error show";
        },10);

        errorText.innerHTML=''+error+'';

        setTimeout(function(){//2s之后自动移除
            showError.style.display="none";

            showError.className="show_error";
        },2000);
    },


    changeImgSrc:function(){//实物图片切换

        var bigMainPic=document.getElementsByClassName('pic')[0];//显示主图

        var allSmallPic=document.getElementsByClassName('small_img')[0].getElementsByTagName('img');//待显示的小图

        for(var i=0;i<allSmallPic.length;i++){
            allSmallPic[i].addEventListener('mouseover',function(){

                var thisSamllSrc=this.getAttribute('src');

                bigMainPic.setAttribute('src',thisSamllSrc)

            },false)
        }

    }



}







