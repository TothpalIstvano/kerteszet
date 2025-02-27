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
  const plant = document.getElementById('plant').value  ||  "";
  const quantity = document.getElementById('quantity').value ||  0;
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

function adatFelForm(){
  const hely = document.getElementById('addfel');
  const form = document.createElement('form');
  form.method = "POST";
  form.action = "addproba.php";
  const table = document.createElement('table');
  const rows = [];
  const tr1 = document.createElement('tr');
  const td11 = document.createElement('td');
  td11.textContent = "Növény neve: ";
  const td12 = document.createElement('td');
  const input1 = document.createElement('input');
  input1.type = "text";
  input1.name = "novNev";
  input1.id = "novNev";
  input1.maxLength = "50";
  td12.appendChild(input1);
  tr1.appendChild(td11);
  tr1.appendChild(td12);
  rows.push(tr1);

  const tr2 = document.createElement('tr');
  const td21 = document.createElement('td');
  td21.textContent = "Növény latin neve: ";
  const td22 = document.createElement('td');
  const input2 = document.createElement('input');
  input2.type = "text";
  input2.name = "novLatin";
  input2.id = "novLatin";
  td22.appendChild(input2);
  tr2.appendChild(td21);
  tr2.appendChild(td22);
  rows.push(tr2);

  const tr3 = document.createElement('tr');
  const td31 = document.createElement('td');
  td31.textContent = "Növény sortávolsága: ";
  const td32 = document.createElement('td');
  const input3 = document.createElement('input');
  input3.type = "number";
  input3.name = "sortav";
  input3.id = "sortav";
  td32.appendChild(input3);
  tr3.appendChild(td31);
  tr3.appendChild(td32);
  rows.push(tr3);

  const tr4 = document.createElement('tr');
  const td41 = document.createElement('td');
  td41.textContent = "Növény tőtávolsága: ";
  const td42 = document.createElement('td');
  const input4 = document.createElement('input');
  input4.type = "number";
  input4.name = "totav";
  input4.id = "totav";
  td42.appendChild(input4);
  tr4.appendChild(td41);
  tr4.appendChild(td42);
  rows.push(tr4);

  const tr5 = document.createElement('tr');
  const td51 = document.createElement('td');
  td51.textContent = "Fajta: ";
  const td52 = document.createElement('td');
  const input5 = document.createElement('input');
  input5.type = "text";
  input5.name = "fajta";
  input5.id = "fajta";
  td52.appendChild(input5);
  tr5.appendChild(td51);
  tr5.appendChild(td52);
  rows.push(tr5);

  const tr6 = document.createElement('tr');
  const td61 = document.createElement('td');
  td61.style.textAlign = "center";
  const input6 = document.createElement('input');
  input6.type = "reset";
  input6.value = "Töröl";
  td61.appendChild(input6);
  const td62 = document.createElement('td');
  td62.style.textAlign = "center";
  const input7 = document.createElement('input');
  input7.type = "submit";
  input7.value = "Elküld";

  input7.addEventListener('click', () => {
    const addfel = document.getElementById("addfel");
    while (addfel.firstChild) {
        addfel.removeChild(addfel.firstChild);
    };
    const gombs = document.getElementById("gombs");
    const gomb = document.createElement("button");
    gomb.id = "extend-db";
    gomb.textContent = "Extend Database";
    gomb.addEventListener('click', () => {
      adatFelForm();
    });
    
    const gombs2 = document.getElementById("kertKuldGomb");
    const gomb2 = document.createElement("button");
    gomb2.id = "gen";
    gomb2.textContent = "Kert elkészitése";
    gomb2.addEventListener('click', () => {
      kertkeszito();
    });
    gombs2.appendChild(gomb2);
    gombs.appendChild(gomb);
  });

  td62.appendChild(input7);
  tr6.appendChild(td61);
  tr6.appendChild(td62);
  rows.push(tr6);

  rows.forEach(row => table.appendChild(row));
  form.appendChild(table);
  hely.appendChild(form);

  document.getElementById('extend-db').remove();
  document.getElementById('gen').remove();
}

async function kertkeszito(){
  const szeleseg = document.getElementById("planter-width").value || 1;
  const hosszusag = document.getElementById("planter-length").value || 1;
  let kertMatrix = new Array(szeleseg);

  for (let i = 0; i < szeleseg; i++) {
    kertMatrix[i] = new Array(hosszusag);
      for (let j = 0; j < hosszusag; j++) {
        kertMatrix[i][j] = true; // Fill with some values
      }
  }
  console.log(kertMatrix);
  // post-olás adat lekerés php-nak
  fetch("adatleker.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  })
    // bejövő adat vissza transformálása
    .then(response => response.json())
    .then(data => { console.log(data)})
    .catch(error => {
      console.error('Error:', error);
    });


  // Display the dynamic 2D array


}
/*
plant-list --> db, név kiszed
fetch --> post-olás adat lekerés php-nak
    .then --> bejövő adat vissza transformálása
    .then --> elsőnek azt amelyik a legkevesebbet szereti vagy a legkisebb sortővű növény kiválasztása
    .then --> szeret nem szeret tábla alapján kiválasztás --> ha többet is szeret és nem szélen van akkor azt amelyik 2 vagy többet szeret --> ha mindkettő akkor rnd
*/