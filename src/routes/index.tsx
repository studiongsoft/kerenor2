import { Navigate, Route, Routes } from 'react-router-dom';
import PermissionsManagementPage from '../pages/PermissionsManagementPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/permissions" replace />} />
      <Route path="/permissions" element={<PermissionsManagementPage />} />
      <Route path="*" element={<Navigate to="/permissions" replace />} />
    </Routes>
  );
}
