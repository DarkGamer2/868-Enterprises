// src/App.tsx
import { ThemeProvider } from './context/theme/ThemeContext'; // Ensure ThemeProvider is imported
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';
import './App.css';
import CartContextProvider from './context/cart-context';
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true;

  return (
    <ThemeProvider>
     <CartContextProvider>
     <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <main className="flex-grow">
          <Home />
        </main>
      </div>
     </CartContextProvider>
    </ThemeProvider>
  );
}

export default App;
