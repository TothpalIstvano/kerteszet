<?php
    $server = "localhost";
    $user = "root";
    $pass = "";
    $dbase = "kert";

    $conn = mysqli_connect($server, $user, $pass, $dbase);

    if($conn->connect_error){
        die("Connect error: ".$conn->connection_error);
    }
    else{
        echo"Connect sucessfully";
    }
?>