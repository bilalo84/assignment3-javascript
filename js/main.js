let signNameinput = document.querySelector("#signName");
let signEmailinput = document.querySelector("#signEmail");
let signPassword = document.querySelector("#signPass");
let logEmail = document.querySelector("#logEmail");
let logPass = document.querySelector("#logPass");

var signUplist = [];

if (localStorage.getItem("User") != null) {
  signUplist = JSON.parse(localStorage.getItem("User"));
  console.log(signUplist);
}

var username = localStorage.getItem("userNamelogin");
let res = username.replaceAll('"', " ");
if (username) {
  document.getElementById("welHome").innerHTML = `Welcome ` + res;
}

function addNewuser() {
  if (filterEmail() == true && ValidateEmail() == true) {
    var newUser = {
      name: signNameinput.value,
      email: signEmailinput.value,
      password: signPassword.value,
    };

    signUplist.push(newUser);
    localStorage.setItem("User", JSON.stringify(signUplist));
    window.location.replace("index.html");
  }
}

function ValidateEmail() {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signEmailinput.value)
  ) {
    document
      .querySelector("#validationServerUsernameFeedback")
      .classList.remove("d-block");
    document
      .querySelector("#validationServerUsernameFeedback")
      .classList.add("d-none");
    return true;
  } else {
    document
      .querySelector("#validationServerUsernameFeedback")
      .classList.remove("d-none");
    document
      .querySelector("#validationServerUsernameFeedback")
      .classList.add("d-block");
    return false;
  }
}

function filterEmail() {
  let newList = [];

  newList = signUplist.findIndex((el) => {
    return el.email == signEmailinput.value;
  });

  if (newList < 0) {
    document.querySelector("#exist").classList.add("d-none");
    console.log(newList);
    return true;
  } else {
    document.querySelector("#exist").classList.remove("d-none");
    console.log(newList);
    return false;
  }
}

function loginValid() {
  let logV = [];
  console.log(signUplist);
  console.log(logPass.value);
  console.log(logEmail.value);
  logV = signUplist.find((el) => {
    return (
      el.email.toLowerCase() == logEmail.value.toLowerCase() &&
      el.password.toLowerCase() == logPass.value.toLowerCase()
    );
  });
  console.log(logV);

  if (logV == undefined) {
    document.querySelector("#incorrect").classList.remove("d-none");
  } else {
    localStorage.setItem("userNamelogin", JSON.stringify(logV.name));
    window.location.replace("home.html");
    document.querySelector("#incorrect").classList.add("d-none");
  }

  console.log(logV);
}

function logOutV() {
  localStorage.removeItem("userNamelogin");
}


