window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("welcomeScreen").remove(), 2500);
});

const gifs = [
  "https://i.gifer.com/YCZH.gif",
  "https://i.gifer.com/VAyR.gif",
  "https://i.gifer.com/ZZ5H.gif",
  "https://i.gifer.com/7efs.gif"
];
document.getElementById("randomGif").src = gifs[Math.floor(Math.random() * gifs.length)];

const typedEl = document.getElementById("typedText");
const words = ["Web Developer", "MCA Student", "Backend & API Developer", "Laravel & Node.js"];
let i = 0, j = 0, del = false;
function loop() {
  const word = words[i];
  typedEl.innerHTML = `I'm a <span>${word.substring(0, j)}</span>`;
  if (!del && j < word.length) j++;
  else if (del && j > 0) j--;
  if (j === word.length) { del = true; setTimeout(loop, 1000); return; }
  if (j === 0) { del = false; i = (i + 1) % words.length; }
  setTimeout(loop, del ? 60 : 100);
}
loop();

document.getElementById("contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const preloader = document.getElementById("formPreloader");
  const msg = document.getElementById("responseMsg");
  preloader.classList.add("active");
  msg.textContent = "";

  try {
    const res = await fetch("https://portfolo-bankend.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value
      })
    });
    const data = await res.json();
    preloader.classList.remove("active");
    if (res.ok) {
      msg.style.color = "#22c55e";
      msg.textContent = "✅ Message sent successfully!";
      e.target.reset();
    } else {
      msg.style.color = "#ef4444";
      msg.textContent = "❌ " + (data.error || "Error sending message.");
    }
  } catch {
    preloader.classList.remove("active");
    msg.style.color = "#f97316";
    msg.textContent = "⚠️ Unable to reach server.";
  }
});
