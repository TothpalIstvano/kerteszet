CREATE TABLE Faj (
    FajID INT AUTO_INCREMENT PRIMARY KEY,
    Nev VARCHAR(100) NOT NULL,              -- Növény magyar neve
    LatinNev VARCHAR(100) NOT NULL,         -- Növény latin neve
    Sortavolsag INT,                       -- Sortávolság (cm)
    Totavolsag INT,                        -- Tőtávolság (cm)
    FajtaID INT,                           -- Fajta azonosítója
    Szin VARCHAR(14)
);

CREATE TABLE Fajta (
    FajtaID INT AUTO_INCREMENT PRIMARY KEY,
    FajNev VARCHAR(100) NOT NULL,       -- Fajta neve
    Sortavolsag INT,                          -- Sortávolság (cm)
    Totavolsag INT                         -- Tőtávolság (cm)
);

CREATE TABLE SzeretNemSzeret (
    KapcsolatID INT AUTO_INCREMENT PRIMARY KEY,
    ID1 INT NOT NULL,                   -- Első növény azonosítója
    ID2 INT NOT NULL,                   -- Második növény azonosítója
    Kapcsolat ENUM('Szeret', 'Nemszeret'),  -- Kapcsolat típusa (szeret/nem szeret)
    FOREIGN KEY (ID1) REFERENCES Fajta(FajtaID),
    FOREIGN KEY (ID2) REFERENCES Fajta(FajtaID)
);

alter table Faj add foreign key (FajtaID) references Faj(FajId);

INSERT INTO Faj (Nev, LatinNev, Sortavolsag, Totavolsag, FajtaID, Szin) VALUES
('Vörösbab', 'Solanum lycopersicum', 60, 10, 1, '#871f10'),
('Fehérbab', 'Capsicum annuum', 60, 10, 1, '#e3988d'),
('Jégbab', 'Cucumis sativus', 60, 10, 1, '#33dbde'),
('Fürtös uborka', 'Cucumis sativus', 100, 20, 2, '#41de33'),
('Saláta uborka', 'Cucumis sativus', 100, 20, 2, '#1fab26'),
('Kígyóuborka', 'Cucumis sativus', 100, 20, 2, '#12731c'),
('Francia levendula', 'Cucumis sativus', 150, 50, 3, '#451296'),
('Édesburgonya', 'Cucumis sativus', 70, 30, 4, '#965d12'),
('Fejeskáposzta', 'Cucumis sativus', 30, 25, 5, '#409e26'),
('Karfiol', 'Cucumis sativus', 30, 25, 5, '#94d950'),
('Kínai káposzta', 'Cucumis sativus', 30, 25, 5, '#b9d950'),
('Vöröskáposzta', 'Cucumis sativus', 30, 25, 5, '#8339cc'),
('Koktélparadicsom', 'Cucumis sativus', 30, 50, 6, '#cc3940'),
('Fejes saláta', 'Cucumis sativus', 25, 20, 7, '#43cc39'),
('Jégsaláta', 'Cucumis sativus', 25, 20, 7, '#39cc91'),
('Tépősaláta', 'Cucumis sativus', 25, 20, 7, '#348c3e'),
('Sütőtök', 'Cucumis sativus', 150, 150, 8, '#8a4b08'),
('Főzőtök', 'Cucumis sativus', 150, 150, 8, '#cc883f'),
('Rubin cékla', 'Cucumis sativus', 40, 15, 9, '#9627d6'),
('Hagyományos cékla', 'Cucumis sativus', 40, 15, 9, '#6d27d6');

INSERT INTO Fajta (FajNev, Sortavolsag, Totavolsag) VALUES
('Bab', 60, 10),
('Uborka', 100, 20),
('Levendula', 150, 50),
('Burgonya', 70, 30),
('Káposzta', 30, 25),
('Paradicsom', 30, 50),
('Saláta', 25, 20),
('Tök', 150, 150),
('Cékla', 40, 15);

INSERT INTO SzeretNemSzeret (ID1, ID2, Kapcsolat) VALUES
(1, 4, 'Szeret'),
(1, 5, 'Szeret'),
(1, 7, 'Szeret'),
(1, 2, 'Szeret'),
(2, 4, 'Nemszeret'),
(2, 5, 'Szeret'),
(2, 6, 'Nemszeret'),
(2, 7, 'Szeret'),
(3, 5, 'Szeret'),
(4, 9, 'Szeret'),
(4, 5, 'Szeret'),
(4, 6, 'Nemszeret'),
(4, 8, 'Nemszeret'),
(5, 9, 'Szeret'),
(5, 7, 'Szeret'),
(5, 6, 'Nemszeret'),
(6, 9, 'Szeret'),
(7, 9, 'Szeret');