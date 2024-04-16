create database db_acme_filmes_turma_aa;
use db_acme_filmes_turma_aa;
drop database db_acme_filmes_turma_aa;

create table tbl_classificacao (
id int not null auto_increment primary key,
faixa_etaria varchar(2) not null,
classificacao varchar(100) not null,
caracteristica varchar(100) not null,
icone varchar(45) not null
);

insert into tbl_classificacao (faixa_etaria, classificacao, caracteristica, icone) values
('L', 'Livre', 'Livre para todos os públicos', 'icone_livre.png'),
('10', '10 anos', 'Não recomendado para menores de 10 anos', 'icone_10anos.png'),
('12', '12 anos', 'Não recomendado para menores de 12 anos', 'icone_12anos.png'),
('14', '14 anos', 'Não recomendado para menores de 14 anos', 'icone_14anos.png'),
('16', '16 anos', 'Não recomendado para menores de 16 anos', 'icone_16anos.png'),
('18', '18 anos', 'Não recomendado para menores de 18 anos', 'icone_18anos.png');

create table tbl_filme (
id int not null auto_increment primary key,
nome varchar (80) not null,
sinopse text not null, 
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(300) not null,
valor_unitario float,
id_classificacao int not null, 
FOREIGN KEY (id_classificacao)
REFERENCES tbl_classificacao(id)
);


insert into tbl_filme (nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario, id_classificacao) values
("O Profissional",
 "Em Nova York o assassino profissional Leon (Jean Reno) não vê sentido na vida. Quando a família vizinha é morta por policiais envolvidos com drogas ele decide proteger Mathilda (Natalie Portman), uma menina de 12 anos que é a única sobrevivente da família.", 
 '01:30:00', 
 "1994-09-14", 
 NULL, 
 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adorocinema.com%2Ffilmes%2Ffilme-9684%2F&psig=AOvVaw1ws2baAAIwTZKcG7kEXkkM&ust=1707335903309000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjS_oDAl4QDFQAAAAAdAAAAABAE',
 '50.00',
 1
 ),
 ("Tropa de Elite",
 "Nascimento, capitão da Tropa de Elite do Rio de Janeiro, é designado para chefiar uma das equipes que tem como missão apaziguar o Morro do Turano. Ele precisa cumprir as ordens enquanto procura por um substituto para ficar em seu lugar.", 
 '01:55:00', 
 "2007-10-05", 
 NULL, 
 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adorocinema.com%2Ffilmes%2Ffilme-9684%2F&psig=AOvVaw1ws2baAAIwTZKcG7kEXkkM&ust=1707335903309000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjS_oDAl4QDFQAAAAAdAAAAABAE',
 '50.00',
 2
 );

create table tbl_genero (
id int not null auto_increment primary key,
nome varchar(45) not null
);

insert into tbl_genero (nome) values
("Ação"),
("Comédia"),
("Drama"),
("Romance"),
("Fantasia"),
("Terror"),
("Suspense"),
("Musical"),
("Documentário"),
("Animação"),
("Aventura"),
("Ficção Científica");

create table tbl_filme_genero (
id int not null auto_increment primary key,
id_filme int not null, 
FOREIGN KEY (id_filme)
REFERENCES tbl_filme(id),
id_genero int not null, 
FOREIGN KEY (id_genero)
REFERENCES tbl_genero(id)
);

create table tbl_sexo (
id int not null auto_increment primary key,
sigla varchar(1) not null, 
nome varchar(20) not null
);

insert into tbl_sexo (sigla, nome) values
('M', 'Masculino'),
('F', 'Feminino');


create table tbl_ator (
id int not null auto_increment primary key,
nome varchar(100) not null,
nome_artistico varchar(100) not null,
foto varchar(150) not null,
data_nascimento date not null,
data_falecimento date,
biografia text not null,
sexo varchar(1) not null,
id_sexo int not null,
FOREIGN KEY (id_sexo)
REFERENCES tbl_sexo (id)
);

insert into tbl_ator (nome, nome_artistico, foto, data_nascimento, data_falecimento, biografia, sexo, id_sexo) values
('Johnny Depp', 
'Johnny Depp', 
'johnny_depp.jpg', 
'1963-06-09',
NULL, 
'Ator famoso conhecido por seus papéis em filmes como Piratas do Caribe e Edward Mãos de Tesoura.', 
'M', 
1),

('Scarlett Johansson', 
'Scarlett Johansson', 
'scarlett_johansson.jpg', 
'1984-11-22', 
NULL, 
'Atriz renomada conhecida por seus papéis em filmes como Lost in Translation, Vingadores e Lucy.', 
'F', 
2);

create table tbl_diretor (
id int not null auto_increment primary key,
nome varchar(100) not null,
nome_artistico varchar(100) not null,
foto varchar(150) not null,
data_nascimento date not null,
data_falecimento date,
biografia text not null,
sexo varchar(1) not null,
id_sexo int not null,
FOREIGN KEY (id_sexo)
REFERENCES tbl_sexo (id)
);

insert into tbl_diretor (nome, nome_artistico, foto, data_nascimento, data_falecimento, biografia, sexo, id_sexo)values 
('Quentin Tarantino', 
'Quentin Tarantino', 
'quentin_tarantino.jpg', 
'1963-03-27', 
NULL, 
'Diretor renomado conhecido por filmes como Pulp Fiction, Bastardos Inglórios e Kill Bill.', 
'M', 
1),

('Sofia Coppola', 
'Sofia Coppola',
'sofia_coppola.jpg', 
'1971-05-14', 
NULL, 
'Diretora e roteirista premiada conhecida por Lost in Translation e O Estranho que Nós Amamos.', 
'F', 
2);



create table tbl_nacionalidade (
id int not null auto_increment primary key,
nome varchar(45) not null
);

INSERT INTO tbl_nacionalidade (nome) VALUES ('Brasileiro (a)'),
('Americano (a)'),
('Frances (a)'),
('Italiano (a)'),
('Japones (a)');


create table tbl_ator_nacionalidade (
id int not null auto_increment primary key,
id_ator int not null,
id_nacionalidade int not null,
FOREIGN KEY (id_ator)
REFERENCES tbl_ator (id),
FOREIGN KEY (id_nacionalidade)
REFERENCES tbl_nacionalidade (id)
);

create table tbl_diretor_nacionalidade (
id int not null,
id_diretor int not null,
id_nacionalidade int not null,
FOREIGN KEY (id_diretor)
REFERENCES tbl_diretor (id),
FOREIGN KEY (id_nacionalidade)
REFERENCES tbl_nacionalidade (id)
);

create table tbl_filme_ator (
id int not null auto_increment primary key,
id_ator int not null,
id_filme int not null,
FOREIGN KEY (id_ator)
REFERENCES tbl_ator (id),
FOREIGN KEY (id_filme)
REFERENCES tbl_filme (id)
);

create table tbl_filme_diretor (
id int not null auto_increment primary key,
id_diretor int not null,
id_filme int not null,
FOREIGN KEY (id_diretor)
REFERENCES tbl_diretor (id),
FOREIGN KEY (id_filme)
REFERENCES tbl_filme (id)
);