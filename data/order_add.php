<?php
header("Content-Type:application/json;charset=utf-8");
$orderNum = rand(1000000000,10000000000);//$_REQUEST["orderNum"];
$rcvName = $_REQUEST["rcvName"];
$price = $_REQUEST["price"];
$payment = $_REQUEST["payment"];
$orderTime = time() * 1000;
$status = 1;//刚生成的订单状态都是"等待付款"
$uname = $_REQUEST["uname"];
$productList = $_REQUEST["productList"];
$productList = json_decode($productList);
/*$cid = $_REQUEST["cid"];
$productId = $_REQUEST["pid"];*/

$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
/*通过用户名找uid*/
$sql = "SELECT uid FROM shoe_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$uid = mysqli_fetch_assoc($result)['uid'];

/*插入订单*/
$sql = "INSERT INTO shoe_order VALUES(null,'$orderNum','$rcvName','$price','$payment','$orderTime','$status','$uid');
$result = mysqli_query($conn,$sql);
$oid = mysqli_insert_id($conn);

for($productList as $i){
   $pid = $i->productId;
   $count = $i ->count
   /*插入订单详情*/
   $sql = "INSERT INTO shoe_order_detail VALUES(null,'$oid','$pid','$count');
   mysqli_query($conn,$sql);
}


$output = [];
if($oid){
  $output['msg'] = "succ";
  $output['oid'] = $oid
  $output['orderNum'] = $orderNum;
}else{
  $output['msg'] = "err";
}

echo json_encode($output);