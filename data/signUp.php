<?php
header("Content-Type:text/plain");
$uname = $_REQUEST['uname'];
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * from shoe_user WHERE uname='$uname'";
 $result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if(!$row){
        echo "succ";
}else{
        echo "err";
}
