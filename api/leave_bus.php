<?php
	include "connect.php";
	if(isset($_POST["bus_id"])){
		$bus_id = $_POST["bus_id"];
		$sql = "UPDATE mini_bus 
				SET d_id = 'none', is_available = '1'
                WHERE m_b_id = '$bus_id'
                ";
		if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
			if($result){
				$data['success'] = "Bus Aquired!";
				echo "Success!";
			}
			else{
				$data['error'] = "An error Occured!";
				echo "An error Occured!";
			}
		}
        else{
			echo "Bus Aquired!";
		}
	}
	else{
		$data['success'] = "No Data!";
		echo "No Data!";
	}
?>