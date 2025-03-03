<?php

// Adatbázis kapcsolat
$host = 'localhost'; 
$db = 'kert4';     
$user = 'root';      
$pass = 'mysql';          

try {
    // PDO kapcsolat létrehozása
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Adatok fogadása a POST kérésből
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['plant'])) {
        $plant = $data['plant'];

        // Növény alapadatainak lekérése
        $stmt = $pdo->prepare("
            SELECT Faj.Nev, Faj.Sortavolsag, Faj.Totavolsag, Fajta.FajNev
            FROM Faj
            JOIN Fajta ON Faj.FajtaID = Fajta.FajtaID
            WHERE Faj.Nev = :plant
        ");
        $stmt->bindParam(':plant', $plant);
        $stmt->execute();
        $plantData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($plantData) {
            $fajtaNev = $plantData['FajNev']; // Az adott növény fajtája

            // Barátok lekérése
            $stmtFriends = $pdo->prepare("
                SELECT f2.FajNev 
                FROM SzeretNemSzeret sz
                JOIN Fajta f1 ON sz.ID1 = f1.FajtaID
                JOIN Fajta f2 ON sz.ID2 = f2.FajtaID
                WHERE f1.FajNev = :fajtaNev AND sz.Kapcsolat = 'Szeret'
            ");
            $stmtFriends->execute(['fajtaNev' => $fajtaNev]);
            $friends = $stmtFriends->fetchAll(PDO::FETCH_COLUMN);

            // Ellenségek lekérése
            $stmtEnemies = $pdo->prepare("
                SELECT f2.FajNev 
                FROM SzeretNemSzeret sz
                JOIN Fajta f1 ON sz.ID1 = f1.FajtaID
                JOIN Fajta f2 ON sz.ID2 = f2.FajtaID
                WHERE f1.FajNev = :fajtaNev AND sz.Kapcsolat = 'Nemszeret'
            ");
            $stmtEnemies->execute(['fajtaNev' => $fajtaNev]);
            $enemies = $stmtEnemies->fetchAll(PDO::FETCH_COLUMN);

            // JSON válasz küldése
            echo json_encode([
                'success' => true,
                'plant' => $plantData,
                'likes' => $friends,
                'dislikes' => $enemies
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Növény nem található']);
        }
    } else {
        echo json_encode(['error' => 'Érvénytelen bemenet']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
