<?php
	include "connect.php";
	if(isset($_POST["card_number"]) && isset($_POST["route_id"]) && isset($_POST["amount"])){
		$route_id = $_POST["route_id"];
        $location = $_POST["location"];
        $amount = $_POST["amount"];
        $card_number = $_POST["card_number"];
        $sql = "UPDATE route SET".
                "end_location = '$location', ".
                "amount = '$amount'". 
                "WHERE route_id = $route_id";
        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
            if($result){
                $sql = "UPDATE record SET".
                        "end_location = '$location', ".
                        "amount = '$amount'". 
                        "WHERE route_id = $route_id";
                if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
                    $sql = "UPDATE customer_card SET".
                            "card_amount = card_amount - $amount, ".
                            "WHERE card_number = $card_number";
                    if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
                        $sql = "INSERT INTO marshall_transaction_record ('m_id', 'cus_id', 'card_id','principal_amount','transaction_date')".
                                "($marshal_id, SELECT cus_id FROM customer_card WHERE card_number = $card_number, $amount, SELECT card_id FROM customer_card WHERE card_number = $card_number, CURDATE())".
                                "WHERE card_number = $card_number";
                        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
                            $data['success'] = "Transaciton Done!";
                            echo json_encode($data);
                        }else{
                            $data['error'] = "An error Occured!";
                            echo json_encode($data);
                        }
                    }else{
                        $data['error'] = "An error Occured!";
                        echo json_encode($data);
                    }
                }else{
                    $data['error'] = "An error Occured!";
                    echo json_encode($data);
                }
            }else{
                $data['error'] = "An error Occured!";
                echo json_encode($data);
            }
        }
	}
	else{
		echo "No Data!";
	}
?>