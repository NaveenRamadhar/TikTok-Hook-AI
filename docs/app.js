const generateBtn = document.getElementById("generateBtn");
const topicInput = document.getElementById("topicInput");
const toneSelect = document.getElementById("toneSelect"); // NEW
const output = document.getElementById("output");

output.style.display = "none";

generateBtn.addEventListener("click", async () => {
  const topic = topicInput.value.trim();
  const tone = toneSelect ? toneSelect.value : "default"; // NEW

  if (!topic) {
    alert("Please enter a topic!");
    return;
  }

  output.style.display = "block";
  output.textContent = "Generating hooks...";

  try {
    const res = await fetch("https://tiktok-hook-ai.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, tone }), // NEW: include tone
    });
    if (!res.ok) throw new Error("Request failed");

    const data = await res.json();
    output.textContent = data.hooks.join("\n\n");
  } catch (err) {
    output.textContent = "Error generating hooks. Try again later.";
    console.error(err);
  }
});
