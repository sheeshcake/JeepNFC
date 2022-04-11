<?php
	include "connect.php";
	if(isset($_POST["card_number"]) && isset($_POST["marshal_id"]) && isset($_POST["location"])){
        $card_number = $_POST["card_number"];
		$marshal_id = $_POST["marshal_id"];
        $location = $_POST["location"];
        $sql = "INSERT INTO route ('route_start')".
                "VALUES ('$driver_id') ";
        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
            $route_id = $conn->insert_id;
            $sql = "INSERT INTO record ('driver_id', 'm_b_id','card_number', 'record_date', 'route_id')".
                    "VALUES ('$driver_id', '$marshal_id', '$card_number', CURDATE()), $route_id";
            if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
                $data['success'] = "Card Registered!";
                echo json_encode($data);
            }else{
                $data['error'] = "An error Occured!";
                echo json_encode($data);
            }
        }else{
            $data['error'] = "An error Occured!";
            echo json_encode($data);
        }
	}
	else{
		echo "No Data!";
	}
?>