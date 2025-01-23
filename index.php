<?php
$server = "localhost";
$user = "root";
$pass = "";
$dbase = "kert";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$conn = mysqli_connect($server, $user, $pass, $dbase);

if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}
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
      <label for="width">How many feet wide is your planter?</label>
      <input id="planter-width" name="width" type="number" value="1" min="1">
      <br>
      <label for="length">How many feet long is your planter?</label>
      <input id="planter-length" name="length" type="number" value="1" min="1">
      <br>
      <button id="submit" type="button" onclick="setPlanterSize()">Help</button>
  </div>

  <div class="container">
    <div class="garden-bed"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
<?php
mysqli_close($conn);
?>
