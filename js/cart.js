/**
 * Created by bjwsl-001 on 2016/10/21.
 */
$(function(){
  var uname = sessionStorage.getItem("uname");
  if(uname) {
    $.ajax({
      url: "data/cart_load.php",
      type: "GET",
      data: "uname="+uname,
      success: function (list) {
        var html = "";
        var chgHtml = "";
        var priceAll = 0;
        var cid = 0;
        for (var i = 0; i < list.length; i++) {
          var arr = list[i];
          var price = parseFloat(arr.price) * parseFloat(arr.count);
          cid = arr.cartId;
          priceAll += price;
          html += `<div class='product-box'>
                      <img src='images/adidas/${arr.bpic.split('|')[0]}' alt=''>
                      <ul id='did${arr.did}'>
                        <li><span class='productName'>${arr.pname}</span><span>￥${price.toFixed(2)}</span></li>
                        <li><span>款式: ${arr.ptype}</span></li>
                        <li><span>尺寸: EURO ${arr.psize}</span></li>
                        <li><span>颜色: ${arr.pcolor.split("|")[1]}</span></li>
                        <li><span>数量: ${arr.count}</span></li>
                        <li><button data-did='did${arr.did}' class="delBtn">删除</button><button data-did='did${arr.did}' data-count='count${arr.count}' class="chgBtn">编辑</button></li>
                      </ul>
                    </div>`
        }
        $(".cart-box").html("<div class='cart-msg'>您的购物车</div>" + html);
        $("#priceAll").html("订单总额:<span class='shoe-price'>￥" + priceAll.toFixed(2) + "</span>");
        $("#priceSend").html("实际支付运费:<span class='shoe-price'>￥" + (list.length * 6).toFixed(2) + "</span>");
        $("#priceSum").html("订单总计:<span class='shoe-price'>￥" + (priceAll + list.length * 6).toFixed(2) + "</span>");
        //删除按钮
        $(".delBtn").on("click", function () {
          var did = $(this).data("did").replace("did", "");
          $.ajax({
            url: "data/cart_delete.php",
            type: "GET",
            data: "did=" + did,
            success: function (txt) {
              $(".delBtn[data-did=did" + did + "]").parent().parent().parent().remove();
            }
          })
        });
        var did = "";
        var count = "";
        //编辑按钮
        $(".chgBtn").on("click", function () {
          did = $(this).data("did").replace("did", "");
          $(".overlay").css("display", "block");
          $("#chgDiv").css("display", "block");
          var img = $(this).parent().parent().prev().attr("src");
          var arr = [];
          var pname = $("#did"+did+" span:eq(0)").html();
          var price = $("#did"+did+" span:eq(1)").html();
          var ptype = $("#did"+did+" span:eq(2)").html().replace("款式: ","");
          var html = `<img src=${img} alt=''>
                      <ul id='chgDivMsg'>
                        <li><span>${pname}</span></li>
                        <li><span>${ptype}</span></li>
                        <li><span>${price}</span></li>
                        <li><input type='text' placeholder='请输入数量' id='chgCount'/></li>
                        <li><button id='intProduct'>更新商品</button>
                        <button id='closeProduct'>取消</button></li>
                      </ul>`
          $("#chgDiv").html(html);
          //更新商品按钮
          $("#intProduct").on("click", function () {
            count = $("#chgCount").val();
            $.ajax({
              url: "data/cart_update.php",
              type:"GET",
              data:"did=" + did + "&count="+count,
              success:function(list){
                $(".overlay").css("display","none");
                $("#chgDiv").css("display","none");
                $("#chgCount").val("");
                location.reload();
              }
            })
          });
          //取消按钮
          $("#closeProduct").on("click",function(){
            $(".overlay").css("display","none");
            $("#chgDiv").css("display","none");
            $("#chgCount").val("");
          })
        });

        $("#accounts").on("click", function () {
          /*rcvName 收货实名 price 价格 payment 付款方式 (orderTime INT) 下单时间 status (订单状态 INT)
           useId*/
          var rcvName = "qiangdong";
          var price = $("#priceSum span").html().substr(1);
          var orderTime = new Date().toLocaleString();
          var status = 1;
          var payment = 1;
          var uid = 1;
          var pid = 1;
          var orderNum = list.length;
          $.ajax({
            url: "data/order_add.php",
            type: "GET",
            data: `orderNum=${orderNum}&rcvName=${rcvName}&price=${price}&payment=${payment}&orderTime=${orderTime}&status=${status}&useId=${uid}&cid=${cid}&pid=${pid}`,
            success: function (txt) {
              console.log(txt);
            }
          });
        });
      }
    });
  }
});
/*
//JSON.stringify把数组转化成字符串
*/