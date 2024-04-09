// IMPORT API
import fetchProduct from './API/db.js';
// IMPORT GIAO DIỆN JS ĐĂNG KÝ ĐĂNG NHẬP
import {handleAccount, handleModal} from './JS/EffectModal/EffecModal.js';
// IMPORT TEMPLATE CHO 3 BOX
import {
  HotProductTemplate,
  PortableTemplate,
  HomeSpekaerTemplate,
  HeadPhoneTemplate,
  HoverProduct,
} from './JS/TemplateMainPage/template.js';

let data;
const cart = [];

window.onload = async function () {
  // Hàm xử lý mua sản phẩm
  const productBox = document.querySelector ('.product_box');
  const portable_boxes = document.getElementById ('portableSpeaker');
  const homeSpeaker_boxes = document.getElementById ('homeSpeaker');
  const headPhone_boxes = document.getElementById ('HeadPhone');
  async function renderProduct () {
    data = await fetchProduct ();
    console.log (data);
    try {
      // Render sản phẩm
      productBox.innerHTML = '';
      portable_boxes.innerHTML = `
        <div class="lead_product">
          <img src="./Image/lead_productImg.png" alt="" />
          <div class="content_leadProduct">
            <p class="desc1_leadProduct">At a good price</p>
            <p class="desc2_leadProduct">Emberton II</p>
          </div>
        </div>`;
      homeSpeaker_boxes.innerHTML = `
        <div class="lead_product">
          <img src="./Image/lead_productImg3.png" alt="" />
        </div>`;
      headPhone_boxes.innerHTML = `
        <div class="lead_product">
          <img src="./Image/lead_productImg2.png" alt="" />
        </div>`;
      let portableCount = 0;
      let homeSpeakerCount = 0;
      let headPhoneCount = 0;
      data.forEach (element => {
        if (element.hot == 1) {
          productBox.innerHTML += HotProductTemplate (element);
        } else if (
          element.desc2.includes ('LOA DI ĐỘNG') &&
          portableCount < 3
        ) {
          portable_boxes.innerHTML += PortableTemplate (element);
          portableCount++;
        } else if (
          element.desc2.includes ('LOA NGHE TRONG NHÀ') &&
          homeSpeakerCount < 3
        ) {
          homeSpeaker_boxes.innerHTML += HomeSpekaerTemplate (element);
          homeSpeakerCount++;
        } else if (
          element.desc2.includes ('TAI NGHE MARSHALL') &&
          headPhoneCount < 3
        ) {
          headPhone_boxes.innerHTML += HeadPhoneTemplate (element);
          headPhoneCount++;
        }
        HoverProduct ();
      });
      try {
        // Click mua ngay sản phẩm
        const buttonBuys = document.querySelectorAll ('.btn_buyProduct');
        buttonBuys.forEach (element => {
          element.addEventListener ('click', function (event) {
            event.preventDefault ();
            if (event.target.classList.contains ('btn_buyProduct')) {
              let countProductBuy = document.querySelector ('.amountProduct');
              // Lấy giá trị thuộc tính data-id từ nút
              const productId = event.target.getAttribute ('data-id');
              countProductBuy.style.display = 'block';
              countProductBuy.textContent = getTotalQuantity () + 1; // Lấy tổng số lượng sản phẩm đã mua
              // Gọi hàm buyProduct với ID sản phẩm
              buyProduct (productId);
            }
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
          const productDetails = {}; // Gán thông tin sản phẩm vào đây
          return productDetails;
        }

        // Hàm mua sản phẩm
        let purchasedProducts = {};
        async function buyProduct (productId) {
          // Lấy thông tin chi tiết sản phẩm dựa trên productId
          const productDetails = await fetchProductDetails (productId);
          console.log (productDetails);
          if (productDetails) {
            // Kiểm tra xem session storage đã có dữ liệu về sản phẩm đã mua chưa
            let sessionData = sessionStorage.getItem ('purchasedProducts');

            if (sessionData) {
              purchasedProducts = JSON.parse (sessionData);
            }
            if (purchasedProducts[productId]) {
              // Nếu đã mua, tăng số lượng lên 1
              purchasedProducts[productId].quantity += 1;
            } else {
              // Nếu chưa mua, thêm sản phẩm vào danh sách đã mua với số lượng là 1
              purchasedProducts[productId] = {...productDetails, quantity: 1};
            }

            // Lưu thông tin sản phẩm đã mua vào session storage
            sessionStorage.setItem (
              'purchasedProducts',
              JSON.stringify (purchasedProducts)
            );
            console.log (purchasedProducts);
          } else {
            console.log (`Không tìm thấy sản phẩm với ID ${productId}`);
          }
        }

        // Hàm lấy số lượng sản phẩm
        function getTotalQuantity () {
          let totalQuantity = 0;
          Object.values (purchasedProducts).forEach (product => {
            totalQuantity += product.quantity;
            console.log (product);
          });

          return totalQuantity;
        }
        getTotalQuantity ();

        // Click vào giỏ hàng chuyển trang
        const cartIcon = document.querySelector ('.cart_icon');
        console.log (cartIcon);
        cartIcon.addEventListener ('click', () => {
          // Lấy danh sách sản phẩm đã mua
          let amountProductCart = sessionStorage.getItem ('purchasedProducts');
          console.log (amountProductCart);
          if (amountProductCart.length == 0) {
            alert ('Chưa có sản phẩm được thêm');
          } else {
            window.location.href = `./Layouts/Pay/pay.html`;
          }
        });
      } catch (error) {}
    } catch (error) {
      console.log ('Error');
    }
  }

  renderProduct ();
  handleModal ();
  handleAccount ();
};
