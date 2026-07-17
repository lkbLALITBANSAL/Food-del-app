const sendOTP = async (email, name, otp) => {
    try {
        console.log("📨 Sending OTP to:", email);

        console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);
        console.log(
            "BREVO_API_KEY prefix:",
            process.env.BREVO_API_KEY?.substring(0, 12)
        );

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                sender: {
                    name: "EatZo - Food Delivery",
                    email: "bansallalit8322@gmail.com",
                },

                to: [
                    {
                        email,
                        name,
                    },
                ],

                subject: "Verify Your Food Delivery Account",

                htmlContent: `
                <!DOCTYPE html>
                <html>
                <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">

                    <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:10px">

                        <h1 style="color:#ff6347;">🍔 EatZo</h1>

                        <h2>Hello ${name},</h2>

                        <p>Thank you for registering.</p>

                        <p>Your verification OTP is:</p>

                        <h1 style="
                            text-align:center;
                            color:#ff6347;
                            font-size:40px;
                            letter-spacing:8px;
                        ">
                            ${otp}
                        </h1>

                        <p>This OTP is valid for <b>5 minutes</b>.</p>

                        <hr>

                        <p style="color:#666">
                            If you didn't request this email, simply ignore it.
                        </p>

                    </div>

                </body>
                </html>
                `,
            }),
        });

        const text = await response.text();

        console.log("Status:", response.status);
        console.log("Response:", text);

        if (!response.ok) {
            console.log("❌ Brevo API Error");
            return false;
        }

        console.log("✅ Email Sent Successfully");

        return true;

    } catch (error) {
        console.log("❌ Email Error");
        console.log(error);

        return false;
    }
};

export default sendOTP;