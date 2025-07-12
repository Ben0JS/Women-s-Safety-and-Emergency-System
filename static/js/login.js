 // Set default username & password for first time only
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", "BENO");
      localStorage.setItem("password", "1229"); // You can change this
    }

    function handleLogin(event) {
      event.preventDefault();

      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

      if (!user || !pass) {
        alert("Please enter username and password");
        return;
      }

      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");

      if (user === storedUsername && pass === storedPassword) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html"; // redirect to alert page
      } else {
        alert("Invalid username or password");
      }
    }