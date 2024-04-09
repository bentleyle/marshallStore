import {handleAccount, handleModal} from '../../JS/EffectModal/EffecModal.js';
// Lấy thông tin sản phẩm từ URL
const urlParams = new URLSearchParams (window.location.search);
const boxtoView = document.querySelector ('.yourProduct');
const totalBox = document.querySelector ('.total');
const btnOrder = document.querySelector ('.btnOrder');
const apiClient = 'http://localhost:3000/orderClient';
console.log (btnOrder);
console.log (totalBox);
window.onload = function () {
  async function displayUserInfoFromCookie () {
    const emailInput = document.getElementById ('emailClient');
    const nameInput = document.getElementById ('name');
    const loggedUser = getCookie ('loggedInUserEmail');

    // Nếu có đăng nhập sẽ render ra mail, name tại input
    if (loggedUser) {
      emailInput.value = loggedUser;
      emailInput.readOnly = true;
      emailInput.style.background = '#f0f0f0';
    }
    const response = await fetch ('http://localhost:3000/users');
    try {
      const userData = await response.json (); // Chờ đợi kết quả của response.json()
      const foundUser = userData.find (user => user.email === loggedUser);
      if (foundUser) {
        nameInput.value = foundUser.username;
        nameInput.readOnly = true;
        nameInput.style.background = '#f0f0f0';
      }
    } catch (error) {
      console.log ('Lỗi', error);
    }
  }
  // Nhận session khi mua hàng
  let listProductCart = JSON.parse (
    sessionStorage.getItem ('purchasedProducts')
  );
  console.log (listProductCart);
  if (Object.values (listProductCart).length === 0) {
    totalBox.style.display = 'none';
  } else {
    sumTotal ();
  }

  // Foreach dùng để Render
  Object.values (listProductCart).forEach ((product, index) => {
    const productDiv = document.createElement ('div');
    productDiv.classList.add ('eventProduct');

    const quantity = product.quantity; // Lấy số lượng sản phẩm đã mua

    // Tạo thẻ <p> để hiển thị số lượng sản phẩm đã mua
    const quantityElement = document.createElement ('p');
    quantityElement.style.marginLeft = '10px';
    quantityElement.style.color = 'red';
    quantityElement.textContent = `(${quantity})`;

    productDiv.innerHTML = `
      <i style="color: black" class="fa-solid fa-x btn_delete_cart"></i>
      <img src ='http://127.0.0.1:2804/${product.img}'; width="80" alt="" />
      <p>${product.name}</p>
    `;

    // Đính kèm thẻ số lượng vào div sản phẩm
    productDiv.appendChild (quantityElement);

    // Đính kèm div sản phẩm vào container
    boxtoView.appendChild (productDiv);

    // Hiển thị giá sản phẩm
    const priceElement = document.createElement ('p');
    priceElement.textContent = product.price * quantity;
    boxtoView.appendChild (priceElement);
  });
  const btnDeleteCart = document.querySelectorAll ('.btn_delete_cart');

  // Click thực hiện chức năng xóa
  btnDeleteCart.forEach ((btn, i) => {
    const list = Object.keys (listProductCart);
    btn.addEventListener ('click', function (e) {
      e.preventDefault ();
      DeleteProductCart (list[i]);
    });
  });

  // Hàm Delete sản phẩm
  function DeleteProductCart (id) {
    let listProductCart = JSON.parse (
      sessionStorage.getItem ('purchasedProducts')
    );
    console.log (listProductCart);
    delete listProductCart[id];
    sessionStorage.setItem (
      'purchasedProducts',
      JSON.stringify (listProductCart)
    );
    window.location.reload ();
  }

  // Tính tổng
  function sumTotal () {
    const sumTotalText = document.querySelector ('.sumTotal');
    let sumTotal = 0;
    Object.values (listProductCart).forEach (element => {
      sumTotal += element.price * element.quantity;
    });
    sumTotalText.textContent = sumTotal;
  }

  // click đặt hàng
  btnOrder.addEventListener ('click', function (e) {
    HandleOrder ();
  });

  // Lấy cookie
  function setCookie (name, value, days) {
    const expires = new Date ();
    expires.setTime (expires.getTime () + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString ()};path=/`;
  }
  function getCookie (name) {
    const cookieValue = document.cookie.match (`(^|;) ?${name}=([^;]*)`);
    return cookieValue ? cookieValue[2] : null;
  }

  // Hàm xác nhận đặt hàng
  async function HandleOrder () {
    const inpName = document.getElementById ('name').value;
    const inpAddress = document.getElementById ('address').value;
    const inpEmail = document.getElementById ('emailClient').value;
    const inpPhone = document.getElementById ('phone').value;
    const inpNote = document.getElementById ('note').value;
    let ClientUpdate;

    if (inpName == '' || inpAddress == '' || inpEmail == '' || inpPhone == '') {
      // alert ('Vui lòng điền đầy đủ');
    } else {
      ClientUpdate = {
        clientName: inpName,
        clientAddress: inpAddress,
        clientphone: inpPhone,
        clientEmail: inpEmail,
        clientNote: inpNote,
      };
    }

    try {
      const response = await fetch (apiClient, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (ClientUpdate),
      });

      if (response.ok) {
        // Nhận session thêm sản phẩm vào giỏ hàng
        const listProductCart = JSON.parse (
          sessionStorage.getItem ('purchasedProducts')
        );

        // Lấy cookie
        let OrderData = JSON.parse (getCookie ('orderData')) || []; // Lấy dữ liệu từ cookie thay vì
        Object.keys (listProductCart).forEach (key => {
          OrderData = [...OrderData, listProductCart[key]];
        });
        console.log (OrderData);

        // Set Cookie khi đặt hàng => hiển thị thống kê
        setCookie ('orderData', JSON.stringify (OrderData));

        // Sau khi thanh toán xoan, xóa session
        sessionStorage.removeItem ('purchasedProducts');

        alert ('Thành Công');
      } else {
        alert ('Xem lại');
      }
    } catch (error) {}
  }

  displayUserInfoFromCookie ();
  handleModal ();
  handleAccount ();
};
