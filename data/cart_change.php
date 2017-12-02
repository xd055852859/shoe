<?php
header("Content-Type:application/json;charset=utf-8");
$did = $_REQUEST['did'];
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "select * from shoe_cart_detail where did='$did'";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
var_dump($list);