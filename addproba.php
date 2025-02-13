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
        $sql = "CREATE TABLE IF NOT EXISTS Faj (FajId INT AUTO_INCREMENT PRIMARY KEY, Nev VARCHAR(100) NOT NULL, LatinNev VARCHAR(100) NOT NULL, Sortavolsag INT, Totavolsag INT, FajtaID INT);";
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

        $sql = "INSERT INTO Faj VALUES(FajId, '$novNev', '$novLatin', $sortav, $totav, FajtaID);";

        if ($conn->query($sql)) {
            echo "Az adatfelvétel sikeres";
        } else {
            echo "Sikertelen adatfelvétel";
        }
        
        $sql = "SELECT * FROM Fajta";
        $result = $conn->query($sql);  //resultba kerülnek az adatbázis sorai

        $sql = "INSERT INTO Fajta VALUES(FajtaId, '$fajta', $sortav, $totav);";

        if ($conn->query($sql)) {
            echo "Az adatfelvétel sikeres";
        } else {
            echo "Sikertelen adatfelvétel";
        }
        
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

        $conn->close();
    ?>



</body>
</html>



