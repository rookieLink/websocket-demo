export default function parseUrl(url) {
  url = url || window.location.search;
  var queryStringArr = url.split('?')[1].split('#')[0].split('&');
  const obj = {};
  queryStringArr.forEach(item => {
    const keyValueArr = item.split('=');
    obj[keyValueArr[0]] = keyValueArr[1];
  });
  return obj;
}