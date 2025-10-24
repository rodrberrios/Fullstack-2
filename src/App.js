import RouterConfig from './routes/RouterConfig';
import { AuthProvider } from './context/AuthContext';
import './styles/globals.css'
import './App.css';

function App() {
  return (
    <AuthProvider>
      <RouterConfig />
    </AuthProvider>
  );
}

export default App;