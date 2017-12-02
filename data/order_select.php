<?php
header("Content-Type:application/json;charset=utf-8");
$uid = $_REQUEST["uid"];
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = `SELECT DISTINCT shoe_cart_detail.*,shoe_order.* from shoe_order join shoe_cart_detail
        ON shoe_order.cartId = shoe_cart_detail.cartId  AND shoe_order.userId = '$uid';`;
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
if($list){
  echo json_encode($list);
}

