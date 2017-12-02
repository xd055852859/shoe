/**
 * Created by bjwsl-001 on 2016/10/20.
 */
$(function(){
  $.ajax({
    url:"data/product_search.php",
    type:"GET",
    success:function(list){
      var html = "";
      for(var i=0;i<list.length;i++){
        var arr = list[i];
        var pic = arr["bpic"].split("|")[0];
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
      $("#product-menu").html(phtml+html);
    }
  });
  $("#product-menu").on("click",".like-box",function(){
     location.href = "single.html?pid="+$(this).attr("id");
  })
});