  function checkLogin() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
      window.location.href = "alert.html";
    } else {
      alert("You must login first!");
      window.location.href = "login.html";
    }
  }

    function logout() {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    }