-- CREATE DATABASE portakal;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE todo(
  todo_id SERIAL,
  user_id UUID ,
  description VARCHAR(255),
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- minimum sipariş tutarı fikri 
INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');



CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);

INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (1, 'joann', 'not bad', 3);
INSERT INTO categories (name) VALUES ('Tavuk Dürümler');

select *
from restaurants
    left join(
        select restaurant_id,
            count(*),
            TRUNC(AVG(rating, 1)) as average_rating
        from reviews
        group by restaurant_id
    ) reviews on restaurants.id = reviews.restaurant_id;


alter table restaurants add column picture varchar(255);
alter table restaurants add column min_price INT;


https://raw.githubusercontent.com/nuriakman/Ornek_Veri_Setleri/master/il_ilce_semt_mah_pk_utf8.sql


DROP TABLE IF EXISTS il;
CREATE TABLE il (
IL_ID int NOT NULL ,
PLAKA varchar(3) NULL DEFAULT NULL ,
IL_ADI_BUYUK varchar(25) NULL DEFAULT NULL ,
IL_ADI varchar(25) NULL DEFAULT NULL ,
IL_ADI_KUCUK varchar(25) NULL DEFAULT NULL ,
PRIMARY KEY (IL_ID)
);

DROP TABLE IF EXISTS ilce;
CREATE TABLE ilce (
ILCE_ID  int NOT NULL ,
IL_ID  int NULL DEFAULT NULL REFERENCES il(IL_ID),
ILCE_ADI_BUYUK  varchar(25) NULL DEFAULT NULL ,
ILCE_ADI  varchar(25) NULL DEFAULT NULL ,
ILCE_ADI_KUCUK  varchar(25) NULL DEFAULT NULL ,
PRIMARY KEY (ILCE_ID)
);

DROP TABLE IF EXISTS mahalle_koy;
CREATE TABLE mahalle_koy (
MAH_ID  bigint NOT NULL ,
IL_ID  int NULL DEFAULT NULL REFERENCES il(IL_ID),
ILCE_ID  int NULL DEFAULT NULL REFERENCES ilce(ILCE_ID),
SEMT_ID bigint NULL DEFAULT NULL REFERENCES semt(SEMT_ID),
MAHALLE_ADI_BUYUK  varchar(50) NULL DEFAULT NULL ,
MAHALLE_ADI  varchar(50) NULL DEFAULT NULL ,
MAHALLE_ADI_KUCUK  varchar(50) NULL DEFAULT NULL ,
PRIMARY KEY (MAH_ID)
);

DROP TABLE IF EXISTS semt;
CREATE TABLE semt (
SEMT_ID  bigint NOT NULL ,
IL_ID  int NULL DEFAULT NULL REFERENCES il(IL_ID),
ILCE_ID  int NULL DEFAULT NULL REFERENCES ilce(ILCE_ID),
SEMT_ADI_BUYUK  varchar(50) NULL DEFAULT NULL ,
SEMT_ADI  varchar(50) NULL DEFAULT NULL ,
SEMT_ADI_KUCUK  varchar(50) NULL DEFAULT NULL ,
POSTA_KODU  varchar(5) NULL DEFAULT NULL ,
PRIMARY KEY (SEMT_ID)
);


mahalle_koy (MAH_ID, IL_ID, ILCE_ID, SEMT_ID, MAHALLE_ADI_BUYUK, MAHALLE_ADI, MAHALLE_ADI_KUCUK)
`mahalle_koy` (`MAH_ID`, `IL_ID`, `ILCE_ID`, `SEMT_ID`, `MAHALLE_ADI_BUYUK`, `MAHALLE_ADI`, `MAHALLE_ADI_KUCUK`)