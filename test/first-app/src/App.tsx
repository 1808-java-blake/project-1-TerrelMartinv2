import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';
import { FourthComponent } from './components/first/fourth/fourth.component';
/*import { AppNav } from './components/nav/nav.component'; */
import { MyNav } from './components/nav/mynav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterComponent } from './components/sign-in/register.component';
import { ClickerComponent } from './components/clicker/clicker.component';
import { TicTacComponent } from './components/tic-tac/tic-tac.component';
import { ChuckNorrisComponent } from './components/chuck-norris/chuck-norris.component';
import { MoviesComponent } from './components/movies/movie.component';
import { NestedComponent } from './components/nested/nested.component';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <MyNav />
          <div id="main-content-container">
            <Switch>
              <Route path="/first" component={FirstComponent} />
              <Route path="/second" component={SecondComponent} />
              <Route path="/third" component={ThirdComponent} />
              <Route path="/fourth" component={FourthComponent} />
              <Route path="/home" component={HomeComponent} />
              <Route path="/sign-in" component={SignInComponent} />
              <Route path="/register" component={RegisterComponent} />
              <Route path="/clicker" component={ClickerComponent} />
              <Route path="/tic-tac-toe" component={TicTacComponent} />
              <Route path="/chuck-norris" component={ChuckNorrisComponent} />
              <Route path="/movies" component={MoviesComponent} />
              <Route path="/nested" component={NestedComponent} />
              <Route component={SignInComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
