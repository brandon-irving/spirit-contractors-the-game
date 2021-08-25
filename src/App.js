import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import CorePage from './core/components/CorePage'
// import SignInPage from './pages/SignInPage';
import theme from './core/theme';
import CreateACharacter from './pages/CreateACharacter';
function App() {
  return (
    <ChakraProvider theme={theme}>
    {/* <SignInPage /> */}
    <CorePage>
      <CreateACharacter />
      </CorePage>
  </ChakraProvider>
  );
}

export default App;
