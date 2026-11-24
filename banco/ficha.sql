DROP TABLE IF EXISTS ficha;
DROP TABLE IF EXISTS atributos;
DROP TABLE IF EXISTS arquetipo;
DROP TABLE IF EXISTS perfil;


CREATE TABLE perfil(
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id)
);


CREATE TABLE arquetipo(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20),
);

CREATE TABLE atributos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20),
);

CREATE TABLE ficha(
    id SERIAL PRIMARY KEY,
    nome_jogador VARCHAR(50),
    vida INT CHECK (vida <= 6), 
    dados INT CHECK (dados <= 6),
    habilidades TEXT,
    id_arquetipo INT REFERENCES arquetipo(id),
    id_atributos INT REFERENCES atributos(id),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

INSERT INTO arquetipo(nome)
VALUES

('Atleta'),
('Cético'),
('Esbelto'),
('Herói'),
('Inocente'),
('Nerd'),
('Relaxado'),
('Valentão');

INSERT INTO atributos(nome)
VALUES

('Carisma'),
('Destreza'),
('Força'),
('Inteligência'),
('Vigor');