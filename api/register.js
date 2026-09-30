export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
  }

  try {
    const { fullname, phone, company, message } = req.body;

    const text =
      `📩 Yangi ro'yxatdan o'tish (TechNova)\n\n` +
      `👤 Ism: ${fullname}\n` +
      `📞 Telefon: ${phone}\n` +
      `🏢 Kompaniya: ${company || "—"}\n` +
      `💬 Xabar: ${message || "—"}`;

    const telegramUrl =
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: text
      })
    });

    const data = await telegramRes.json();

    if (!data.ok) {
      console.error(data);

      return res.status(500).json({
        ok: false,
        error: "Telegram error"
      });
    }

    return res.status(200).json({
      ok: true
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
}