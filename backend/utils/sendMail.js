import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTP = async (email, name, otp) => {
    try {
        const mailOptions = {
            from: `"Food Delivery Team 🍔" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Food Delivery Account",

            headers: {
                "X-Priority": "3",
                "X-Mailer": "Food Delivery Authentication",
            },

            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
            </head>

            <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

                <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
                    <tr>
                        <td align="center">

                            <table width="600" cellpadding="0" cellspacing="0"
                                style="background:#ffffff;border-radius:12px;overflow:hidden;">

                                <tr>
                                    <td style="background:#ff6347;color:white;padding:25px;text-align:center;font-size:28px;font-weight:bold;">
                                        🍔 Food Delivery
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:35px;">

                                        <h2 style="margin-top:0;color:#333;">
                                            Hello ${name},
                                        </h2>

                                        <p style="font-size:16px;color:#555;line-height:28px;">
                                            Thank you for creating your account with
                                            <strong>Food Delivery</strong>.
                                        </p>

                                        <p style="font-size:16px;color:#555;">
                                            Please use the verification code below:
                                        </p>

                                        <div style="
                                            text-align:center;
                                            font-size:34px;
                                            font-weight:bold;
                                            letter-spacing:8px;
                                            color:#ff6347;
                                            margin:35px 0;
                                        ">
                                            ${otp}
                                        </div>

                                        <p style="color:#555;font-size:15px;">
                                            This OTP is valid for
                                            <strong>5 minutes</strong>.
                                        </p>

                                        <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">

                                        <p style="font-size:14px;color:#888;line-height:24px;">
                                            If you didn't create this account, you can safely ignore this email.
                                        </p>

                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#fafafa;padding:20px;text-align:center;color:#777;font-size:13px;">
                                        © ${new Date().getFullYear()} Food Delivery <br>
                                        Made with ❤️ using MERN Stack
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>

            </body>
            </html>
            `,
        };

      console.log("📨 Sending OTP to:", email);
console.log("Verifying SMTP...");
await transporter.verify();

console.log("✅ SMTP Connected");

const info = await transporter.sendMail(mailOptions);

        console.log("✅ Email Sent Successfully");
        console.log(info.response);

        return true;

    } catch (error) {
        console.log("❌ Email Error");
        console.log(error);

        return false;
    }
};

export default sendOTP;