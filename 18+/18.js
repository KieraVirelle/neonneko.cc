document.addEventListener("DOMContentLoaded", () => {
  // Skip if already confirmed in this browser
  if (localStorage.getItem("ageConfirmed") === "true") return;

  const gate = document.createElement("div");
  gate.id = "age-gate";
  gate.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(11, 11, 27, 0.95); color: white;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 2rem; z-index: 9998; font-family: 'Outfit', sans-serif;
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

  // Add glowing mouse trail canvas
  const canvas = document.createElement("canvas");
  canvas.id = "neonCanvas";
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    pointer-events: none; z-index: 9999;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  let trail = [];
  const maxTrail = 20;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trail.push({ x: mouse.x, y: mouse.y });
    if (trail.length > maxTrail) trail.shift();

    ctx.beginPath();
    for (let i = 0; i < trail.length - 1; i++) {
      const p1 = trail[i];
      const p2 = trail[i + 1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }

    ctx.strokeStyle = "rgba(255, 0, 255, 0.8)";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(255, 0, 255, 1)";
    ctx.shadowBlur = 15;
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  draw();

  // Button action
  document.getElementById("enter-site").addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    gate.remove();
    canvas.remove(); // also remove the trail so it doesn't stack with main site’s one
  });
});
