<?php
	include "connect.php";
	if(isset($_POST["card_number"]) && isset($_POST["marshal_id"]) && isset($_POST["location"])){
        $card_number = $_POST["card_number"];
		$marshal_id = $_POST["marshal_id"];
        $location = $_POST["location"];
        $sql = "SELECT * FROM record WHERE card_number = $card_number AND m_b_id = $marshal_id AND record_date = CURDATE()";
        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
            if(mysqli_num_rows($result) == 1){
                $data['data'] = $result -> fetch_assoc();
                $data['has_record'] = "true";
                echo json_encode($data);
            }else{
                $data['has_record'] = "false";
                echo json_encode($data);
            }
        }else{
            $data['error'] = "An Error Occured!";
            echo json_encode($data);
        }


	}
	else{
		echo "No Data!";
	}
?>