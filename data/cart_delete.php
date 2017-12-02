<?php
header("Content-Type:text/plain");
$did =$_REQUEST['did'];
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "DELETE FROM shoe_cart_detail WHERE did='$did'";
$result = mysqli_query($conn,$sql);
if($result){
    echo "succ";
}else{
    echo "err";
}