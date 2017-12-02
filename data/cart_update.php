<?php
header("Content-Type:text/plain");
$did =$_REQUEST['did'];
$count =$_REQUEST['count'];
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "UPDATE shoe_cart_detail SET count = $count WHERE did='$did'";
$result = mysqli_query($conn,$sql);
if($result){
	echo "succ";
}else{
	echo "err";
}