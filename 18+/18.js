document.addEventListener("DOMContentLoaded", () => {
  // Skip if already confirmed in this browser
  if (localStorage.getItem("ageConfirmed") === "true") return;

  const gate = document.createElement("div");
  gate.id = "age-gate";
  gate.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(11, 11, 27, 0.95); color: white;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 2rem; z-index: 9999; font-family: 'Outfit', sans-serif;
  `;

  gate.innerHTML = `
    <h1 style="color: var(--neon-pink); text-shadow: 0 0 8px var(--neon-pink);">
      18+ Content Disclaimer
    </h1>
    <p style="max-width: 500px; margin: 1rem 0; font-size: 1.1rem;">
      This page contains fictional, mature, and role-play content intended for audiences 18 years and older.
      By entering, you confirm you are at least 18 years old.
    </p>
    <div style="margin-top: 1.5rem;">
      <button id="enter-site" style="
        background: var(--neon-pink); border: none; padding: 0.75rem 1.5rem;
        font-size: 1rem; font-weight: bold; border-radius: 8px; cursor: pointer;
        box-shadow: 0 0 10px var(--neon-pink);
      ">I am 18+ — Enter</button>
    </div>
  `;

  document.body.appendChild(gate);

  document.getElementById("enter-site").addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    gate.remove();
  });
});
