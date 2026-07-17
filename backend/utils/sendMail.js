import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendOTP = async (email, name, otp) => {
    try {

        const sendSmtpEmail = {
            sender: {
                name: "Food Delivery Team 🍔",
                email: "bansallalit8322@gmail.com"
            },

            to: [
                {
                    email: email,
                    name: name
                }
            ],

            subject: "Verify Your Food Delivery Account",

            htmlContent: `
            <!DOCTYPE html>
            <html>
            <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">

            <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;padding:30px;">

            <h1 style="color:#ff6347;">🍔 Food Delivery</h1>

            <h2>Hello ${name},</h2>

            <p>Thank you for creating your account.</p>

            <p>Your OTP is:</p>

            <div style="
                text-align:center;
                font-size:34px;
                font-weight:bold;
                color:#ff6347;
                letter-spacing:8px;
                margin:30px 0;
            ">
            ${otp}
            </div>

            <p>This OTP is valid for <b>5 minutes</b>.</p>

            <hr>

            <p style="color:#666">
            If you didn't request this email, simply ignore it.
            </p>

            </div>

            </body>
            </html>
            `
        };

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