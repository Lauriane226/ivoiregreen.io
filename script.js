document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulaire");
  const reportList = document.getElementById("reportList");
  const rankingList = document.getElementById("rankingList");

  let ranking = [];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pseudo = document.getElementById("pseudo").value;
    const grade = document.getElementById("grade").value;
    const tags = parseInt(document.getElementById("tags").value);

    const reportText = `👤 ${pseudo} | 🎖 ${grade} | 🎨 ${tags} tag(s)`;
    const li = document.createElement("li");
    li.textContent = reportText;
    reportList.prepend(li);

    const existing = ranking.find(r => r.pseudo === pseudo);
    if (existing) {
      existing.tags += tags;
    } else {
      ranking.push({ pseudo, tags });
    }

    ranking.sort((a, b) => b.tags - a.tags);

    rankingList.innerHTML = "";
    ranking.forEach((r, i) => {
      const item = document.createElement("li");
      item.textContent = `#${i + 1} - ${r.pseudo} : ${r.tags} tag(s)`;
      rankingList.appendChild(item);
    });

    const payload = {
      content: `🟢 **Nouveau Rapport de Tag**\n🎖 Grade : **${grade}**\n🎨 Tags : **${tags}**\n👤 Pseudo : **${pseudo}**`
    };

    await fetch("https://discordapp.com/api/webhooks/1381053345355272336/Je69mtXc3IQiyuANqe_PCs8ujMnhGteoTnyRMYo5eF1BuTbi9lFy-DWlVpzmvs_PRmcP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    alert("✅ Rapport envoyé avec succès !");
    form.reset();
  });
});