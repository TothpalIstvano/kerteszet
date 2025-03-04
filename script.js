
const planterInputs = document.querySelectorAll(".about-container input");

function handleUpdate() {
  const width = document.getElementById("planter-width").value || 1;
  const length = document.getElementById("planter-length").value || 1;
  
  document.documentElement.style.setProperty(`--width`, width);
  document.documentElement.style.setProperty(`--length`, length);

  generateGardenItems(width * length);
}

//#region garden
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
//#endregion

//#region lista
document.getElementById('add-plant').addEventListener('click', () => {
  const plant = document.getElementById('plant').value.trim()  ||  "";
  const quantity = document.getElementById('quantity').value ||  0;
  const list = document.getElementById('plant-list');
  let van = false;
  Array.from(list.children).forEach(child => {
    if (child.textContent.includes(plant)) {
      const currentQuantity = parseInt(child.textContent.split(' x ')[0]);
      child.textContent = `${currentQuantity + parseInt(quantity)} x ${plant}`;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => child.remove();
      child.appendChild(deleteBtn);
      van = true;
      
    }
  });
  if (!van) {
    const li = document.createElement('li');
    li.textContent = `${quantity} x ${plant}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => li.remove();
    li.appendChild(deleteBtn);
  
    document.getElementById('plant-list').appendChild(li);
  }
  
});
//#endregion

//#region form
/*function adatFelForm(){
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

fetch('opciok.php')
  .then(response => response.json())
  .then(optionsData => {
 // Create the row
const tr8 = document.createElement('tr');

const td81 = document.createElement('td');
td81.textContent = "Szeret: ";

const td82 = document.createElement('td');
const select8 = document.createElement('select');
select8.name = "szeret";
select8.id = "szeret";

// Dynamically add options from the SQL data
optionsData.forEach(option => {
  const optionElement = document.createElement('option');
  optionElement.value = option.id; // Use the ID from the SQL table
  optionElement.textContent = option.name; // Use the name from the SQL table
  select8.appendChild(optionElement);
});

td82.appendChild(select8);
tr8.appendChild(td81);
tr8.appendChild(td82);
rows.push(tr8);
  })
  .catch(error => console.error('Error fetching options:', error));
 

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
    setTimeout(() => {
      
   
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
  },500);

  td62.appendChild(input7);
  tr6.appendChild(td61);
  tr6.appendChild(td62);
  rows.push(tr6);

  rows.forEach(row => table.appendChild(row));
  form.appendChild(table);
  hely.appendChild(form);

  document.getElementById('extend-db').remove();
  document.getElementById('gen').remove();
}*/
//#endregion

//#region Kertet elkészitő függvény
async function kertkeszito(){
  const szeleseg = document.getElementById("planter-width").value || 1;
  const hosszusag = document.getElementById("planter-length").value || 1;
  if (isNaN(szeleseg))szeleseg = 1;
  if (isNaN(hosszusag)) hosszusag = 1;

  let kertMatrix = new Array(szeleseg);
  let novenyListaHossz = document.getElementById("plant-list").children.length
  let novenyMatrix = new Array(novenyListaHossz);

//#region kert matrix inicializálása
  for (let i = 0; i < szeleseg; i++) {
    kertMatrix[i] = new Array(hosszusag);
      for (let j = 0; j < hosszusag; j++) {
        kertMatrix[i][j] = true; // Fill with some values
      }
  }
//#endregion

//#region noveny matrix létrehozássa
  for (let i = 0; i < novenyListaHossz; i++) {
    novenyMatrix[i] = new Array(8);
      for (let j = 0; j < 8; j++) {
        novenyMatrix[i][j] = j;  // 0. nev
                                 // 1. mennyiseg
                                 // 2. sortavolsag
                                 // 3. totavolsag
                                 // 4. fajta
                                 // 5. szeret --> lista
                                 // 6. nem szeret --> lista
                                 // 7. szín
        if(j == 5 || j == 6){
          novenyMatrix[i][j] = [];
        }
      }
  }
//#endregion

//#region random szín
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//#endregion

//#region noveny matrix beolvasas
  for (let i = 0; i < document.getElementById("plant-list").children.length; i++) {
      novenyMatrix[i][0] = document.getElementById("plant-list").children[i].textContent.replace("Delete", " ").trim().split(" x ")[1].trim()
      novenyMatrix[i][1] = parseInt(document.getElementById("plant-list").children[i].textContent.replace("Delete", " ").trim().split(" x ")[0].trim());
      const adat = await adatlekeres(novenyMatrix[i][0]);
      novenyMatrix[i][2] = adat.plant.Sortavolsag;
      novenyMatrix[i][3] = adat.plant.Totavolsag;
      novenyMatrix[i][4] = adat.plant.Fajta;
      novenyMatrix[i][5] = adat.likes;
      novenyMatrix[i][6] = adat.dislikes;
      novenyMatrix[i][7] = getRandomColor();
  }
  console.log(novenyMatrix);
//#endregion

//#region kert átépités
    const gardenPlanter = document.querySelector(".garden-bed");
    gardenPlanter.innerHTML = ""; // Clear existing items
    gardenPlanter.style = "border: #ffffff00;";
    const kert = document.getElementById("kert");
    let table = kert.querySelector("table");
    if (!table) {
      table = document.createElement("table");
      kert.appendChild(table);
    }
    let tbody = table.querySelector("tbody");
    if (!tbody) {
      tbody = document.createElement("tbody");
      table.appendChild(tbody);
    } else {
      tbody.innerHTML = ""; // Clear existing rows
    }
    for (let i = 0; i < hosszusag; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < szeleseg; j++) {
        const cell = document.createElement("td");
        cell.textContent = `${i},${j}`;
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }
//#endregion

setTimeout(() => {
    for (let i = 0; i < novenyListaHossz; i++) {
      for (let j = 0; j < szeleseg; j+=Math.round(novenyMatrix[i][2]/10)) {
        for (let k = 0; k < hosszusag; k+=Math.round(novenyMatrix[i][3]/10)) {
          if (kertMatrix[j][k]&&novenyMatrix[i][1]>0) {
            for (let l = 0; l < j; l++) {
              kertMatrix[l][k] = false;
            }
            novenyMatrix[i][1]--;
            console.log("novenyMatrix[i][7]:", novenyMatrix[i][7]);

            kert.querySelector("table").querySelector("tbody").querySelectorAll("tr")[k].querySelectorAll("td")[j].style="background-color:"+novenyMatrix[i][7]+";";
            
          }
        }
      }
    }
    console.log("kertMatrix:", kertMatrix, "novenyMatrix:", novenyMatrix);
  
}, );
}
//#endregion

//#region adat lekérése a php-ból
async function adatlekeres(kereset){
  return fetch("adatleker.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({plant: kereset})
  })
    // bejövő adat vissza transformálása
    .then(response => response.json())
    .then(data => { return data })
    .catch(error => {
      console.error('Error:', error);
      return null;
    });
}
//#endregion

//#region leírás
/*
plant-list --> db, név kiszed
fetch --> post-olás adat lekerés php-nak
    .then --> bejövő adat vissza transformálása
    .then --> elsőnek azt amelyik a legkevesebbet szereti vagy a legkisebb sortővű növény kiválasztása
    .then --> szeret nem szeret tábla alapján kiválasztás --> ha többet is szeret és nem szélen van akkor azt amelyik 2 vagy többet szeret --> ha mindkettő akkor rnd
*/
//#endregion

//#region feles kodok
/*

kert.querySelector("table").querySelector("tbody").querySelectorAll("tr")[0].querySelectorAll("td")[2].style="background-color: rgb(255, 0, 0);";





  gardenPlanter.style="border: solid 10px #55423d;";
  const kert = document.getElementById("kert");
  while (kert.firstChild) {
    kert.removeChild(kert.firstChild);
  }

const plantSelect = document.getElementById("plant");
  const options = plantSelect.options;
  const adatok = [];
  for (let i = 0; i < options.length; i++) {
    const adat = await adatlekeres(options[i].value);
    adatok.push(adat);
    console.log(adat.plants[0].Nev);
  }
  console.log(adatok);

*/
//#endregion
