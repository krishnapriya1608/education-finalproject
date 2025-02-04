const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, data,res) => {
  try {
    console.log(process.env.Gmail, process.env.Password, process.env.HOST, process.env.SERVICE);

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.Gmail,
        pass: process.env.Password,
      },
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: red;
        }
        p {
            margin-bottom: 20px;
            color: #666;
        }
        .otp {
            font-size: 36px;
            color: #7b68ee; /* Purple text */
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name}, your (One-Time Password) for account verification is:</p>
        <p class="otp">${data.otp}</p> 
    </div>
</body>
</html>`;

    await transporter.sendMail({
      from: process.env.Gmail,
      to: email,
      subject: subject,
      text: text, // For plain-text fallback
      html: html, // HTML content
    });
res.status(200).json({
    message:"Otp send to your mail",
    activationToken,
})
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error, "Email not sent");
  }
};


module.exports = sendEmail;

  
