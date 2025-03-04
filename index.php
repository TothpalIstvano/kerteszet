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
  <style>
    #link {
      display: none;
    }

    #link:target {
      display: block;
    }

    #gombs {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    #gomb {
      text-decoration: none;
      background: green;
      color: black;
      font-size: 13px;
      padding: 1px;
      border: 1px solid black;
    }

    #vissza {
      text-decoration: none;
      background: purple;
      color: black;
      font-size: 13px;
      padding: 1px;
      border: 1px solid black;
    }
  </style>
</head>
<body>

  <div class="about-container">
    <h1>Garden Planner</h1>
    <p>This is a simple garden planner proof of concept...</p>
    <h2>Let's Set Up Your Bed!</h2>
    <p>What we do is take the width (👈 to 👉) and length (👆 to 👇)...</p>
      <label for="width">How many feet wide is your planter?</label>
      <input id="planter-width" name="width" type="number" value="1" min="1">
      <br>
      <label for="length">How many feet long is your planter?</label>
      <input id="planter-length" name="length" type="number" value="1" min="1">
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
        <button id="add-plant">Nyövény hozzáadása</button>
        <a href="#link" id="gomb">Extend Database</a>

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
    <div id="kert"></div>
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
