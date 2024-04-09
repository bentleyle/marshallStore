// Lưu dữ liệu vào một cookie
function setCookie (name, value, days) {
  const expires = new Date ();
  expires.setTime (expires.getTime () + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString ()};path=/`;
}

function getCookie (name) {
  const cookieValue = document.cookie.match (`(^|;) ?${name}=([^;]*)`);
  return cookieValue ? cookieValue[2] : null;
}

async function getDataBuy () {
  let boxtoView2 = document.querySelector ('.table2');
  const orderData = getCookie ('orderData');
  let i = 0;
  let currentDate = new Date ();

  if (orderData) {
    const orderDataParsed = JSON.parse (orderData);
    orderDataParsed.forEach (productSold => {
      i++;
      boxtoView2.innerHTML += `
      <tbody
      <tr>
        <td>${i}</td>
        <td>${productSold.type}</td>
        <td>${productSold.name}</td>
        <td>${productSold.price * productSold.quantity}</td>
        <td>${productSold.quantity}</td>
        <td>${currentDate.toLocaleDateString ()}</td>
      </tr>
        </tbody>`;
    });
    var listId = new Set (orderDataParsed.map (item => item.id));
    let arrayProduct = [];
    listId.forEach ((value, keys) => {
      let count = 0;
      orderDataParsed.forEach (product => {
        if (value == product.id) {
          if (count == 0) {
            arrayProduct = [
              ...arrayProduct,
              {
                id: product.id,
                type: product.type,
                name: product.name,
                amountBuy: product.quantity,
              },
            ];
          } else {
            arrayProduct[keys - 1].amountBuy += product.quantity;
          }
          count++;
        }
      });
    });
    arrayProduct.sort (function (a, b) {
      return b.amountBuy - a.amountBuy;
    });
    const boxtoView = document.querySelector ('.table1');
    arrayProduct.forEach ((mostProduct, index) => {
      if (index < 10) {
        i++;
        boxtoView.innerHTML += `
          <tbody
          <tr>
            <td>${i}</td>
            <td>${mostProduct.type}</td>
            <td>${mostProduct.name}</td>
            <td>${mostProduct.amountBuy}</td>
          </tr>
            </tbody>`;
      }
    });
  }
}

getDataBuy ();
