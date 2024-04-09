// template cho portable speaker
// export = xuat
export function PortableTemplate (element) {
  return `
    <div class="side_box_product">
      <a style='text-decoration: none; color: black;'
 href="../../Layouts/InfoProduct/infoproduct.html?id=${element.id}">
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
      src="../../Image/decal.png"
      width="46"
      height="20"
      alt=""
    />
  </div>
  <div class="product_info">
    <p class="nameProduct">${element.name}</p>
    <p class="descProduct">${element.desc2}</p>
    <div class="stock_product">
      <img src="../../Image/checked.png" width="15" alt="" />
      <p>In stock</p>
    </div>
    <p class="priceProduct">${element.price}</p>
    <a href="">
      <button data-id="${element.id}" style="margin-left: -6.5px" class="btn_buyProduct">
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
