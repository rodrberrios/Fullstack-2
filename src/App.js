import RouterConfig from './routes/RouterConfig';
import { UserProvider } from './context/AuthContext';

function App() {
  return (
    <UserProvider>
      <RouterConfig />
    </UserProvider>
  );
}

export default App;