<?php
header("Content-Type:application/json");
$kword = $_REQUEST['kword'];
$pid = $_REQUEST['pid'];
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
if(!empty($kword)){
   $sql = "SELECT pid,pname from shoe_product WHERE pname LIKE '%$kword%'";
}else if(!empty($pid)){
   $sql = "SELECT DISTINCT shoe_product.*,shoe_product_detail.*
           from shoe_product join shoe_product_detail
           WHERE shoe_product.pid='$pid'AND shoe_product.pid = shoe_product_detail.productId";
}else{
   $sql = "SELECT DISTINCT shoe_product.*,shoe_product_detail.*
           from shoe_product join shoe_product_detail WHERE shoe_product.pid = shoe_product_detail.productId";
}
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
if($list){
  echo json_encode($list);
}