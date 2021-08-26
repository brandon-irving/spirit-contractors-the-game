import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
// import CorePage from "./core/components/CorePage";
import theme from "./core/theme";
import GamePage from "./pages/GamePage";
// import CreateACharacter from "./pages/CreateACharacter";

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <CorePage>
        <CreateACharacter />
      </CorePage> */}
      <GamePage />
    </ChakraProvider>
  );
}

export default App;
