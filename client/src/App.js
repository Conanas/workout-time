import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartEditTimer from './pages/Start-Edit-Timer/';
import Footer from './components/Footer/';
import { WorkoutProvider } from './utils/GlobalState';
import "./App.css";

export default function App() {
  return (
    <div className="wrapper">
      <main className="container">
        <WorkoutProvider>
          <Router>
            <Switch>
              <Route path exact="/">
                <StartEditTimer />
              </Route>
            </Switch>
          </Router>
        </WorkoutProvider>
      </main>
      <Footer />
    </div>
  )
}
