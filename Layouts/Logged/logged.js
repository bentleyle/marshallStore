// IMPORT API
import fetchProduct from '../../API/db.js';
// IMPORT GIAO DIỆN JS ĐĂNG KÝ ĐĂNG NHẬP
import {handleAccount, handleModal} from '../../JS/EffectModal/EffecModal.js';
// IMPORT TEMPLATE CHO 3 BOX
import {
  HotProductTemplate,
  PortableTemplate,
  HomeSpekaerTemplate,
  HeadPhoneTemplate,
  HoverProduct,
} from '../../JS/TemplateMainPage/template.js';
window.onload = function () {
  const productBox = document.querySelector ('.product_box');
  const portable_boxes = document.getElementById ('portableSpeaker');
  const homeSpeaker_boxes = document.getElementById ('homeSpeaker');
  const headPhone_boxes = document.getElementById ('HeadPhone');
  async function renderProduct () {
    try {
      productBox.innerHTML = '';
      portable_boxes.innerHTML = `
        <div class="lead_product">
          <img src="../../Image/lead_productImg.png" alt="" />
          <div class="content_leadProduct">
            <p class="desc1_leadProduct">At a good price</p>
            <p class="desc2_leadProduct">Emberton II</p>
          </div>
        </div>`;
      homeSpeaker_boxes.innerHTML = `
        <div class="lead_product">
          <img src="../../Image/lead_productImg3.png" alt="" />
        </div>`;
      headPhone_boxes.innerHTML = `
        <div class="lead_product">
          <img src="../../Image/lead_productImg2.png" alt="" />
        </div>`;
      const data = await fetchProduct ();
      console.log (data);
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
    } catch (error) {
      console.log ('Error');
    }
  }
  renderProduct ();
  fetchProduct ();
  handleModal ();
  handleAccount ();
};
