CREATE TYPE beer_type AS ENUM (
    'Belgian Ale',
    'Blonde Ale',
    'Cider',
    'Coffee Porter',
    'Cream Ale',
    'IPA',
    'New England IPA',
    'Pale Ale',
    'Pilsner',
    'Porter',
    'Imperial Stout',
    'Saison',
    'Stout',
    'Sour'
);

ALTER TABLE beerndonuts_beers
    ADD COLUMN
        style beer_type;