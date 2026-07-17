import * as Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendOTP = async (email, name, otp) => {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Food Delivery Team 🍔",
      email: "bansallalit8322@gmail.com",
    };

    sendSmtpEmail.to = [
      {
        email,
        name,
      },
    ];

    sendSmtpEmail.subject = "Verify Your Food Delivery Account";

    sendSmtpEmail.htmlContent = `
      <h2>Hello ${name},</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `;

    console.log("📨 Sending OTP to:", email);

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email Sent Successfully");

    return true;
  } catch (error) {
    console.log("❌ Email Error");
    console.log(error.response?.body || error);

    return false;
  }
};

export default sendOTP;