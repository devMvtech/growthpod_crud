-- users table 
create table users(
  user_id serial primary key,
  email varchar(255) unique not null,
  password varchar(255) not null,
  created_at date default current_date
);

-- COMPANY TABLE
CREATE TABLE company (
  company_id   SERIAL       PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  email        VARCHAR(255) NOT NULL,
  phone        VARCHAR(20),
  website      VARCHAR(255),
  no_of_emp    INTEGER      NOT NULL CHECK (no_of_emp >= 0),
  address      TEXT
);

-- EMPLOYEE TABLE
CREATE TABLE employee (
  employee_id  SERIAL       PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  email        VARCHAR(255) NOT NULL,
  job_title    VARCHAR(100),
  salary       NUMERIC(12,2)    CHECK (salary >= 0),
  address      TEXT,
  company_id   INTEGER
);


CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    marks_obtained INT CHECK (marks_obtained >= 0 AND marks_obtained <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);


crud employee company