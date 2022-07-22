SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema loja
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `loja` ;
CREATE SCHEMA IF NOT EXISTS `loja` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `loja` ;

-- -----------------------------------------------------
-- Table `loja`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user (
  usr_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usr_name VARCHAR(100) NOT NULL,
  usr_email VARCHAR(100) NOT NULL,
  usr_password VARCHAR(100) NOT NULL,
  usr_uname VARCHAR(100) NOT NULL
);

-- ALTER TABLE user ADD CONSTRAINT pk_usr PRIMARY KEY (usr_id);
ALTER TABLE user ADD CONSTRAINT email_un UNIQUE (usr_email);
ALTER TABLE user ADD CONSTRAINT user_name_un UNIQUE (usr_uname);

-- -----------------------------------------------------
-- Table `loja`.`PRODUCT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS product;

CREATE TABLE IF NOT EXISTS product (
  product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_img VARCHAR(100),
  product_name VARCHAR(100) NOT NULL,
  product_description VARCHAR(100),
  usr_id VARCHAR(100) NOT NULL
);
