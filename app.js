const container = document.querySelector(".container");
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const forgotPasswordLink = document.querySelector("#forgot-password-link");
const redirectSignupLink = document.querySelector("#redirect-signup");
const signInForm = document.querySelector(".sign-in-form");
const signUpForm = document.querySelector(".sign-up-form");

let currentUser = null; // Store current user for resetting password
     
// Prevent navigating back to the previous page
     history.replaceState(null, null, location.href);
     window.addEventListener("popstate", () => {
       history.pushState(null, null, location.href);
     });

// Switch between forms
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Helper function to validate username and password
function validateInput(username, password) {
  const usernameRegex = /^[a-zA-Z0-9]{4,20}$/; // Username: 4-20 alphanumeric characters
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*_]{6,20}$/; // Password: 6-20 characters, special characters allowed

  if (!usernameRegex.test(username)) {
    alert("Username must be 4-20 alphanumeric characters.");
    return false;
  }

  if (!passwordRegex.test(password)) {
    alert(
      "Password must be 6-20 characters and can include special characters (!@#$%^&*_)."
    );
    return false;
  }

  return true;
}

// Generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

// Redirect to Sign-Up Form when the link is clicked
redirectSignupLink.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  container.classList.add("sign-up-mode");
});

// Handle Forgot Password Link Click
forgotPasswordLink.addEventListener("click", () => {
  const username = prompt("Please enter your username to reset password:");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.username === username);

  if (user) {
    currentUser = user;
    const generatedOtp = generateOTP();

    // Save OTP and current user in localStorage
    localStorage.setItem("resetOtp", JSON.stringify({ otp: generatedOtp, username: user.username }));

    // Simulate sending OTP to user's email (for demo purposes, just showing in alert)
    alert(`An OTP has been sent to your email: ${user.email}. OTP: ${generatedOtp}`);
    // Redirect to OTP verification page
    window.location.href = "otp.html"; // Replace with correct file path
  } else {
    alert("Username not found!");
  }
});

// Sign-Up Form Submission
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  const username = signUpForm.querySelector("input[type='text']").value.trim();
  const email = signUpForm.querySelector("input[type='email']").value.trim();
  const password = signUpForm.querySelector("input[type='password']").value.trim();
  const confirmPassword = signUpForm.querySelector("input[name='confirm-password']").value.trim();
  const address = signUpForm.querySelector("input[type='address']").value.trim();  // Get address

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  if (validateInput(username, password)) {
    // Save user data in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      alert("Username already exists. Please choose a different one.");
    } else {
      users.push({ username, email, address, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please sign in.");
      signUpForm.reset();
      container.classList.remove("sign-up-mode"); // Switch to sign-in form
    }
  }
});

// Sign-In Form Submission
signInForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  const username = signInForm.querySelector("input[type='text']").value.trim();
  const password = signInForm.querySelector("input[type='password']").value.trim();

  if (validateInput(username, password)) {
    // Retrieve user data from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      alert(`Welcome, ${username}! You are now signed in.`);
      // Save login state in sessionStorage
      sessionStorage.setItem("loggedInUser", username);
      // Redirect to the next page (successfully logged in)
      window.location.href = "home page.html"; // Replace with the correct file path
    } else {
      alert("Invalid username or password. Please try again.");
      signInForm.reset();
    }
  }
});
