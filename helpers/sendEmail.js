import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "kpavliuk8@gmail.com" };
  await sgMail.send(email);
  return true;
}

export default sendEmail;

// const email = {
//   to: "kpavliuk8@gmail.com",
//   from: "karina.pavliuk8@meta.ua",
//   subject: "Test mail",
//   html: "<p>Test mail</p>",
// };

// sgMail.send(email)
//   .then(() => console.log("Email send success"))
//   .catch(error => console.log(error));

