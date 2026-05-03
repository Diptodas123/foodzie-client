import './App.css';
import AuthLayout from './components/auth/Layout';
import { Route, Routes } from 'react-router-dom';
import AuthRegister from './pages/auth/Register';
import AuthLogin from './pages/auth/Login';
import LoadingScreen from './components/common/LoadingScreen';
import type { AppSelector } from './store/store';
import { useSelector } from 'react-redux';
import CheckAuth from './components/common/CheckAuth';
import AppBootstrap from './components/common/AppBootstrap';

function App() {

  const { isAuthenticated, user, isLoading } = useSelector((state: AppSelector) => state.auth);

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <AppBootstrap />
      {isLoading ? <LoadingScreen /> : (
        <Routes>
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
        </Routes>
      )}
    </div>
  )
}

export default App;
