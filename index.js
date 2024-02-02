const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const { config } = require("./config/config");

const app = express();

const port = config.port;

app.use(express.static("src"));
app.use(
  cors({
    origin: "https://digesolutions.com",
    methods: "POST",
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'mail.digesolutions.com',
    secure: true, 
    port: 465,
    auth: {
      user: config.sendEmailUSer,
      pass: config.sendEmailPass
    }
  });

  const mailOptions = {
    from: config.sendEmailUSer,
    to: config.sendEmailUSer,
    subject: "Formulario Contactenos",
    text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado con éxito");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al enviar el correo");
  }
});

app.listen(port);
