function get (key) {
  let string = window.location.href.split('?')[1];
  if (!string) { return null; }

  let parameters = new URLSearchParams(string);
  return parameters.get(key);
}

function set (key, value) {
  let url = window.location.href.split('?');
  let string = url[1];
  let parameters = new URLSearchParams(string);
  parameters.set(key, value);

  history.pushState({}, 'SwiftCommerce', url[0] + '?' + parameters.toString());
  return true;
}

export default new Proxy({}, {
  get: function (_, name) {
    return get(name);
  },
  set: function (_, name, value) {
    return set(name, value);
  }
});
