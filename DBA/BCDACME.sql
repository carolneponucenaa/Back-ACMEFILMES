create database db_acme_filmes_turma_aa;
use db_acme_filmes_turma_aa;

create table tbl_flme (
id int not null auto_increment primary key,
nome varchar (80) not null,
sinopse text not null, 
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(300) not null,
valor_unitario float,

unique key (id),
unique index (id)
);

show tables;
describe tbl_flme;

insert into tbl_flme (nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario ) values
("O Profissional",
 "Em Nova York o assassino profissional Leon (Jean Reno) não vê sentido na vida. Quando a família vizinha é morta por policiais envolvidos com drogas ele decide proteger Mathilda (Natalie Portman), uma menina de 12 anos que é a única sobrevivente da família.", 
 '01:30:00', 
 "1994-09-14", 
 null, 
 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adorocinema.com%2Ffilmes%2Ffilme-9684%2F&psig=AOvVaw1ws2baAAIwTZKcG7kEXkkM&ust=1707335903309000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjS_oDAl4QDFQAAAAAdAAAAABAE',
 '50.00'
 ),
 ("Tropa de Elite",
 "Nascimento, capitão da Tropa de Elite do Rio de Janeiro, é designado para chefiar uma das equipes que tem como missão apaziguar o Morro do Turano. Ele precisa cumprir as ordens enquanto procura por um substituto para ficar em seu lugar.", 
 '01:55:00', 
 "2007-10-05", 
 null, 
 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adorocinema.com%2Ffilmes%2Ffilme-9684%2F&psig=AOvVaw1ws2baAAIwTZKcG7kEXkkM&ust=1707335903309000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjS_oDAl4QDFQAAAAAdAAAAABAE',
 '50.00'
 );
 
show tables;