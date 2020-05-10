CREATE TYPE beer_type AS ENUM (
    'Belgian',
    'Blonde',
    'Cider',
    'IPA',
    'PA',
    'Pilsner',
    'Porter',
    'Saison',
    'Stout',
    'Sour'
);

ALTER TABLE beerndonuts_beers
    ADD COLUMN
        style beer_type;