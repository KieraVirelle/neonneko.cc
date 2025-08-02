const canvas = document.getElementById("neonCanvas");
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

    /* Use a rich gold colour for the cursor trail */
    ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(255, 215, 0, 1)";
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
