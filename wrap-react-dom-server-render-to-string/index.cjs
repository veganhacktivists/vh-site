const ReactDOMServer = require('react-dom/server');

exports.renderToStaticMarkup = function renderToStaticMarkup(node) {
  return ReactDOMServer.renderToString(node);
};
