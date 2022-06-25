CREATE DATABASE IF NOT EXISTS challengedb;
USE challengedb;

CREATE TABLE IF NOT EXISTS cnab (
    id INT(11) AUTO_INCREMENT,
    type SMALLINT(2),
    datetime DATETIME,
    value DECIMAL(10, 2),
    cpf BIGINT(11),
    card VARCHAR(12),
    ownerName VARCHAR(255),
    storeName VARCHAR(255),
    PRIMARY KEY (id)
);