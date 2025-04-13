export const renderCreateElement = (tagName, props) => {
  return Object.assign(document.createElement(tagName), props);
};
