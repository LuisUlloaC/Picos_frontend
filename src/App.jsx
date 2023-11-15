import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import SignInSide from "./components/session/loginScreen";
import About from "./components/session/aboutScreen";
import NavBar from "./components/utils/navBar"
import { CustomProvider } from "./components/context/provider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomProvider  >
        <Router >
          <Routes >
              <Route path="/about" element={<SignInSide/>}/>
              <Route path="/" element={<About/>}/>
              <Route path="/home" element={<NavBar/>}/>
          </Routes>
        </Router>
      </CustomProvider>
    </ThemeProvider>
  );
}

export default App;
