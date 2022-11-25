import React from "react";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container>
      <h2>Задача</h2>
      <article>
        <p>
          Используя API{" "}
          <a href="https://jsonplaceholder.typicode.com/guide/">
            https://jsonplaceholder.typicode.com/guide/
          </a>
          , необходимо сделать админскую панель для просмотра сущностей в этом
          API. Обязательный минимальный стек - React, react-router v6, redux,
          axios (библиотеки любые, redux-toolkit, redux-act, нативно…){" "}
        </p>
        <p>Сущностей несколько:</p>
        <ol>
          <li>Посты, к ним идут комментарии</li>
          <li>Альбомы, к ним идут фотографии</li>
          <li>Todos</li>
        </ol>
        <p>Необходимо сделать панель, где будет три вкладки:</p>
        <ol>
          <li>
            Просмотр постов, с комментариями. Необходимо сделать древовидную
            структуру просмотра (как на любом форуме, пикабу, реддит и тд)
          </li>
          <li>
            Просмотр альбомов, каждый альбом - это слайдер, слайды, фотки
            прикрепленные к альбому
          </li>
          <li>
            Todos, там всего два состояния, сделать доску с двумя статусами (по
            completed) реализовать drug n drop по переносу с одной колонки в
            другую
          </li>
        </ol>
        <p>
          Можно использовать любую библиотеку стилей (Ant design, material,
          bootstrap).
        </p>
      </article>
    </Container>
  );
};

export default HomePage;
