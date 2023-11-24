import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import StartScreen from "./components/session/startScreen";
import About from "./components/session/aboutScreen";
import { CustomProvider } from "./components/context/provider";
import LoginScreen from "./components/session/loginScreen";
import HomeScreen from "./components/home/homeScreen";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomProvider  >
        <Router >
          <Routes >
              <Route path="/" element={<StartScreen/>}/>
              <Route path="/login" element={<LoginScreen/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/home" element={<HomeScreen/>}/>
          </Routes>
        </Router>
      </CustomProvider>
    </ThemeProvider>
  );
}

export default App;
