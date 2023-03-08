let works = window.localStorage.getItem("tableau");
const body = document.querySelector("body");
const sectionImages = document.querySelector(".gallery");
const allImg = [];
const allDiv = [];
body.style.backgroundColor = "#E5E5E5";
async function callImages() {
	if (works === null) {
		await fetch("http://localhost:5678/api/works").then((response) =>
			response.json().then((works) => {
				const valuesWorks = JSON.stringify(works);

				window.localStorage.setItem("tableau", valuesWorks);
				works.forEach((img) => {
					const creatImg = document.createElement("img");
					const creatDiv = document.createElement("div");
					const title = document.createElement("h3");
					title.textContent = img.title;
					creatImg.src = img.imageUrl;
					creatImg.id = img.id;
					sectionImages.appendChild(creatDiv);
					creatDiv.appendChild(creatImg);
					creatDiv.appendChild(title);
					allImg.push(creatImg.id);
					allDiv.push(img.title);
				});
			})
		);
	} else {
		const worksArray = JSON.parse(works);
		const sectionImages = document.querySelector(".gallery");
		worksArray.forEach((img) => {
			const creatImg = document.createElement("img");
			const creatDiv = document.createElement("div");
			const title = document.createElement("h3");
			title.textContent = img.title;
			creatImg.src = img.imageUrl;
			creatImg.id = img.id;
			title.style.marginTop = "1rem";
			sectionImages.appendChild(creatDiv);
			creatDiv.appendChild(creatImg);
			creatDiv.appendChild(title);
			allImg.push(creatImg.id);
			allDiv.push(img.title);
		});
	}
}
let data = window.localStorage.getItem("filter");
async function getCategories() {
	if (data === null) {
		await fetch(`http://localhost:5678/api/categories`).then((response) =>
			response.json().then((data) => {
				const creatCategories = document.querySelector(".categories");
				const valuesData = JSON.stringify(data);
				window.localStorage.setItem("filter", valuesData);
				data.forEach((cate) => {
					const creatCate = document.createElement("btn");
					creatCategories.appendChild(creatCate);
					creatCate.textContent = cate.name;
					creatCategories.style.display = "flex";
					creatCategories.style.width = "50%";
					creatCategories.style.marginLeft = "auto";
					creatCategories.style.marginRight = "auto";
					creatCategories.style.marginBottom = "1rem";
					creatCategories.style.justifyContent = "space-around";
				});
			})
		);
	} else {
		const dataArray = JSON.parse(data);
		const creatCategories = document.querySelector(".categories");
		dataArray.forEach((cate) => {
			const creatCate = document.createElement("button");
			creatCategories.appendChild(creatCate);
			creatCate.textContent = cate.name;
			creatCategories.style.display = "flex";
			creatCategories.style.width = "50%";
			creatCategories.style.marginLeft = "auto";
			creatCategories.style.marginRight = "auto";
			creatCategories.style.marginBottom = "1rem";
			creatCategories.style.justifyContent = "space-around";
		});
	}
}
callImages();
getCategories();
//Création des buttons et effect click isoler
const creatCategories = document.querySelector(".categories");
const btnObject = creatCategories.getElementsByTagName("button")[0];
const btnAppart = creatCategories.getElementsByTagName("button")[1];
const btnHotel = creatCategories.getElementsByTagName("button")[2];
const btnAll = document.createElement("button");
creatCategories.appendChild(btnAll);
btnAll.textContent = "Tous";
btnAll.style.order = -1;

btnAll.addEventListener("click", () => {
	Allsee();
});
btnObject.addEventListener("click", () => {
	cacheElementsObject();
});
btnAppart.addEventListener("click", () => {
	appartSee();
});
btnHotel.addEventListener("click", () => {
	hotelSee();
});

//  creation d'un autre btn qui a comme function 'menu'
// creation d'un objet Set pour chaque categorie
console.log(allImg);
console.log(allDiv);
const titreDesDiv = document.querySelectorAll("h3");
console.log(titreDesDiv);
console.log(titreDesDiv[3]);
//Creation ciblage des titres
const myDivOne = document.querySelector("h3");
const myDivTwo = document.querySelectorAll("h3")[1];
const myDivThree = document.querySelectorAll("h3")[2];
const myDivFour = document.querySelectorAll("h3")[3];
const myDivFive = document.querySelectorAll("h3")[4];
const myDivSix = document.querySelectorAll("h3")[5];
const myDivSeven = document.querySelectorAll("h3")[6];
const myDivEight = document.querySelectorAll("h3")[7];
const myDivNine = document.querySelectorAll("h3")[8];
const myDivTen = document.querySelectorAll("h3")[9];
const myDivEleven = document.querySelectorAll("h3")[10];
//creation ciblage des images
const myImgOne = document.getElementById(allImg[0]);
const myImgTwo = document.getElementById(allImg[1]);
const myImgThree = document.getElementById(allImg[2]);
const myImgFour = document.getElementById(allImg[3]);
const myImgFive = document.getElementById(allImg[4]);
const myImgSix = document.getElementById(allImg[5]);
const myImgSeven = document.getElementById(allImg[6]);
const myImgEight = document.getElementById(allImg[7]);
const myImgNine = document.getElementById(allImg[8]);
const myImgTen = document.getElementById(allImg[9]);
const myImgEleven = document.getElementById(allImg[10]);
//fonction pour afficher seulement l'objet
function cacheElementsObject() {
	myDivTwo.style.display = "none";
	myDivThree.style.display = "none";
	myDivFour.style.display = "none";
	myDivSix.style.display = "none";

	myDivSeven.style.display = "none";
	myDivEight.style.display = "none";
	myDivNine.style.display = "none";
	myDivTen.style.display = "none";
	myDivEleven.style.display = "none";
	myImgTwo.style.display = "none";
	myImgThree.style.display = "none";
	myImgFour.style.display = "none";
	myImgSix.style.display = "none";

	myImgSeven.style.display = "none";
	myImgEight.style.display = "none";
	myImgNine.style.display = "none";
	myImgTen.style.display = "none";
	myImgEleven.style.display = "none";
	//afficher
	myDivOne.style.display = "flex";
	myImgFive.style.display = "flex";
	myImgOne.style.display = "flex";
	myImgFive.style.display = "flex";
}

//fonction tout afficher

function Allsee() {
	myDivOne.style.display = "block";
	myDivTwo.style.display = "block";
	myDivThree.style.display = "block";
	myDivFour.style.display = "block";
	myDivFive.style.display = "block";
	myDivSix.style.display = "block";
	myDivSeven.style.display = "block";
	myDivEight.style.display = "block";
	myDivNine.style.display = "block";
	myDivTen.style.display = "block";
	myDivEleven.style.display = "block";
	myImgOne.style.display = "block";
	myImgTwo.style.display = "block";
	myImgThree.style.display = "block";
	myImgFour.style.display = "block";
	myImgFive.style.display = "block";
	myImgSix.style.display = "block";
	myImgSeven.style.display = "block";
	myImgEight.style.display = "block";
	myImgNine.style.display = "block";
	myImgTen.style.display = "block";
	myImgEleven.style.display = "block";
}
//fonction afficher appartements
function appartSee() {
	myDivOne.style.display = "none";
	myDivThree.style.display = "none";
	myDivFour.style.display = "none";
	myDivFive.style.display = "none";
	myDivSeven.style.display = "none";
	myDivEight.style.display = "none";
	myDivTen.style.display = "none";
	myDivEleven.style.display = "none";
	myImgOne.style.display = "none";
	myImgThree.style.display = "none";
	myImgFour.style.display = "none";
	myImgFive.style.display = "none";
	myImgSeven.style.display = "none";
	myImgEight.style.display = "none";
	myImgTen.style.display = "none";
	myImgEleven.style.display = "none";
	//afficher
	myDivTwo.style.display = "flex";
	myDivSix.style.display = "flex";
	myDivNine.style.display = "flex";
	myImgTwo.style.display = "flex";
	myImgSix.style.display = "flex";
	myImgNine.style.display = "flex";
}

//fonction afficher Hotel
function hotelSee() {
	myDivOne.style.display = "none";
	myDivTwo.style.display = "none";
	myDivThree.style.display = "none";
	myDivFive.style.display = "none";
	myDivSix.style.display = "none";
	myDivNine.style.display = "none";
	myImgOne.style.display = "none";
	myImgTwo.style.display = "none";
	myImgThree.style.display = "none";
	myImgFive.style.display = "none";
	myImgSix.style.display = "none";
	myImgNine.style.display = "none";
	//afficher
	myDivFour.style.display = "flex";
	myDivSeven.style.display = "flex";
	myDivEight.style.display = "flex";
	myDivTen.style.display = "flex";
	myDivEleven.style.display = "flex";
	myImgFour.style.display = "flex";
	myImgEight.style.display = "flex";
	myImgSeven.style.display = "flex";
	myImgTen.style.display = "flex";
	myImgEleven.style.display = "flex";
}
