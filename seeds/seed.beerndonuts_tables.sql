BEGIN;

TRUNCATE
    beerndonuts_comments,
    beerndonuts_beers
    RESTART IDENTITY CASCADE;

INSERT INTO beerndonuts_beers (style, donut_pairing, tasting_notes)
VALUES
    ('Belgian_Ale', 'Sprinkled Donut', 'PLACEHOLDER TEXT'),
    ('Blonde_Ale', 'Plain glazed Donut', '	Buttery and Sweet, meet rich and golden'),
    ('Cider', 'Plain Old Fashioned Doughnut', 'Buttery and Sweet, meet rich and golden'),
    ('Coffee_Porter', 'Louisiana Beignets', 'PLACEHOLDER TEXT'),
    ('IPA', 'Chocolate Glazed Doughnut', 'Big, bitter flavors offset sweetness'),
    ('NEIPA', 'Strawberry Glazed donut', 'Get berry blasted with full-on juice bomb'),
    ('Pale_Ale', 'Boston Cream Donut', 'PLACEHOLDER TEXT'),
    ('Pilsner', 'Powdered Sugar Donut', 'Light and airy'),
    ('Porter', 'Long John', 'PLACEHOLDER TEXT'),
    ('Russian_Imperial_Stout', 'New England Cider Donut', 'PLACEHOLDER TEXT'),
    ('Saison', 'New York City Cronut', 'PLACEHOLDER TEXT'),
    ('Stout', 'Cinnamon Sugar Donut', 'Bring ot the rich, spiced flavors'),
    ('Sour', 'Jelly Filled Donut', 'PLACEHOLDER TEXT');

INSERT INTO beerndonuts_comments (text, beer_id)
VALUES
    ('This pairing is so good! Everyone should try a Belgian Ale and a sprinkled donut combo', 1),
    ('Great pair! A match made in heaven!', 3);

COMMIT;