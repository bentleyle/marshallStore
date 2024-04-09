//  template cho sản phẩm hot
export function HotProductTemplate (element) {
  return `
   <div class="side_box_product">
  <a
    style="text-decoration: none; color: black"
    href="./Layouts/InfoProduct/infoproduct.html?id=${element.id}"
  >
    <div
      data-brand="${element.brand}"
      data-wattage="${element.wattage}"
      data-wired="${element.wired}"
      data-unwired="${element.unwired}"
      class="product"
    >
      <div class="boxProduct_img">
        <img
          class="img_product"
          src="http://127.0.0.1:2804/${element.img}"
          width="260"
          alt=""
        />
        <img
          class="decal"
          src="./Image/decal.png"
          width="46"
          height="20"
          alt=""
        />
      </div>
      <div class="product_info">
        <p class="nameProduct">${element.name}</p>
        <p class="descProduct">${element.desc2}</p>
        <div class="stock_product">
          <img src="./Image/checked.png" width="15" alt="" />
          <p>In stock</p>
        </div>
        <p class="priceProduct">${element.price}</p>
     <a href="">
  <button
    data-id="${element.id}"
    style="margin-left: -6.5px"
    class="btn_buyProduct"
  >
    Mua ngay
  </button>
</a>

      </div>
      <div class="product_infoSub" />
    </div>
  </a>
</div>

    `;
}
// template cho portable speaker
export function PortableTemplate (element) {
  return `
      <div style="margin-top: -90px;"  class="controlBox">
      <div class="side_box_product">
        <a style="text-decoration: none; color: black" href="./Layouts/InfoProduct/infoproduct.html?id=${element.id}">
        <div data-brand="${element.brand}" data-wattage="${element.wattage}" data-wired="${element.wired}" data-unwired="${element.unwired}" class="product">
          <div class="boxProduct_img">
            <img
              class="img_product"
          src='http://127.0.0.1:2804/${element.img}';
              width="260"
              alt="" />
            <img
              class="decal"
              src="./Image/decal.png"
              width="46"
              height="20"
              alt="" />
          </div>
          <div class="product_info">
            <p class="nameProduct">${element.name}</p>
            <p class="descProduct">${element.desc2}</p>
            <div class="stock_product">
              <img src="./Image/checked.png" width="15" alt="" />
              <p>In stock</p>
            </div>
            <p class="priceProduct">${element.price}</p>
            <a href="">
              <button data-id="${element.id}" style="margin-left: -6.5px" class="btn_buyProduct">
                Mua ngay
              </button>
            </a>
          </div>
              <div class="product_infoSub"></div>
        </div>
        </a>
      </div>
        </div>
    `;
}
// template cho home speaker
export function HomeSpekaerTemplate (element) {
  return `
    <div style="margin-top: -90px;" class="controlBox">
 <div class="side_box_product">
  <a
    style="text-decoration: none; color: black"
    href="./Layouts/InfoProduct/infoproduct.html?id=${element.id}"
  >
    <div
      data-brand="${element.brand}"
      data-wattage="${element.wattage}"
      data-wired="${element.wired}"
      data-unwired="${element.unwired}"
      class="product"
    >
      <div class="boxProduct_img">
        <img
          class="img_product"
          src = 'http://127.0.0.1:2804/${element.img}';
          width="260"
          alt=""
        />
        <img
          class="decal"
          src="./Image/decal.png"
          width="46"
          height="20"
          alt=""
        />
      </div>
      <div class="product_info">
        <p class="nameProduct">${element.name}</p>
        <p class="descProduct">${element.desc2}</p>
        <div class="stock_product">
          <img src="./Image/checked.png" width="15" alt="" />
          <p>In stock</p>
        </div>
        <p class="priceProduct">${element.price}</p>
        <a href="">
   <button data-id="${element.id}" style="margin-left: -6.5px" class="btn_buyProduct">            Mua ngay
          </button>
        </a>
      </div>
      <div class="product_infoSub" />
    </div>
  </a>
</div>

    </div>
    `;
}
export function HeadPhoneTemplate (element) {
  return `
          <div style="margin-top: -90px;" class="controlBox">
         <div class="side_box_product">
  <a
    style="text-decoration: none; color: black"
    href="./Layouts/InfoProduct/infoproduct.html?id=${element.id}"
  >
    <div
      data-brand="${element.brand}"
      data-wattage="${element.wattage}"
      data-wired="${element.wired}"
      data-unwired="${element.unwired}"
      class="product"
    >
      <div class="boxProduct_img">
        <img
          class="img_product"
          src = 'http://127.0.0.1:2804/${element.img}';
          width="260"
          alt=""
        />
        <img
          class="decal"
          src="./Image/decal.png"
          width="46"
          height="20"
          alt=""
        />
      </div>
      <div class="product_info">
        <p class="nameProduct">${element.name}</p>
        <p class="descProduct">${element.desc2}</p>
        <div class="stock_product">
          <img src="./Image/checked.png" width="15" alt="" />
          <p>In stock</p>
        </div>
        <p class="priceProduct">${element.price}</p>
        <a href="">
   <button data-id="${element.id}" style="margin-left: -6.5px" class="btn_buyProduct">            Mua ngay
          </button>
        </a>
      </div>
      <div class="product_infoSub" />
    </div>
  </a>
</div>
        </div>
    `;
}
// Hover sub info product
export function HoverProduct () {
  const boxesProduct = document.querySelectorAll ('.product');
  boxesProduct.forEach (element => {
    const heightboxProduct = element.offsetHeight;
    const product_infoSub = element.querySelector ('.product_infoSub');
    element.addEventListener ('mouseover', function (e) {
      element.style.height = `${heightboxProduct + 100}px`;
      product_infoSub.innerHTML = `
      <p class="descProduct"><strong style="color: black; font-weight: bold; margin-left: 10px;">Thương hiệu: </strong>${element.getAttribute ('data-brand')}</p>
      <p class="descProduct"><strong style="color: black; font-weight: bold; margin-left: 10px;">Công suất: </strong>${element.getAttribute ('data-wattage')}</p>
      <p class="descProduct"><strong style="color: black; font-weight: bold; margin-left: 10px;">Kết nối có: </strong>${element.getAttribute ('data-wired')}</p>
      <p class="descProduct"><strong style="color: black; font-weight: bold; margin-left: 10px;">Kết nối không dây: </strong>${element.getAttribute ('data-unwired')}</p>
    `;
    });

    element.addEventListener ('mouseout', function (e) {
      element.style.height = heightboxProduct + 'px';
      product_infoSub.innerHTML = ''; // Xóa nội dung khi rời đi
    });
  });
}
