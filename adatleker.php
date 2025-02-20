<?php
// Adatbázis kapcsolat
$host = 'localhost'; // Az adatbázis szerver
$db = 'kert4';     // Az adatbázis neve
$user = 'root';      // Az adatbázis felhasználó
$pass = 'mysql';          // Az adatbázis jelszava

try {
    // PDO kapcsolat létrehozása
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Adatok fogadása a POST kérésből
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['plant']) && isset($data['quantity'])) {
        // SQL lekérdezés előkészítése
        $stmt = $pdo->prepare("INSERT INTO plants (name, quantity) VALUES (:plant, :quantity)");
        $stmt->bindParam(':plant', $data['plant']);
        $stmt->bindParam(':quantity', $data['quantity']);

        // Lekérdezés végrehajtása
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Plant added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add plant']);
        }
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

