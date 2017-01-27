<?php
include("connection.php");
//extract($_POST);
$usid=$_POST['id'];
$name=$_POST['name'];
$email=$_POST['email'];
$message=$_POST['message'];
$date=$_POST['date'];

$query="UPDATE detail
SET `name`= '$name',`email`='$email',`message`='$message'
WHERE `userid`='$usid'";

$res=mysqli_query($conn,$query);


?>