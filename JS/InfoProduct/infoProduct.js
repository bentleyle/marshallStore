import fetchProduct from '../../API/db.js';
import {templateInfo} from '../TemplateInfoProduct/template.js';
import {handleAccount, handleModal} from '../EffectModal/EffecModal.js';

window.onload = async function () {
  const getURL = new URLSearchParams (window.location.search);
  const productId = getURL.get ('id');
  console.log (productId);

  // Hàm hiển thị thông tin sản phẩm
  async function displayFetchProductID () {
    const data = await fetchProduct ();
    console.log (data);
    // Tìm sản phẩm có ID tương ứng
    const product = data.find (item => item.id === parseInt (productId));
    console.log (product);
    const boxViewInfoProduct = document.querySelector ('.content_page');
    console.log (boxViewInfoProduct);
    boxViewInfoProduct.innerHTML = templateInfo (product);

    const orderSub = document.querySelector ('.orderSub');
    const orderPlus = document.querySelector ('.orderPlush');
    const orderAmountElement = document.querySelector ('.orderAmount');

    let orderAmount = 1; // Đặt giá trị mặc định cho orderAmount
    orderPlus.addEventListener ('click', function (e) {
      // Lấy giá trị hiện tại từ thẻ HTML
      let currentAmount = parseInt (orderAmountElement.textContent, 10);

      // Tăng giá trị
      currentAmount++;

      // Cập nhật giá trị mới vào thẻ HTML
      orderAmountElement.textContent = currentAmount;
      orderAmount = currentAmount;
      console.log (orderAmount);
    });

    orderSub.addEventListener ('click', function (e) {
      // Lấy giá trị hiện tại từ thẻ HTML
      let currentAmount = parseInt (orderAmountElement.textContent, 10);

      // Giảm giá trị
      currentAmount--;
      if (currentAmount == 0) {
        return;
      }
      // Cập nhật giá trị mới vào thẻ HTML
      orderAmountElement.textContent = currentAmount;
      orderAmount = currentAmount; // Cập nhật giá trị cho biến toàn cục
      console.log (orderAmount);
    });

    const btnaddToCart = document.querySelector ('.addtoCart_btn');
    btnaddToCart.addEventListener ('click', function (e) {
      e.preventDefault ();
      const target = e.target;
      const productId = target.getAttribute ('data-id');
      console.log (productId);
      let countProductBuy = document.querySelector ('.amountProduct');
      countProductBuy.style.display = 'block';
      countProductBuy.textContent = orderAmount;
      buyProduct (productId);
    });
    async function fetchProductDetails (productId) {
      try {
        const response = await fetch (
          `http://localhost:3000/product/${productId}`
        );
        if (!response.ok) {
          throw new Error ('Lỗi khi tải dữ liệu sản phẩm.');
        }
        const productDetails = await response.json ();
        return productDetails;
      } catch (error) {
        console.error (error);
        return null;
      }
    }
    let purchasedProducts = {};
    async function buyProduct (productId) {
      const productDetails = await fetchProductDetails (productId);
      if (productDetails) {
        let sessionData = sessionStorage.getItem ('purchasedProducts');
        if (sessionData) {
          purchasedProducts = JSON.parse (sessionData);
        }
        if (purchasedProducts[productId]) {
          purchasedProducts[productId].quantity += orderAmount;
        } else {
          purchasedProducts[productId] = {
            ...productDetails,
            quantity: orderAmount,
          };
        }
      }
      sessionStorage.setItem (
        'purchasedProducts',
        JSON.stringify (purchasedProducts)
      );
    }
    const cartIcon = document.querySelector ('.cart_icon');
    console.log (cartIcon);
    cartIcon.addEventListener ('click', () => {
      // Lấy danh sách sản phẩm đã mua
      let amountProductCart = sessionStorage.getItem ('purchasedProducts');
      console.log (amountProductCart);
      if (amountProductCart.length == 0) {
        alert ('Chưa có sản phẩm được thêm');
      } else {
        window.location.href = `../../Layouts/Pay/pay.html`;
      }
    });

    // Buy Now
    const buyNowBtn = document.querySelector ('.buyNow_btn');
    buyNowBtn.addEventListener ('click', function (e) {
      e.preventDefault ();
      const productId = e.target.getAttribute ('data-id');
      buyProductNow (productId);
    });
    async function buyProductNow (productId) {
      const productDetails = await fetchProductDetails (productId);
      if (productDetails) {
        let sessionData = sessionStorage.getItem ('purchasedProducts');
        if (sessionData) {
          purchasedProducts = JSON.parse (sessionData);
        }
        if (purchasedProducts[productId]) {
          purchasedProducts[productId].quantity += 1;
        } else {
          purchasedProducts[productId] = {
            ...productDetails,
            quantity: 1,
          };
        }
      }
      sessionStorage.setItem (
        'purchasedProducts',
        JSON.stringify (purchasedProducts)
      );
      window.location.href = `../../Layouts/Pay/pay.html`;
    }
  }

  // Gọi hàm và truyền productId vào đó
  displayFetchProductID (productId);
  handleAccount ();
  handleModal ();
};
