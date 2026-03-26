export function initCanvasEffects() {
  const canvas = document.getElementById("canvas");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");
  const canvas4 = document.getElementById("canvas4");
  const canvas5 = document.getElementById("canvas5");
  const mainContent = document.querySelector(".main-content");

  if (!canvas || !canvas2 || !canvas3 || !canvas4 || !canvas5) return;

  const ctx = canvas.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  const ctx3 = canvas3.getContext("2d");
  const ctx4 = canvas4.getContext("2d");
  const ctx5 = canvas5.getContext("2d");

  if (!ctx || !ctx2 || !ctx3 || !ctx4 || !ctx5) return;

  const font = new FontFace(
    "BigShoulders",
    "url(https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdSY8FFkwSA.woff2)"
  );

  const getFontSize = () => {
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
    ctx4.font = `${getFontSize()}px BigShoulders`;
    ctx4.textAlign = "center";
    ctx4.textBaseline = "middle";
  };

  font.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
    renderText();
  });

  let visibleDotCount = 3;
  const dotRadius = 2;
  const dotMargin = 40;
  const spaceForOneDot = 2 * dotMargin;
  const gridPadding = 20;
  const smallDotRadius = 1;
  const smallDotMargin = 10;
  const spaceForSmallDot = 2 * smallDotMargin;

  const getCanvasBounds = () => {
    const width = mainContent?.clientWidth || window.innerWidth;
    const height = mainContent?.clientHeight || window.innerHeight;
    return { width, height };
  };

  const resizeCanvas = () => {
    const { width, height } = getCanvasBounds();
    canvas.width = width;
    canvas.height = height;
    canvas3.width = width;
    canvas3.height = height;
    canvas4.width = width;
    canvas4.height = height;
    canvas5.width = width;
    canvas5.height = height;
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

  const calculateDistance = (mouseX, mouseY, dotX, dotY) =>
    Math.sqrt((mouseX - dotX) ** 2 + (mouseY - dotY) ** 2);

  const drawGrid = (mouseX = -9999, mouseY = -9999) => {
    ctx.lineWidth = 0.2;
    for (let i = 0; i < (canvas.width - gridPadding) / spaceForOneDot; i += 1) {
      for (let j = 0; j < (canvas.height - gridPadding) / spaceForOneDot; j += 1) {
        const dotXPos = gridPadding + i * spaceForOneDot;
        const dotYPos = gridPadding + j * spaceForOneDot;
        const dist = calculateDistance(mouseX, mouseY, dotXPos, dotYPos);
        if (dist < spaceForOneDot * visibleDotCount) {
          drawDot(ctx, dotXPos, dotYPos);
          drawLines(ctx, dotXPos, dotYPos);
        }
      }
    }
    for (let i = 0; i < (canvas.width - gridPadding) / spaceForSmallDot; i += 1) {
      for (let j = 0; j < (canvas.height - gridPadding) / spaceForSmallDot; j += 1) {
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

  ctx2.clearRect(0, 0, 300, 300);

  const draw5x5 = (x, y) => {
    ctx3.save();
    ctx3.translate(x, y);
    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        ctx3.save();
        ctx3.beginPath();
        ctx3.translate(i * 10, j * 10);
        ctx3.arc(0, 0, 1, 0, Math.PI * 2, true);
        ctx3.fill();
        ctx3.closePath();
        ctx3.restore();
      }
    }
    ctx3.restore();
  };

  const drawAll5x5Dots = () => {};

  const drawFreeDot = (x, y) => {
    ctx4.lineWidth = 0.2;
    ctx4.strokeStyle = "rgba(0,0,0,0.2)";
    drawLines(ctx4, gridPadding + x * spaceForOneDot, gridPadding + y * spaceForOneDot);

    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        drawSmallDot(
          ctx4,
          gridPadding + x * spaceForOneDot + i * spaceForSmallDot,
          gridPadding + y * spaceForOneDot + j * spaceForSmallDot
        );
      }
    }
  };

  let xPos = gridPadding;
  const xPosIncrement = 5;

  const animateGrid = (x) => {
    ctx5.lineWidth = 0.15;
    ctx5.clearRect(0, 0, canvas5.width, canvas5.height);

    for (let j = 0; j < (canvas5.height - gridPadding) / spaceForOneDot; j += 1) {
      const yPos = gridPadding + j * spaceForOneDot;
      ctx5.beginPath();
      ctx5.moveTo(Math.min(x, canvas.width - gridPadding), yPos);
      ctx5.lineTo(Math.max(gridPadding, x - 4 * spaceForOneDot), yPos);
      ctx5.stroke();
    }

    for (let i = 0; i < (canvas5.width - gridPadding) / spaceForOneDot; i += 1) {
      for (let j = 0; j < (canvas5.height - gridPadding) / spaceForOneDot; j += 1) {
        const dotXPos = gridPadding + i * spaceForOneDot;
        const dotYPos = gridPadding + j * spaceForOneDot;
        const dist = x - dotXPos;
        if (dist > 0 && dist < spaceForOneDot * 4) drawDot(ctx5, dotXPos, dotYPos);
      }
    }

    window.requestAnimationFrame(() => {
      if (xPos + xPosIncrement - 4 * spaceForOneDot > canvas.width - gridPadding) {
        xPos = gridPadding;
        xPos += xPosIncrement;
        setTimeout(() => animateGrid(xPos), 1500);
      } else {
        xPos += xPosIncrement;
        animateGrid(xPos);
      }
    });
  };

  animateGrid(gridPadding);

  window.addEventListener("resize", () => {
    resizeCanvas();
    drawGrid();
    drawFreeDot(3, 1);
    drawFreeDot(4, 5);
    drawFreeDot(4, 7);
    drawFreeDot(6, 8);
    drawFreeDot(8, 4);
    drawFreeDot(10, 6);
    drawFreeDot(20, 8);
    renderText();
  });

  resizeCanvas();
  drawGrid();
  drawFreeDot(3, 1);
  drawFreeDot(4, 5);
  drawFreeDot(4, 7);
  drawFreeDot(6, 8);
  drawFreeDot(10, 6);
  drawFreeDot(8, 4);
  drawFreeDot(20, 8);
}
