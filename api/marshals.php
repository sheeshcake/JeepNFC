<?php
	include "connect.php";
    $sql = "SELECT * FROM marshal";
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
?>