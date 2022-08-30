import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

export const PageLayout = ({ setSidebarState, sidebarState }) => {
  return (
    <>
      <Header onBurgerButtonClick={() => setSidebarState(!sidebarState)} />
      <Sidebar
        activeState={sidebarState}
        links={[
          {
            path: "/recommendation_thematics",
            name: "Тематики для рекомендаций",
          },
          { path: "/articles", name: "Просмотр статей" },
          { path: "/conferences", name: "Просмотр конференций" },
          {
            path: "/recommendation_articles",
            name: "Рекомендованные статьи",
          },
          {
            path: "/recommendation_conferences",
            name: "Рекомендованные конференции",
          },
          { path: "/about", name: "О нас" },
        ]}
      />
    </>
  );
};
