import queryString from 'query-string';
import history from './history';
import Link from './Link';

function createOnLocationChange(router, context, render) {
  let currentLocation = history.location;

  function onLocationChange(location, action) {
    if (location == null) {
      location = history.location;
    }
    currentLocation = location;
    return router
      .resolve(
        Object.assign({}, context, {
          path: location.pathname,
          query: queryString.parse(location.search),
        })
      )
      .then(route => {
        // Prevent multiple page renders during the routing process
        if (currentLocation.key !== location.key) {
          return;
        }

        if (route.redirect) {
          history.replace(route.redirect);
          return;
        }

        render(route);
      })
      .catch(error => {
        console.error(error);

        // Do a full page reload if error occurs during client-side navigation
        if (action && currentLocation.key === location.key) {
          window.location.reload();
        }
      });
  }
  history.listen(onLocationChange);
  return onLocationChange;
}

export { history, createOnLocationChange, Link };
