import React, { useMemo, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PageLayout } from "./components"
import {
  RecommendedArticles,
  HomePage,
  About,
  MessagePage,
  RecomendationThematics,
  ViewingArticles,
  ViewingConferences,
  RecommendedConferences
} from "./pages"
import { AuthContext } from "./contexts/AuthContext"
import { token } from "./utils"

export const App = () => {
  const [sidebarState, setSidebarState] = useState(false)
  const [isAuth, setIsAuth] = useState<boolean>(false)

  const contextValue = useMemo(
    () => ({
      isAuth,
      setIsAuth
    }),
    [isAuth, setIsAuth]
  )

  useEffect(() => {
    setIsAuth(Boolean(token.getToken()))
  }, [])

  return (
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <PageLayout setSidebarState={setSidebarState} sidebarState={sidebarState} />
        <div className="main" onClick={() => setSidebarState(false)}>
          {isAuth ? (
            <Routes>
              <Route path="/recommendation_thematics" element={<RecomendationThematics />} />
              <Route path="/articles" element={<ViewingArticles />} />
              <Route path="/conferences" element={<ViewingConferences />} />
              <Route path="/recommendation_articles" element={<RecommendedArticles />} />
              <Route path="/recommendation_conferences" element={<RecommendedConferences />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<MessagePage message={"Страница не найдена"} />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="*" element={<MessagePage message={"Войдите в систему"} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
