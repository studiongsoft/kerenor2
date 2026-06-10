import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import BanksPage from '../pages/BanksPage';
import ConferencesPage from '../pages/ConferencesPage';
import PermissionsManagementPage from '../pages/PermissionsManagementPage';
import WelcomePage from '../pages/WelcomePage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/conferences" element={<ConferencesPage />} />
        <Route path="/banks" element={<BanksPage />} />
        <Route path="/campaigns" element={<PermissionsManagementPage />} />
      </Route>
      <Route path="/permissions" element={<Navigate to="/campaigns" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
