<?php
	include "connect.php";
	if(isset($_POST["card_number"]) && isset($_POST["amount"])){
        $card_number = $_POST["card_number"];
        $amount = $_POST["amount"];
		$sql = "UPDATE customer_card 
				SET card_amount = card_amount + $amount
                WHERE card_number = '$card_number'
                ";
        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
            echo "Card Loaded!";
		}
        else{
			echo "Error on Loading";
		}


    }