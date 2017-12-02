<?php
header("Content-Type:application/json");
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT DISTINCT shoe_product.*,shoe_product_detail.pcolor,shoe_product_detail.psize,shoe_product_detail.price from shoe_product join shoe_product_detail WHERE shoe_product.pid = shoe_product_detail.productId GROUP BY shoe_product_detail.productId";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);