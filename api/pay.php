<?php
	include "connect.php";


    function get_card_id($card_number){
        include "connect.php";
        $sql = "SELECT * FROM customer_card WHERE card_number = '$card_number'";
        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
            $row = $result -> fetch_all(MYSQLI_ASSOC);
            return $row;
        }
    }


    if(
        isset($_POST["bus_id"]) &&
        // isset($_POST["amount"]) &&
        isset($_POST["route_id"]) &&
        isset($_POST["card_number"]) &&
        isset($_POST["marshal_id"]) &&
        isset($_POST["driver_id"])
    ){
        $bus_id = $_POST["bus_id"];
        $amount = 0;
        $route_id = $_POST["route_id"];
        $card_number = $_POST["card_number"];
        $marshal_id = $_POST["marshal_id"];
        $driver_id = $_POST["driver_id"];
        $customer_id = get_card_id($card_number)[0]["cus_id"];
        $card_id = get_card_id($card_number)[0]["card_id"];
        $card_balance = get_card_id($card_number)[0]["card_amount"];
        $date = date("m/d/y");
        $sql = "SELECT * FROM route WHERE route_id = '$route_id'";
        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
            $row = $result -> fetch_assoc();
            $amount = $row["route_amount"];
            if($card_balance >= $amount){
                $sql = "INSERT INTO marshall_transcation_record (m_id, cus_id, card_id, principal_amount, transaction_date) 
                VALUES 
                ('$marshal_id', '$customer_id', '$card_id', '$amount', '$date')";
                if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
                    $sql = "INSERT INTO record (m_b_id, card_number, record_date, route_id, driver_id) 
                        VALUES 
                        ((SELECT m_b_id FROM mini_bus WHERE m_b_id='$bus_id'), '$card_number', '$date', (SELECT route_id FROM route WHERE route_id='$route_id'), (SELECT driver_id FROM driver WHERE driver_id='$driver_id'))";
                    if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
                        $sql = "UPDATE customer_card SET card_amount = card_amount - $amount WHERE card_id = '$card_id'";
                        if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
                            $sql = "SELECT * FROM customer_card WHERE card_id = $card_id";
                            if($result = mysqli_query($conn, $sql) or trigger_error("Query Failed! SQL: sql - ERROR: " . mysqli_error($conn), E_USER_ERROR)){
                                $data = $result -> fetch_assoc();
                                echo json_encode(["message" => "Paid Successfully!", "data" => $data]);
                            }else{
                                echo ("Error1");
                            }
                        }else{
                            echo ("Error2");
                        }
                    }else{
                        echo ("Error3");
                    }
                }else{
                    echo ("Error4");
                }
            }else{
                echo json_encode(["message" => "Insufficient Balance", "data" => $card_balance]);
            }
        }else{
            echo ("Error5");
        }


        




    }