 document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("loggedIn");

    // 🚫 Redirect to login.html if not logged in
    if (!isLoggedIn || isLoggedIn !== "true") {
      alert("You must login first.");
      window.location.href = "login.html";
      return;
    }

    // ✅ Handle Alert Button Click
    document.getElementById("alert-btn").addEventListener("click", function (event) {
      event.preventDefault();

      const status = document.getElementById("status-message");
      status.textContent = "Sending alert...";

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

         status.innerHTML = `
  <span style="color: green;">✅ Alert Sent!</span><br><br>
  <span style="color: blue;">📍 <strong>Your Location:</strong></span><br>
  <span style="color: orange;">Latitude: ${lat}</span><br>
  <span style="color: purple;">Longitude: ${lon}</span><br><br>
  <a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank" style="color: red; font-weight: bold;">
    📌 View on Google Maps
  </a>
`;
        }, function (error) {
          status.textContent = "❌ Location access denied or unavailable.";
        });
      } else {
        status.textContent = "❌ Geolocation not supported by your browser.";
      }
    });
  });