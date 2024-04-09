// handle Modal
const handleModal = () => {
  const userIcon = document.querySelector ('.user_icon');
  const modal = document.querySelector ('.form-box');
  const overlay = document.querySelector ('.bgr');
  const closeModal = document.querySelector ('.close_modal');
  userIcon.addEventListener ('click', function () {
    modal.classList.toggle ('show');
    overlay.style.display = 'block';
  });
  overlay.addEventListener ('click', function () {
    overlay.style.display = 'none';
    modal.classList.toggle ('show');
  });
  closeModal.addEventListener ('click', function (e) {
    modal.classList.toggle ('show');
    overlay.style.display = 'none';
  });
};

// handleACCOUNT
const handleAccount = () => {
  let nameField = document.getElementById ('name-field');
  const SignUp = document.getElementById ('signUp-field');
  const SignIn = document.getElementById ('signIn-field');
  let forgotPass = document.querySelector ('.forgot_account');
  let tittle = document.querySelector ('.tittle');
  let textAuth = document.querySelector ('.textAuth');

  const input_pass = document.querySelector ('.input_pass');
  const passIcon = document.querySelector ('.passIcon');
  passIcon.addEventListener ('click', function (e) {
    if (input_pass.type === 'password') {
      input_pass.type = 'text';
      passIcon.classList.toggle ('fa-eye');
      passIcon.classList.toggle ('fa-eye-slash');
    } else {
      input_pass.type = 'password';

      passIcon.classList.toggle ('fa-eye');
      passIcon.classList.toggle ('fa-eye-slash');
    }
  });
  SignUp.addEventListener ('click', function (e) {
    nameField.style.maxHeight = '65px';
    SignUp.style.display = 'none';
    SignIn.style.display = 'block';
    forgotPass.style.maxHeight = '0px';
    tittle.innerHTML = 'Đăng ký';
    textAuth.innerHTML = 'Sign Up';
  });
  SignIn.addEventListener ('click', function (e) {
    nameField.style.maxHeight = '0px';
    SignIn.style.display = 'none';
    SignUp.style.display = 'block';
    forgotPass.style.maxHeight = '20px';
    tittle.innerHTML = 'Đăng nhập';
    textAuth.innerHTML = 'Login';
  });
};
handleModal ();
handleAccount ();
