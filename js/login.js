$(function(){
  //$("footer").load("data/footer.php");
  /*验证用户名
   1.验证用户名是否存在数据库
   2.用户名由 3-10位的字母下划线和数字组成。不能以数字或下划线开头
   */
  $("#uname").on("blur",function(e){
    if($(this).val()==""){
      nullInput("#unameMsg","请勿输入空用户名");
      $(this).val("");
      //console.dir(this);
      return;
    }
    var reg = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{2,9}$","g");
    if (reg.test($(this).val())){
         $.ajax({
            type:"GET",
            url:"data/signUp.php",
            data:"uname="+$("#uname").val(),
            success:function(txt){
                if(txt == "succ"){
                  $("#unameMsg").html("您输入的用户名可用");
                  $("#unameMsg").css("color","#17A05E");
                }else if(txt == "err"){
                  $("#unameMsg").html("您输入的用户名有误");
                  $("#unameMsg").css("color","#FF1B2D");
                }
            }
        })
     }else{
        nullInput("#unameMsg","您输入的用户名有误");
        $(this).val("");
     }
  });
  $("#uname").on("focus",function() {
    testForm("#unameMsg",["请勿输入空用户名","您输入的用户名有误","请输入以英文字母开头的字母组合"]);
  });
  /*验证密码
   1.密码6-8位，字母，数字的组合，至少包含一位大写字母和一位数字
   */
  $("#upwd").on("blur",function(){
    var reg = new RegExp("^(?![a-zA-Z]+$)(?![a-z0-9]+$)[a-zA-Z0-9]{6,12}$","g");
    if($(this).val()==""){
      nullInput("#upwdMsg","请勿输入空密码");
      $(this).val("");
      return;
    }
    if(reg.test($(this).val())){
      $("#upwdMsg").html("您输入的密码可同");
      $("#upwdMsg").css("color","#17A05E");
    }else{
      nullInput("#upwdMsg","您输入的密码有误");
      $(this).val("");
    }
  });

  $("#upwd").on("focus",function() {
    testForm("#upwdMsg",["请勿输入空密码","您输入的密码有误","6-8位，至少包含一位大写字母和一位数字"]);
  });

  $("#upwdAgain").on("blur",function(){
    if($(this).val()==""){
      nullInput("#upwdAgainMsg","请输入密码后再确认密码");
      $(this).val("");
      return
    }
    if($(this).val() == $("#upwd").val()){
      $("#upwdAgainMsg").html("您输入的密码匹配正确");
      $("#upwdAgainMsg").css("color","#17A05E");
    }else{
      nullInput("#upwdAgainMsg","输入的密码与原密码不匹配");
      $(this).val("");
    }
  });

  $("#upwdAgain").on("focus",function() {
    testForm("#upwdAgainMsg",["请输入密码后再确认密码","输入的密码与原密码不匹配","请再次输入密码"]);
  });

  $("#phone").on("blur",function(){
    if($(this).val()==""){
      nullInput("#phoneMsg","请勿输入空手机号码");
      $(this).val("");
      return;
    }
    var reg = new RegExp("^(86|0086)?1[34578]\\d{9}$","g");
    if(reg.test($(this).val())){
      $("#phoneMsg").html("输入的手机号码可用");
      $("#phoneMsg").css("color","#17A05E");
    }else{
      nullInput("#phoneMsg","输入的手机号码有误");
      $(this).val("");
    }
  });

  $("#phone").on("focus",function() {
    testForm("#phoneMsg",["请勿输入空手机号码","输入的手机号码有误","请输入11位的手机号码"]);
  });

  /*[a-z] :email前缀必须为英文字母
     [-_]?:0或1个-，因为-不能联系出现
  */
  $("#email").on("blur",function(){
    if($(this).val()==""){
      nullInput("#emailMsg","请勿输入空邮箱");
      $(this).val("");
      return;
    }
    var reg = /^[a-z0-9]+[-_]?[a-z0-9]+@[a-z0-9]+[-_]?[a-z0-9]+[\.][a-z]{2,3}$/gi;
    if(reg.test($(this).val())){
      $("#emailMsg").html("输入的邮箱可用");
      $("#emailMsg").css("color","#17A05E");
    }else{
      nullInput("#emailMsg","输入的邮箱有误");
      $(this).val("");
    }
  });

  $("#email").on("focus",function(){
    testForm("#emailMsg",["请勿输入空邮箱","输入的邮箱有误","格式如xx@xxx.com"]);
  });
  /*点击注册*/
  $(".login-btn").on("click",function(){

      var uname = $("#uname").val();
      var upwd = $("#upwd").val();
      var phone = $("#phone").val();
      var email = $("#email").val();
      if(!uname || !upwd || !phone || !email) {
         $(".overlay").css("display","block");
         $(".lightbox").css("display","block");
         $(".lightbox").html("注册失败,请输入正确的信息");
         setTimeout(function(){
           $(".overlay").css("display","none");
           $(".lightbox").css("display","none");
         },2000);
         return;
      }
      $.ajax({
        url: "data/user_add.php",
        type: "GET",
        data: "uname=" + uname + "&upwd=" + upwd + "&phone=" + phone + "&email=" + email,
        success: function (txt) {
          console.log(txt);
          $(".overlay").css("display","block");
          $(".lightbox").css("display","block");
          $(".lightbox").html("恭喜您注册成功,请稍后");
          sessionStorage.setItem("uname", uname);
          setTimeout(function(){location.href = "new.html"},2000);
        }
      });
  });
});

/*重新获得焦点的时候*/
function testForm(ele,arr){
  if($(ele).html() == arr[0] || $(ele).html() == arr[1]) {
    $(ele).html(arr[2]);
    $(ele).css("color", "#fff");
  }
}
function nullInput(ele,str) {
    $(ele).html(str);
    $(ele).css("color", "#FF1B2D");
}