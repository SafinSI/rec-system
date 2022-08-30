import React from "react";
import ContactsList from "../components/ContactsList/ContactsList";
import { creators } from "../environmentConstants";

function About({ onClick }) {
  return (
    <div className="main" onClick={onClick}>
      <h2 className="main_header1">О нас</h2>
      <p className="text-information">
        На данном сайте представленна персонализированная система поддержки
        научной деятельности. Она разработанна специально для преподавателей
        кафедры
        <a
          className="link"
          href="http://uit.mpei.ru/"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          Управления и интеллектуальных технологий НИУ "МЭИ"
        </a>
        . Данная система позволяет получить рекомендации предстоящих научных
        конференциях и научных статей.
      </p>
      <h2 className="main_header1">Контактная информация</h2>
      <ContactsList data={creators} />
    </div>
  );
}

export default About;
