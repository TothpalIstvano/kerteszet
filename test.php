<?php include 'connect.php'; 

// Új növény hozzáadása az adatbázishoz
/*if ($_SERVER["REQUEST_METHOD"] == "POST") {
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

mysqli_close($conn);*/
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
    
    
      <label for="width">How many feet wide is your planter?</label>
      <input id="planter-width" name="planter_width" type="number" value="1" min="1">
      <br>
      <label for="length">How many feet long is your planter?</label>
      <input id="planter-length" name="planter_length" type="number" value="1" min="1">
      <br>
      <label for="plant">Növény kiválasztása:</label>
      <select id="plant" name="plant">
        <?php 
          $sql = "SELECT Nev FROM Faj";
          $result = mysqli_query($conn, $sql);
          foreach ($result as $row) {
            echo "<option value='" . $row['Nev'] . "'>" . $row['Nev'] . "</option>";
          }
        ?>
      </select>
      <br>
      <label for="quantity">Mennyiség:</label>
      <input id="quantity" name="quantity" placeholder="1" type="number" value="1" min="1">
      <br>
      <button id="add-plant">Nyövény hozzáadása</button>
      <!--
      <button id="extend-db" onclick="extendDB()">Extend Database</button>-->

    <form method="POST" action="addproba.php">
        <table>
            <tr>
                <td>Növény neve: </td>
                <td><input type="text" name = "novNev" id = "novNev" maxlength = "50"></td>
            </tr>
            <tr>
                <td>Növény latin neve: </td>
                <td><input type="text" name="novLatin" id="novLatin"></td>
            </tr>
            <tr>
                <td>Növény sortávolsága: </td>
                <td><input type="number" name="sortav" id="sortav"></td>
            </tr>
            <tr>
                <td>Növény tőtávolsága: </td>
                <td><input type="number" name="totav" id="totav"></td>
            </tr>
            <tr>
                <td>Fajta: </td>
                <td><input type="text" name="fajta" id="fajta"></td>
            </tr>
            <tr>
              <td>Mi mellett szeret lenni:</td>
              <td><select id="szeretMellette" name="szeretMellette">
                <?php 
                  $sql = "SELECT FajtaId, FajNev FROM Fajta";
                  $result = mysqli_query($conn, $sql);
                  foreach ($result as $row) {
                    echo "<option value='" . $row['FajtaId'] . "'>" . $row['FajNev'] . "</option>";
                  }
                ?>
              </select></td>
            </tr>
            <tr>
              <td>Mi mellett NEM szeret lenni:</td>
              <td><select id="nemMellette" name="nemMellette">
                <?php 
                  $sql = "SELECT FajtaId, FajNev FROM Fajta";
                  $result = mysqli_query($conn, $sql);
                  foreach ($result as $row) {
                    echo "<option value='" . $row['FajtaId'] . "'>" . $row['FajNev'] . "</option>";
                  }
                ?>
              </select></td>
            </tr>
            <tr style = "text-align: center;">
                <td><input type="reset" value="Töröl"></td>
                <td><input type="submit" value="Elküld"></td>
            </tr>
        </table>
    </form>
        <ul id="plant-list">
        <!-- Hozzá adott növények -->
        </ul>

        <button id="create-bed" onclick="megcsinál()" type="button">Elkészít</button> <!-- Elküldi a scriptnek a kelő adatokat azaz hogy miből mennyi van -->
    </div>
    
  <div class="container">
    <!--<div class="garden-bed"></div>-->
  </div>
  <script>
      <?php include 'script.js'; ?>
  </script>
</body>
</html>
<?php
mysqli_close($conn);
?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['planter_width']) && isset($_POST['planter_length'])) {
        $width = intval($_POST['planter_width']) ?: 1;
        $length = intval($_POST['planter_length']) ?: 1;
        $count = $width * $length;
    }
}
?>

</body>
</html>

