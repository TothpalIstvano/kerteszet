-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2025. Feb 13. 10:05
-- Kiszolgáló verziója: 8.0.39
-- PHP verzió: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kert`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `companionplants`
--

CREATE TABLE `companionplants` (
  `CompanionID` int NOT NULL,
  `PlantID1` int NOT NULL,
  `PlantID2` int NOT NULL,
  `Relationship` enum('Likes','Dislikes') COLLATE utf8mb3_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `companionplants`
--

INSERT INTO `companionplants` (`CompanionID`, `PlantID1`, `PlantID2`, `Relationship`) VALUES
(1, 1, 2, 'Likes'),
(2, 1, 3, 'Dislikes');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `planplants`
--

CREATE TABLE `planplants` (
  `PlanPlantID` int NOT NULL,
  `PlanID` int NOT NULL,
  `PlantID` int NOT NULL,
  `Quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `plantingplans`
--

CREATE TABLE `plantingplans` (
  `PlanID` int NOT NULL,
  `PlotWidth` int NOT NULL,
  `PlotHeight` int NOT NULL,
  `NumberOfBeds` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `plants`
--

CREATE TABLE `plants` (
  `PlantID` int NOT NULL,
  `Name` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `LatinName` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `RowSpacing` int DEFAULT NULL,
  `PlantSpacing` int DEFAULT NULL,
  `VarietyID` int DEFAULT NULL,
  `new_column` varchar(255) COLLATE utf8mb3_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `plants`
--

INSERT INTO `plants` (`PlantID`, `Name`, `LatinName`, `RowSpacing`, `PlantSpacing`, `VarietyID`, `new_column`) VALUES
(1, 'Paradicsom', 'Solanum lycopersicum', NULL, NULL, 1, NULL),
(2, 'Paprika', 'Capsicum annuum', NULL, NULL, 2, NULL),
(3, 'Uborka', 'Cucumis sativus', NULL, NULL, 3, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `varieties`
--

CREATE TABLE `varieties` (
  `VarietyID` int NOT NULL,
  `VarietyName` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `RowSpacing` int DEFAULT NULL,
  `PlantSpacing` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `varieties`
--

INSERT INTO `varieties` (`VarietyID`, `VarietyName`, `RowSpacing`, `PlantSpacing`) VALUES
(1, 'Paradicsom fajta', 50, 40),
(2, 'Paprika fajta', 40, 30),
(3, 'Uborka fajta', 60, 50);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `companionplants`
--
ALTER TABLE `companionplants`
  ADD PRIMARY KEY (`CompanionID`),
  ADD KEY `PlantID1` (`PlantID1`),
  ADD KEY `PlantID2` (`PlantID2`);

--
-- A tábla indexei `planplants`
--
ALTER TABLE `planplants`
  ADD PRIMARY KEY (`PlanPlantID`),
  ADD KEY `PlanID` (`PlanID`),
  ADD KEY `PlantID` (`PlantID`);

--
-- A tábla indexei `plantingplans`
--
ALTER TABLE `plantingplans`
  ADD PRIMARY KEY (`PlanID`);

--
-- A tábla indexei `plants`
--
ALTER TABLE `plants`
  ADD PRIMARY KEY (`PlantID`),
  ADD KEY `VarietyID` (`VarietyID`);

--
-- A tábla indexei `varieties`
--
ALTER TABLE `varieties`
  ADD PRIMARY KEY (`VarietyID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `companionplants`
--
ALTER TABLE `companionplants`
  MODIFY `CompanionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `planplants`
--
ALTER TABLE `planplants`
  MODIFY `PlanPlantID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `plantingplans`
--
ALTER TABLE `plantingplans`
  MODIFY `PlanID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `plants`
--
ALTER TABLE `plants`
  MODIFY `PlantID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `varieties`
--
ALTER TABLE `varieties`
  MODIFY `VarietyID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `companionplants`
--
ALTER TABLE `companionplants`
  ADD CONSTRAINT `companionplants_ibfk_1` FOREIGN KEY (`PlantID1`) REFERENCES `plants` (`PlantID`),
  ADD CONSTRAINT `companionplants_ibfk_2` FOREIGN KEY (`PlantID2`) REFERENCES `plants` (`PlantID`);

--
-- Megkötések a táblához `planplants`
--
ALTER TABLE `planplants`
  ADD CONSTRAINT `planplants_ibfk_1` FOREIGN KEY (`PlanID`) REFERENCES `plantingplans` (`PlanID`),
  ADD CONSTRAINT `planplants_ibfk_2` FOREIGN KEY (`PlantID`) REFERENCES `plants` (`PlantID`);

--
-- Megkötések a táblához `plants`
--
ALTER TABLE `plants`
  ADD CONSTRAINT `plants_ibfk_1` FOREIGN KEY (`VarietyID`) REFERENCES `varieties` (`VarietyID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
