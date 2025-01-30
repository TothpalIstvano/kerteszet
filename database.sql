-- Fajták táblája
CREATE TABLE Varieties (
    VarietyID INT AUTO_INCREMENT PRIMARY KEY,
    VarietyName VARCHAR(100) NOT NULL,
    RowSpacing INT,
    PlantSpacing INT
);

-- Növények táblája
CREATE TABLE Plants (
    PlantID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    LatinName VARCHAR(100) NOT NULL,
    RowSpacing INT,
    PlantSpacing INT,
    VarietyID INT,
    FOREIGN KEY (VarietyID) REFERENCES Varieties(VarietyID)
);

-- Növények közötti kapcsolatok
CREATE TABLE CompanionPlants (
    CompanionID INT AUTO_INCREMENT PRIMARY KEY,
    PlantID1 INT NOT NULL,
    PlantID2 INT NOT NULL,
    Relationship ENUM('Likes', 'Dislikes'),
    FOREIGN KEY (PlantID1) REFERENCES Plants(PlantID),
    FOREIGN KEY (PlantID2) REFERENCES Plants(PlantID)
);

-- Ültetési tervek
CREATE TABLE PlantingPlans (
    PlanID INT AUTO_INCREMENT PRIMARY KEY,
    PlotWidth INT NOT NULL,
    PlotHeight INT NOT NULL,
    NumberOfBeds INT NOT NULL
);

-- Tervhez tartozó növények
CREATE TABLE PlanPlants (
    PlanPlantID INT AUTO_INCREMENT PRIMARY KEY,
    PlanID INT NOT NULL,
    PlantID INT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (PlanID) REFERENCES PlantingPlans(PlanID),
    FOREIGN KEY (PlantID) REFERENCES Plants(PlantID)
);

-- Példaadatok
INSERT INTO Varieties (VarietyName, RowSpacing, PlantSpacing) VALUES
('Paradicsom fajta', 50, 40),
('Paprika fajta', 40, 30),
('Uborka fajta', 60, 50);

INSERT INTO Plants (Name, LatinName, VarietyID) VALUES
('Paradicsom', 'Solanum lycopersicum', 1),
('Paprika', 'Capsicum annuum', 2),
('Uborka', 'Cucumis sativus', 3);

INSERT INTO CompanionPlants (PlantID1, PlantID2, Relationship) VALUES
(1, 2, 'Likes'),
(1, 3, 'Dislikes');