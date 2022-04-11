<?php
	include "connect.php";
	if(isset($_POST["bus_id"]) && isset($_POST["driver_id"])){
		$bus_id = $_POST["bus_id"];
        $driver_id = $_POST["driver_id"];
		$sql = "UPDATE mini_bus 
				SET d_id = '$driver_id', is_available = '0'
                WHERE m_b_id = '$bus_id'
                ";
		if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
			if($result){
				$data['success'] = "Bus Aquired!";
				echo "Bus Aquired!";
			}
			else{
				$data['error'] = "An error Occured!";
				echo "An error Occured!";
			}
		}else{
			echo "Bus Aquired!";
		}
	}
	else{
		$data['success'] = "No Data!";
		echo "No Data!";
	}
?>