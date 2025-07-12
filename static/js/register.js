function register(event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      alert("Registration successful!");
      window.location.href = "login.html";
    }