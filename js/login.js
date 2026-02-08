function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) {
    alert("Enter email and password");
    return;
  }
  localStorage.setItem("loggedIn", "true");
  window.location.href = "dashboard.html";
}
