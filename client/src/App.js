import React from "react";
import StepForm from "./component/stepForm";
import auth from "./auth";
import Home from "./component/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {auth.isAuthenticated() ? <Home /> : <StepForm />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
  // if (auth.isAuthenticated()) return <Home />;
  // else return <StepForm />;
}

export default App;
