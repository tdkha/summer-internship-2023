USE intern;

create table users(
	id int primary key auto_increment  not null,
    username varchar(100) not null,
    password varchar(100) not null,
    created_at date not null ,
    updated_at date not null,
    state varchar(100) not null DEFAULT 'active' CHECK (state IN ('active','inactive') )
);

create table roles(
	id int primary key not null auto_increment,
    title varchar(200),
    description text
);
create table tasks(
	id int primary key not null auto_increment,
    title varchar(200),
    description text
);
create table user_roles (
    user_id int not null,
    role_id int not null,
    PRIMARY KEY (user_id, role_id),
    foreign key (user_id) references users(id),
    foreign key (role_id) references roles(id)
);

create table role_tasks(
    role_id int not null ,
    task_id int not null,
    PRIMARY KEY (role_id, task_id),
    foreign key (role_id) references roles(id),
    foreign key (task_id) references tasks(id)
);
create table students(
	id int primary key not null auto_increment,
    student_number varchar(50) unique not null,
    firstname varchar(200) not null,
    lastname varchar(200) not null,
    phone varchar(20) unique not null,
    email varchar(100) not null,
    address text,
    user_id int not null,
    foreign key (user_id) references users(id)
);
create table admins (
	id int primary key not null auto_increment,
    firstname varchar(200) not null,
    lastname varchar(200) not null,
    phone varchar(20) unique not null,
    email varchar(100) not null,
    address text,
    user_id int not null,
    foreign key (user_id) references users(id)
);

/* ------------------------- */
/* Project tables */ 
/* ------------------------- */
create table projects (
	id int primary key not null auto_increment,
    name varchar(255) not null,
    description text,
    prerequisites text,
    start_date datetime,
    end_date datetime,
    is_active boolean default true,
    is_continued boolean default false,
    hosted_by VARCHAR(255) NOT NULL CHECK (hosted_by IN ('university','company')) ,
    image_url VARCHAR(255),
    link VARCHAR(255)
);
create table student_projects (
	student_id int not null,
	project_id int not null,
    PRIMARY KEY (student_id,project_id),
    foreign key (project_id) references projects(id),
    foreign key (student_id) references students(id)
);
create table companies (
	id int primary key not null auto_increment,
    name varchar(255) not null
);
create table company_hosts (
	id int primary key not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    phone varchar(255) not null,
    company_id INT not null,
    foreign key (company_id) references companies(id)
);
create table university_hosts (
	id int primary key not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    phone varchar(255) not null
);
create table company_projects (
	company_id int not null,
	project_id int not null,
    host_id int not null,
    PRIMARY KEY (company_id,project_id , host_id),
    foreign key (project_id) references projects(id),
    foreign key (company_id) references companies(id),
    foreign key (host_id) references company_hosts(id)
);
create table  university_projects (
	project_id int not null,
    host_id int not null,
    PRIMARY KEY (project_id , host_id),
    foreign key (project_id) references projects(id),
    foreign key (host_id) references university_hosts(id)
);
/* ------------------------- */
/* Group tables */
/* ------------------------- */
create table teams (
	id int primary key not null auto_increment,
    name varchar(255) not null, 
    active_state boolean,  				/* The active state of a group */
    established_in datetime
);
create table student_teams (
	student_id int not null,
	team_id int not null,
    active_state boolean, 				/* The active state of student in a group */
    PRIMARY KEY (student_id,team_id),
    foreign key (team_id) references teams(id),
    foreign key (student_id) references students(id)
);

/* ------------------------- */
/* Certificate tables */
/* ------------------------- */
create table certificates (
	id int primary key not null auto_increment,
    filename VARCHAR(255),
	pdf LONGBLOB,
    issued_date date,
    student_id int,
    foreign key (student_id) references students(id)
);

CREATE table applications(
	id int primary key not null auto_increment,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    student_number VARCHAR(250) unique default NULL,
    email VARCHAR(250) unique NOT NULL,
    phone VARCHAR(250) unique NOT NULL,
    address VARCHAR(250) NOT NULL,
    username VARCHAR(250) unique NOT NULL,
    password VARCHAR(250) NOT NULL,
    applied_date DATETIME NOT NULL,
    state VARCHAR(250) NOT NULL DEFAULT 'pending',
    CHECK (state IN ('pending','approved','declined'))
);
CREATE table hosts (
	id int primary key not null auto_increment,
    name VARCHAR(250) NOT NULL,
    representative VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    phone VARCHAR(250) NOT NULL
);
