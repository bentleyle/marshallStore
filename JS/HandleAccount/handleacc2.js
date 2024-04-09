var username = document.getElementById ('username');
var email = document.getElementById ('email');
var password = document.getElementById ('password');
var registerBtn = document.getElementById ('register');
var loginBtn = document.getElementById ('login');
var regisField = document.getElementById ('linkRegis');
var loginField = document.getElementById ('linkLogin');
console.log (regisField, loginField);

// API User
const apiUser = 'http://localhost:3000/users';

// Hàm lấy API
async function fetchApiUser () {
  try {
    const response = await fetch (apiUser);
    const data = await response.json ();
    return data;
  } catch (error) {
    throw new Error ('No data found... Please try again!');
  }
}

// Form validation
function resetParam (input) {
  input.forEach (element => {
    let parent = element.parentElement;
    let paragraph = parent.querySelector ('.error_text');
    paragraph.innerText = '';
  });
}

// Hàm kiểm tra, hiển thị lỗi khi đăng nhập
function showError (input, message) {
  let parent = input.parentElement;
  let paragraph = parent.querySelector ('.error_text');
  paragraph.innerText = message;
}

// Hàm xử lý nếu không có lỗi sẽ ẩn đi
function showSuccess (input) {
  let parent = input.parentElement;
  let paragraph = parent.querySelector ('.error_text');
  paragraph.innerText = '';
}

// Hàm kiểm tra người dùng có nhập vào input hay không
function checkEmptyError (listInput) {
  let isEmptyError = false;
  listInput.forEach (element => {
    console.log (element);
    element.value = element.value.trim ();

    if (element.value == '') {
      isEmptyError = true;
      showError (element, 'Không được để trống');
    } else {
      showSuccess (element);
    }
  });
  return isEmptyError;
}

// Hàm kiểm tra ký tự khi người dùng đăng ký tài khoản
function checkLength (input, min, max) {
  input.value = input.value.trim ();
  if (input.value.length < min) {
    showError (input, `Không được dưới ${min} ký tự`);
    return true;
  }
  if (input.value.length > max) {
    showError (input, `Không được trên ${max} ký tự`);
    return true;
  }
  return false;
}

// Hàm kiểm tra định dạng Email
function checkEmail (input) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  input.value = input.value.trim ();

  let isEmailError = !emailRegex.test (input.value); // Nếu không hợp lệ
  if (emailRegex.test (input.value)) {
    showSuccess (input);
  } else {
    showError (input, 'Email Invalid');
  }
  return isEmailError;
}

loginField.addEventListener ('click', function (e) {
  resetParam ([username, email, password]);
});

regisField.addEventListener ('click', function (e) {
  resetParam ([username, email, password]);
});

// Cookie
function setCookie (name, value, days) {
  const expires = new Date ();
  expires.setTime (expires.getTime () + days * 24 * 60 * 60 * 100);
  document.cookie = `${name}=${value};expires=${expires.toUTCString ()};path=/`;
}

function getCookie (name) {
  const cookieValue = document.cookie.match (`(^|;) ?${name}=([^;]*)(;|$)`);
  return cookieValue ? cookieValue[2] : null;
}

// Hàm chạy đăng nhập
function login () {
  loginBtn.addEventListener ('click', function (e) {
    e.preventDefault ();
    handleLogin ();
  });
}

// Hàm lưu, xác nhận thông tin khi đăng nhập
async function handleLogin () {
  let isEmailError = checkEmptyError ([email, password]); // hàm kiểm tra không được để trống
  let isAdmin = false; // biến xác thực admin
  if (!isEmailError) {
    if (email.value == 'admin@gmail.com' && password.value == 'admin') {
      isAdmin = true;
    }
    if (isAdmin) {
      // Nếu là admin
      alert ('Đăng nhập thành công');
      window.location.href = './Layouts/Admin/index.html';
    } else {
      let foundUser = false;
      const data = await fetchApiUser ();
      data.forEach (element => {
        if (
          element.email == email.value &&
          element.password == password.value
        ) {
          foundUser = true;
          setCookie ('loggedInUserEmail', element.email, 30); // Lưu email vào cookie trong 30 ngày
        }
      });
      if (foundUser) {
        alert ('Đăng nhập thành công');
        window.location.reload ();
      } else {
        alert ('Email hoặc mật khẩu không đúng!!');
      }
    }
  }
}

// Hàm hiển thị Email khi người dùng đăng nhập
function displayUserEmail () {
  const logOutText = document.getElementById ('logOut');
  const userIcon = document.querySelector ('.user_icon');
  const loggedInUserEmail = getCookie ('loggedInUserEmail');
  if (loggedInUserEmail) {
    let showUserEmail = document.getElementById ('display_name');
    if (showUserEmail) {
      showUserEmail.textContent = `${loggedInUserEmail}`;
      logOutText.style.display = 'block';
      userIcon.style.display = 'none';
    }
  }
}

displayUserEmail ();
login ();

// Hàm khi bấm đăng xuất => sẽ tải lại trang
function logOut () {
  document.cookie =
    'loggedInUserEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.reload ();
}

const logOutUser = document.getElementById ('logOut');
if (logOutUser) {
  logOutUser.addEventListener ('click', logOut);
}

// Hàm chạy đăng ký
function register () {
  registerBtn.addEventListener ('click', function (e) {
    e.preventDefault ();
    handleRegis ();
  });
}
register ();

// Hàm thực hiện, kiểm soát chức năng đăng ký
async function handleRegis () {
  let isEmptyError = checkEmptyError ([username, email, password]);
  let isEmailError = checkEmail (email);
  let isUsernameLengthError = checkLength (username, 3, 20);

  // Nếu không có lỗi xảy ra
  if (!isEmptyError && !isEmailError && !isUsernameLengthError) {
    const registerData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    try {
      // Kiểm tra trùng tài khoản
      // const checkDuplicateData = await fetch (
      //   apiUser,
      //   `?username=${registerData.username}&email=${registerData.email}`
      // );
      // if (checkDuplicateData.ok) {
      //   const foundDuplicateData = await checkDuplicateData.json ();
      //   console.log (foundDuplicateData);

      //   if (foundDuplicateData > 0) {
      //     alert ('Username hoặc Email đã có người sử dụng');
      //     return;
      //   }
      // }
      const response = await fetch (apiUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (registerData),
      });

      if (response.ok) {
        alert ('Đăng ký thành công');
      } else {
        alert ('Đăng ký không thành công, hãy xem lại yêu cầu!!');
      }
    } catch (error) {
      console.error ('Lỗi khi gửi yêu cầu đăng ký:', error);
    }
  }
}
