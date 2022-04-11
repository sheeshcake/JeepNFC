<?php
	include "connect.php";
    if(isset($_POST["bus_id"])){
        $bus_id = $_POST["bus_id"];
        $sql = "SELECT * FROM mini_bus WHERE m_b_id = '$bus_id'";
        $result;
        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
            if(mysqli_num_rows($result) > 0){
                $row = $result -> fetch_all(MYSQLI_ASSOC);
                $data['data'] = $row;
                echo json_encode($data);
            }
            else{
                $data['error'] = "No Bus Available";
                echo json_encode($data);
            }
        }else{
            // $data['data'] = $row;
            echo "Error!";
        }
    }else{
        $sql = "SELECT * FROM mini_bus";
        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
            if(mysqli_num_rows($result) > 1){
                $row = $result -> fetch_all(MYSQLI_ASSOC);
                $data['data'] = $row;
                echo json_encode($data);
            }
            else{
                $data['error'] = "No Bus Available";
                echo json_encode($data);
            }
        }
    }

?>