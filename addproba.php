<!DOCTYPE html>
<html lang="hu">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
                table {
                        border-collapse: collapse;
                        border: 1px solid black;
                }

                th, td {
                        border: 1px solid black;
                }
        </style>
</head>
<body>
    
<?php
        include "connect.php";
        /*$sql = "CREATE TABLE IF NOT EXISTS Faj (FajId INT AUTO_INCREMENT PRIMARY KEY, Nev VARCHAR(100) NOT NULL, LatinNev VARCHAR(100) NOT NULL, Sortavolsag INT, Totavolsag INT, FajtaID INT);";
        if (mysqli_query($conn, $sql)) {
            echo "A tábla létrehozása sikeres" .'<br>';
        } else {
            echo "Sikertelen SQL";
        }

        $sql = "CREATE TABLE IF NOT EXISTS Fajta (FajtaId INT AUTO_INCREMENT PRIMARY KEY, FajNev VARCHAR(100) NOT NULL, Sortavolsag INT, Totavolsag INT);";
        if (mysqli_query($conn, $sql)) {
            echo "A tábla létrehozása sikeres" .'<br>';
        } else {
            echo "Sikertelen SQL";
        }

        $novNev = @$_POST['novNev'];
        $novLatin = @$_POST['novLatin'];
        $sortav = @$_POST['sortav'];
        $totav = @$_POST['totav'];
        $fajta = @$_POST['fajta'];
        
        $sql = "SELECT * FROM Fajta";
        $result = $conn->query($sql);  //resultba kerülnek az adatbázis sorai

        $sql = "INSERT INTO Fajta VALUES(FajtaId, '$fajta', $sortav, $totav);";

        if ($conn->query($sql)) {
            echo "Az adatfelvétel sikeres";
        } else {
            echo "Sikertelen adatfelvétel";
        }

        // a fajtaID az legyen, ami most megadott fajta = egy már adatbázisban lévő fajtával, else az utolsó hozzáadott fajtával

        $sql = "INSERT INTO Faj (Nev, LatinNev, Sortavolsag, Totavolsag)VALUES ('$novNev', '$novLatin', $sortav, $totav);";
        echo "DEBUG: " . $sql;
        if ($conn->query($sql)) {
            echo "Az adatfelvétel sikeres";
        } else {
            echo "Sikertelen adatfelvétel";
        }
        
        $szam = "SELECT Fajta.FajtaId FROM Fajta, Faj where Faj.Sortavolsag = Fajta.Sortavolsag";
        $sql = "INSERT INTO Faj (FajtaID) VALUES ($szam);";
        
        $sql = "SELECT * FROM Faj";
        $result = $conn->query($sql);

        /*echo"<table>";
        echo"<tr>
        <th>Növény neve</th>
        <th>Növény latin neve</th>
        <th>Növény sortávolsága</th>
        <th>Növény tőtávolsága</th>
        <th>Fajta (id 10, 11 stb)</th></tr>";

        if ($result->num_rows > 0) {  //van e az adatbázisban valami
                while ($row = $result->fetch_assoc()) {  //végigmegy a sorokon
                        echo"<tr><td>". $row["Nev"] ."</td><td>". 
                        $row["LatinNev"]."</td><td>". 
                        $row["Sortavolsag"]."</td><td>". 
                        $row["Totavolsag"]."</td><td>". 
                        $row["FajtaId"]."</td></tr>";
                }
        }
        echo"</table>";*/


// Create tables if they don't exist
$sql = "CREATE TABLE IF NOT EXISTS Faj (FajId INT AUTO_INCREMENT PRIMARY KEY, Nev VARCHAR(100) NOT NULL, LatinNev VARCHAR(100) NOT NULL, Sortavolsag INT, Totavolsag INT, FajtaID INT);";
/*if (mysqli_query($conn, $sql)) {
    echo "A tábla létrehozása sikeres" .'<br>';
} else {
    echo "Sikertelen SQL";
}*/

$sql = "CREATE TABLE IF NOT EXISTS Fajta (FajtaId INT AUTO_INCREMENT PRIMARY KEY, FajNev VARCHAR(100) NOT NULL, Sortavolsag INT, Totavolsag INT);";
/*if (mysqli_query($conn, $sql)) {
    echo "A tábla létrehozása sikeres" .'<br>';
} else {
    echo "Sikertelen SQL";
}*/

$sql = "CREATE TABLE IF NOT EXISTS SzeretNemSzeret (ID1 INT NOT NULL, ID2 INT NOT NULL, Kapcsolat ENUM('Szeret', 'Nemszeret'));";
/*if (mysqli_query($conn, $sql)) {
    echo "A tábla létrehozása sikeres" .'<br>';
} else {
    echo "Sikertelen SQL";
}*/

// Get form data
$novNev = @$_POST['novNev'];
$novLatin = @$_POST['novLatin'];
$sortav = @$_POST['sortav'];
$totav = @$_POST['totav'];
$fajta = @$_POST['fajta'];

// Check if Fajta with the same Sortavolsag and Totavolsag exists
$sql = "SELECT FajtaId FROM Fajta WHERE Sortavolsag = $sortav AND Totavolsag = $totav";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // If exists, get the FajtaId
    $row = $result->fetch_assoc();
    $fajtaId = $row['FajtaId'];
} else {
    // If not exists, insert new Fajta and get the FajtaId
    $sql = "INSERT INTO Fajta (FajNev, Sortavolsag, Totavolsag) VALUES ('$fajta', $sortav, $totav)";
    if ($conn->query($sql)) {
        $fajtaId = $conn->insert_id; // Get the last inserted ID
    } else {
        echo "Sikertelen adatfelvétel a Fajta táblába";
        $conn->close();
        exit();
    }
}

// Insert into Faj table with the FajtaId
$sql = "INSERT INTO Faj (Nev, LatinNev, Sortavolsag, Totavolsag, FajtaID) VALUES ('$novNev', '$novLatin', $sortav, $totav, $fajtaId)";
$conn->query($sql);
/*if ($conn->query($sql)) {
    echo "Az adatfelvétel sikeres";
} else {
    echo "Sikertelen adatfelvétel a Faj táblába";
}*/

// Reset auto-increment for Faj table if necessary
$sql = "SELECT MAX(FajId) AS max_id FROM Faj";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$next_id = $row['max_id'] + 1;

$sql = "ALTER TABLE Faj AUTO_INCREMENT = $next_id";
$conn->query($sql);

// Reset auto-increment for Fajta table if necessary
$sql = "SELECT MAX(FajtaId) AS max_id FROM Fajta";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$next_id = $row['max_id'] + 1;

$sql = "ALTER TABLE Fajta AUTO_INCREMENT = $next_id";
$conn->query($sql);

/*$szeretMelyik = $_POST['szeretMellette'];
$nemMelyik = $_POST['nemMellette'];

$sql = "INSERT INTO SzeretNemSzeret (ID1, ID2, Kapcsolat) VALUES ($fajtaId, $szeretMelyik, 'Szeret')";
$sql = "INSERT INTO SzeretNemSzeret (ID1, ID2, Kapcsolat) VALUES ($fajtaId, $nemMelyik, 'Nemszeret')";*/


        $conn->close();
    ?>



</body>
</html>



