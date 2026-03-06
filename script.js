const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const password = document.getElementById("password");
const passwordError = document.getElementById("password-error")
const confirmPassword = document.getElementById("confirm-password")

// Regular expression for email validation as per HTML specification
const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// Check if the email is valid
const isValidEmail = () => {
  const validity = email.value.length !== 0 && emailRegExp.test(email.value);
  return validity;
};

const isValidPassword = () => {
  const validity = password.value.length !== 0 && passwordRegExp.test(password.value);
  return validity;
}

// Update email input class based on validity
const setEmailClass = (isValid) => {
  email.className = isValid ? "valid" : "invalid";
};

const setPasswordClass = (isValid) => {
  password.className = isValid ? "valid" : "invalid";
}

// Update error message and visibility
const updateEmailError = (isValid) => {
  if (isValid) {
    emailError.textContent = "";
    emailError.removeAttribute("class");
  } else {
    emailError.textContent = "I expect an email, darling!";
    emailError.setAttribute("class", "active");
  }
};

const updatePasswordError = (isValid) => {
  if (isValid) {
    passwordError.textContent = "";
    passwordError.removeAttribute("class");
  }else{
    passwordError.textContent = "Not a strong password";
    passwordError.setAttribute("class", "active");
  }
}

// Handle input event to update email validity
const handleEmailInput = () => {
  const validity = isValidEmail();
  setEmailClass(validity);
  updateEmailError(validity);
};

const handlePasswordInput = () => {
  const validity = isValidPassword();
  setPasswordClass(validity);
  updatePasswordError(validity);
}

// Handle form submission to show error if email is invalid
// const handleSubmit = (event) => {
//   event.preventDefault();
//   const validity = isValidEmail();
//   setEmailClass(validity);
//   updateError(validity);
// };

const handleSubmit = (event) => {
  event.preventDefault();
  const validity = isValidPassword();
  setPasswordClass(validity);
  updatePasswordError(validity);
};

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
const validity = isValidEmail();
setEmailClass(validity);

const passValidity = isValidPassword();
setPasswordClass(validity);
// This defines what happens when the user types in the field
email.addEventListener("input", handleEmailInput);

password.addEventListener("input", handlePasswordInput);
// This defines what happens when the user tries to submit the data
form.addEventListener("submit", handleSubmit);

const rules = {
  minLength: (pw) => pw.length >= 8,
  lowercase: (pw) => /[a-z]/.test(pw),
  uppercase: (pw) => /[A-Z]/.test(pw),
  digit:     (pw) => /\d/.test(pw),
  special:   (pw) => /[@$!%*?&]/.test(pw),
  allowed:   (pw) => /^[A-Za-z\d@$!%*?&]+$/.test(pw), // only these chars
};

function validatePassword(pw) {
  const results = Object.fromEntries(
    Object.entries(rules).map(([name, fn]) => [name, fn(pw)])
  );

  return {
    ok: Object.values(results).every(Boolean),
    results,
  };
}

// Example:
console.log(validatePassword("123!@QWqwe"));