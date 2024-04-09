let ApiUser = 'http://localhost:3000/users';
async function DisplayAccount () {
  const response = await fetch (ApiUser);
  const userData = await response.json ();
  const boxtoView = document.querySelector ('.table1');
  let i = 0;
  let i2 = 0;
  userData.forEach (element => {
    if (element.username === 'admin') {
      i++;
      boxtoView.innerHTML += `
        <tbody
      <tr>
        <td>${i}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td>${element.password}</td>
      </tr>
        </tbody>`;
    }
  });
  const boxtoView2 = document.querySelector ('.table2');
  userData.forEach (element => {
    if (element.username != 'admin') {
      i2++;
      boxtoView2.innerHTML += `
        <tbody
      <tr>
        <td>${i2}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td>************</td>
      </tr>
        </tbody>`;
    }
  });
}
DisplayAccount ();
