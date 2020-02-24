create schema namegator;

create table namegator (
	id serial,
	type text not null,
	description text not null
);

insert into item (type, description) values ('prefixe', 'Air');
insert into item (type, description) values ('prefixe', 'Jet');
insert into item (type, description) values ('prefixe', 'Flight');
insert into item (type, description) values ('sufixe', 'Hub');
insert into item (type, description) values ('sufixe', 'Station');
insert into item (type, description) values ('sufixe', 'Mart');



