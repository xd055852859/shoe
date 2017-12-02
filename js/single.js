/**
 * Created by bjwsl-001 on 2016/10/19.
 */
$(function(){
  /*获取产品的列表*/
  var pList = [];
  var pid =location.search.split("=")[1].replace("pid","");
  var uname = sessionStorage.getItem("uname");
  var sendMsg = {};
  $.ajax({
    url:"data/search.php",
    type:"GET",
    data:"pid="+pid+"&kword=",//pid
    success:function(list) {
      /*小图片*/
      var html = "";
      var mpic = "";
      var spic = "";
      var size = "";
      var color = "";
      var colorName = "";
      var count = "";
      var sizeArr = "";
      var colorArr = "";
      var countArr = "";
      pList = list;
      var mArr = list[0]["mpic"].split("|");
      for (var i = 0; i < list.length; i++) {
        var arr = list[i];
        /*分割成带#的字符串*/
          sizeArr += arr["psize"] + "#";
          colorArr += arr["pcolor"]+ "#";
          countArr  += arr["pcount"]+ "#";
        }
        /*字符串去末尾的#形成以#号分割的数组并去重*/
        sizeArr = unrepeateat(sizeArr.substr(0,sizeArr.length-1).split("#"));
        countArr = unrepeateat(countArr.substr(0,countArr.length-1).split("#"));
        colorArr = unrepeateat(colorArr.substr(0,colorArr.length-1).split("#"));
        /*设置初始颜色*/
        sendMsg.pcolor = colorArr[0];
        //.split("|");
        /*循环出小图*/
        for (var j = 0; j < mArr.length; j++) {
           mpic += "<li><img src='images/adidas/" + mArr[j] + "' alt=''></li>";
        }
          /*循环出尺寸，同时将值给该尺寸的数量*/
        for(var k=0;k<sizeArr.length;k++) {
           size += "<option value='"+sizeArr[k]+"'>" + sizeArr[k] + "</option>";
        }
        for(var l=0;l<colorArr.length;l++){
          /*循环出颜色*/
            color += "<li data-pcolor='"+colorArr[l]+"'><img src='images/adidas/shoeColor_"+ colorArr[l].split("|")[0]+".jpg'></li>";
            colorName += colorArr[l].split("|")[1] + "\\";
        }

        html += ` <h1>${list[0].pname}</h1>
                  <i>${list[0].ptype}</i>
                  <div class="product-price">
                    <span>￥${list[0].price}</span>
                    <a href="">评价此商品</a>
                  </div>
                  <hr/>
                  <h2>${colorName.substring(0,colorName.length-1)}</h2>
                  <ul id="color-box">
                    ${color}
                  </ul>
                  <h2>尺码表</h2>
                  <div>
                  <select id="product-size" class="product-type">
                      <option value="">尺码</option>
                      ${size}
                  </select>
                  <select id="product-num" class="product-type">
                      <option value='0'>数量</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                  </select>
                  <div id="product-count" class="product-type">
                  库存
                  </div>
                  <button id="add_cart">加入购物车</button>
                  </div>
                  `;
        /*获取找到鞋子的路径*/
        $("#shoe-type").html(`<li><a href="#">首页 &nbsp;&nbsp;>> &nbsp;&nbsp;</a></li>
                              <li><a href="#">${arr.ptype}&nbsp;&nbsp; >> &nbsp;&nbsp;</a></li>
                              <li><a href="#">${arr.pname}</a></li>`);
        /*左侧的图片*/
        $("#small-box").html(mpic);
        $("#small-box li").on("click",function(){
           $(this).css("border","3px solid red")
                  .siblings().css("border","0px");
           var bigSrc = $(this).find("img").attr("src").replace("middle","big");
           $("#product-img").find("img").attr("src",bigSrc);
        })
        var bArr = list[0]["bpic"].split("|");

        /*中间图片*/
        $("#product-img").html("<img src='images/adidas/" + bArr[0] + "'/><div id='product-overlay'></div><div id='moveDiv'></div><div id='moveImg'><img src='images/adidas/" + bArr[0] + "'/></div>");
        $("#product-overlay").on("mousemove",function(e){
          var x = e.offsetX - $("#moveDiv").width()/2;
          var y = e.offsetY - $("#moveDiv").height()/2;
          var h = $("#moveDiv").parent().height();
          var w = $("#moveDiv").parent().height();

          $("#moveDiv").css({"left":x+"px","top":y+"px","display":"block"});
          $("#moveImg").css({"display":"block"});
          $("#moveImg img").css({"left":-3*x+"px",top:-3*y+"px"});
          if(x < 0){
            $("#moveDiv").css("left","0");
          }else if(x > w-$("#moveDiv").width()){
            $("#moveDiv").css("left",$("#moveDiv").parent().width()-$("#moveDiv").width());
          }
          if(y < 0){
            $("#moveDiv").css("top","0");
          }else if(y > h-$("#moveDiv").height()){
            $("#moveDiv").css("top",$("#moveDiv").parent().height()-$("#moveDiv").height());
          }
        })
        $("#product-overlay").on("mouseout",function() {
          $("#moveDiv").css("display","none");
          $("#moveImg").css("display","none");
        });

        /*右侧信息*/
        $("#product-msg").html(html);

        /*设置初始颜色为黑色*/
        $("#color-box li:first").css("border","3px solid gray");

        /*选取颜色获取数量*/
        $("#color-box").on("click","li",function(){
           sendMsg.pcolor = $(this).data("pcolor");
           $(this).css("border","3px solid gray")
                  .siblings().css("border","0px");
          changeCount(sendMsg,pList);
        });
        /*选取尺寸获取数量*/
        $("#product-size").on("change",function(){
           sendMsg.psize = $(this).val();
           changeCount(sendMsg,pList);
        });

        /*点击购物车将数据传递到数据库页面*/
        $("#add_cart").on("click",function(){
           /*获取购买的数量*/
           sendMsg.pnum = $("#product-num").val();
           sendMsg.price = $(".product-price span").html().substr(1);
           if(!sendMsg.pnum){
              alert("请选择数量");
              return;
           };
          if(!sendMsg.psize){
              alert("请选择尺寸");
              return;
           };
            /*?pid=${pid}&pcolor=${sendMsg.pcolor}&psize=${sendMsg
           .psize}&price=${sendMsg.price}&pnum=${sendMsg.pnum}`*/
           /*location.href必须带参数*/
           $.ajax({
              url:"data/cart_add.php",
              type:"GET",
              data:`pid=${pid}&pcolor=${sendMsg.pcolor}&psize=${sendMsg.psize}&price=${sendMsg.price}&pnum=${sendMsg.pnum}&uname=${uname}`,
              success:function(cart_list){
                console.log(cart_list);
              }
           })
           location.href = "cart.html";
        });
    }

  });
});
function changeCount(obj,arr){
  for(var i =0;i<arr.length; i++){
    for(var j in arr[i]){
      if(arr[i].pcolor == obj.pcolor && arr[i].psize == obj.psize){
        $("#product-count").html("库存: "+arr[i].pcount);
        $(".product-price span").html("￥"+arr[i].price);
        return;
      }
    }
  }
}


