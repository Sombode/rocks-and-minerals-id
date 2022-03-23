//use regex ""^.*, " to remove starts of links
//remove right before https://upload.wikimedia.org/wikipedia/commons/5/54/Microsyenite_dike_%28Precambrian%3B_Michipicoten_River_Bridge_South_roadcut%2C_south_of_Wawa%2C_Ontario%2C_Canada%29_23_%2847924848436%29.jpg
//var fs = require('fs');
//let minerals = ["Ulexite","Aragonite","Azurite","Calcite","Dolomite","Malachite","Rhodochrosite","Copper","Diamond","Gold","Graphite","Silver","Sulfur","Fluorite","Halite","Corundum","Goethite","Hematite","Magnetite","Pyrolusite","Rutile","Zincite","Apatite","Pyromorphite","Turquoise","Vanadinite","Baryte","Celestite","Alabaster","Satin Spar","Selenite","Bornite","Chalcopyrite","Galena","Pyrite","Sphalerite","Stibnite","Apophyllite","Beryl","Epidote","Kaolinite","Kyanite","Olivine","Aventurine","Agate","Amethyst","Chalcedony","Citrine","Jasper","Milky_quartz","Opal","Rock_crystal","Rose_quartz","Smoky_quartz","Sodalite","Staurolite","Stilbite","Talc","Topaz","Tourmaline","Willemite","Zircon","Actinolite","Hornblende","Tremolite","Albite","Labradorite","Amazonite","Orthoclase","Almandine","Biotite","Lepidolite","Muscovite","Augite","Rhodonite","Spodumene"]
//let rocks = ["Andesite","Basalt","Diorite","Gabbro","Granite","Obsidian","Pegmatite","Peridotite","Pumice","Rhyolite","Scoria","Syenite","Tuff","Banded_iron_formation","Bauxite","Breccia","Chert","Conglomerate","Diatomite","Dolostone","Halite","Gypsum","Shale","Anthracite","Bituminous","Lignite","Chalk","Coquina","Fossil_limestone","Oolitic_limestone","Travertine","Arkose","Greywacke","Sandstone","Amphibolite","Gneiss","Marble","Phyllite","Quartzite","Schist","Mica_schist","Soapstone","Serpentinite","Slate"]
//let master = []
//console.log("Heyo!");
/*for(i in minerals) {
let array = fs.readFileSync('pictures/minerals/'+minerals[i].toLowerCase()+'.txt').toString().split("\n");
for(iii in array) {
    master.push(array[iii]);
}
}*/
//console.log(master);
//requirejs.config({baseUrl: 'js/lib'});

//requirejs(['fs'],function($,canvas,sub) {
//    console.log("hello?");
//});
let guessForm = document.getElementById("guess");
let guessBox = document.getElementById("guessbox");
let image = document.getElementById("image");
let revealAnswer = document.getElementById("reveal");
let minerals, rocks, master = [];
let answer = 86;
let subanswer = 0;
let toIncAnswer = false;
fetch("minerals.txt").then(response => response.text()).then(data => { minerals = data.split(/\r?\n/);fetch("rocks.txt").then(response => response.text()).then(data => { rocks = data.split(/\r?\n/);master = minerals.concat(rocks);newImage();});});
guessForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let guess = guessBox.value.toLowerCase().trim();
  //console.log(guess);
  /*if(guess === "skip") {
    guessBox.value = "";
    revealAnswer.innerHTML = master[answer];
    window.requestAnimationFrame(function() {
      revealAnswer.classList.add("fade");
    });
    revealAnswer.onanimationend = () => {
      window.requestAnimationFrame(function() {
      revealAnswer.classList.remove("fade");
      newImage();
      });
    };
  }
  if(guess === master[answer].toLowerCase()) {
    //console.log("Good");
    window.requestAnimationFrame(function() {
      guessBox.classList.add("correct");
    });
    guessBox.onanimationend = () => {
      window.requestAnimationFrame(function() {
      guessBox.classList.remove("correct");
      guessBox.value = "";
      newImage();
      });
    };
  } else {
    //console.log("Bad");
    window.requestAnimationFrame(function() {
      guessBox.classList.add("shake");
    });
    guessBox.onanimationend = () => {
      window.requestAnimationFrame(function() {
      guessBox.classList.remove("shake");
      });
    };
  }*/
  if(guess === "bad") {
      console.log(master[answer] + ", " + image.getAttribute("src"));
  }
  guessBox.value = "";
  if(toIncAnswer) {
    answer += 1;
    subanswer = 0;
    toIncAnswer = false;
    //console.log("answer increased");
  } 
  newImage();
});
function newImage() {
  revealAnswer.innerHTML = master[answer];
  /*answer += 1;
  //answer = Math.floor(Math.random() * (master.length+1));
  if(minerals.includes(master[answer])) {
    image.style.display = "none";
    image.style.border = "none";
    fetch("pictures/minerals/" + master[answer].toLowerCase().replace(" ", "_") + ".txt").then(response => response.text()).then(data => {
      image.setAttribute("src", data.split(/\r?\n/)[Math.floor(Math.random() * (data.split(/\r?\n/).length))]);
      image.onload = function() {image.style.display = "block";image.style.border = "5px solid #1C2833";}
    });
  } else if (rocks.includes(master[answer])) {
    image.style.display = "none";
    image.style.border = "none";
    fetch("pictures/rocks/" + master[answer].toLowerCase().replace(" ", "_") + ".txt").then(response => response.text()).then(data => {
      image.setAttribute("src", data.split(/\r?\n/)[Math.floor(Math.random() * (data.split(/\r?\n/).length))]);
      image.onload = function() {image.style.display = "block";image.style.border = "5px solid #1C2833";}
    });
  } else {
    //console.log("Error locating answer for ID " + answer + ". Retrying.");
    newImage();
  }*/
  try {
  if(minerals.includes(master[answer])) {
    image.style.display = "none";
    image.style.border = "none";
    fetch("pictures/minerals/" + master[answer].toLowerCase().replace(" ", "_") + ".txt").then(response => response.text()).then(data => {
      image.setAttribute("src", data.split(/\r?\n/)[subanswer]);
      subanswer += 1;
      if(subanswer >= (data.split(/\r?\n/).length)-1) {
        //console.log("INCREASE");
        toIncAnswer = true;
      }
      image.onload = function() {image.style.display = "block";image.style.border = "5px solid #1C2833";}
    });
  } else if (rocks.includes(master[answer])) {
    image.style.display = "none";
    image.style.border = "none";
    fetch("pictures/rocks/" + master[answer].toLowerCase().replace(" ", "_") + ".txt").then(response => response.text()).then(data => {
      image.setAttribute("src", data.split(/\r?\n/)[subanswer]);
      subanswer += 1;
      if(subanswer >= (data.split(/\r?\n/).length)-1) {
        //console.log("INCREASE");
        toIncAnswer = true;
      }
      image.onload = function() {image.style.display = "block";image.style.border = "5px solid #1C2833";}
    });
  } else {
    newImage();
  }
  } catch {
    if(minerals.includes(master[answer])) {
    image.style.display = "none";
    image.style.border = "none";
    fetch("pictures/minerals/" + master[answer].toLowerCase().replace(" ", "_") + ".txt").then(response => response.text()).then(data => {
      image.setAttribute("src", data.split(/\r?\n/)[subanswer]);
      subanswer += 1;
      if(subanswer >= (data.split(/\r?\n/).length)-1) {
        //console.log("INCREASE");
        toIncAnswer = true;
      }
      image.onload = function() {image.style.display = "block";image.style.border = "5px solid #1C2833";}
    });
  } else if (rocks.includes(master[answer])) {
    image.style.display = "none";
    image.style.border = "none";
    fetch("pictures/rocks/" + master[answer].toLowerCase().replace(" ", "_") + ".txt").then(response => response.text()).then(data => {
      image.setAttribute("src", data.split(/\r?\n/)[subanswer]);
      subanswer += 1;
      if(subanswer >= (data.split(/\r?\n/).length)-1) {
        //console.log("INCREASE");
        toIncAnswer = true;
      }
      image.onload = function() {image.style.display = "block";image.style.border = "5px solid #1C2833";}
    });
  } else {
    newImage();
  }
  }
}