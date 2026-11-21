DROP TABLE IF EXISTS campanha_ficha;
DROP TABLE IF EXISTS ficha;
DROP TABLE IF EXISTS atributos;
DROP TABLE IF EXISTS arquetipo;
DROP TABLE IF EXISTS campanha_membro;
DROP TABLE IF EXISTS campanha;
DROP TABLE IF EXISTS perfil;


CREATE TABLE perfil(
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE campanha(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE campanha_membro(
    id SERIAL PRIMARY KEY,
    id_campanha INT NOT NULL REFERENCES campanha(id),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    funcao VARCHAR(20) CHECK (funcao IN ('jogador', 'mestre')),
    UNIQUE(id_campanha, user_id)
);

CREATE TABLE arquetipo(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20),
    descricao TEXT
);

CREATE TABLE atributos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20),
    descricao TEXT
);

CREATE TABLE ficha(
    id SERIAL PRIMARY KEY,
    nome_jogador VARCHAR(50),
    -- mostrar erro se a vida for maior que 6
    vida INT CHECK (vida <= 6), 
    dados INT CHECK (dados <= 6),
    habilidades TEXT,
    id_arquetipo INT REFERENCES arquetipo(id),
    id_atributos INT REFERENCES atributos(id),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE campanha_ficha(
    id_campanha INT REFERENCES campanha(id),
    id_ficha INT REFERENCES ficha(id),
    PRIMARY KEY(id_campanha, id_ficha)
);

INSERT INTO arquetipo(nome, descricao)
VALUES

('Atleta', 'Acostumado a explorar os limites do seu corpo, muito útil quando se está no meio de um massacre'),
('Cético', 'Duvida do perigo até o último segundo, mas seu lado lógico ajuda bastante.'),
('Esbelto', 'Extremamente atraente aos olhos de todos.'),
('Herói', 'Está lá para salvar todos, enfrentanto o perigo sem medo.'),
('Inocente', 'Não fez nada de errado, é uma pessoa boa e confiável.'),
('Nerd', 'Ocupado demais com a cabeça enfiada nos livros, terá um futuro brilhante se sobreviver.'),
('Relaxado', 'Está com a cabeça em outro lugar na maior parte do dia.'),
('Valentão', 'Parece um babaca, exceto quando tem um assasino a solta.');

INSERT INTO atributos(nome, descricao)
VALUES

('Carisma', 'Determina o quanto um personagem é socialmente amigável ou atrativo.'),
('Destreza', 'Reflete a destreza e rapidez do personagem'),
('Força', 'Representa a potência física do personagem.'),
('Inteligência', 'Mede a capacidade mental do personagem.'),
('Vigor', 'Indica a resistência física e mental do personagem.');