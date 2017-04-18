create table Person(
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	Name varchar(40), #last, first
	姓名 varchar(5),#姓, 名
	Gender_性别 char(1), #M/F
	Bios varchar(1500),
	简介 varchar(170),
	email varchar(30), #check @.
	备注 varchar(100),
	PRIMARY KEY (ID)
);

create table Program(
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	Name varchar(50),
	剧名 varchar(10),
	Part varchar(30),
	折子 varchar(5),
	Synopsis varchar(1100),
	简介 varchar(250),
	Program_type char(1), #彩/清
	PRIMARY KEY (ID)
);

create table Performance(
	Date_time DATETIME primary key,
	Location varchar(150),
	Poster char(14), #MMDDYYHHMM.jpg/png/tif
	Playbill char(14) #MMDDYYHHMM.pdf
);

create table OperaType(
	Name varchar(30),
	剧种Name_CN varchar(5) primary key,
	Intro varchar(1200),
	简介 varchar(250)
);

create table Organization(
	Name_CN varchar(200) primary key,
	Name varchar(50),
	简介 varchar(250),
	Intro varchar(1200)
);

create table Instrument(
	Name_CN varchar(6) primary key,
	Name varchar(20)
)

create table Program_performed(
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	Date_time DATETIME NOT NULL,
	PID MEDIUMINT,
	foreign key(Date_time) references Performance(Date_time),
	foreign key(PID) references Program(ID),
	PRIMARY KEY (ID)
);

create table Role(
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	PID MEDIUMINT,
	人物 varchar(5),
	Name varchar(40),
	Role_type varchar(2), #主角、配角、龙套、清唱
	行当 varchar(2),
	foreign key(PID) references Program(ID),
	PRIMARY KEY (ID)
);

create table Performer(
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	PROID MEDIUMINT,
	Date_time DATETIME,
	PERID MEDIUMINT,
	RID MEDIUMINT,
	foreign key(PROID) references Program(ID),
	foreign key(Date_time) references Performance(Date_time),
	foreign key(PERID) references Person(ID),
	foreign key(RID) references Role(ID),
	PRIMARY KEY (ID)
);

create table Orchestra(
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	PID MEDIUMINT,
	Date_time DATETIME,
	Name_CN varchar(6),
	foreign key(PID) references Person(ID),
	foreign key(Date_time) references Performance(Date_time),
	foreign key(Name_CN) references Instrument(Name_CN),
	PRIMARY KEY (ID)
);

create table Staff(
	ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	PID MEDIUMINT,
	Date_time DATETIME,
	Name_CN varchar(6),
	foreign key(PID) references Person(ID),
	foreign key(Date_time) references Performance(Date_time),
	foreign key(Name_CN) references Function(Name_CN),
	PRIMARY KEY (ID)
);

create table Function(
	Name_CN varchar(6) primary key,
	Name varchar(20)
);