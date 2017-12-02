$(function(){
  $(".login-btn").on("click",function(){
    var uname = $("#uname").val();
    var upwd = $("#upwd").val();
    if(!uname||!upwd){
      alert("输入有误，请输入信息");
    }
    $.ajax({
      type:"GET",
      url:"data/login.php",
      data:"uname="+uname+"&upwd="+upwd,
      success:function(txt){
        if(txt=="succ"){
          $(".overlay").css("display","block");
          $(".lightbox").css("display","block");
          $(".lightbox").html("恭喜尊敬的会员"+uname+"登陆成功,请稍后");
          sessionStorage.setItem("uname", uname);
          setTimeout(function(){location.href = "new.html"},2000);
        }else if(txt == "err"){
          $(".overlay").css("display","block");
          $(".lightbox").css("display","block");
          $(".lightbox").html("登陆失败,请检查用户名和密码");
          setTimeout(function(){
            $(".overlay").css("display","none");
            $(".lightbox").css("display","none");
          },3000);
        }
        /*if(txt == "succ"){
          $("#unameMsg").html("您输入的用户名可用");
          $("#unameMsg").css("color","#17A05E");
        }else if(txt == "err"){
          $("#unameMsg").html("您输入的用户名有误");
          $("#unameMsg").css("color","#FF1B2D");
        }*/
      }
    })
    //location.href = "new.html?uname=";
  })
})