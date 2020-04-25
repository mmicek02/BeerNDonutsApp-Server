CREATE TYPE beer_type AS ENUM (
    'Belgian_Ale',
    'Blonde_Ale',
    'Cider',
    'Coffee_Porter',
    'Cream_Ale',
    'IPA',
    'NEIPA',
    'Pale_Ale',
    'Pilsner',
    'Porter',
    'Russian_Imperial_Stout',
    'Saison',
    'Stout',
    'Sour'
);

ALTER TABLE beerndonuts_beers
    ADD COLUMN
        style beer_type;