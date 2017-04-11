// 雖然經由 babel 把語法轉換為 es5 ，但是 es5 的 api 並不是所有的瀏覽器都能執行
// 為了確保讓所有瀏覽器都能執行轉換後的 es5 程式碼
// 我們需要 babel-polyfill 為看不懂某些 api 的瀏覽器讀懂他們
// 例如: Promise
import "babel-polyfill";


// stage-0:
const spread = {...{a:6}};
console.log(spread)
// react:
const jsx = <h1>H1</h1>;

// es-2015:
let message = 'Hello, worldaaa!';
window.onload = e => {
  alert(message)
};

