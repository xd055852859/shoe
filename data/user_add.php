<?php
header("Content-Type:application/json;charset=utf-8");
$uname = $_REQUEST['uname'];
$upwd = $_REQUEST['upwd'];
$phone = $_REQUEST['phone'];
$email = $_REQUEST['email'];

$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "INSERT INTO shoe_user VALUES(null,'$uname','$upwd','$phone','$email')";
$result = mysqli_query($conn,$sql);
$output = [];
if($result){
	$output['msg'] ='succ';
	$output['uid'] = mysqli_insert_id($conn);
}else{
	$output['msg'] ='err';
}
echo json_encode($output);