<?php
header("Content-Type:application/json;charset=utf-8");
@$uname = $_REQUEST['uname'];//@压制警告消息
@$pid = $_REQUEST['pid'];
@$pcolor = $_REQUEST['pcolor'];
@$psize = $_REQUEST['psize'];
@$price = $_REQUEST['price'];
@$pnum = $_REQUEST['pnum'];

if(!$uname || !$pid){
      //若客户端未提交必须的数据
  echo "{}";
  return;
  //退出当前PHP页面的执行
};
$conn = mysqli_connect("localhost","root","","freestyle");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$ouput =[
    "uid" =>0,
    "cid" =>0,
    "pid"=>intval($pid),
    "count"=>0,
    "msg"=>null
];
/*sql1 根据uname查询uid*/
$sql = "SELECT uid FROM shoe_user WHERE uname='$uname' ";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_assoc($result);
$uid = $list["uid"];
$output["uid"]=intval($uid);

/*sql2 根据用户编号查询购物车编号*/
$sql ="SELECT cid FROM shoe_cart WHERE userId='$uid'";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_assoc($result);
if($list){
  $cid = $list["cid"];
}else{
  /*sql3 购物车表中插入一行记录*/
      $sql = "INSERT INTO shoe_cart VALUES(NULL,$uid)";
      mysqli_query($conn,$sql);
      $cid = mysqli_insert_id($conn);
}
$output["cid"]=intval($cid);

/*sql4  根据购物车编号查找数据库是否购买过该产品*/
$sql = "SELECT count FROM shoe_cart_detail WHERE cartId='$cid' AND productId='$pid' AND pcolor='$pcolor' AND price='$price' AND psize='$psize'";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_assoc($result);
if($list){
  $count = intval($list["count"]);
  $count = $count + $pnum;
   /*sql5*/
   $sql = "UPDATE shoe_cart_detail SET count = $count WHERE cartId='$cid' AND productId='$pid' AND pcolor='$pcolor' AND price='$price' AND psize='$psize' AND count='$pnum'";
   $result = mysqli_query($conn,$sql);
}else{
   /*sql6*/
       $sql = "INSERT INTO shoe_cart_detail VALUES(NULL,'$cid','$pid','$psize','$pcolor','$price','$pnum')";
       $result = mysqli_query($conn,$sql);
       $count =$pnum;
}
$output["count"]=$count;
if($result){
  $output["msg"]="succ";
}else{
  $output["msg"]="err";
}
echo json_encode($output);
//$sql = "SELECT cid FROM jd_cart WHERE "