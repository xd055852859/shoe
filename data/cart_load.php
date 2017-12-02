<?php
header("Content-Type:application/json");
$uname = $_REQUEST['uname'];
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT DISTINCT shoe_product.*,shoe_cart_detail.*
        FROM shoe_user inner join shoe_cart inner join shoe_cart_detail inner join shoe_product
             on shoe_cart.userId = (SELECT uid FROM shoe_user WHERE uname='$uname')
             and shoe_cart.cid=shoe_cart_detail.cartId
             and shoe_cart_detail.productId = shoe_product.pid";
$result = mysqli_query($conn,$sql);
$list= mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);