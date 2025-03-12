<?php include 'connect.php'; ?>
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <style>
    <?php include 'style.css'; ?>
  </style>  
  <title>Garden Planner</title>
</head>
<body>

  <div class="about-container">
    <h1>Kerttervező</h1>
      <label for="width">Milyen széles legyen a kerted? (*10cm)</label>
      <input id="planter-width" name="width" type="number" placeholder="10" min="1">
      <br>
      <label for="length">Milyen hosszú legyen a kerted? (*10cm)</label>
      <input id="planter-length" name="length" type="number" placeholder="10" min="1">
      <br>
    <label for="plant">Növény kiválasztása:</label>
      <select id="plant" name="plant">
        <?php 
          $sql = "SELECT Nev FROM faj";
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
      <div id="gombs">
        <button id="add-plant">Növény hozzáadása</button>
        <a href="#link" id="gomb">Új növény felvétele</a>

    <form method="POST" action="addproba.php" id="link">
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
              <td>Színe: </td>
              <td><input type="color" name="szin" id="szin" value="#e77be7"></td>
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
                <td><input type="reset" value="Töröl" id="torol"></td>
                <td><input type="submit" value="Elküld" id="elkuld"></td>
                <td><a href="#" id="vissza">Bezár</a></td>
            </tr>
        </table>
    </form>
      </div>
      <div id="kertKuldGomb"><button id="gen" onclick="kertkeszito()">Kert elkészitése</button></div>
      <div id="addfel">

      </div>
      
    <ul id="plant-list">
          
    </ul>
    
  </div>
    
   
  <div class="container">
      <!--<div id="kert"></div>-->
    <div class="garden-bed"></div>
  </div>
  <script>
      <?php include 'script.js'; ?>
  </script>
</body>
</html>
<?php
mysqli_close($conn);
?>
