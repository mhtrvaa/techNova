// ====== TELEGRAM SOZLAMALARI ======
// 1) Telegramda @BotFather ga yozib, /newbot orqali bot yarating -> BOT_TOKEN oling
// 2) Botingizga birinchi marta /start yozing (aks holda bot sizga xabar yubora olmaydi)
// 3) CHAT_ID ni topish uchun: https://api.telegram.org/bot<TOKEN>/getUpdates
//    manziliga kirib, "chat":{"id": ...} qismidagi raqamni oling
const BOT_TOKEN = "8592169606:AAH_3u68R-kHKK36SSHe2wVHws4jz34I2Ew";
const CHAT_ID = "443124902";
// ===================================

const form = document.getElementById("registerForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = form.fullname.value.trim();
  const phone = form.phone.value.trim();
  const company = form.company.value.trim() || "—";
  const message = form.message.value.trim() || "—";

  if (!fullname || !phone) {
    showStatus("Iltimos, ism va telefon raqamni to'ldiring.", "error");
    return;
  }

  const text =
    `📩 Yangi ro'yxatdan o'tish (TechNova)\n\n` +
    `👤 Ism: ${fullname}\n` +
    `📞 Telefon: ${phone}\n` +
    `🏢 Kompaniya: ${company}\n` +
    `💬 Xabar: ${message}`;

  submitBtn.disabled = true;
  submitBtn.textContent = "Yuborilmoqda...";

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    const data = await res.json();

    if (data.ok) {
      showStatus("Rahmat! Arizangiz qabul qilindi, tez orada bog'lanamiz.", "success");
      form.reset();
    } else {
      console.error(data);
      showStatus("Xatolik yuz berdi. BOT_TOKEN / CHAT_ID ni tekshiring.", "error");
    }
  } catch (err) {
    console.error(err);
    showStatus("Internet yoki server bilan bog'liq xatolik.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Yuborish";
  }
});

function showStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = "form-status " + type;
}
