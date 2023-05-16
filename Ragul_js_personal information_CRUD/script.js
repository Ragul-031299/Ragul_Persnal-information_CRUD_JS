class FormValidation {
  formValues = {
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  };
  errorValues = {
    firstnameErr: "",
    lastname: "",
    emailErr: "",
    phonenumber: "",
  }; //Err msg ()
  showErrorMsg(index, msg) {
    const form_group = document.getElementsByClassName("form-group")[index];
    form_group.classList.add("error");
    form_group.classList.remove("success");
    form_group.getElementsByTagName("span")[0].textContent = msg;
  }
  //success msg()
  showSuccessMsg(index) {
    const form_group = document.getElementsByClassName("form-group")[index];
    form_group.classList.remove("error");
    form_group.classList.add("success");
  }
  //get input()
  getInputs() {
    this.formValues.firstname = document
      .getElementById("firstname")
      .value.trim();
    this.formValues.lastname = document.getElementById("lastname").value.trim();
    this.formValues.email = document.getElementById("email").value.trim();
    this.formValues.phonenumber = document
      .getElementById("phonenumber")
      .value.trim();
  }
  //validation start

  //firstname
  validateFirstname() {
    if (this.formValues.firstname === "") {
      this.errorValues.firstnameErr = "* Please Enter Your Firstname";
      this.showErrorMsg(0, this.errorValues.firstnameErr);
    } else if (this.formValues.firstname.length <= 4) {
      this.errorValues.firstnameErr =
        "* firstname must be atleast 5 Characters";
      this.showErrorMsg(0, this.errorValues.firstnameErr);
    } else if (this.formValues.firstname.length > 14) {
      this.errorValues.firstnameErr =
        "* firstname should not exceeds 14 Characters";
      this.showErrorMsg(0, this.errorValues.firstnameErr);
    } else {
      this.errorValues.firstnameErr = "";
      this.showSuccessMsg(0);
    }
  }
  //lastname
  validateLastname() {
    if (this.formValues.lastname === "") {
      this.errorValues.lastnameErr = "* Please Enter Your lastame";
      this.showErrorMsg(1, this.errorValues.lastnameErr);
    } else if (this.formValues.lastname.length <= 0) {
      this.errorValues.lastnameErr = "* lastname must be atleast 1 Characters";
      this.showErrorMsg(1, this.errorValues.lastnameErr);
    } else if (this.formValues.lastname.length > 14) {
      this.errorValues.lastnameErr =
        "* lastname should not exceeds 14 Characters";
      this.showErrorMsg(1, this.errorValues.lastnameErr);
    } else {
      this.errorValues.lastnameErr = "";
      this.showSuccessMsg(1);
    }
  }
  //email
  validateEmail() {
    const regExp =
      /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/;
    if (this.formValues.email === "") {
      this.errorValues.emailErr = "* Please Enter Valid Email";
      this.showErrorMsg(2, this.errorValues.emailErr);
    } else if (!regExp.test(this.formValues.email)) {
      this.errorValues.emailErr = "* Invalid Email";
      this.showErrorMsg(2, this.errorValues.emailErr);
    } else {
      this.errorValues.emailErr = "";
      this.showSuccessMsg(2);
    }
  }
  //homephone
  validatePhonenumber() {
    const phoneno = /^\d{10}$/;
    if (this.formValues.phonenumber === "") {
      this.errorValues.phonenumberErr = "* Please Enter your Phone Number";
      this.showErrorMsg(3, this.errorValues.phonenumberErr);
    } else if (phoneno.test(this.formValues.phonenumber)) {
      this.errorValues.phonenumberErr = "";
      this.showSuccessMsg(3);
    } else {
      this.errorValues.phonenumberErr = "* Invalid Phone Number";
      this.showErrorMsg(3, this.errorValues.phonenumberErr);
    }
  }

  //alert msg
  alertMessage() {
    const { firstnameErr, lastnameErr, emailErr, phonenumberErr } =
      this.errorValues;
    if (
      firstnameErr === "" &&
      lastnameErr === "" &&
      emailErr === "" &&
      phonenumberErr === ""
    ) {
      swal(
        "Personal information has been updated successfully! ",
        "ThankYou..." + this.formValues.firstname,
        "success"
      ).then(() => {
        this.addInputs();
      });
    } else {
      swal(
        "Please fill your all personal details",
        "Do you want to update value to continue click'OK'?",
        "error"
      );
    }
  }
  //remove inputs
  removeInputs() {
    const form_groups = document.getElementsByClassName("form-group");
    Array.from(form_groups).forEach((element) => {
      element.getElementsByTagName("input")[0].value = "";
      element.getElementsByTagName("span")[0].textContent = "";
      element.classList.remove("success");
    });
  }
}

const ValidateUserInputs = new FormValidation();

document
  .getElementsByClassName("form")[0]
  .addEventListener("submit", (event) => {
    event.preventDefault();
    ValidateUserInputs.getInputs();
    ValidateUserInputs.validateFirstname();
    ValidateUserInputs.validateLastname();
    ValidateUserInputs.validateEmail();
    ValidateUserInputs.validatePhonenumber();
    ValidateUserInputs.alertMessage();
  });

//datepicker age
function validateDateOfBirth(dateString) {
  let regex = /^\d{2}\/\d{2}\/\d{4}$/; // mm/dd/yyyy format
  if (!regex.test(dateString)) {
    alert("Date of birth should be in mm/dd/yyyy format");
    return false;
  }
  return true;
}

function calculateAgeAndUpdateInput(dateString) {
  let parts = dateString.split("/");
  let year = parseInt(parts[2]);
  let month = parseInt(parts[0]) - 1;
  let day = parseInt(parts[1]);
  let birthday = new Date(year, month, day);
  let today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  if (
    today.getMonth() < birthday.getMonth() ||
    (today.getMonth() == birthday.getMonth() &&
      today.getDate() < birthday.getDate())
  ) {
    age--;
  }
  ageInput.value = age;
}

flatpickr("#birth-date", {
  dateFormat: "m/d/Y",
  onChange: function (selectedDates, dateString, instance) {
    if (validateDateOfBirth(dateString)) {
      calculateAgeAndUpdateInput(dateString);
    }
  },
});
var ageInput = document.getElementById("age");

// buttons
window.addEventListener("load", function () {
  document.querySelectorAll(".save-button").forEach(function (button) {
    button.addEventListener("click", save_onclick);
  });

  document.querySelectorAll(".cancel-button").forEach(function (button) {
    button.addEventListener("click", cancel_onclick);
  });

  document.querySelectorAll(".edit-button").forEach(function (button) {
    button.addEventListener("click", edit_onclick);
  });

  document
    .querySelectorAll(".save-button, .cancel-button")
    .forEach(function (button) {
      button.style.display = "none";
    });
});

function edit_onclick() {
  setFormMode(this.closest("form"), "edit");
}

function cancel_onclick() {
  setFormMode(this.closest("form"), "view");

  //TODO: Undo input changes?
}

function save_onclick() {
  setFormMode(this.closest("form"), "view");

  //TODO: Send data to server?
}

function setFormMode(form, mode) {
  switch (mode) {
    case "view":
      form
        .querySelectorAll(".save-button, .cancel-button")
        .forEach(function (button) {
          button.style.display = "none";
        });
      form.querySelectorAll(".edit-button").forEach(function (button) {
        button.style.display = "inline-block";
      });
      form.querySelectorAll("input, select").forEach(function (element) {
        element.disabled = true;
      });
      break;
    case "edit":
      form
        .querySelectorAll(".save-button, .cancel-button")
        .forEach(function (button) {
          button.style.display = "inline-block";
        });
      form.querySelectorAll(".edit-button").forEach(function (button) {
        button.style.display = "none";
      });
      form.querySelectorAll("input, select").forEach(function (element) {
        element.disabled = false;
      });
      break;
  }
}
