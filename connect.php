<?php
    $server = "localhost";
    $user = "root";
    $pass = "mysql";
    $dbase = "kert4";

    $conn = mysqli_connect($server, $user, $pass, $dbase);

    if ($conn->connect_error) {
        die("Connect error: ". $conn->connect_error);
    } else {
        echo "<script>console.log('Connected successfully')</script>";
    }
?>