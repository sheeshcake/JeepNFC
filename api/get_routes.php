<?php
	include "connect.php";
    $sql = "SELECT * FROM route";
    $result;
    if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
        $row = $result -> fetch_all(MYSQLI_ASSOC);
        $data['data'] = $row;
        echo json_encode($data);
    }else{
        echo "An error occured!";
    }