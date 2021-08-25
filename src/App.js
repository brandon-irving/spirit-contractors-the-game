import './App.css';
import { ChakraProvider } from "@chakra-ui/react"

import SignInPage from './pages/SignInPage';
import theme from './core/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
    <SignInPage />
  </ChakraProvider>
  );
}

export default App;
