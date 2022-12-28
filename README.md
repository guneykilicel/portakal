# portakal
portakal, pern stack react bir yemek sipariş uygulamasıdır. Kayıt olup giriş yapabilirsiniz, authentication işlemleri için Json WEB Token teknolojisini kullandım.
PostgreSQL içinde tuttuğum şifrelenmesi gereken veriler için Bcrypt'i kullandım. Verilen siparişten veya atılan yorumdan sonra restorantın sipariş sayısının veya yorum sayısının artması için  database de
Trigger kullandım, restorant araması ve restorant indirimi için yine database de bir fonksiyon yazdım.
Tasarım için TailwindCSS'i kullandım. İlk olarak portakal'ın nasıl gözüktüğünü
sonrasında database için ER Diyagramı, Tablo Kodları, Stored Procedure, Function ve Trigger kodlarını paylaşacağım.
![anasayfa](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/dashboard.png)
![login](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/login.png)
![restaurantDetailPage](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/restaurantDetailPage.png)
![restaurantDetailPageAndCartAndProducts](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/restaurantDetailPageAndCartAndProducts.png)
![order](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/order.png)
![cart](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/cart.png)
![review](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/reviews2.png)
<br/>
## ER Diyagramı:
![er1](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/er1.png)
![er2](https://github.com/guneykilicel/portakal/blob/main/client/public/for/forReadme/er2.png)
<br/>


## Tablo Kodları:

`CREATE TABLE users(
user_id uuid DEFAULT uuid_generate_v4(),
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(255) NOT NULL UNIQUE,
user_password VARCHAR(255) NOT NULL,
user_surname VARCHAR(255) NOT NULL,
IL_ID int NULL DEFAULT NULL REFERENCES il(IL_ID),
ILCE_ID int NULL DEFAULT NULL REFERENCES ilce(ILCE_ID),
SEMT_ID bigint NULL DEFAULT NULL REFERENCES semt(SEMT_ID),
MAH_ID bigint NOT NULL DEFAULT NULL REFERENCES mahalle_koy(MAH_ID),
ADRES_NO VARCHAR(6),
ADRES_KAT VARCHAR(4),
kart_no varchar(16)
ccv varchar(4);
PRIMARY KEY(user_id)
);
CREATE TABLE restaurants(
id BIGINT NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
location VARCHAR(50) NOT NULL,
price_range INT NOT NULL,
picture VARCHAR(255),
min_price INT,
explanation VARCHAR(255) NOT NULL,
IL_ID int NULL DEFAULT NULL REFERENCES il(IL_ID),
ILCE_ID int NULL DEFAULT NULL REFERENCES ilce(ILCE_ID),
SEMT_ID bigint NULL DEFAULT NULL REFERENCES semt(SEMT_ID),
MAH_ID bigint NOT NULL DEFAULT NULL REFERENCES mahalle_koy(MAH_ID),
number_of_order int
);
CREATE TABLE favourite_restaurants(
favourite_restaurant_id INT NOT NULL PRIMARY KEY,
user_id uuid NOT NULL DEFAULT uuid_generate_v4() REFERENCES
users(user_id), --hocaya sor!
restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
)
CREATE TABLE products(
product_id BIGSERIAL NOT NULL PRIMARY KEY,
restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
category_id INT NULL DEFAULT NULL REFERENCES categories(category_id),
name VARCHAR(50) NOT NULL,
explanation VARCHAR(255) NOT NULL,
price DECIMAL NOT NULL,
picture VARCHAR(255)
)
CREATE TABLE categories(
category_id BIGSERIAL NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL
)
-- many to many: bir restorantın birden fazla kategorisi, bir kategorinin 
birden fazla restorantı olabilir.
CREATE TABLE categories_of_restaurants(
category_of_restaurant_id BIGSERIAL NOT NULL PRIMARY KEY,
restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
category_id INT NULL DEFAULT NULL REFERENCES categories(category_id)
)
CREATE TABLE past_orders(
past_order_id BIGSERIAL NOT NULL PRIMARY KEY,
user_id uuid NOT NULL DEFAULT uuid_generate_v4() REFERENCES
users(user_id),
product_id BIGSERIAL NOT NULL REFERENCES products(product_id)
note varchar(255);
date_time timestamp with time zone;
order_state varchar(20);
quantity int;
order_amount int;
)
CREATE TABLE reviews (
id BIGSERIAL NOT NULL PRIMARY KEY,
restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
user_id uuid NOT NULL DEFAULT uuid_generate_v4() REFERENCES
users(user_id),
review TEXT NOT NULL,
rating INT NOT NULL check(
rating >= 1
and rating <= 5
),
number_of_review int,);
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
ILCE_ID int NOT NULL ,
IL_ID int NULL DEFAULT NULL REFERENCES il(IL_ID),
ILCE_ADI_BUYUK varchar(25) NULL DEFAULT NULL ,
ILCE_ADI varchar(25) NULL DEFAULT NULL ,
ILCE_ADI_KUCUK varchar(25) NULL DEFAULT NULL ,
PRIMARY KEY (ILCE_ID)
);
DROP TABLE IF EXISTS semt;
CREATE TABLE semt (
SEMT_ID bigint NOT NULL ,
IL_ID int NULL DEFAULT NULL REFERENCES il(IL_ID),
ILCE_ID int NULL DEFAULT NULL REFERENCES ilce(ILCE_ID),
SEMT_ADI_BUYUK varchar(50) NULL DEFAULT NULL ,
SEMT_ADI varchar(50) NULL DEFAULT NULL ,
SEMT_ADI_KUCUK varchar(50) NULL DEFAULT NULL ,
POSTA_KODU varchar(5) NULL DEFAULT NULL ,
PRIMARY KEY (SEMT_ID)
);
DROP TABLE IF EXISTS mahalle_koy;
CREATE TABLE mahalle_koy (
MAH_ID bigint NOT NULL ,
IL_ID int NULL DEFAULT NULL REFERENCES il(IL_ID),
ILCE_ID int NULL DEFAULT NULL REFERENCES ilce(ILCE_ID),
SEMT_ID bigint NULL DEFAULT NULL REFERENCES semt(SEMT_ID),
MAHALLE_ADI_BUYUK varchar(50) NULL DEFAULT NULL ,
MAHALLE_ADI varchar(50) NULL DEFAULT NULL ,
MAHALLE_ADI_KUCUK varchar(50) NULL DEFAULT NULL ,
PRIMARY KEY (MAH_ID)
)`

## Stored Procedure:
`-- adreslide kullanıldı
CREATE procedure RestaurantsWithAddress(ilid int, ilceid int, semtid bigint)
LANGUAGE SQL
as $$
select * from restaurants left join (select restaurant_id, COUNT(*), 
TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) 
reviews on restaurants.id = reviews.restaurant_id where il_id=ilid and
ilce_id=ilceid and semt_id=semtid;
$$;`

## Function:
`- SELECT name, price, indirim(price, 10) from products; 
create function indirim(fiyat float, indirim_yuzdesi float)
returns float
language plpgsql
as
$$
begin
fiyat :=fiyat - fiyat*indirim_yuzdesi/100;
return fiyat;
end;
$$;
-- Restorant araması için kullanılacak fonksiyon
--select * from RestorantGetir('%a%');
Create Function RestorantGetir(prmt varchar)
returns table
(
restaurant_id bigint,
restaurant_name varchar,
restaurant_picture varchar,
restaurant_min_price int,
restaurant_explanation varchar,
restaurant_il_id int,
restaurant_ilce_id int,
restaurant_semt_id bigint
)
as
$$
begin
return query
select
id,
name,
picture,
min_price,
explanation,
il_id,
ilce_id,
semt_id
from restaurants
where
name like prmt;
end
$$
language plpgsql;
`
## Trigger:
`Create or Replace Function IncreaseTheNumberOfOrder()
returns trigger
as $$
declare
order_restaurant_id int;
begin
order_restaurant_id:=(select products.restaurant_id from products 
inner join past_orders on products.product_id=past_orders.product_id order by
past_order_id desc limit 1);
update restaurants set number_of_order = number_of_order +1 where
id=order_restaurant_id;
return new;
end;
$$
language plpgsql;
-- sipariş verildiğinde restorantın number_of_order’ı bir artacak
create trigger IncreaseTheNumberOfOrderTrigger
after insert
on past_orders
for each row
execute procedure IncreaseTheNumberOfOrder();
Create or Replace Function IncreaseTheNumberOfReview()
returns trigger
as$$
declare
review_restaurant_id int;
begin
review_restaurant_id:=(select restaurant_id from reviews order by id 
desc limit 1);
update restaurants set number_of_review = number_of_review +1 where
id=review_restaurant_id;
return new;
end;
$$
language plpgsql;
-- sipariş verildiğinde restorantın number_of_review'i bir artacak
create trigger IncreaseTheNumberOfReviewTrigger
after insert
on reviews
for each row
execute procedure IncreaseTheNumberOfReview()`
