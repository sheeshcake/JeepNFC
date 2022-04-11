<?php
	include "connect.php";
	if(isset($_POST["username"]) && isset($_POST["password"])){
		$marshall_resource = $_POST["username"];
		$marshall_code = $_POST["password"];
		$sql = "SELECT * FROM marshal WHERE resource = '$marshall_resource' AND marshall_code = '$marshall_code'";
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