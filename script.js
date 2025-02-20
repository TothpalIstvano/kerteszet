const planterInputs = document.querySelectorAll(".about-container input");

function handleUpdate() {
  const width = document.getElementById("planter-width").value || 1;
  const length = document.getElementById("planter-length").value || 1;

  document.documentElement.style.setProperty(`--width`, width);
  document.documentElement.style.setProperty(`--length`, length);

  generateGardenItems(width * length);
}

function generateGardenItems(count) {
  const gardenPlanter = document.querySelector(".garden-bed");
  gardenPlanter.innerHTML = ""; // Clear existing items

  for (let i = 0; i < count; i++) {
    let div = document.createElement("div");
    div.classList.add("garden-item");
    div.textContent = i + 1;
    gardenPlanter.appendChild(div);
  }
}

planterInputs.forEach((input) => input.addEventListener("input", handleUpdate));
window.onload = handleUpdate; // Initialize on page load

function setPlanterSize() {
    let planterSize = document.getElementById("planterSize").value;
    let planterWidth = document.getElementById("planterWidth").value;
    const gardenPlanter = document.querySelector(".garden-bed");
    gardenPlanter.innerHTML = ""; // Clear existing items

    for (let i = 0; i < planterSize; i++) {
      let planterRow = document.createElement("div");
      planterRow.classList.add("garden-row");
  
      for (let j = 0; j < planterWidth; j++) {
          let cell = document.createElement("div");
          cell.classList.add("garden-item");
          cell.textContent = i * planterWidth + j + 1;
          planterRow.appendChild(cell);
      }
      gardenPlanter.appendChild(planterRow);
  }
  
}

document.getElementById('add-plant').addEventListener('click', () => {
  const plant = document.getElementById('plant').value;
  const quantity = document.getElementById('quantity').value;
  const li = document.createElement('li');
  li.textContent = `${quantity} x ${plant}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => li.remove();
  li.appendChild(deleteBtn);

  document.getElementById('plant-list').appendChild(li);
});

fetch("adatleker.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    plant: document.getElementById('plant').value,
    quantity: document.getElementById('quantity').value
  })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const li = document.createElement('li');
      li.textContent = `${data.quantity} x ${data.plant}`;
      document.getElementById('plant-list').appendChild(li);
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


function megcsinál(){
  const list2 = document.getElementById('plant-list');
  Array.from(list2.children).forEach(item => {
    const text = item.textContent;
    console.log(text);
  });
  const hossza = document.getElementById('planter-length').value;
  const szelesseg = document.getElementById('planter-width').value;
  for (let i = 0; i < hossza; i++) {
    for (let j = 0; j < szelesseg; j++) {

    }
  }
}
/*
plant-list --> db, név kiszed
fetch --> post-olás adat lekerés php-nak
    .then --> bejövő adat vissza transformálása
    .then --> elsőnek azt amelyik a legkevesebbet szereti vagy a legkisebb sortővű növény kiválasztása
    .then --> szeret nem szeret tábla alapján kiválasztás --> ha többet is szeret és nem szélen van akkor azt amelyik 2 vagy többet szeret --> ha mindkettő akkor rnd
*/