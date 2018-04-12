var localStorages = {
    Get: function(key){
        if (window.localStorage && window.localStorage['getItem']) {
          if(key){
              return window.localStorage.getItem(key);
            }
        }
    },
    Set: function(key, value){
      if (window.localStorage && window.localStorage['setItem']) {
        if (value && value) {
                return window.localStorage.setItem(key, value);
            }             
        }

    },
    Clear: function(name) {
        if(name){
            window.localStorage.removeItem(name);
        }else{
            window.localStorage.clear();
        }
    }
};

function getQueryString (name) {
    //获取url中的参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


$(function(){


    jQuery.support.cors = true;  


    var cdnUrl = 'https://ofdznzfo9.qnssl.com/mwx_';

    var passVideo1 = document.getElementById("passVideo1");
    var passVideo2 = document.getElementById("passVideo2");
    var passVideo3 = document.getElementById("passVideo3");
    var passVideo4 = document.getElementById("passVideo4");
    var pass1mp3 = document.getElementById("pass1mp3");
    var pass2mp3 = document.getElementById("pass2mp3");
    var pass3mp3 = document.getElementById("pass3mp3");
    var pass4mp3 = document.getElementById("pass4mp3");
    var BGM = document.getElementById("BGM");
    var sumPage1 = 0;
    var sumPage2 = 0;
    var sumPause = 0;
    var endPage2X = 0;


    var video1 = document.getElementById('video1'),
        clientWidth = $(window).width(),
        clientHeight = $(window).height();

        //$("#fnTimeCountDown").fnTimeCountDown();
    // 音乐播放
    function autoPlayMusic() {
      // 自动播放音乐效果，解决浏览器或者APP自动播放问题
      function musicInBrowserHandler() {
          musicPlay(true);
          document.body.removeEventListener('touchstart', musicInBrowserHandler);
      }
      document.body.addEventListener('touchstart', musicInBrowserHandler);
      // 自动播放音乐效果，解决微信自动播放问题
      function musicInWeixinHandler() {
          musicPlay(true);
          document.addEventListener("WeixinJSBridgeReady", function () {
              musicPlay(true);
          }, false);
          document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
      }
      document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
      musicInBrowserHandler();
      musicInWeixinHandler();
    }
    function musicPlay(isPlay) {
      if (isPlay && music2.paused) {
          music2.play();
      }
      if (!isPlay && !music2.paused) {
          music2.pause();
      }
    }
  
    // 预加载
    var pics = [
        cdnUrl + "100.png",
        cdnUrl + "again.png",
        cdnUrl + "cue1.png",
        cdnUrl + "cue2.png",
        cdnUrl + "cue3.png",
        cdnUrl + "cue4.png",
        cdnUrl + "dbValue.png",
        cdnUrl + "div1.png",
        cdnUrl + "div2.png",
        cdnUrl + "div3.png",
        cdnUrl + "div4.png",
        cdnUrl + "div5.png",
        cdnUrl + "div6.png",
        cdnUrl + "div7.png",
        cdnUrl + "erroe.png",
        cdnUrl + "end.jpg",
        cdnUrl + "five.png",
        cdnUrl + "four.png",
        cdnUrl + "Grenade.png",
        cdnUrl + "hammer.png",
        cdnUrl + "loading.gif",
        cdnUrl + "one.png",
        cdnUrl + "page1.jpg", 
        cdnUrl + "page2.jpg", 
        cdnUrl + "page3.jpg", 
        cdnUrl + "page4.jpg",
        cdnUrl + "page4music.gif",
        cdnUrl + "question.png",
        cdnUrl + "saws.png",
        cdnUrl + "start.jpg",
        cdnUrl + "switch1.png", 
        cdnUrl + "switch2.png", 
        cdnUrl + "switch3.png", 
        cdnUrl + "switch4.png",
        cdnUrl + "three.png", 
        cdnUrl + "two.png", 
        cdnUrl + "pass1.gif",
        cdnUrl + "pass2.gif",
        cdnUrl + "pass3.gif",
        cdnUrl + "pass4.gif",
    ];

    function _isAndroid () {
        var u = navigator.userAgent,
        isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端 
        isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
        if (isAndroid) return true;
        else return false;
    }

    function _loadImages(pics, callback, len){
        len = len || pics.length;
        if(pics.length){
            var IMG = new Image(),
                picelem = pics.shift();
                
            if(window._pandaImageLoadArray){
                window._pandaImageLoadArray = window._pandaImageLoadArray
            }else{
                window._pandaImageLoadArray = [];
            }
            window._pandaImageLoadArray.push(picelem);
            IMG.src = picelem;
            // 从数组中取出对象的一刻，就开始变化滚动条
            _drawLoadProgress(window._pandaImageLoadArray.length/(len*len));
            // 缓存处理
            if (IMG.complete) {
                window._pandaImageLoadArray.shift();
                return _loadImages(pics,callback, len); 
            }else{
                // 加载处理
                IMG.onload = function() {
                    window._pandaImageLoadArray.shift();
                    IMG.onload = null;  // 解决内存泄漏和GIF图多次触发onload的问题
                }
                // 容错处理 todo 应该如何处理呢?
                // 目前是忽略这个错误，不影响正常使用
                IMG.onerror = function(){
                    window._pandaImageLoadArray.shift();
                    IMG.onerror = null;
                }
                return _loadImages(pics, callback, len);
            }
            return;
        }
        if(callback) _loadProgress(callback, window._pandaImageLoadArray.length, len);
    }
    // 监听实际的加载情况
    function _loadProgress(callback, begin, all){
      var loadinterval = setInterval(function(){
          if(window._pandaImageLoadArray.length != 0 && window._pandaImageLoadArray.length != begin){
              _drawLoadProgress((begin - window._pandaImageLoadArray.length )/all);
          }else if(window._pandaImageLoadArray.length == 0){
              _drawLoadProgress(1)
              setTimeout(function(){
                  callback.call(window);
              },500);
              clearInterval(loadinterval);
          }
      },300);
    }
    function _drawLoadProgress(w){
        var num = Math.floor(w*100) >= 100 ? 100 : Math.floor(w*100);
        $("#loadingFont").html(num);
    }

    _loadImages(pics, function(){
        $(".loading").fadeOut();
        $(".videobox").fadeIn();
        loaded();
    });

   

    //首页视频部分
    document.addEventListener("WeixinJSBridgeReady", function () {
        //微信就绪视频即播放
        video1.play();
    }, false);


    //视频播放结束跳转到分享页
    video1.addEventListener('ended', function(e) {
        setTimeout(function(){
            $('.publicity').fadeOut(500);
        },300)
    });


    //加载完成执行
    function loaded () {
        var timer3 = setTimeout(function() {
            $('.videobox').css({
                'width': clientWidth + 'px',
                'height': clientHeight + 'px'
            });
            video1.play();
            $(".passTitleVideo").fadeIn();
            $('.publicity').on('touchstart', function() { video1.play();$(".pauseButton").remove(); return false; });        
            if (_isAndroid()) {
                $('#playVideo').fadeIn();
            }
            clearTimeout(timer3);
        }, 500);
    }

    $("#playVideo").on("click",function(){
        $(this).fadeOut(300);
        setTimeout(function(){
            video1.play();
        },500)
        return false;
    });


    $(".pauseButton").on("touchstart", function () {
        $(this).fadeOut(300);
        setTimeout(function () {
            video1.play();
        }, 500)
        return false;
    });

    var reload = true;
    video1.addEventListener('timeupdate', function (e) {
        if (this.currentTime >= 2.8 && reload) {
            $(".pauseButton").css("display","block");
            video1.pause();
            reload = false;
        }
    });



    video1.addEventListener('ended', function (e) {
        $(".passTitleVideo").fadeOut();
        $('#playVideo').fadeOut();
        $("#page0").removeClass("hidden");
        $("#startButton").fadeIn();
    })

    $(".passTitleVideo").on('touchstart', function () {
        $(".pauseButton").remove();
        $("#startButton").remove();
        $('#playVideo').remove();
        video1.pause();
        $(this).fadeOut();
        BGM.play();
        $('.videobox').slideToggle();
        $(".page1").removeClass('hidden');
    })


    $("#startButton").on('touchstart', function () {
        $(this).fadeOut();
         $(".pauseButton").remove();
         $("#startButton").remove();
        BGM.play();
        $("#page0").remove();
        $('.videobox').slideToggle();
        $(".page1").removeClass('hidden');
    })

    var cueKey = 0; // 保证提示按钮第二次无效
    var residual = 1; // 钥匙剩余个数
    $(".question").on('touchstart', function () {
        cueKey = cueKey + 1;
        
        if (cueKey % 2 === 1) {
            if (residual === 1) {
                $(".ifCue").removeClass("hidden");
                $(".keyNum").css("background-image", "url(https://ofdznzfo9.qnssl.com/mwx_one.png)");
            } else if (residual === 0) {
                $(".ifCue0").removeClass("hidden");
                $(".keyNum").css("background-image", "url(https://ofdznzfo9.qnssl.com/mwx_zero.png)");
            } else if (residual < 0) {
                // $(".cue0").removeClass("hidden");
                cueKey = cueKey + 1;
                $(".paper").removeClass("hidden");

                setTimeout(() => {
                    $(".paperOver").removeClass("hidden");
                }, 3000);
                $(".keyNum").css("background-image", "url(https://ofdznzfo9.qnssl.com/mwx_zero.png)");
            }
        }
    })

    $(".ifCue0").on('touchstart', function () {
        $(".ifCue0").addClass("hidden");
        $(".paper").removeClass("hidden");

        setTimeout(() => {
            $(".paperOver").removeClass("hidden");
        }, 3000);
        $(".keyNum").css("background-image", "url(https://ofdznzfo9.qnssl.com/mwx_zero.png)");
    })

    $(".useTrue").on('touchstart', function () {
        if (residual < 0) {
            return;
        }
        residual = residual - 1;
        if (residual === 1) {
            $(".keyNum").css("background-image", "url(https://ofdznzfo9.qnssl.com/mwx_one.png)");
        } else if (residual === 0) {
            $(".keyNum").css("background-image", "url(https://ofdznzfo9.qnssl.com/mwx_zero.png)");
        } else if (residual < 0) {
            // $(".cue0").removeClass("hidden");
            
        }
        console.log(residual);
        $(".cue").removeClass("hidden");
        $(".ifCue").addClass("hidden");
    })

    $(".useFalse").on('touchstart', function () {
        $(".ifCue").addClass("hidden");
    })

    $(".cue").on('touchstart', function () {
        cueKey = cueKey + 1;
        if (residual < 0) {
            return;
        }
        $(".cue").addClass("hidden");
    })

    // $(".cue0").on('touchstart', function () {
    //     cueKey = cueKey + 1;
    //     $(".cue0").addClass("hidden");
    //     $(".paper").removeClass("hidden");

    //     setTimeout(() => {
    //         $(".paperOver").removeClass("hidden");
    //     }, 3000);
    // })

    $(".paperOver").on('touchstart', function () {
        $(".cue").removeClass("hidden");
        $(".keyNum").css("background-image", "url(https://ofdznzfo9.qnssl.com/mwx_zero.png)");
        $(".paper").addClass("hidden");
        $(".paperOver").addClass("hidden");
    })


    // 第一关点击拾取宝箱后的操作
    $("#alert1").on("touchstart", function () {
        $("#passVideo1").removeClass("hidden");
        // passVideo2.play();
        pass1mp3.play();
        setTimeout(() => {
            $(".page1").fadeOut();
            $(".page2").fadeIn();
            $("#passVideo1").remove();
        }, 2000);
    })


    $(".machine1").draggable({
        revert: "invalid" // 如果未拖拽到指定区域还原
    });
    $(".machine2").draggable({
        revert: "invalid" // 如果未拖拽到指定区域还原
    });
    $(".machine3").draggable({
        revert: "invalid" // 如果未拖拽到指定区域还原
    });

    //滑动箱子开始状态
    $(".machine_div").on("touchstart", function (e) {
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        startPage2X = e.originalEvent.changedTouches[0].pageX;
    });

    //滑动箱子状态
    $(".machine_div").on("touchend", function (e) {
        endPage2X = sumPage2;
    });

    //箱子的滑动状态
    $(".machine_div").on("touchmove", function (e) {
        movePage2X = e.originalEvent.changedTouches[0].pageX;
        sumPage2 = movePage2X - startPage2X;
        if (endPage2X) {
            sumPage2 = endPage2X + sumPage2;
        }
        if (sumPage2 < 0) {
            if (sumPage2 < 1) {
                $("#machine_div1").addClass("hidden");
                $("#machine_div2").removeClass("hidden");
                $("#machine_div3").addClass("hidden");
            }
            if (sumPage2 < -20) {
                $("#machine_div2").addClass("hidden");
                $("#machine_div3").removeClass("hidden");
                $("#machine_div4").addClass("hidden");
            }
            if (sumPage2 < -50) {
                $("#machine_div3").addClass("hidden");
                $("#machine_div4").removeClass("hidden");
                $("#machine_div5").addClass("hidden");
            }
            if (sumPage2 < -80) {
                $("#machine_div4").addClass("hidden");
                $("#machine_div5").removeClass("hidden");
                $("#machine_div6").addClass("hidden");
            }
            if (sumPage2 < -110) {
                $("#machine_div5").addClass("hidden");
                $("#machine_div6").removeClass("hidden");
                $("#machine_div7").addClass("hidden");
            }
            if (sumPage2 < -140) {
                $("#machine_div6").addClass("hidden");
                $("#machine_div7").removeClass("hidden");
                $("#alert2").removeClass('hidden');
            }
        }
    })

    // 第二关点击解读说明一系列操作
    $("#alert2").on("touchstart", function () {
        $("#passVideo2").removeClass("hidden");
        // passVideo2.play();
        pass2mp3.play();
        setTimeout(() => {
            $(".page2").fadeOut();
            $(".page3").fadeIn();
            $("#passVideo2").remove();
        }, 2000);
    })

    //切换电闸图片
    function div_tab(tabName) {
        if (tabName == 0) {
            $(".switch1").addClass('hidden');
            $(".switch2").removeClass('hidden');
        } else if (tabName == 1) {
            $(".switch2").addClass('hidden');
            $(".switch3").removeClass('hidden');
        } else if (tabName == 2) {
            $(".switch3").addClass('hidden');
            $(".switch4").removeClass('hidden');
            setTimeout(function () {
                $(".alert3").removeClass('hidden');
            }, 500)
        }
    }

    // 切换索引
    var indexSaw = 0;

     // 陀螺仪重力感应
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function (event) {
            beta = event.beta;
            if (Math.round(beta) < -60 && Math.round(beta) > -120) {
                setInterval(function () {
                    //每隔0.2秒读取下一张图片
                    div_tab(indexSaw);
                    indexSaw++;
                }, 200);
            }
        }, false);
    }

    // 第三关点击启动一系列操作
    $("#alert3").on("touchstart", function () {
        $("#passVideo3").removeClass("hidden");
        // passVideo2.play();
        pass3mp3.play();
        setTimeout(() => {
            $(".page3").fadeOut();
            $(".page4").fadeIn();
            $("#passVideo3").remove();
        }, 2000);
    })


    $("#db").draggable({
        revert: "invalid" // 如果未拖拽到指定区域还原
    });

    $(".dbValue").droppable({
        drop: function () {
            $("#db").css("left", "9rem");
            $("#db").css("top", "14.3rem");
            setTimeout(function () {
                $(".alert4").removeClass('hidden');
            }, 500)
        }
    });

    // 第四关快醒醒
    $("#alert4").on("touchstart", function () {
        $("#passVideo4").removeClass("hidden");
        pass4mp3.play();
        setTimeout(function(){
        $(".page4").fadeOut();
        $(".page5").fadeIn();
        $("#passVideo4").remove();
        },2000)
    })


    $(".playAgain").on('touchstart', function () {
        location.reload();
    })

    $(".share").on('touchstart', function () {
        $(".shareTo").fadeIn();
    })

    $(".shareTo").on('touchstart', function () {
        $(".shareTo").fadeOut();
    })

    // 微信分享图标与文案
    wxShare('是不是只有我能唤醒余文乐？你来试试?','余文乐快醒醒！' );
    function wxShare(title,desc){
      if(!link){ var link = location.href; }
      var uri = window.location.href.split("#")[0];
      $.post("https://public.oyoozo.com/wxapi.php", {
          uri: uri
      }, function (data) {
          data = eval("(" + data + ")");
          var apilist = [
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
          ];
          wx.config({
              debug: false,
              appId: data.appid,
              timestamp: data.timestamp,
              nonceStr: data.noncestr,
              signature: data.signature,
              jsApiList: apilist
          });

          wx.ready(function () {
            // 分享给朋友事件绑定
              wx.onMenuShareAppMessage({
                  title: title,
                  desc: desc,
                  link: link,
                  imgUrl: 'https://ofdznzfo9.qnssl.com/mxw_wx.jpg',
                  success: function () {

                  }
              });

              // 分享到朋友圈
              wx.onMenuShareTimeline({
                  title:title,
                  link: link,
                  imgUrl: 'https://ofdznzfo9.qnssl.com/mxw_wx.jpg',
                  success: function () {

                  }
              });
          })
      });
    }


})
