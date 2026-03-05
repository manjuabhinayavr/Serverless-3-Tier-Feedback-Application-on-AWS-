async function submitForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const statusEl = document.getElementById("status");

  if (!name || !email || !message) {
    statusEl.innerText = "All fields are required!";
    statusEl.style.color = "red";
    return;
  }

  const data = { name, email, message };

  statusEl.innerText = "Submitting...";
  statusEl.style.color = "black";

  try {
    const response = await fetch(
      "https://w46g9rc7hk.execute-api.ap-south-1.amazonaws.com/stage1/submit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    const res = await response.json();

    if (response.ok && res.status === "success") {
      statusEl.innerText = "Feedback submitted successfully!";
      statusEl.style.color = "green";
    } else {
      statusEl.innerText = "Error submitting feedback";
      statusEl.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    statusEl.innerText = "Network error";
    statusEl.style.color = "red";
  }
}
