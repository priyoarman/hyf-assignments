document.addEventListener("DOMContentLoaded", () => {
  const funButton = document.querySelector(".fun-button");
  const leftColumn = document.querySelector(".left-column");
  const rightColumn = document.querySelector(".right-column");

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  if (funButton && leftColumn && rightColumn) {
    funButton.addEventListener("click", () => {
      const randomColor1 = getRandomColor();
      const randomColor2 = getRandomColor();

      leftColumn.style.backgroundColor = randomColor1;
      rightColumn.style.backgroundColor = randomColor2;
    });
  }
});
