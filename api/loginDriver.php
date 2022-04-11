<?php
	include "connect.php";
	if(isset($_POST["username"]) && isset($_POST["password"])){
		$driver_resource = $_POST["username"];
		$driver_password = $_POST["password"];
		$sql = "SELECT * FROM driver WHERE driver_resource = '$driver_resource' AND driver_pass = '$driver_password'";
		if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
			if(mysqli_num_rows($result) == 1){
				$row = $result -> fetch_assoc();
				$data['data'] = $row;
				echo json_encode($data);
			}
			else{
				$data['error'] = "Wrong Username or Password!";
				echo json_encode($data);
			}
		}
	}
	else{
		echo "No Data!";
	}
?>