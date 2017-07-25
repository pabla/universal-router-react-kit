'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var queryString = _interopDefault(require('query-string'));
var history = require('history');
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

var history$1 = typeof window !== 'undefined' && history.createBrowserHistory();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// https://github.com/kriasoft/react-starter-kit/blob/master/src/components/Link/Link.js

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link(props) {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Link, [{
    key: 'handleClick',
    value: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      if (event.defaultPrevented === true) {
        return;
      }

      event.preventDefault();
      history$1.push(this.props.to);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          to = _props.to,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['to', 'children']);

      return React.createElement(
        'a',
        _extends({ href: to }, props, { onClick: this.handleClick }),
        children
      );
    }
  }]);

  return Link;
}(React.Component);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

Link.defaultProps = {
  onClick: null
};

function createOnLocationChange(router, context, render) {
  var currentLocation = history$1.location;

  function onLocationChange(location, action) {
    if (location == null) {
      location = history$1.location;
    }
    currentLocation = location;
    return router.resolve(Object.assign({}, context, {
      path: location.pathname,
      query: queryString.parse(location.search)
    })).then(function (route) {
      // Prevent multiple page renders during the routing process
      if (currentLocation.key !== location.key) {
        return;
      }

      if (route.redirect) {
        history$1.replace(route.redirect);
        return;
      }

      render(route);
    }).catch(function (error) {
      console.error(error);

      // Do a full page reload if error occurs during client-side navigation
      if (action && currentLocation.key === location.key) {
        window.location.reload();
      }
    });
  }
  history$1.listen(onLocationChange);
  return onLocationChange;
}

exports.history = history$1;
exports.createOnLocationChange = createOnLocationChange;
exports.Link = Link;
