CREATE TABLE heroes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  creators TEXT NOT NULL,
  aliases TEXT NOT NULL,
  partnerships TEXT NOT NULL
)

CREATE TABLE universes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  link TEXT NOT NULL
)

CREATE TABLE abilities (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL
)

CREATE TABLE heroes_universes (
  hero_id INT REFERENCES heroes(id),
  universe_id INT REFERENCES universes(id),
  PRIMARY KEY (hero_id, universe_id)
)

CREATE TABLE heroes_abilities (
  hero_id INT REFERENCES heroes(id),
  ability_id INT REFERENCES abilities(id),
  PRIMARY KEY (hero_id, ability_id)
)




INSERT INTO heroes (name, image, creators, aliases, partnerships) VALUES

('Superman', 'https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png', 'Jerry Siegel, Joe Shuster', 'Man of Steel, Last Son of Krypton, Kal-El', 'Justice League, Batman, Wonder Woman'), -- DC

('Batman', 'https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg', 'Bob Kane, Bill Finger', 'The Dark Knight, Caped Crusader, Bruce Wayne', 'Justice League, Robin, Alfred Pennyworth'), -- DC

('Wonder Woman', 'https://upload.wikimedia.org/wikipedia/en/6/6b/Wonder_Woman_750.jpg', 'William Moulton Marston, H. G. Peter', 'Princess Diana, Amazon Princess, Warrior of Truth', 'Justice League, Superman, Batman'), -- DC

('Spider-Man', 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png', 'Stan Lee, Steve Ditko', 'Friendly Neighborhood Spider-Man, The Amazing Spider-Man, Peter Parker', 'Avengers, Iron Man, Doctor Strange'), -- Marvel

('Captain America', 'https://upload.wikimedia.org/wikipedia/en/b/bf/CaptainAmericaHughes.jpg', 'Joe Simon, Jack Kirby', 'Sentinel of Liberty, Cap, Steve Rogers', 'Avengers, Bucky Barnes, Falcon'), -- Marvel

('Iron Man', 'https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png', 'Stan Lee, Don Heck, Larry Lieber, Jack Kirby', 'Armored Avenger, Tony Stark', 'Avengers, War Machine, Pepper Potts'), -- Marvel

('The Flash', 'https://upload.wikimedia.org/wikipedia/en/e/ed/The_Flash_Family.jpg', 'Gardner Fox, Harry Lampert', 'Scarlet Speedster, Barry Allen, Wally West', 'Justice League, Green Arrow, Kid Flash'), -- DC

('Aquaman', 'https://upload.wikimedia.org/wikipedia/en/9/9d/Aquaman_Rebirth_1.png', 'Paul Norris, Mort Weisinger', 'King of Atlantis, Arthur Curry, King Orin
King of the Seven Seas', 'Justice League, Mera, Ocean Master'), -- DC 

('Catwoman', 'https://upload.wikimedia.org/wikipedia/en/e/e4/Catwoman_Infobox.jpg', 'Bill Finger, Bob Kane', 'Selina Kyle, The Cat', 'Batman, Gotham City Sirens'); -- DC

('Black Widow', 'https://upload.wikimedia.org/wikipedia/en/1/1b/Black_Widow_1.png', 'Stan Lee, Don Rico, Don Heck', 'Natasha Romanova, Natalia Alianovna Romanova', 'Avengers, Hawkeye, Nick Fury'); -- Marvel


INSERT INTO universes (name, link) VALUES
('DC Comics', 'https://www.dc.com/'),
('Marvel Comics', 'https://www.marvel.com/');

INSERT INTO heroes_universes (hero_id, universe_id) VALUES
(1, 1), -- Superman (DC Comics)
(2, 1), -- Batman (DC Comics)
(3, 1), -- Wonder Woman (DC Comics)
(4, 2), -- Spider-Man (Marvel Comics)
(5, 2), -- Captain America (Marvel Comics)
(6, 2), -- Iron Man (Marvel Comics)
(7, 1), -- The Flash (DC Comics)
(8, 1), -- Aquaman (DC Comics)
(9, 2), -- Black Widow (Marvel Comics)
(10, 1); -- Catwoman (DC Comics)




INSERT INTO abilities (name) VALUES
('Flight'),
('Strength'),
('Super Vision'),
('Unnatural Breathing'),
('Intellect'),
('Martial Arts'),
('Wealth'),
('Speed'),
('Agility'),
('Espionage'),
('Thievery');

INSERT INTO heroes_abilities (hero_id, ability_id) VALUES
(1, 1), -- Superman: Flight
(1, 2), -- Superman: Strength
(1, 3), -- Superman: Super Vision
(2, 5), -- Batman: Intellect
(2, 6), -- Batman: Martial Arts
(2, 7), -- Batman: Wealth
(2, 9), -- Batman: Agility
(3, 1), -- Wonder Woman: Flight
(3, 2), -- Wonder Woman: Strength
(3, 6), -- Wonder Woman: Martial Arts
(4, 2), -- Spider-Man: Strength
(4, 9), -- Spider-Man: Agility
(5, 2), -- Captain America: Strength
(5, 5), -- Captain America: Intellect
(5, 9), -- Captain America: Agility
(6, 1), -- Iron Man: Flight
(6, 5), -- Iron Man: Intellect
(6, 7), -- Iron Man: Wealth
(7, 8), -- The Flash: Speed
(8, 2), -- Aquaman: Strength
(8, 4), -- Aquaman: Unnatural Breathing
(9, 5), -- Black Widow: Intellect
(9, 6), -- Black Widow: Martial Arts
(9, 10), -- Black Widow: Espionage
(10, 6), -- Catwoman: Martial Arts
(10, 9), -- Catwoman: Agility
(10, 11); -- Catwoman: Thievery


-------------------------------------------------------------------------

-- filter based on universe
SELECT heroes.name AS h, universes.name AS u
FROM heroes
INNER JOIN heroes_universes
ON heroes.id = heroes_universes.hero_id
INNER JOIN universes
ON universes.id = heroes_universes.universe_id
WHERE universes.name = 'DC Comics'

SELECT heroes.name AS h, universes.name AS u
FROM heroes
INNER JOIN heroes_universes
ON heroes.id = heroes_universes.hero_id
INNER JOIN universes
ON universes.id = heroes_universes.universe_id
WHERE universes.name = 'Marvel Comics'


-- arrays
SELECT universes.name AS u, ARRAY_AGG(heroes.name)
FROM heroes
INNER JOIN heroes_universes
ON heroes.id = heroes_universes.hero_id
INNER JOIN universes
ON universes.id = heroes_universes.universe_id
GROUP BY universes.name


-- post form
INSERT INTO heroes (name, image, creators, aliases, partnerships) VALUES ($1, $2, $3, $4, $5)