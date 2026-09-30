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

  submitBtn.disabled = true;
  submitBtn.textContent = "Yuborilmoqda...";

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullname,
        phone,
        company,
        message
      })
    });

    const data = await res.json();

    if (data.ok) {
      showStatus(
        "Rahmat! Arizangiz qabul qilindi, tez orada bog'lanamiz.",
        "success"
      );
      form.reset();
    } else {
      console.error(data);
      showStatus("Xatolik yuz berdi. Qaytadan urinib ko'ring.", "error");
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