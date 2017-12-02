$(function(){
  var uname = sessionStorage.getItem("uname");
  $("header").load("data/header.php",function(){
    if(uname){
      $("#login").html("欢迎回来，尊敬的会员:<span class='unameStyle'>"+uname+"</span><span id='outSign'>退出登录</span>");
    }else{
      $("#login").html("<a href='signUp.html'>加入/登录FL账号</a>")
    }
  });
  $("footer").load("data/footer.php");
  $("header").on("click","#cart",function(){
    location.href = "cart.html";
  });

  /*输入提示可用商品*/

  //关键词查询
  $("header").on("keyup",".search-box>input:first",function(){
    var kword = $(this).val();
      if(!kword){
        //$("#search-msg").css("display","none");
        $("#search-msg").html("");
      }else{
        $("#search-msg").css("display","block");
        $.ajax({
          url: "data/search.php",
          type: "GET",
          data: "kword=" + kword + "&pid=",
          success: function (list) {
            console.log(list);
            var html = "";
            for (var i = 0; i < list.length; i++) {
              var pname = list[i].pname;
              var newName = "";
              var checkId = "";
              var reg = new RegExp(kword,"gi");
              newName = pname.replace(reg,"<span class='kword'>"+kword+"</span>");
              html += "<li id='pid" + list[i].pid + "' data-pname='"+pname+"'>" + newName + "</li>";
            }
            $("#search-msg").html(html);
            $(".search-box>input:first").on("focus",function(){
              $("#search-msg").css({"display":"block"});
            });
            $("#search-msg").on("mouseleave",function(e){
              $(this).css({"display":"none"});
            });
          }
        });
      }
  });

  $("header").on("click","#search-msg>li", function () {
    $(".search-box>input:eq(0)").val($(this).data("pname"));
    $(".search-box>input:eq(0)").attr("data-pid",$(this).attr("id").replace("pid",""));
  });

  $("header").on("click","#search-submit",function(e){
    e.preventDefault();
    var pid = $(".search-box>input:eq(0)").data("pid");
    location.href = "single.html?pid="+pid;
  });

  //ul悬浮框
  $("header").on("mouseover",".header-nav",function(){
		$("#header-show").css("display","block");
		$(".header-nav>ul>li ").css({"border": "1px solid #ccc", "-webkit-box-shadow":" 0px 0px 10px rgb(0, 0, 0, 0.3)","background": "white","border-bottom":"0px"});
	})

	$("header").on("mouseout",".header-nav",function(){
		$("#header-show").css("display","none");
		$(".header-nav>ul>li ").css({"border": "none", "-webkit-box-shadow":" none","background":"rgb(245,245,245)"});
	})

  //退出登录
  $("header").on("click","#outSign",function() {
    sessionStorage.removeItem("uname");
    location.href = "new.html";
  });
  /*导航栏上的效果*/
  /*var color = ["#55cccc","#ccff66","#ff99cc","#ff9999","#ff0033","#ffff66"];
  $("header").on("mouseover",".header-bottom>ul>li",function() {
      var num = $(".header-bottom>ul>li").index($(this));
      $(".movetop").stop(true);
      $(".movebottom").stop(true);
     //  $(this).css("box-shadow","0 0 2px 2px #ccc");
      $(".movetop").css({"backgroundColor": color[num], "height": "5px"})
        .animate({"width": 0, "left": num * 95}, 300)
        .animate({"width": $(this).width()}, 300);
      $(".movebottom").css({"backgroundColor": color[num], "height": "5px"})
        .animate({"width": 0, "left": num * 95}, 300)
        .animate({"width": $(this).width()}, 300);
      $(this).children().css({"color": color[num]});
      $(this).siblings().children().css("color", "black");
      //$("#header-show").animate({"width":$(".header-bottom>ul").width()+250,height:500},300);
  });

 /* $("header").on("mouseout",".header-bottom>ul>li",function() {
      var num = $(".header-bottom>ul>li").index($(this));
      $(".movetop").stop(true);
      $(".movebottom").stop(true);

      //$("#header-show").stop(true);
      $("#header-show").css({"width":0,height:0});
      $(".movetop").css({"backgroundColor": color[num], "height": "5px"})
        .animate({"width": 0, "left": num * 95}, 300)
        .animate({"width": $(this).width()}, 300);

      $(".movebottom").css({"backgroundColor": color[num], "height": "5px"})
        .animate({"width": 0, "left": num * 95}, 300)
        .animate({"width": $(this).width()}, 300);

      $(this).children().css({"color": color[num]});
      $(this).siblings().children().css("color", "black");
  });*/
});


/*去重*/
function unrepeateat(arr){
  var hashArr =[]
  for(var i=0;i<arr.length;i++){
    if(hashArr.indexOf(arr[i]) == -1){
      hashArr.push(arr[i]);
    }
  }
  return hashArr;
}

