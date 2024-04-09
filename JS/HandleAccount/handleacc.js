// document.addEventListener ('DOMContentLoaded', function () {
//   // Lấy Api User
//   const apiUser = 'http://localhost:3000/users';

//   async function fetchApiUser () {
//     try {
//       const response = await fetch (apiUser);
//       const data = await response.json ();
//       return data;
//     } catch (error) {
//       throw new Error ('No data found... Please try again!');
//     }
//   }

//   // Handle Login
//   function login () {
//     const btnLogin = document.getElementById ('login');
//     btnLogin.addEventListener ('click', function (e) {
//       e.preventDefault ();
//       handleLogin ();
//     });
//   }

//   async function handleLogin () {
//     const inpMail = document.querySelector ('input[name="email"]').value;
//     const inpPass = document.querySelector ('input[name="password"]').value;
//     const data = await fetchApiUser ();

//     let isLoggedIn = false;
//     data.forEach (element => {
//       if (element.email == inpMail && element.password == inpPass) {
//         isLoggedIn = true;
//       }
//     });

//     if (inpMail == '' || inpPass == '') {
//       $.alert ({
//         title: 'Lỗi!',
//         content: 'Bạn còn để trống một trong hai yêu cầu',
//       });
//     } else if (isLoggedIn) {
//       $.confirm ({
//         title: 'Chúc mừng!',
//         content: 'Bạn đã đăng nhập thành công',
//         buttons: {
//           OK: {
//             action: function () {
//               window.location.href = './test1.html';
//             },
//           },
//         },
//       });
//     } else {
//       $.alert ({
//         title: 'Lỗi!',
//         content: 'Sai email hoặc mật khẩu. Vui lòng thử lại.',
//       });
//     }
//   }

//   // Handle Register
//   let registerClick = document.getElementById ('register');
//   console.log (registerClick);
//   registerClick.addEventListener ('click', function (e) {
//     e.preventDefault ();
//     textAuthClickHandler ();
//   });

//   async function createUser (data) {
//     // Gửi POST request để tạo tài khoản mới
//     const response = await fetch (apiUser, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify (data),
//     });

//     if (data) {
//       alert ('BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG');
//     } else {
//       $.alert ({
//         title: 'Lỗi!',
//         content: 'Đã có lỗi xảy ra khi đăng ký tài khoản.',
//       });
//     }
//   }
// function textAuthClickHandler () {
//   // Đoạn mã xử lý khi người dùng nhấp vào nút "Đăng ký"
//   const inpName = document.querySelector ('input[name="username"]');
//   const inpPass = document.querySelector ('input[name="password"]');
//   const inpMail = document.querySelector ('input[name="email"]');
//   if (inpName.value === '' || inpPass.value === '' || inpMail.value === '') {
//     $.alert ({
//       title: 'Lỗi!',
//       content: 'Vui lòng điền đầy đủ thông tin.',
//     });
//     return;
//   }
//   const user = {
//     username: inpName.value,
//     password: inpPass.value,
//     email: inpMail.value,
//   };

//   // Gọi hàm createUser để tạo tài khoản mới
//   createUser (user);
// }

//   // Gọi hàm login để bắt đầu quá trình đăng nhập
//   fetchApiUser ();
//   login ();
// });
