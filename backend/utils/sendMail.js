const sendOTP = async (email, name, otp) => {
    try {
        console.log("📨 Sending OTP to:", email);

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
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
                    <h2>Hello ${name},</h2>
                    <p>Your OTP is:</p>
                    <h1 style="color:#ff6347">${otp}</h1>
                    <p>This OTP is valid for <b>5 minutes</b>.</p>
                `
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("❌ Brevo API Error");
            console.log(data);
            return false;
        }

        console.log("✅ Email Sent Successfully");
        console.log(data);

        return true;

    } catch (error) {
        console.log("❌ Email Error");
        console.log(error);

        return false;
    }
};

export default sendOTP;