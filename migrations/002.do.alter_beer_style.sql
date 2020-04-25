CREATE TYPE beer_type AS ENUM (
    'Belgian Ale',
    'Blonde Ale',
    'Cider',
    'Coffee Porter',
    'Cream Ale'
    'India Pale Ale'
    'IPA'
    'NEIPA'
    'Pale Ale'
    'Pilsner'
    'Porter'
    'Russian Imperial Stout'
    'Saison'
    'Stout '
    'Sour'
);

ALTER TABLE beerndonuts_beers
    ADD COLUMN
        style beer_type;