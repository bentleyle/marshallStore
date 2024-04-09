// Import API
import fetchProduct from '../../API/db.js';

// Import tempate + hover product
import {HoverProduct} from '../TemplateMainPage/template.js';

// IMPORT GIAO DIỆN JS ĐĂNG KÝ ĐĂNG NHẬP
import {handleAccount, handleModal} from '../../JS/EffectModal/EffecModal.js';

// Import template
import {PortableTemplate} from '../TemplateChildPage/template.js';

window.onload = function () {
  async function renderProduct (findIndex = 0) {
    const data = await fetchProduct (); // gán biến để chạy cho fetchProduct
    const boxtoView = document.querySelector ('.product_box');
    boxtoView.innerHTML = '';
    let boxtoViewCount = 0;
    data.forEach (element => {
      if (findIndex == 0) {
        if (element.type.includes ('Loa')) {
          boxtoViewCount++;
          boxtoView.innerHTML += PortableTemplate (element);
        }
      } else if (findIndex == 1) {
        if (element.type.includes ('Tai nghe')) {
          boxtoViewCount++;
          boxtoView.innerHTML += PortableTemplate (element);
        }
      }
    });
    HoverProduct ();

    // Buy Product
    const buttonsBuy = document.querySelectorAll ('.btn_buyProduct');
    buttonsBuy.forEach (element => {
      element.addEventListener ('click', function (e) {
        e.preventDefault ();
        const productId = element.getAttribute ('data-id');
        let countProductBuy = document.querySelector ('.amountProduct');
        countProductBuy.style.display = 'block';
        countProductBuy.textContent = getTotalQuantity () + 1;
        buyProduct (productId);
      });
    });

    async function fetchProductDetails (productId) {
      try {
        const response = await fetch (
          `http://localhost:3000/product/${productId}`
        ); // Thay đổi URL API thật sự của bạn
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
      // Nếu có trả về thông tin
      if (productDetails) {
        let sessionData = sessionStorage.getItem ('purchasedProducts');
        if (sessionData) {
          purchasedProducts = JSON.parse (sessionData);
        }
        if (purchasedProducts[productId]) {
          // Nếu đã mua, tăng số lượng lên 1
          purchasedProducts[productId].quantity += 1;
        } else {
          purchasedProducts[productId] = {...productDetails, quantity: 1};
        }
      }
      sessionStorage.setItem (
        'purchasedProducts',
        JSON.stringify (purchasedProducts)
      );
      console.log (purchasedProducts);
    }

    function getTotalQuantity () {
      let totalQuantity = 0;
      Object.values (purchasedProducts).forEach (element => {
        totalQuantity += element.quantity;
      });
      return totalQuantity;
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
  }

  const tabs = document.querySelectorAll ('.tab_item');
  tabs.forEach ((tab, index) => {
    tab.addEventListener ('click', function (e) {
      document.querySelector ('.tab_item.is-show').classList.remove ('is-show');
      tab.classList.add ('is-show');
      renderProduct (index);
      // console.log (index);
    });
  });
  async function handleFilter () {
    const data = await fetchProduct ();
    const btnFilter = document.querySelector ('.btn_filter');

    btnFilter.addEventListener ('click', function (e) {
      const inpFilterPrice = parseFloat (
        document.querySelector ('.filter_price').value
      );

      // Lọc sản phẩm có type 'Loa' và giá dưới hoặc bằng inpFilterPrice
      const filteredProducts = data.filter (
        item => item.type === 'Loa' && item.price <= inpFilterPrice
      );

      // Kiểm tra kết quả và in vào console
      console.log (filteredProducts);
    });
  }

  // Gọi hàm handleFilter() để bắt đầu xử lý
  handleFilter ();
  renderProduct ();
  handleFilter ();
  handleAccount ();
  handleModal ();
};
