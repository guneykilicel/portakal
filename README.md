# portakal
portakal, pern stack react bir yemek sipariş uygulamasıdır. Kayıt olup giriş yapabilirsiniz, authentication işlemleri için Json WEB Token teknolojisini kullandım.
PostgreSQL içinde tuttuğum şifrelenmesi gereken veriler için Bcrypt'i kullandım. Verilen siparişten veya atılan yorumdan sonra restorantın sipariş sayısının veya yorum sayısının artması için  database de
Trigger kullandım, restorant araması ve restorant indirimi için yine database de bir fonksiyon yazdım.
Tasarım için TailwindCSS'i kullandım. İlk olarak portakal'ın nasıl gözüktüğünü
sonrasında database için ER Diyagramını paylaşacağım.
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
