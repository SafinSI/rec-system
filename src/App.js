import React, { useMemo, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import About from './pages/About';
import NotFound from './pages/NotFound';
import RecomendationThematics from './pages/RecomendationThematics';
import ViewingConferences from './pages/VievingConferences';
import ViewingArticles from './pages/ViewingArticles';
import RecommendedArticles from './pages/RecommendedArticles';
import RecommendedConferences from './pages/RecommendedConferences';
import AuthContext from './contexts/AuthContext';

function App() {
  const [sidebarState, setSidebarState] = useState(false);
  const [isAuth, setIsAuth] = useState(null);
  const [token, setToken] = useState(null);
  const contextValue = useMemo(() => ({
    isAuth,
    token,
    setIsAuth,
    setToken,
  }), [isAuth, token, setIsAuth, setToken]);

  useEffect(() => {
    console.log('authorization');
    setToken(sessionStorage.getItem('Token'));
    setIsAuth(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      <Header onBurgerButtonClick={() => setSidebarState(!sidebarState)} />
      <Sidebar
        activeState={sidebarState}
        links={[
          { path: '/recommendation_thematics', name: 'Тематики для рекомендаций' },
          { path: '/articles', name: 'Просмотр статей' },
          { path: '/conferences', name: 'Просмотр конференций' },
          { path: '/recommendation_articles', name: 'Рекомендованные статьи' },
          { path: '/recommendation_conferences', name: 'Рекомендованные конференции' },
          { path: '/about', name: 'О нас' },
        ]}
      />
      { isAuth
        ? (
          <Routes>
            <Route path="*" 
              element={<NotFound onClick={() => setSidebarState(false)}/>} />
            <Route path="/recommendation_thematics"
              element={<RecomendationThematics onClick={() => setSidebarState(false)}/>} />
            <Route path="/articles" 
              element={<ViewingArticles onClick={() => setSidebarState(false)}/>} />
            <Route path="/conferences" 
              element={<ViewingConferences onClick={() => setSidebarState(false)}/>} />
            <Route path="/recommendation_articles" 
              element={<RecommendedArticles onClick={() => setSidebarState(false)}/>} />
            <Route path="/recommendation_conferences" 
              element={<RecommendedConferences onClick={() => setSidebarState(false)}/>} />
            <Route path="/about" 
              element={<About onClick={() => setSidebarState(false)} />} />
          </Routes>
        )
        : (
          <Routes>
            <Route
              path="*"
              element={(
                <div className="main">
                  <h1 className="main_header1">Войдите в систему</h1>
                </div>
              )}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        )}
    </AuthContext.Provider>
  );
}

export default App;
