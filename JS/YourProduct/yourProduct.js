document.addEventListener ('DOMContentLoaded', function () {
  const clientName = localStorage.getItem ('clientName');
  const clientAddress = localStorage.getItem ('clientAddress');
  const clientEmail = localStorage.getItem ('clientEmail');
  const clientPhone = localStorage.getItem ('clientPhone');
  const clientNote = localStorage.getItem ('clientAddress');

  console.log ('Client Name:', clientName);
  console.log ('Client Address:', clientAddress);
  console.log (clientEmail);
  console.log (clientPhone);
  console.log (clientNote);
  // Bạn có thể thực hiện các hành động khác với giá trị này ở đây
  const listProductCart = JSON.parse (
    sessionStorage.getItem ('purchasedProducts')
  );
  const boxtoView = document.querySelector ('.table1');
  Object.values (listProductCart).forEach (productBuy => {
    boxtoView.innerHTML += `
    <tbody
      <tr>
        <td>${clientName}</td>
        <td>${clientAddress}</td>
        <td>${clientPhone}</td>
        <td>${clientEmail}</td>
        <td>${clientNote}</td>
        <td>${productBuy.name}</td>
        <td>${productBuy.type}</td>
<td>${productBuy.quantity}</td>
<td>${productBuy.price * productBuy.quantity}</td>

      </tr>
        </tbody>`;
  });
});
