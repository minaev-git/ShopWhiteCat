// @flow
import React from "react";
import { Link } from "react-router-dom";
import styles from "./infoBlock.css";
import InfoBox from "../infoBox/InfoBox";
import deliveryImg from "./bibika.png";
import giftImg from "./gift.png";
import cooperationImg from "./arms.png";

const delivery = {
  content:(
    <p>Доставляем во все регионы России в кротчайшие сроки. <br /> Учитываем все пожелания по доставке заказа.<br /> <br />
    Для создания заказа воспользуйтесь интернет-магазином или позвоните по телефону 8-495-642-53-36<br /> <br />
    Заказы на сумму от 1000 рублей в пределах МКАД, доставляются бесплатно. <br /> <br />Получите информацию о ценах для вашего региона пройдя по <Link to="/delivery">ссылке</Link>.</p>),
  heading: "Доставка"
};
const gift = {
  content: (
    <p>
      Магазин дарит подарки при заказе на сумму от 1000 рублей. <br /> <br />{" "}
      Порадуйте родных и близких нашими подарками или воспользуйтесь ими сами.{" "}
      <br /> <br /> Получите информацию о подарках и минимальной сумме заказа
      пройдя по <Link to="/gift">ссылке</Link>.
    </p>
  ),
  heading: "Подарки"
};
const cooperation = {
  content: (
    <p>
      Вы можете стать дистрибьютором нашего магазина. Позвоните по телефону
      8-495-642-53-36 или отправте письмо по адресу info@shopwhitecat.ru.
      <br /> <br />
      Дитрибьюторы имею возможность получить скидку от 15% до 43% на всю
      продукцию. Скидка накопительная.
      <br /> <br />
      Все подробности у менеджера потелефону. Остальную контактную информацию
      можно <Link to="/contacts">посмотреть тут</Link>.
    </p>
  ),
  heading: "Контакты"
};

const InfoBlock = () => (
  <div className={`row ${styles.infoBlock}`}>
    <div className="col-xl-4 col-lg-4 col-md-4">
      <InfoBox link="/delivery" icon={deliveryImg} text={delivery} />
    </div>
    <div className="col-xl-4 col-lg-4 col-md-4">
      <InfoBox link="/gift" icon={giftImg} text={gift} />
    </div>
    <div className="col-xl-4 col-lg-4 col-md-4">
      <InfoBox link="/contacts" icon={cooperationImg} text={cooperation} />
    </div>
  </div>
);

export default InfoBlock;
