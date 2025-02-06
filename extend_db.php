<?php
$server = "localhost";
$user = "root";
$pass = "mysql";
$dbase = "kert";

$conn = mysqli_connect($server, $user, $pass, $dbase);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] == 'extend') {
    $width = intval($_POST['planter_width']) ?: 1;
    $length = intval($_POST['planter_length']) ?: 1;
    $plant = $_POST['plant'];
    $quantity = intval($_POST['quantity']);

    // Az adatbázis kiterjesztésének egy példája (pl. új növény hozzáadása)
    $stmt = $conn->prepare("INSERT INTO plants (name, quantity) VALUES (?, ?)");
    $stmt->bind_param("si", $plant, $quantity);

    if ($stmt->execute()) {
        echo "Database successfully updated!";
    } else {
        echo "<script>console.log('Debug Objects: " . $stmt->error . "' );</script>";
    }

    $stmt->close();
}

mysqli_close($conn);
?>
