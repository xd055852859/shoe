$(function(){
  banner.init();
  //输出产品列表
  $.ajax({
    url:"data/product_search.php",
    type:"GET",
    success:function(list){
      var html = "";
      for(var i=0;i<list.length;i++){
        var arr = list[i];
        var pic = arr["bpic"].split("|")[i];
        html += `<div class="like-box" id=pid${arr.pid}>
                     <img src='images/adidas/${pic}' alt="">
                     <ul class="like-msg">
                     <li><b>${arr.pname}</b>
                     <li><div class="firstcolor"></div><div class="firstcolor secondcolor"></div></li>
                     <li>${arr.ptype}</li>
                     <li><span>￥${arr.price}</span></li>
                     </ul>
                  </div>`
      }
      var phtml = `<div id="product-select">
	                    <h1>运动产品</h1>
                      <span>排序方式 :</span>
		                </div>`
      $(".product").html(phtml+html);
      $(".product").on("click",".like-box",function(){
        location.href = "single.html?pid="+$(this).attr("id");
      });
    }
  });
  //左右点击切换图片
  var left = 0;
  //点击到最后一张照片时向左的箭头消失
  $("#right-btn").css("display","none");
  $("#left-btn").on("click",function(){
    left -= parseInt($(".commend-product").width());
    $(".container-box").animate({"left":left},500);
    if(left == -parseInt($(".container-box").width())+parseInt($(".commend-product").width())){
      $(this).css("display","none");
    }else{
      $("#right-btn").css("display","block");
      $(this).css("display","block");
    }
  });

  //点击到第一张照片时向右的箭头消失
  $("#right-btn").on("click",function(){
    left += parseInt($(".commend-product").width());
    $(".container-box").animate({"left":left},500);
    if( left == 0){
      //$(".container-box").css("left","0");
      $(this).css("display","none");
    }else{
      $("#left-btn").css("display","block")
      $(this).css("display","block");
    }
  });

  //楼层图
  /*电梯效果*/
  /*1.保存楼层高度
   2.点击相应的a位移到指定位置*/
  $(document).scroll(function() {
    if($("body").scrollTop()>($(".mark:eq(0)").offset().top)/3){
      $("#elevator").fadeIn("fast");
    }else if($("body").scrollTop()<$(".mark:eq(0)").offset().top/3){
      $("#elevator").fadeOut("fast");
    }
  });

  $("#elevator").on("click","ul>li>a",function(){
    $("body").stop(true);
    var num =$("#elevator>ul>li>a").index($(this));
    $("body").animate(
      {scrollTop:$(".mark:eq("+num+")").offset().top-document.documentElement.clientHeight/2+45},1000).bind(this,num);
  })
});


/*轮播*/
var imgs=[
  {"i":0,"img":"images/banner/banner.jpg"},
  {"i":1,"img":"images/banner/banner-2.jpg"},
  {"i":2,"img":"images/banner/banner-3.jpg"},
  {"i":3,"img":"images/banner/banner-4.jpg"},
  {"i":4,"img":"images/banner/banner-5.jpg"}
];
var banner={
  LIWIDTH:0,//保存每个li的宽度,其实就是#slider的宽
  DURATION:1000,//动画的总时间
  WAIT:1000,//自动轮播之间的等待时间
  timer:null,//保存一次性定时器序号
  canAuto:true,//保存是否可以自动轮播
  init:function(){
    //$("#banner").css("width",)
    this.LIWIDTH=parseInt(
      //$("#banner").css("width")
      window.screen.width-17
    );

    this.updateView();
    //为id为indexs的ul添加鼠标进入事件代理，只有不是hover的li才能响应事件
    $("#indexs").on("mouseover","li:not(.hover)",
      function(e){
        //获得目标元素$target
        var $target=$(e.target);
        //调用move方法，传入要移动的个数:
        //目标元素的内容-目标元素的兄弟中class为hover的li的内容
        this.move($target.attr("id")
        -$target.siblings(".hover").attr("id"));
      }.bind(this));
    //当鼠标进入#slider时，将canAuto改为false
    //当鼠标移出#slider时，将canAuto改为true
    $("#banner").hover(
      function(){this.canAuto=false;}.bind(this),
      function(){this.canAuto=true;}.bind(this)
    );
    this.autoMove();
  },
  autoMove:function(){//启动自动轮播
    //启动一次性定时器:
    this.timer=setTimeout(
      function(){
        if(this.canAuto){
          this.move(1);//调用move执行移动一个
        }else{
          this.autoMove();//继续等待
        }
      }.bind(this),
      this.WAIT
    );
  },
  move:function(n){
    clearTimeout(this.timer);//停止一次性定时器
    this.timer=null;
    $("#banner-box").stop(true);//停止动画，防止叠加
    if(n<0){//如果n<0,右移，先改数组，再移动
      n*=-1;//将n转为正数
      imgs=//先删除结尾的n个元素，拼接到开头
        imgs.splice(imgs.length-n,n).concat(imgs);
      this.updateView();//更新界面
      //获得#imgs当前的left,转为浮点数
      var left=parseFloat($("#banner-box").css("left"));
      //修改#imgs的left为left-n*LIWIDTH
      $("#banner-box").css("left",left-n*this.LIWIDTH);
      //启动动画，在DURATION时间内，left移动到0
      $("#banner-box").animate(
        {left:"0"},
        this.DURATION,
        this.autoMove.bind(this)
      );
    }else{//否则, 左移,先移动，再改数组
      //让#imgs的ul再DURATION事件内，left变为-n*LIWIDTH
      $("#banner-box").animate(
        {left:-n*this.LIWIDTH+"px"},
        this.DURATION,
        //在动画结束后调用endMove,替换this，传入参数n
        this.endMove.bind(this,n)
      );
    }
  },
  endMove:function(n){
    //删除imgs开头的n个元素,再拼到结尾
    imgs=imgs.concat(imgs.splice(0,n));
    this.updateView();//更新页面
    $("#banner-box").css("left",0);//设置#imgs的left为0
    this.autoMove();//启动自动轮播
  },
  updateView:function(){//将数组中的元素更新到页面
    //遍历imgs数组中每个对象,同时声明空字符串html
    for(var i=0,html="",idxs="";i<imgs.length;i++){
      html+="<li><img src='"+imgs[i].img+"'></li>";
      idxs+="<li id="+(i+1)+"></li>";
    }
    //设置id为imgs的内容为html,再设置其宽为LIWIDTH*imgs的元素个数
    $("#banner-box").html(html)
      .css("width",this.LIWIDTH*imgs.length);
    $("#banner-box>li>img").html(html)
      .css("width",this.LIWIDTH);
    //设置id为indexs的内容为idxs
    $("#indexs").html(idxs);
    //获得#indexs下的和imgs中第一个元素的i属性对应的li,设置其class为hover,选择兄弟中的class为hover的li,清除其class
    $("#indexs>li:eq("+imgs[0].i+")")
      .addClass("hover")
      .siblings(".hover").removeClass("hover");
  }
}



