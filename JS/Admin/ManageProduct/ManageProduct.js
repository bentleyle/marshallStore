// Import API
import fetchProduct from '../../../API/db.js';

var formBoxModal2 = document.querySelector ('.form-box2');

window.onload = function () {
  async function displayTableProduct (product) {
    try {
      const data = await fetchProduct ();

      let i = 1;
      const boxtoView = document.querySelector ('table');
      data.forEach (element => {
        boxtoView.innerHTML += `
              <tbody>
                <tr>
                  <th>${i++}</th>
                  <td>${element.type}</td>
                  <td>${element.name}</td>
                  <td>
                    <button id="buttonEdit" value="Sửa" 
                    data-id="${element.id}" 
                    data-name="${element.name}" 
                    data-type="${element.type}"
                    data-desc="${element.desc}"
                    data-desc2="${element.desc2}"
                    data-price="${element.price}"
                    data-color="${element.color}"
                    data-sound="${element.sound}"
                    data-brand="${element.brand}"
                    data-watt="${element.wattage}"
                    data-fre="${element.frequency}"
                    data-support="${element.supportapp}"
                    data-wired="${element.wired}"
                    data-unwired="${element.unwired}"
                    data-size="${element.size}"
                    data-weight="${element.weight}">
                    
                        <img src="../../../Image/pen.png" width="30" alt="" />
                     </button>
                    <button class="btn-del" value="Xóa" data-id="${element.id}">
                          <img src="../../../Image/bin.png" width="30" alt="" />
                     </button>
                  </td>
                </tr>
              </tbody>
          `;
      });

      handleModal ();
      Delete ();
      Edit ();
      addForm ();
    } catch (error) {
      throw new Error ('Có lỗi xảy ra...');
    }
  }

  // Hàm hiển thị modal
  function handleModal () {
    const formBoxModal = document.querySelector ('.form-box');
    const overlay = document.querySelector ('.bgr');

    const linkAdd = document.querySelector ('.linkAdd');

    linkAdd.addEventListener ('click', function () {
      formBoxModal.classList.toggle ('show');
      overlay.style.display = 'block';
    });
    overlay.addEventListener ('click', function (e) {
      formBoxModal.classList.toggle ('show');
      overlay.style.display = 'none';
    });
  }

  // Hàm xóa sản phẩm
  function Delete () {
    const deleteButtons = document.querySelectorAll ('.btn-del');
    const url = 'http://localhost:3000/product';

    deleteButtons.forEach (button => {
      button.addEventListener ('click', () => {
        const productId = button.getAttribute ('data-id');
        $.confirm ({
          title: 'Xóa sản phẩm',
          content: 'Bạn có chắc muốn xóa không?',
          buttons: {
            confirm: function () {
              fetch (`${url}/${productId}`, {
                method: 'DELETE',
              })
                .then (res => res.json ())
                .then (() => location.reload ());
              $.alert ('Đã xóa');
            },
            cancel: function () {
              $.alert ('Đã hủy');
            },
          },
        });
      });
    });
  }

  // Hàm hiển thị khung cập nhật sản phẩm
  function Edit () {
    const formBoxModal2 = document.querySelector ('.form-box2');
    const overlay2 = document.querySelector ('.bgr2');
    const btnEdit = document.querySelectorAll ('#buttonEdit');
    // const submitButton = document.getElementById ('submitButton');
    let idProduct;
    btnEdit.forEach ((button, index) => {
      button.addEventListener ('click', function (e) {
        formBoxModal2.style.display = 'block';
        overlay2.style.display = 'block';
        idProduct = button.getAttribute ('data-id');
        UpdateProduct (idProduct);

        // Save variable
        const productName = button.getAttribute ('data-name');
        const productType = button.getAttribute ('data-type');
        const productDesc = button.getAttribute ('data-desc');
        const productDesc2 = button.getAttribute ('data-desc2');
        const productPrice = button.getAttribute ('data-price');
        const productColor = button.getAttribute ('data-color');
        const productSound = button.getAttribute ('data-sound');
        const productBrand = button.getAttribute ('data-brand');
        const productWatt = button.getAttribute ('data-watt');
        const productFre = button.getAttribute ('data-fre');
        const productSupportApp = button.getAttribute ('data-support');
        const productWired = button.getAttribute ('data-wired');
        const productUnwired = button.getAttribute ('data-unwired');
        const productSize = button.getAttribute ('data-size');
        const productWeight = button.getAttribute ('data-weight');

        // Save variable
        const inpName = document.getElementById ('nameProductEdit');
        const inpPrice = document.getElementById ('priceProductEdit');
        const inpDesc = document.getElementById ('desc1ProductEdit');
        const inpDesc2 = document.getElementById ('desc2ProductEdit');
        const inpColor = document.getElementById ('colorProductEdit');
        const inpSound = document.getElementById ('soundProductEdit');
        const inpBrand = document.getElementById ('brandProductEdit');
        const inpWatt = document.getElementById ('wattProductEdit');
        const inpFre = document.getElementById ('freProductEdit');
        const inpSupportApp = document.getElementById ('supportAppEdit');
        const inpWired = document.getElementById ('wiredProductEdit');
        const inpUnwired = document.getElementById ('unwiredProductEdit');
        const inpSize = document.getElementById ('sizeProductEdit');
        const inpWeight = document.getElementById ('weightProductEdit');
        const selectType = document.getElementById ('selectTypeProductEdit');

        // Update lại value khi ấn sửa
        inpName.value = productName; // Cập nhật giá trị của trường nhập liệu 'nameProduct' bằng 'productName'
        selectType.value = productType;
        if (selectType.value !== productType) {
          // Nếu productType không tồn tại trong tùy chọn của select, hãy thêm nó vào select
          const newOption = document.createElement ('option');
          newOption.value = productType;
          newOption.text = productType;
          selectType.appendChild (newOption);
          // set lại giá trị
          selectType.value = productType;
        }
        inpPrice.value = productPrice;
        inpDesc.value = productDesc;
        inpDesc2.value = productDesc2;
        inpColor.value = productColor;
        inpSound.value = productSound;
        inpBrand.value = productBrand;
        inpWatt.value = productWatt;
        inpFre.value = productFre;
        inpSupportApp.value = productSupportApp;
        inpWired.value = productWired;
        inpUnwired.value = productUnwired;
        inpSize.value = productSize;
        inpWeight.value = productWeight;
      });
      overlay2.addEventListener ('click', function (e) {
        formBoxModal2.style.display = 'none';
        overlay2.style.display = 'none';
      });
    });
  }

  // Hàm cập nhật lại sản phẩm
  async function UpdateProduct (idProduct) {
    console.log (1);
    console.log (idProduct);

    const addForm = document.querySelector ('#submitButton');

    const inpName = document.getElementById ('nameProductEdit');
    const inpPrice = document.getElementById ('priceProductEdit');
    const inpDesc = document.getElementById ('desc1ProductEdit');
    const inpDesc2 = document.getElementById ('desc2ProductEdit');
    const inpColor = document.getElementById ('colorProductEdit');
    const inpSound = document.getElementById ('soundProductEdit');
    const inpBrand = document.getElementById ('brandProductEdit');
    const inpWatt = document.getElementById ('wattProductEdit');
    const inpFre = document.getElementById ('freProductEdit');
    const inpSupportApp = document.getElementById ('supportAppEdit');
    const inpWired = document.getElementById ('wiredProductEdit');
    const inpUnwired = document.getElementById ('unwiredProductEdit');
    const inpSize = document.getElementById ('sizeProductEdit');
    const inpWeight = document.getElementById ('weightProductEdit');
    const selectType = document.getElementById ('selectTypeProductEdit');

    const getImg = document.getElementById ('getImg');
    addForm.addEventListener ('click', async function (e) {
      e.preventDefault ();
      console.log ('asdasdasd');
      const url = 'http://localhost:3000/product/';
      try {
        const uploadImg = new FormData ();
        document.querySelectorAll ('#getImgProductEdit').forEach (input => {
          Array.from (input.files).forEach (file => {
            uploadImg.append ('productImage', file);
          });
        });

        const res = await fetch ('http://localhost:2804/upload-img', {
          method: 'POST',
          body: uploadImg,
        });
        const pathImg = await res.json ();
        console.log (pathImg);
        try {
          const response = await fetch (url + idProduct, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify ({
              name: inpName.value,
              type: selectType.value,
              price: inpPrice.value,
              desc: inpDesc.value,
              desc2: inpDesc2.value,
              img: pathImg.img_product,
              color: inpColor.value,
              sound: inpSound.value,
              brand: inpBrand.value,
              wattage: inpWatt.value,
              frequency: inpFre.value,
              supportapp: inpSupportApp.value,
              wired: inpWired.value,
              unwired: inpUnwired.value,
              size: inpSize.value,
              weight: inpWeight.value,
            }),
          });
          console.log (3);
          e.preventDefault ();
          if (response.ok) {
            const responseData = await response.json ();
            // alert (`Bạn đã thêm sản phẩm ${inpName.value} thành công`);
          } else {
            console.error ('Yêu cầu POST thất bại.');
          }
        } catch (error) {
          console.error ('Đã xảy ra lỗi:', error);
        }
      } catch (error) {}

      //
    });
  }

  // addForm
  async function addForm () {
    const addForm = document.querySelector ('.btnSubmit');

    const inpName = document.getElementById ('nameProduct');
    const inpPrice = document.getElementById ('price');
    const inpDesc = document.getElementById ('desc1');
    const inpDesc2 = document.getElementById ('desc2');
    const inpColor = document.getElementById ('color');
    const inpSound = document.getElementById ('sound');
    const inpBrand = document.getElementById ('brand');
    const inpWatt = document.getElementById ('watt');
    const inpFre = document.getElementById ('fre');
    const inpSupportApp = document.getElementById ('supportApp');
    const inpWired = document.getElementById ('wired');
    const inpUnwired = document.getElementById ('unwired');
    const inpSize = document.getElementById ('size');
    const inpWeight = document.getElementById ('weight');
    const selectType = document.getElementById ('selectType');
    const getImg = document.getElementById ('getImg');
    addForm.addEventListener ('click', async function (e) {
      // e.preventDefault ();
      console.log ('asdasdasd');
      const url = 'http://localhost:3000/product';
      try {
        const uploadImg = new FormData ();
        document.querySelectorAll ('#getImg').forEach (input => {
          Array.from (input.files).forEach (file => {
            uploadImg.append ('productImage', file);
          });
        });

        const res = await fetch ('http://localhost:2804/upload-img', {
          method: 'POST',
          body: uploadImg,
        });
        const pathImg = await res.json ();
        try {
          const response = await fetch (url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify ({
              name: inpName.value,
              type: selectType.value,
              price: inpPrice.value,
              desc: inpDesc.value,
              desc2: inpDesc2.value,
              img: pathImg.img_product,
              color: inpColor.value,
              sound: inpSound.value,
              brand: inpBrand.value,
              wattage: inpWatt.value,
              frequency: inpFre.value,
              supportapp: inpSupportApp.value,
              wired: inpWired.value,
              unwired: inpUnwired.value,
              size: inpSize.value,
              weight: inpWeight.value,
            }),
          });
          console.log (3);
          e.preventDefault ();
          if (response.ok) {
            const responseData = await response.json ();
            // alert (`Bạn đã thêm sản phẩm ${inpName.value} thành công`);
          } else {
            console.error ('Yêu cầu POST thất bại.');
          }
        } catch (error) {
          console.error ('Đã xảy ra lỗi:', error);
        }
      } catch (error) {}

      //
    });
  }

  // Delete

  displayTableProduct ();
};
