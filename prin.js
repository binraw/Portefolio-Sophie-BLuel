let works = window.localStorage.getItem("tableau");
const body = document.querySelector("body");
const allImg = [];
const allDiv = [];
body.style.backgroundColor = "#E5E5E5";
async function callImages() {
	if (works === null) {
		await fetch("http://localhost:5678/api/works").then((response) =>
			response.json().then((works) => {
				const sectionImages = document.querySelector(".gallery");
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
					allDiv.push(img.title.trim());
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
			allDiv.push(creatDiv);
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
	console.log("bonjour toi one");
});
btnObject.addEventListener("click", () => {
	cacheElements();
});
btnAppart.addEventListener("click", () => {
	console.log("bonjour toi deux");
});
btnHotel.addEventListener("click", () => {
	console.log("bonjour toi trois");
});

//  creation d'un autre btn qui a comme function 'menu'
// creation d'un objet Set pour chaque categorie
console.log(allImg);
console.log(allDiv[0]);
function cacheElements() {
	let myImgOne = document.getElementById(allImg[0]);
	myImgOne.style.display = "none";
	let myDivOne = document.querySelector("h3");
	let myDivTwo = document.querySelectorAll("h3")[1];
	myDivOne.style.display = "none";
	myDivTwo.style.display = "none";
}
