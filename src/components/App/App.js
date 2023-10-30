import { HashRouter, Route, Routes } from 'react-router-dom';

import { Menu } from '../../components';
import { AuthProvider, AuthRoute } from '../../hooks';
import {
  Blog,
  BlogArticle,
  BlogEdit,
  BlogNew,
  Home,
  Login,
  Logout,
  Profile,
} from '../../pages';

import { BlogProvider } from '../../context';
import './App.css';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <BlogProvider>
          <div>
            <header>
              <h1>React Router</h1>
              <Menu />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                  path="/blog/new"
                  element={
                    <AuthRoute>
                      <BlogNew />
                    </AuthRoute>
                  }
                ></Route>
                <Route
                  path="/blog/:slug/edit"
                  element={
                    <AuthRoute>
                      <BlogEdit />
                    </AuthRoute>
                  }
                ></Route>
                <Route path="/blog" element={<Blog />}>
                  <Route path=":slug" element={<BlogArticle />}></Route>
                </Route>
                <Route
                  path="/profile"
                  element={
                    <AuthRoute>
                      <Profile />
                    </AuthRoute>
                  }
                ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                  path="/logout"
                  element={
                    <AuthRoute>
                      <Logout />
                    </AuthRoute>
                  }
                ></Route>

                <Route path="*" element={<p>No encontrado</p>}></Route>
              </Routes>
            </main>
          </div>
        </BlogProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export { App };
