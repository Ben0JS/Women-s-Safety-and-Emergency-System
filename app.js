const nodemailer = require("nodemailer");

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "benovencher29@gmail.com", // your Gmail
      pass: "your_16_digit_app_password" // app password
    }
  });

  try {
    await transporter.sendMail({
      from: "benovencher29@gmail.com",
      to: "benob9992@gmail.com",
      subject: "Test Email",
      text: "This is a test email from Nodemailer"
    });
    console.log("✅ Email sent successfully!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

sendTestEmail();
