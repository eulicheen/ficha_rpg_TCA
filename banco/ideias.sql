DROP TABLE IF EXISTS campanha_ficha;
DROP TABLE IF EXISTS ficha;
DROP TABLE IF EXISTS atributos;
DROP TABLE IF EXISTS arquetipo;
DROP TABLE IF EXISTS campanha;
DROP TABLE IF EXISTS perfil;


CREATE TABLE perfil(
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id),
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
);

CREATE TABLE campanha(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
);

CREATE TABLE campanha_membro(
    id SERIAL PRIMARY KEY,
    id_campanha INT NOT NULL REFERENCES campanha(id),
    id_perfil INT NOT NULL REFERENCES perfil(id),
    funcao VARCHAR(20) CHECK (funcao IN ('jogador', 'mestre')),
    UNIQUE(id_campanha, id_perfil)
);

CREATE TABLE arquetipo(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    descricao TEXT
);

CREATE TABLE atributos(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
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
    id_pericias INT REFERENCES pericias(id),
    id_perfil INT NOT NULL REFERENCES perfil(id)
);

CREATE TABLE campanha_ficha(
    id_campanha INT REFERENCES campanha(id),
    id_ficha INT REFERENCES ficha(id),
    PRIMARY KEY(campanha_id, ficha_id)
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





-- ideias abandonadas

-- SISTEMA DE PERMISSÕES

DROP TABLE IF EXISTS permissoes_perfil;
DROP TABLE IF EXISTS campanha;
DROP TABLE IF EXISTS permissoes;

CREATE TABLE permissoes(
    id SERIAL PRIMARY KEY,
    cargo VARCHAR(50) CHECK (cargo IN ('jogador', 'mestre')),
    descricao TEXT
);

CREATE TABLE permissoes_perfil(
    id_permissoes INT NOT NULL REFERENCES permissoes(id),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, campanha_id)
);

INSERT INTO permissoes(cargo, descricao)
VALUES

-- JOGADOR
-- cria fichas numa campanha; vê apenas sua ficha; edita apenas sua ficha

-- MESTRE
-- cria campanhas; coloca ficha de players numa campanha; vê todas as fichas; edita todas fichas
-- ao criar campanha temos que conferir se quem está criando é mestre ou jogador, se for jogador não cria campanha


-- selects para ver quem tem permissão do que (função com true e false)
-- https://pt.scribd.com/document/866487945/BRUTAL?_gl=1*tf7jz*_up*MQ..*_ga*NzEwNzIyMjg0LjE3OTUyODY4MjY.*_ga_Z4ZC50DED6*czE3OTUyODY4MjYkbzEkZzAkdDE3OTUyODY4MjYkajYwJGwwJGgw*_ga_8KZ8BV0P5W*czE3OTUyODY4MjYkbzEkZzAkdDE3OTUyODY4MjYkajYwJGwwJGgw
-- https://pt.scribd.com/document/816472418/Brutal-Rpg-Sdfgh#page=10



-- permissões jogador e ficha
CREATE POLICY "Jogador vê apenas sua ficha"
ON ficha FOR SELECT
TO authenticated
WITH CHECK (auth.uid() = id perfil
AND EXISTS (
    SELECT 1 FROM perfil
    WHERE id = auth.uid() AND cargo 'jogador'
    )
);

CREATE POLICY "Jogador cria apenas sua ficha"
ON ficha FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id perfil
AND EXISTS (
    SELECT 1 FROM perfil
    WHERE id = auth.uid() AND cargo 'jogador'
    )
);

CREATE POLICY "Jogador edita apenas sua ficha"
ON ficha FOR UPDATE
TO authenticated
WITH CHECK (auth.uid() = id perfil
AND EXISTS (
    SELECT 1 FROM perfil
    WHERE id = auth.uid() AND cargo 'jogador'
    )
);

CREATE POLICY "Jogador apaga apenas sua ficha"
ON ficha FOR DELETE
TO authenticated
USING (auth.uid() = perfil_id.ficha);