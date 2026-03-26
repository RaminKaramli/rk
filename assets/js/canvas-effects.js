const FONT_URL = "https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdSY8FFkwSA.woff2";

export const initCanvasEffects = () => {
  const canvas = document.getElementById("canvas");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");
  const canvas4 = document.getElementById("canvas4");
  const canvas5 = document.getElementById("canvas5");

  if (!canvas || !canvas2 || !canvas3 || !canvas4 || !canvas5) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  const ctx3 = canvas3.getContext("2d");
  const ctx4 = canvas4.getContext("2d");
  const ctx5 = canvas5.getContext("2d");

  if (!ctx || !ctx2 || !ctx3 || !ctx4 || !ctx5) {
    return;
  }

  const font = new FontFace("BigShoulders", `url(${FONT_URL})`);

  let visibleDotCount = 3;
  const dotRadius = 2;
  const dotMargin = 40;
  const spaceForOneDot = 2 * dotMargin;
  const gridPadding = 20;
  const smallDotRadius = 1;
  const smallDotMargin = 10;
  const spaceForSmallDot = 2 * smallDotMargin;

  const fontSize = () => {
    switch (true) {
      case canvas4.width > 1400:
        return 250;
      case canvas4.width > 1200:
        return 200;
      case canvas4.width > 1000:
        return 175;
      case canvas4.width > 600:
        return 75;
      default:
        return 40;
    }
  };

  const renderText = () => {
    ctx4.font = `${fontSize()}px BigShoulders`;
    ctx4.letterSpacing = "20px";
    ctx4.textAlign = "center";
    ctx4.textBaseline = "middle";
  };

  font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      renderText();
    })
    .catch(() => {
      renderText();
    });

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
    canvas4.width = window.innerWidth;
    canvas4.height = window.innerHeight;
    canvas5.width = window.innerWidth;
    canvas5.height = window.innerHeight;
    visibleDotCount = canvas.width < 600 ? 2 : 3;
  };

  const drawDot = (destinationContext, x, y) => {
    destinationContext.beginPath();
    destinationContext.arc(x, y, dotRadius, 0, Math.PI * 2, true);
    destinationContext.fill();
  };

  const drawSmallDot = (destinationContext, x, y) => {
    destinationContext.beginPath();
    destinationContext.arc(x, y, smallDotRadius, 0, Math.PI * 2, true);
    destinationContext.fillStyle = "rgba(0,0,0,0.3)";
    destinationContext.fill();
    destinationContext.fillStyle = "black";
  };

  const drawLines = (destinationContext, x, y) => {
    destinationContext.beginPath();
    destinationContext.moveTo(x, y);
    destinationContext.lineTo(x - dotMargin, y);
    destinationContext.moveTo(x, y);
    destinationContext.lineTo(x + dotMargin, y);
    destinationContext.moveTo(x, y);
    destinationContext.lineTo(x, y + dotMargin);
    destinationContext.moveTo(x, y);
    destinationContext.lineTo(x, y - dotMargin);
    destinationContext.stroke();
  };

  const calculateDistance = (mouseX, mouseY, dotX, dotY) => {
    return Math.sqrt((mouseX - dotX) ** 2 + (mouseY - dotY) ** 2);
  };

  const drawGrid = (mouseX = -1000, mouseY = -1000) => {
    ctx.lineWidth = 0.2;

    for (let i = 0; i < (window.innerWidth - gridPadding) / spaceForOneDot; i += 1) {
      for (let j = 0; j < (window.innerHeight - gridPadding) / spaceForOneDot; j += 1) {
        const dotXPos = gridPadding + i * spaceForOneDot;
        const dotYPos = gridPadding + j * spaceForOneDot;
        const dist = calculateDistance(mouseX, mouseY, dotXPos, dotYPos);
        if (dist < spaceForOneDot * visibleDotCount) {
          drawDot(ctx, dotXPos, dotYPos);
          drawLines(ctx, dotXPos, dotYPos);
        }
      }
    }

    for (let i = 0; i < (window.innerWidth - gridPadding) / spaceForSmallDot; i += 1) {
      for (let j = 0; j < (window.innerHeight - gridPadding) / spaceForSmallDot; j += 1) {
        const dotXPos = gridPadding + i * spaceForSmallDot;
        const dotYPos = gridPadding + j * spaceForSmallDot;
        const dist = calculateDistance(mouseX, mouseY, dotXPos, dotYPos);
        if (dist < spaceForOneDot * visibleDotCount) {
          drawSmallDot(ctx, dotXPos, dotYPos);
        }
      }
    }
  };

  window.addEventListener("mousemove", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(e.clientX, e.clientY);
  });

  const drawArrow = () => {
    ctx2.clearRect(0, 0, 300, 300);
  };

  let xPos = gridPadding;
  const xPosIncrement = 5;

  const animateGrid = (x) => {
    ctx5.lineWidth = 0.15;
    ctx5.clearRect(0, 0, canvas5.width, canvas5.height);

    for (let j = 0; j < (window.innerHeight - gridPadding) / spaceForOneDot; j += 1) {
      const yPos = gridPadding + j * spaceForOneDot;
      ctx5.beginPath();
      ctx5.moveTo(Math.min(x, canvas.width - gridPadding), yPos);
      ctx5.lineTo(Math.max(gridPadding, x - 4 * spaceForOneDot), yPos);
      ctx5.stroke();
    }

    for (let i = 0; i < (window.innerWidth - gridPadding) / spaceForOneDot; i += 1) {
      for (let j = 0; j < (window.innerHeight - gridPadding) / spaceForOneDot; j += 1) {
        const dotXPos = gridPadding + i * spaceForOneDot;
        const dotYPos = gridPadding + j * spaceForOneDot;
        const dist = x - dotXPos;
        if (dist > 0 && dist < spaceForOneDot * 4) {
          drawDot(ctx5, dotXPos, dotYPos);
        }
      }
    }

    window.requestAnimationFrame(() => {
      if (xPos + xPosIncrement - 4 * spaceForOneDot > canvas.width - gridPadding) {
        xPos = gridPadding + xPosIncrement;
        window.setTimeout(() => {
          animateGrid(xPos);
        }, 1500);
      } else {
        xPos += xPosIncrement;
        animateGrid(xPos);
      }
    });
  };

  window.addEventListener("resize", () => {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
    drawGrid();
    renderText();
  });

  resizeCanvas();
  drawGrid();
  drawArrow();
  animateGrid(gridPadding);
};
