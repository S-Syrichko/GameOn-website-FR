function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector("#btn-submit");
//form fields
const formData = document.querySelectorAll(".formData");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const participatedTournaments = document.querySelector("#quantity");
const wantedTournaments = document.getElementsByName("location");
const terms = document.getElementsByName("terms");

//Input list
let inputs = [
  {
    element: firstName,
    regExp: /[A-Za-zÀ-ú]{2,}/,
    errorMsg: "Veuillez entrer 2 caractères ou plus pour le champ du prenom.",
    valid: false,
  },
  {
    element: lastName,
    regExp: /[A-Za-zÀ-ú]{2,}/,
    errorMsg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    valid: false,
  },
  {
    element: email,
    regExp:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    errorMsg: "Veuillez entrer une adresse email valide.",
    valid: false,
  },
  {
    element: birthDate,
    regExp: /(19\d\d|20([01]\d|20))[-](0\d|1[0-2])[-](0[1-9]|[12]\d|3[01])?/,
    errorMsg: "Veuillez renseigner votre date de naissance (2 ans minimum)",
    valid: false,
  },
  {
    element: participatedTournaments,
    regExp: /\d/,
    errorMsg: "Veuillez entrer un nombre de tournois.",
    valid: false,
  },
  {
    //element is a list
    element: wantedTournaments,
    errorMsg: "Vous devez choisir une option.",
    valid: false,
  },
  {
    //element is a list
    element: terms,
    errorMsg: "Vous devez vérifier que vous acceptez les termes et conditions.",
    valid: false,
  },
];

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.addEventListener("click", closeModal);
// submit modal event
submitBtn.addEventListener("click", isFormValid);
// listen form inputs
inputs.forEach((input) => {
  if (input.regExp) {
    input.element.addEventListener("focusout", (e) => checkTextFields(input));
  } else {
    // !!!
    input.element.forEach((elem) =>
      elem.addEventListener("change", (e) => checkRadio(input))
    );
  }
});
// dynamically check if form valid
formData.forEach((field) =>
  field.addEventListener("change", (e) => {
    if (inputs.every((input) => input.valid === true)) {
      enableSubmit();
    }
  })
);

//Functions

//Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//Handle form validation
function isFormValid() {
  checkForm();
  if (inputs.every((input) => input.valid === true)) {
    enableSubmit();
  } else {
    disableSubmit();
  }
}

//Check all form fields
function checkForm() {
  inputs.forEach((input) => {
    if (input.regExp) {
      checkTextFields(input);
    } else {
      checkRadio(input);
    }
  });
}

//Check text fields
function checkTextFields(input) {
  if (input.regExp.test(input.element.value)) {
    validateInput(true, input);
  } else {
    validateInput(false, input);
  }
}
//Check radios
function checkRadio(input) {
  let isValid = false;
  for (var i = 0; i < input.element.length; i++) {
    if (input.element[i].checked) {
      isValid = true;
      break;
    }
  }
  validateInput(isValid, input);
}

//Set validation state
function validateInput(isValid, input) {
  //Setting validation state
  input.valid = isValid;
  //Add/delete errorMsg
  if (!isValid) {
    return addErrorMsg(input);
  }
  return removeErrorMsg(input);
}
//Add error message
function addErrorMsg(input) {
  //Get element and existing errorMsg
  let inputElement = input.element.length ? input.element[0] : input.element;
  let errors = inputElement.parentNode.getElementsByClassName("errorMsg");
  //Add errorMsg if none present
  if (!errors.length) {
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("errorMsg");
    errorMsg.innerHTML = input.errorMsg;
    errorMsg.style.fontSize = "0.6em";
    errorMsg.style.color = "red";
    inputElement.parentNode.appendChild(errorMsg);
    inputElement.style.borderColor = "red";
  }
}
//Remove error message
function removeErrorMsg(input) {
  //Get element and existing errorMsg
  let inputElement = input.element.length ? input.element[0] : input.element;
  let errors = inputElement.parentNode.getElementsByClassName("errorMsg");
  //Remove errorMsg if exists
  if (errors.length > 0) {
    errors[0].parentNode.removeChild(errors[0]);
    inputElement.style.borderColor = "";
  }
}
//Disable modal submit button
function disableSubmit() {
  submitBtn.setAttribute("disabled", true);
  submitBtn.style.opacity = "0.5";
  submitBtn.style.cursor = "not-allowed";
}
//Enable modal submit button
function enableSubmit() {
  submitBtn.removeAttribute("disabled");
  submitBtn.style.opacity = "1";
  submitBtn.style.cursor = "pointer";
}
//Handle fomr submit
function submitForm(e) {
  e.preventDefault();
  transformModal();
  addSubmitMessage();
  transformSubmitButton();
}
//Transform modal after submit
function transformModal() {
  formData.forEach((formField) => formField.parentNode.removeChild(formField));
  modalBody.style.height = "800px";
  modalBody.style.display = "flex";
  modalBody.style.flexDirection = "column";
  modalBody.style.alignItems = "center";
  modalBody.style.justifyContent = "flex-end";
}
//Add submit message
function addSubmitMessage() {
  const validMsg = document.createElement("p");
  validMsg.classList.add("validMsg");
  validMsg.innerHTML = "Merci pour votre inscription";
  validMsg.style.fontSize = "1.5em";
  validMsg.style.textAlign = "center";
  validMsg.style.paddingBottom = "300px";
  modalBody.prepend(validMsg);
}
//Transform submit btn behavior
function transformSubmitButton() {
  submitBtn.value = "Fermer";
  submitBtn.type = "button";
  submitBtn.removeEventListener("click", isFormValid);
  submitBtn.addEventListener("click", closeModal);
}
