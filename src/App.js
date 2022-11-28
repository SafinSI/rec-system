import React, { useMemo, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components";
import { About } from "./pages/About";
import { HomePage } from "./pages/HomePage";
import { MessagePage } from "./pages/MessagePage";
import { RecomendationThematics } from "./pages/RecomendationThematics";
import { ViewingConferences } from "./pages/ViewingConferences";
import { ViewingArticles } from "./pages/ViewingArticles";
import { RecommendedArticles } from "./pages/RecommendedArticles";
import { RecommendedConferences } from "./pages/RecommendedConferences";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [sidebarState, setSidebarState] = useState(false);
  const [isAuth, setIsAuth] = useState(null);
  const [token, setToken] = useState(null);
  const contextValue = useMemo(
    () => ({
      isAuth,
      token,
      setIsAuth,
      setToken,
    }),
    [isAuth, token, setIsAuth, setToken]
  );

  useEffect(() => {
    console.log("authorization");
    setToken(sessionStorage.getItem("Token"));
    setIsAuth(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <PageLayout
          setSidebarState={setSidebarState}
          sidebarState={sidebarState}
        />
        {isAuth ? (
          <Routes>
            <Route
              path="/recommendation_thematics"
              element={
                <RecomendationThematics
                  onClick={() => setSidebarState(false)}
                />
              }
            />
            <Route
              path="/articles"
              element={
                <ViewingArticles onClick={() => setSidebarState(false)} />
              }
            />
            <Route
              path="/conferences"
              element={
                <ViewingConferences onClick={() => setSidebarState(false)} />
              }
            />
            <Route
              path="/recommendation_articles"
              element={
                <RecommendedArticles onClick={() => setSidebarState(false)} />
              }
            />
            <Route
              path="/recommendation_conferences"
              element={
                <RecommendedConferences
                  onClick={() => setSidebarState(false)}
                />
              }
            />
            <Route
              path="/about"
              element={<About onClick={() => setSidebarState(false)} />}
            />
            <Route
              path="*"
              element={
                <MessagePage
                  message={"Страница не найдена"}
                  onClick={() => setSidebarState(false)}
                />
              }
            />
            <Route
              path="/"
              element={<HomePage onClick={() => setSidebarState(false)} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="*"
              element={
                <MessagePage
                  message={"Войдите в систему"}
                  onClick={() => setSidebarState(false)}
                />
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
