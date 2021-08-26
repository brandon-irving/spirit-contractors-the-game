import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
// import CorePage from "./core/components/CorePage";
import theme from "./core/theme";
// import GamePage from "./pages/GamePage";
// import CreateACharacter from "./pages/CreateACharacter";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SignInPage />
      {/* <CorePage>
        <CreateACharacter />
      </CorePage> */}
      {/* <GamePage /> */}
    </ChakraProvider>
  );
}

export default App;
