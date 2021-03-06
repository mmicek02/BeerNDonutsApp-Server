BEGIN;

TRUNCATE
    beerndonuts_comments,
    beerndonuts_beers
    RESTART IDENTITY CASCADE;

INSERT INTO beerndonuts_beers (style, donut_pairing, tasting_notes)
VALUES
    ('Belgian', 'Sprinkled Donut', 'A donut this fancy needs a fancy beer to be paired with it. A complex, Belgian ale complements a whimsical, sugary dessert, like a sprinkled donut, perfectly. It’s a match made in sprinkle heaven!'),
    ('Blonde', 'Plain glazed Donut', '	Buttery and Sweet, meet rich and golden.'),
    ('Cider', 'Plain Old Fashioned Doughnut', 'Something as like as a Plain Old Fashioned Doughnut needs a partner that isn’t going to overpower it’s light and airy texture. Match your plain donut up with a cider to keep your palette refreshed while you enjoy your snack.'),
    ('IPA', 'Glazed Doughnut', 'A hoppy India pale ale is an excellent choice when looking for a beer to cut through the richness of a vanilla or chocolate glazed donut. Tropical fruits and citrus notes will take your glazed donut to the next level.'),
    ('Pilsner', 'Powdered Sugar Donut', 'Powdered donuts are light and airy! A beer that’s this tasty pairs great with something that will cleanse the palate and refresh it in preparation for the next powdery bite! Crack open a pilsner the next time you’re ready to get your fingers messy.'),
    ('Porter', 'Long John', 'The roasted malt flavour in porters complements so nicely with anything chocolate. Some might think that a porter would overpower the richness of an Eclair, but have no fear! Porters will complement and intensify the flavour of your Long John donut.'),
    ('Saison', 'New York City Cronut', 'These flaky treats are fried in grapeseed oil, injected with cream, rolled in sugar and glazed. Match those delicate, airy layers with a softly-malted saison. The beer’s natural light earthiness and mild tartness will amp up the buttery goodness from the dessert.'),
    ('Stout', 'Jelly Filled Donut', 'Berry flavours and stouts go great together. The taste of dark berries lasts long on the palette so it is important to pair those flavours with a beer that does the same, like a stout. With subtle hints of chocolate, a stout will only add to a jelly donut’s greatness.'),
    ('Sour', 'Jelly Filled Donut', 'Berry flavours and sours go great together. The taste of dark berries lasts long on the palette so it is important to pair those flavours with a beer that does the same, like a sour.');

INSERT INTO beerndonuts_comments (text, beer_id)
VALUES
    ('This pairing is so good! Everyone should try a Belgian Ale and a sprinkled donut combo', 1),
    ('Great pair! A match made in heaven!', 3);

COMMIT;