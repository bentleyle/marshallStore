// Import API
import fetchProduct from '../../API/db.js';
import fetchUser from '../../API/user.js';

async function displayStatiscal () {
  try {
    const dataProduct = await fetchProduct ();
    const dataUsers = await fetchUser ();

    const uniqueTypes = new Set ();
    dataProduct.forEach (product => {
      uniqueTypes.add (product.type);
    });
    let dataTypes = [...uniqueTypes];

    const findDataTypes = dataTypes.length;
    const findDataProduct = dataProduct.length;
    const findDataUsers = dataUsers.length;

    // Template chứa nội dung
    const htmlContent = `
    <div class="boxManage">
      <div class="statiscal">
        <p>${findDataTypes}</p>
        <p>LOẠI HÀNG</p>
      </div>
      <div class="icon">
        <img src="../../Image/clipboard 1.png" width="60" alt="" />
      </div>
    </div>
    <div class="boxManage">
      <div class="statiscal">
        <p>${findDataProduct}</p>
        <p>SẢN PHẨM</p>
      </div>
      <div class="icon">
        <img src="../../Image/packaging 1.png" width="60" alt="" />
      </div>
    </div>
   <div class="boxManage">
      <div class="statiscal">
        <p>${findDataUsers}</p>
        <p>TÀI KHOẢN</p>
      </div>
      <div class="icon">
        <img src="../../Image/useradmin.png" width="60" alt="" />
      </div>
    </div>
    </div>`;

    // Hiển thị template
    const boxtoView = document.querySelector ('.admin_Manage');
    boxtoView.innerHTML = htmlContent;
  } catch (error) {
    throw new Error ('Có lỗi xảy ra...');
  }
}
async function displayProductCount () {
  let apiProductCount = 'http://localhost:3000/mostProductBuy';
  const boxtoView = document.querySelector ('.table1');
  const totalPrice = document.querySelector ('.totalPrice');
  console.log (totalPrice);

  console.log (boxtoView);
  try {
    const response = await fetch (apiProductCount);
    let data = await response.json ();
    let i = 0;
    if (Array.isArray (data)) {
      // Sắp xếp mảng data theo productCount

      data.forEach (productArray => {
        let total = 0;
        data = data.flat ().sort ((a, b) => a.productCount - b.productCount);
        productArray.forEach (product => {
          if (product.productCount >= 50) {
            i++;
            boxtoView.innerHTML += `
        <tbody>
        <tr>
            <td>${i}</td>
            <td>${product.productType}</td>
            <td>${product.productName}</td>
            <td>${product.productCount}</td>
            <td>${product.productPrice}</td>

        </tr>
        </tbody>`;
            total += product.productPrice;
            totalPrice.textContent = total;
          }
        });
      });
    }
  } catch (error) {
    console.error ('Error fetching data:', error);
  }
}
displayProductCount ();
displayStatiscal ();
