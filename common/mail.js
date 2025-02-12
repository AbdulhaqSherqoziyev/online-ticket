const nodemailer = require("nodemailer");

// Transporter yaratish
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdulhaqsherqoziyeb@gmail.com", // Gmail manzilingiz
    pass: "khwd rzdq ajzp okvc", // Gmail parolingiz
  },
});

// HTML email shabloni
const generateEmailTemplate = (name, message) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
      <h2 style="text-align: center; color: #007bff;">📩 Yangi Xabar</h2>
      <p style="font-size: 16px; color: #333;">Salom, <strong>${name}</strong>!</p>
      <p style="font-size: 14px; color: #555;">Sizga yangi xabar keldi:</p>
      <blockquote style="background: #f9f9f9; padding: 10px 15px; border-left: 5px solid #007bff;">
        <p style="font-style: italic; color: #333;">"${message}"</p>
      </blockquote>
      <p style="font-size: 14px; color: #777;">Hurmat bilan, <br> <strong>AgroQanot Jamoasi</strong></p>
    </div>
  `;
};


async function sendEmail(to, name, message) {
  try {
    const info = await transporter.sendMail({
      from: '"AgroQanot Jamoasi" <abdulhaqsherqoziyev@gmail.com>',
      to: "lustrum062@gmail.com",
      subject: "📩 Sizga yangi xabar keldi!",
      html: generateEmailTemplate(name, message),
    });

    console.log("Email yuborildi: ", info.messageId);
  } catch (error) {
    console.error("Email jo‘natishda xatolik:", error);
  }
}


sendEmail("recipient@example.com", "Otabek", "Bu Nodemailer orqali yuborilgan HTML email xabari!");
