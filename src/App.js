import "./App.css";
import {ChakraProvider } from "@chakra-ui/react";
import CorePage from "./core/components/CorePage";
import LoadingScreen from "./core/components/LoadingScreen";
import theme from "./core/theme";
import GamePage from "./pages/GamePage";
import CreateACharacter from "./pages/CreateACharacter";
import SignInPage from "./pages/SignInPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { GlobalProvider, useGlobalContext } from "./context/globalContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading, isLoggedIn } = useGlobalContext();

  if (loading) return <LoadingScreen />
  return (
    <Route
      {...rest}
      render={() => (user && isLoggedIn ? children : <SignInPage />)}
    />
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalProvider>
        <Router>
          <Switch>
            <Route path="/signin">
              <SignInPage />
            </Route>
            <PrivateRoute path="/create">
              <CorePage>
              <CreateACharacter />
              </CorePage>
            </PrivateRoute>
            <PrivateRoute path="/">
              <GamePage />
            </PrivateRoute>
          </Switch>
        </Router>
      </GlobalProvider>
    </ChakraProvider>
  );
}

export default App;
