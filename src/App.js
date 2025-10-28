import RouterConfig from './routes/RouterConfig';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RouterConfig />
    </AuthProvider>
  );
}

export default App;