const planterInputs = document.querySelectorAll(".about-container input");

function handleUpdate() {
  const oppositeDimension = this.name === "width" ? "length" : "width";

  const gardenSpots =
    getComputedStyle(document.documentElement).getPropertyValue(
      `--${oppositeDimension}`
    ) * this.value;

  document.documentElement.style.setProperty(`--${this.name}`, this.value);
  generateGardenItems(gardenSpots)
}

function generateGardenItems(count) {
  const gardenItems = Array(count).fill().map((x,i)=>`<div class="garden-item" data-cell='${i+1}'>${i+1}</div>`)
  const gardenPlanter = document.querySelector('.garden-bed')
  console.log(gardenItems)
  gardenPlanter.innerHTML = gardenItems.join('')
}

planterInputs.forEach((input) =>
  input.addEventListener("change", handleUpdate)
);
