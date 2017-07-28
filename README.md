# Universal Router React Kit

A set of helpful functions for universal-router from https://github.com/kriasoft/react-starter-kit.

## Installing

```shell
npm install -S pabla/universal-router-react-kit
```

## Usage

### createOnLocationChange

```javascript
import UniversalRouter from 'universal-router';
import { createOnLocationChange } from 'universal-router-react-kit';
import Root from './components/Root';
import Home from './components/Home';
import store from './store';

const routes = {
  path: '/',
  action() {
    return {
      component: <Home />,
    };
  },
};
const router = new UniversalRouter(routes);
const context = {
  dispatch: store.dispatch,
};

function render({ component }) {
  ReactDOM.render(
    <Root store={store}>
      {component}
    </Root>,
    document.getElementById('root')
  );
}

const onLocationChange = createOnLocationChange(router, context, render);
onLocationChange();
```

### Link

```javascript
import { Link } from 'universal-router-react-kit';

const Home = () =>
  <div>
    <Link to="/about" className="menu-item">About</Link>
  </div>;
```

### history

```javascript
import { history } from 'universal-router-react-kit';

function onHomeClick() {
  history.push('/');
}
```
