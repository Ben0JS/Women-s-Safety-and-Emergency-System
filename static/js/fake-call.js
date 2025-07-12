 function endCall() {
      const audio = document.getElementById("ringtone");
      audio.pause();
      window.location.href = "index.html"; // Or go back to main page
    }