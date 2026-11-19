DROP TABLE IF EXISTS
DROP TABLE IF EXISTS
DROP TABLE IF EXISTS 




CREATE TABLE perfil(
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id),
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
);

CREATE TABLE permissoes(
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT,
    cargo VARCHAR(50) CHECK (cargo IN ('jogador', 'mestre'))
);

CREATE TABLE campanha(
    id PRIMARY KEY,
    id_perfil INT NOT NULL REFERENCES perfil(id),
    cargo VARCHAR(50) CHECK (cargo IN ('jogador', 'mestre'))
);

CREATE TABLE permissoes_perfil(
    id_permissoes INT NOT NULL REFERENCES permissoes(id),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, campanha_id)
);




INSERT INTO permissoes(codigo, descricao, cargo)
VALUES

-- JOGADOR
-- cria fichas numa campanha; vê apenas sua ficha; edita apenas sua ficha

-- MESTRE
-- cria campanhas; coloca ficha de players numa campanha; vê todas as fichaa; edita todas fichas
-- ao criar campanha temos que conferir se quem está criando é mestre ou jogador, se for jogador não cria campanha


-- selects para ver quem tem permissão do que (função com true e false)
-- https://pt.scribd.com/document/816472418/Brutal-Rpg-Sdfgh#page=10



CREATE TABLE arquetipo(
    id PRIMARY KEY,
    nome VARCHAR(50),
    descricao TEXT
);

CREATE TABLE pericias(
    id PRIMARY KEY,
    nome VARCHAR(50),
    descricao TEXT
);

CREATE TABLE ficha(
    id PRIMARY KEY,
    nome_player VARCHAR(50),
    vida INT check (vida <= 6),
    dados INT check (dados <= 6),
    habilidades TEXT,
    id_arquetipo INT REFERENCES arquetipo(id),
    id_pericias INT REFERENCES pericias(id)
);

CREATE TABLE campanha_ficha(
    id_campanha INT REFERENCES campanha(id),
    id_ficha INT REFERENCES ficha(id),
    PRIMARY KEY(campanha_id, ficha_id)
);


INSERT INTO arquetipo (nome, descricao)
VALUES

('Herói'),
('Atleta', ''),
('Valentão'),
('Esbelto'),
('Inocente'),
('Nerd'),
('Relaxado'),
('Cético');

INSERT INTO pericias (nome, descricao)
VALUES

('Força', ),
('Agilidade'),
('Astucia'),
('Vigor'),
('Carisma');