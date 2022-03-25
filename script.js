//var fs = require('fs');
//let minerals = ["Ulexite","Aragonite","Azurite","Calcite","Dolomite","Malachite","Rhodochrosite","Copper","Diamond","Gold","Graphite","Silver","Sulfur","Fluorite","Halite","Corundum","Goethite","Hematite","Magnetite","Pyrolusite","Rutile","Zincite","Apatite","Pyromorphite","Turquoise","Vanadinite","Baryte","Celestite","Alabaster","Satin Spar","Selenite","Bornite","Chalcopyrite","Galena","Pyrite","Sphalerite","Stibnite","Apophyllite","Beryl","Epidote","Kaolinite","Kyanite","Olivine","Aventurine","Agate","Amethyst","Chalcedony","Citrine","Jasper","Milky_quartz","Opal","Rock_crystal","Rose_quartz","Smoky_quartz","Sodalite","Staurolite","Stilbite","Talc","Topaz","Tourmaline","Willemite","Zircon","Actinolite","Hornblende","Tremolite","Albite","Labradorite","Amazonite","Orthoclase","Almandine","Biotite","Lepidolite","Muscovite","Augite","Rhodonite","Spodumene"]
//let rocks = ["Andesite","Basalt","Diorite","Gabbro","Granite","Obsidian","Pegmatite","Peridotite","Pumice","Rhyolite","Scoria","Syenite","Tuff","Banded_iron_formation","Bauxite","Breccia","Chert","Conglomerate","Diatomite","Dolostone","Halite","Gypsum","Shale","Anthracite","Bituminous","Lignite","Chalk","Coquina","Fossil_limestone","Oolitic_limestone","Travertine","Arkose","Greywacke","Sandstone","Amphibolite","Gneiss","Marble","Phyllite","Quartzite","Schist","Mica_schist","Soapstone","Serpentinite","Slate"]
//let master = []
console.log("Heyo!");
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
let title = document.getElementById("title");
let minerals, rocks, master = [];
let answer = -1;
fetch("minerals.txt").then(response => response.text()).then(data => { minerals = data.split(/\r?\n/);fetch("rocks.txt").then(response => response.text()).then(data => { rocks = data.split(/\r?\n/);master = minerals.concat(rocks);console.log(master);newImage();});});
guessForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let guess = guessBox.value.toLowerCase().trim();
  console.log(guess);
  if(guess === "skip") {
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
  } else if(guess === master[answer].toLowerCase()) {
    console.log("Good");
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
    console.log("Bad");
    window.requestAnimationFrame(function() {
      guessBox.classList.add("shake");
    });
    guessBox.onanimationend = () => {
      window.requestAnimationFrame(function() {
      guessBox.classList.remove("shake");
      });
    };
  }
});
function newImage() {
  try {
  answer = Math.floor(Math.random() * (master.length+1));
  if(minerals.includes(master[answer])) {
    title.innerHTML = "<u>Mineral</u> Spot ID Practice";
    image.style.display = "none";
    image.style.border = "none";
    fetch("pictures/minerals/" + master[answer].toLowerCase().replace(" ", "_") + ".txt").then(response => response.text()).then(data => {
      try {
      if(data.split(/\r?\n/).length <= 1) {
        throw "No good images!";
      }
      console.log(data.split(/\r?\n/));
      console.log(Math.floor(Math.random() * (data.split(/\r?\n/).length-1)));
      image.setAttribute("src", data.split(/\r?\n/)[Math.floor(Math.random() * (data.split(/\r?\n/).length-1))]);
      image.onload = function() {image.style.display = "block";image.style.border = "5px solid #1C2833";}
      } catch(e) {
        console.error(e);
        newImage();
      }
    });
  } else if (rocks.includes(master[answer])) {
    title.innerHTML = "<u>Rock</u> Spot ID Practice";
    image.style.display = "none";
    image.style.border = "none";
    fetch("pictures/rocks/" + master[answer].toLowerCase().replace(" ", "_") + ".txt").then(response => response.text()).then(data => {
      try {
      if(data.split(/\r?\n/).length <= 1) {
        throw "No good images!";
      }
      console.log(data.split(/\r?\n/));
      console.log(Math.floor(Math.random() * (data.split(/\r?\n/).length-1)));
      image.setAttribute("src", data.split(/\r?\n/)[Math.floor(Math.random() * (data.split(/\r?\n/).length-1))]);
      image.onload = function() {image.style.display = "block";image.style.border = "5px solid #1C2833";}
      } catch(e) {
        console.error(e);
        newImage();
      }
    });
  } else {
    console.log("Error locating answer for ID " + answer + ". Retrying.");
    newImage();
  }
  } catch(e) {
    console.log("No good images!");
    console.error(e);
    newImage();
  }
}