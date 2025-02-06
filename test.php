<?php
$server = "localhost";
$user = "root";
$pass = "mysql";
$dbase = "kert";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = mysqli_connect($server, $user, $pass, $dbase);

if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

// Új növény hozzáadása az adatbázishoz
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['planter_width']) && isset($_POST['planter_length'])) {
        $width = intval($_POST['planter_width']) ?: 1;
        $length = intval($_POST['planter_length']) ?: 1;
        $count = $width * $length;
    }

    if (isset($_POST['plant']) && isset($_POST['quantity'])) {
        $plant = $_POST['plant'];
        $quantity = intval($_POST['quantity']);

        // A faj azonosítójának lekérése a növény alapján
        $stmt = $conn->prepare("SELECT FajID FROM Fajta WHERE FajNev = ?");
        $stmt->bind_param("s", $plant);
        $stmt->execute();
        $stmt->bind_result($fajID);
        $stmt->fetch();
        $stmt->close();

        // Ha nincs ilyen faj, hozzuk létre
        if (!$fajID) {
            $stmt = $conn->prepare("INSERT INTO Fajta (FajNev, Sortavolsag, Totavolsag) VALUES (?, 0, 0)");
            $stmt->bind_param("s", $plant);
            $stmt->execute();
            $fajID = $stmt->insert_id;
            $stmt->close();
        }

        // Új növény beszúrása az adatbázisba
        $stmt = $conn->prepare("INSERT INTO Fajta (Nev, LatinNev, Sortavolsag, Totavolsag, FajID) VALUES (?, '', 0, 0, ?)");
        $stmt->bind_param("si", $plant, $fajID);
        $stmt->execute();
        $stmt->close();
    }
}

mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="style.css">
  <title>Garden Planner</title>
</head>
<body>

  <div class="about-container">
    <h1>Garden Planner</h1>
    <p>This is a simple garden planner proof of concept...</p>
    <h2>Let's Set Up Your Bed!</h2>
    <p>What we do is take the width (👈 to 👉) and length (👆 to 👇)...</p>
    
    <form method="POST">
      <label for="width">How many feet wide is your planter?</label>
      <input id="planter-width" name="planter_width" type="number" value="1" min="1">
      <br>
      <label for="length">How many feet long is your planter?</label>
      <input id="planter-length" name="planter_length" type="number" value="1" min="1">
      <br>
      <label for="plant">Choose a plant:</label>
      <select id="plant" name="plant">
        <option value="Bab">Bab</option>
        <option value="Uborka">Uborka</option>
        <option value="Paradicsom">Paradicsom</option>
        <option value="Saláta">Saláta</option>
      </select>
      <br>
      <label for="quantity">Quantity:</label>
      <input id="quantity" name="quantity" placeholder="1" type="number" value="1" min="1">
      <br>
      <button type="submit">Add Plant</button>
    </form>
    
    <button id="extend-db">Extend Database</button>
    
    <ul id="plant-list"></ul>
  </div>

  <div class="container">
    <div class="garden-bed"></div>
  </div>

  <script>
    document.getElementById('extend-db').addEventListener('click', function () {
        const formData = new URLSearchParams();
        formData.append('action', 'extend');

        fetch('extend_db.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
    });
  </script>

</body>
</html>

