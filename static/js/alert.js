document.addEventListener('DOMContentLoaded', function () {
  // If you want, use login check here, else skip

  document.getElementById('alert-btn').addEventListener('click', async function () {
    const status = document.getElementById('status-message');
    status.textContent = 'Getting location...';

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          status.innerHTML = `
            <span class="status-success">✅ Location captured!</span><br><br>
            <strong>Your Location:</strong><br>
            Latitude: ${lat}<br>
            Longitude: ${lon}<br><br>
            <a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank" rel="noopener noreferrer" class="status-map-link">📌 View on Google Maps</a><br>
            Sending alert email...
          `;

          try {
            const response = await fetch('http://localhost:3000/send-location-alert', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ latitude: lat, longitude: lon }),
            });

            const result = await response.json();
            if (response.ok) {
              status.innerHTML += `<br><span class="status-success">✅ ${result.message}</span>`;
            } else {
              status.innerHTML += `<br>❌ Email error: ${result.error}`;
            }
          } catch (error) {
            status.innerHTML += `<br>❌ Network error: ${error.message}`;
          }
        },
        function (error) {
          status.textContent = '❌ Location access denied or unavailable.';
        }
      );
    } else {
      status.textContent = '❌ Geolocation not supported by your browser.';
    }
  });
});
