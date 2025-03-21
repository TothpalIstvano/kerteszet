
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
    let planterSize = document.getElementById("planter-length").value 
    let planterWidth = document.getElementById("planter-width").value;
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
      deleteBtn.id = 'deletegomb';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => {
        child.remove();
      }
      child.appendChild(deleteBtn);
      van = true;
      
    }
  });
  if (!van) {
    const li = document.createElement('li');
    li.textContent = `${quantity} x ${plant}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'deletegomb';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => li.remove();
    li.appendChild(deleteBtn);
  
    document.getElementById('plant-list').appendChild(li);
  }
  
});
//#endregion


//#region Kertet elkészitő függvény
async function kertkeszito(){
  handleUpdate();
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
      if (adat.plant.Szin) {
        novenyMatrix[i][7] = adat.plant.Szin;
      } else {
        novenyMatrix[i][7] = getRandomColor();
      }
  }
  console.log(novenyMatrix);
//#endregion
    let enemyTalan = false;
    for (let i = 0; i < novenyListaHossz; i++) {
      enemyTalan = false;
      let viszonyit2 = Math.round(novenyMatrix[i][3]/10);
      let viszonyit1 = Math.round(novenyMatrix[i][2]/10);
      console.log(enemyTalan, viszonyit1, viszonyit2)
      if(i>0){
        let ii = 0;
        while(ii<novenyMatrix[i-1][6].length&&novenyMatrix[i][0]!=novenyMatrix[i-1][6][ii]){
          ii++;
        }
        if(ii<novenyMatrix[i-1][6].length){
          enemyTalan = true;
        }
      }
      if(enemyTalan){
        viszonyit1 = Math.round(novenyMatrix[i][2] / 10) + 1; // Sortávolság növelése
        viszonyit2 = Math.round(novenyMatrix[i][3] / 10) + 1; // Tőtávolság növelése
      } else {
        viszonyit1 = Math.round(novenyMatrix[i][2] / 10); // Alap sortávolság
        viszonyit2 = Math.round(novenyMatrix[i][3] / 10); // Alap tőtávolság
      }
      console.log(enemyTalan, viszonyit1, viszonyit2);


      /*
        ki kell false-olni=>{
            ha nem nulla tő táv->akkor menjen vissza fele egy for amely nulláza a === true helyeket a növényt nem bántja  ?✓
            ez a tő távra vonatkozik

            ha nem nulla sor tav->akkor menjen vissza fele egy for amely nulláza a === true helyeket a növényt nem bántja ?✓
          }
          

        ha false akkor keresse vissza nézze meg a sortávolságot és a tötávolságot ha nagyobb akkor arra a sorra azt használja
        majd ha meg van állítsa vissza
        ha nem szeret akkor sortáv ++
        ha sorban benne van már akkor tőtáv ++

      */
     let min = hosszusag/Math.round(novenyMatrix[i][3] / 10);
     let db = 0;
      if(i!=0){
        if(viszonyit1<Math.round(novenyMatrix[i-1][2] / 10)){
          viszonyit1 = Math.round(novenyMatrix[i-1][2] / 10);
        }
        else{
          viszonyit1 = Math.round(novenyMatrix[i][2] / 10);
        }
        db ++;
      }
      else{
        viszonyit1 = Math.round(novenyMatrix[i][2] / 10);
      }
      
      for (let j = 0; j < szeleseg; j+=viszonyit1) { // --> sortav
        for (let k = 0; k < hosszusag; k+=viszonyit2) { // --> totav
          if(k!=0){
            for (let p = 0; p < j; p++) {
              for (let q = 0; q < k; q++) {
                if(kertMatrix[p][q] === true){
                  kertMatrix[p][q] = false
                }
              }
            }
          }
          if (kertMatrix[j][k]==true&&novenyMatrix[i][1]>0) {
            if(viszonyit2<0){
              viszonyit2 = 0;
            }
            if(viszonyit1<0){
              viszonyit1 = 0;
            }
            if(kertMatrix[j][k] === true &&kertMatrix[viszonyit1,viszonyit2]){
              kertMatrix[j][k] = novenyMatrix[i][0];
            }
            novenyMatrix[i][1]--;
            console.log("novenyMatrix[i][7]:", novenyMatrix[i][7]);
          }
          if(novenyMatrix[i][1]==0){
            continue;
          }
        }
        if(j>0){
          if(db==1){
            viszonyit1 = Math.round(novenyMatrix[i][2] / 10);
          }
        }
      }
     min = hosszusag/Math.round(novenyMatrix[i][3] / 10);
      if(i!=0&&novenyMatrix[i][1]<min){
        if(viszonyit2<Math.round(novenyMatrix[i-1][3] / 10)){
          viszonyit2 = Math.round(novenyMatrix[i-1][3] / 10);
        }
        else{
          viszonyit2 = Math.round(novenyMatrix[i][3] / 10);
        }
      }
      else{
        viszonyit2 = Math.round(novenyMatrix[i][3] / 10);
      }

    }
    console.log("kertMatrix:", kertMatrix, "novenyMatrix:", novenyMatrix);

    for (let i = 0; i < szeleseg; i++) {
      for (let j = 0; j <hosszusag; j++) {
        if(kertMatrix[i][j] != true && kertMatrix[i][j] != false){ 
          for(let k = 0; k < novenyMatrix.length; k++){
            if(kertMatrix[i][j] == novenyMatrix[k][0] && i==0){
              document.getElementsByClassName("garden-item")[i+j].style = `background-color: ${novenyMatrix[k][7]};`;
            }
            if(kertMatrix[i][j] == novenyMatrix[k][0] && (i>0 || j>0)){
              document.getElementsByClassName("garden-item")[i*10+j].style = `background-color: ${novenyMatrix[k][7]};`;
            }
            if(szeleseg%2!=0 && hosszusag%2!=0 && hosszusag!=szeleseg &&szeleseg/hosszusag>0 && kertMatrix[i][j] == novenyMatrix[k][0] && (i>0 || j>0)){
              document.getElementsByClassName("garden-item")[szeleseg-1].style = `background-color: ${novenyMatrix[k][7]};`;
            }
            else if(szeleseg%2!=0 && hosszusag%2!=0 && hosszusag!=szeleseg &&kertMatrix[i][j] == novenyMatrix[k][0] && (i>0 || j>0)){
              document.getElementsByClassName("garden-item")[hosszusag-1].style = `background-color: ${novenyMatrix[k][7]};`;
            }
          }
        }
      }
    }

      const gardenItems = document.getElementsByClassName("garden-item");

    if(novenyMatrix.length == 1 && novenyMatrix[0][1] == 1  && document.getElementsByClassName("garden-item").length == 0){
      document.getElementsByClassName("garden-item")[0].style = `background-color: ${novenyMatrix[0][7]};`;
    }

    let kimaradt ="";
    novenyMatrix.forEach(element => {
      if (element[1] > 0) {
        kimaradt+=(`${element[1]} x ${element[0]}\n`);
      }
    });
    if(kimaradt.length>0){
      setTimeout(() => {
        alert(kimaradt);
      }, 500);
    }
    
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
plant-list --> db, név kiszed ✓
fetch --> post-olás adat lekerés php-nak✓
    .then --> bejövő adat vissza transformálása✓
    .then --> elsőnek azt amelyik a legkevesebbet szereti vagy a legkisebb sortővű növény kiválasztása \-?-/ ✓???????
    .then --> szeret nem szeret tábla alapján kiválasztás --> ha többet is szeret és nem szélen van akkor azt amelyik 2 vagy többet szeret --> ha mindkettő akkor rnd ??
*/
//#endregion


