let works = window.localStorage.getItem("tableau");
const body = document.querySelector("body");
const log = document.getElementById("login");
const information = document.getElementById("info");
const sectionImages = document.querySelector(".gallery");
const sectionImagesModale = document.getElementById("gallery");

// style background
body.style.backgroundColor = "#E5E5E5";
// style login lien et info
log.style.textDecoration = "none";
information.style.textDecoration = "none";
information.style.color = "black";
log.style.color = "black";

let data = window.localStorage.getItem("filter");
const creatCategories = document.querySelector(".categories");
const creatCateId = 0;

async function getCategories() {
	if (data === null) {
		await fetch(`http://localhost:5678/api/categories`)
			.then((response) =>
				response.json().then((data) => {
					const valuesData = JSON.stringify(data);
					window.localStorage.setItem("filter", valuesData);
					data.forEach((cate) => {
						const creatCate = document.createElement("btn");
						creatCategories.appendChild(creatCate);
						creatCate.textContent = cate.name;
						const idCate = cate.id;
						creatCate.setAttribute("id", "projet" + idCate);
						creatCategories.style.display = "flex";
						creatCategories.style.width = "50%";
						creatCategories.style.marginLeft = "auto";
						creatCategories.style.marginRight = "auto";
						creatCategories.style.marginBottom = "1rem";
						creatCategories.style.justifyContent = "space-around";
						//boutons
						creatCate.style.border = "2px solid #1D6154";
						creatCate.style.color = "#1D6154";
						creatCate.style.width = "8rem";
						creatCate.style.borderRadius = "20px";
						creatCate.style.fontSize = "larger";
						creatCate.style.backgroundColor = "#E5E5E5";
						//eventListener
						creatCate.addEventListener("click", () => {
							sectionImages.innerHTML = "";
							if (idCate == "1") {
								newfilterObjet.forEach((img) => {
									sectionImages.appendChild(img);
								});
							} else if (idCate == "2") {
								newfilterAppart.forEach((img) => {
									sectionImages.appendChild(img);
								});
							} else if (idCate == "3") {
								sectionImages.innerHTML = "";
								newfilterRestaurant.forEach((img) => {
									sectionImages.appendChild(img);
								});
							}
						});

						//creation hover
						creatCate.addEventListener("mouseover", (event) => {
							event.target.style.backgroundColor = "#1D6154";
							event.target.style.color = "#E5E5E5";
						});
						// creation mouseout
						creatCate.addEventListener("mouseout", (event) => {
							event.target.style.backgroundColor = "#E5E5E5";
							event.target.style.color = "#1D6154";
						});
					});
				})
			)
			.catch((error) => console.error(error));
	} else {
		const dataArray = JSON.parse(data);
		const creatCategories = document.querySelector(".categories");
		dataArray.forEach((cate) => {
			const creatCate = document.createElement("button");
			creatCategories.appendChild(creatCate);
			creatCate.textContent = cate.name;
			const idCate = cate.id;
			creatCate.setAttribute("id", "projet" + idCate);
			console.log(creatCate);

			creatCategories.style.display = "flex";
			creatCategories.style.width = "50%";
			creatCategories.style.marginLeft = "auto";
			creatCategories.style.marginRight = "auto";
			creatCategories.style.marginBottom = "1rem";
			creatCategories.style.justifyContent = "space-around";
			//boutons
			creatCate.style.border = "2px solid #1D6154";
			creatCate.style.color = "#1D6154";
			creatCate.style.width = "8rem";
			creatCate.style.borderRadius = "20px";
			creatCate.style.fontSize = "larger";
			creatCate.style.backgroundColor = "#E5E5E5";
			// event click

			creatCate.addEventListener("click", () => {
				sectionImages.innerHTML = "";
				if (idCate == "1") {
					newfilterObjet.forEach((img) => {
						sectionImages.appendChild(img);
					});
				} else if (idCate == "2") {
					newfilterAppart.forEach((img) => {
						sectionImages.appendChild(img);
					});
				} else if (idCate == "3") {
					sectionImages.innerHTML = "";
					newfilterRestaurant.forEach((img) => {
						sectionImages.appendChild(img);
					});
				}
			});

			//creation hover
			creatCate.addEventListener("mouseover", (event) => {
				event.target.style.backgroundColor = "#1D6154";
				event.target.style.color = "#E5E5E5";
			});
			// creation mouseout
			creatCate.addEventListener("mouseout", (event) => {
				event.target.style.backgroundColor = "#E5E5E5";
				event.target.style.color = "#1D6154";
			});
		});
	}
}
const createAll = [];
async function callImages() {
	if (works === null) {
		await fetch("http://localhost:5678/api/works")
			.then((response) =>
				response.json().then((works) => {
					const valuesWorks = JSON.stringify(works);
					window.localStorage.setItem("tableau", valuesWorks);
					works.forEach((img) => {
						const creatImg = document.createElement("img");
						const creatDiv = document.createElement("div");
						const title = document.createElement("h3");
						creatImg.textContent = img.title;
						creatImg.src = img.imageUrl;
						const idImg = img.categoryId;
						const creatDivId = creatDiv.setAttribute("id", "projet" + idImg);
						creatDiv.setAttribute("id", "projet" + idImg);
						sectionImages.appendChild(creatDiv);
						creatDiv.appendChild(creatImg);
						creatDiv.appendChild(title);
						createAll.push(creatDiv);
						if (creatDivId == "projet1") {
							newfilterObjet.push(creatDiv);
						} else if (creatDivId == "projet2") {
							newfilterAppart.push(creatDiv);
						} else if (creatDivId == "projet3") {
							newfilterRestaurant.push(creatDiv);
						}
					});
				})
			)
			.catch((error) => console.error(error));
	} else {
		const worksArray = JSON.parse(works);
		const sectionImages = document.querySelector(".gallery");
		worksArray.forEach((img) => {
			const creatImg = document.createElement("img");
			const creatDiv = document.createElement("div");
			const title = document.createElement("h3");
			const idImg = img.categoryId;
			creatDiv.setAttribute("id", "projet" + idImg);
			title.textContent = img.title;
			creatImg.src = img.imageUrl;
			title.style.marginTop = "1rem";
			sectionImages.appendChild(creatDiv);
			creatDiv.appendChild(creatImg);
			creatDiv.appendChild(title);
			createAll.push(creatDiv);

			const creatDivId = creatDiv.getAttribute("id");

			if (creatDivId == "projet1") {
				newfilterObjet.push(creatDiv);
			} else if (creatDivId == "projet2") {
				newfilterAppart.push(creatDiv);
			} else if (creatDivId == "projet3") {
				newfilterRestaurant.push(creatDiv);
			}
		});
	}
}

const newfilterObjet = [];

const newfilterAppart = [];
const newfilterRestaurant = [];

//Création des buttons et effect click isoler

const btnObject = creatCategories.getElementsByTagName("button")[0];
const btnAppart = creatCategories.getElementsByTagName("button")[1];
const btnHotel = creatCategories.getElementsByTagName("button")[2];
const btnAll = document.createElement("button");
creatCategories.appendChild(btnAll);
//Bouton Tous
btnAll.textContent = "Tous";
btnAll.style.order = -1;
btnAll.style.border = "2px solid #1D6154";
btnAll.style.color = "#1D6154";
btnAll.style.width = "8rem";
btnAll.style.borderRadius = "20px";
btnAll.style.fontSize = "larger";
btnAll.style.backgroundColor = "#E5E5E5";
callImages();
getCategories();

// // creation click
btnAll.addEventListener("click", () => {
	sectionImages.innerHTML = "";

	createAll.forEach((img) => {
		sectionImages.appendChild(img);
	});
});

//creation hover
btnAll.addEventListener("mouseover", (event) => {
	event.target.style.backgroundColor = "#1D6154";
	event.target.style.color = "#E5E5E5";
});

// creation mouseout
btnAll.addEventListener("mouseout", (event) => {
	event.target.style.backgroundColor = "#E5E5E5";
	event.target.style.color = "#1D6154";
});

// creation de la fonction pour appeler les img dans la modale
const allImgModal = [];
async function callImagesModale() {
	await fetch("http://localhost:5678/api/works").then((response) =>
		response.json().then((works) => {
			works.forEach((img) => {
				const creatImg = document.createElement("img");
				const creatDiv = document.createElement("div");
				const title = document.createElement("h3");
				title.textContent = "editer";
				title.style.marginLeft = "1rem";

				creatImg.src = img.imageUrl;
				const idImg = img.categoryId;
				const creatDivId = creatDiv.setAttribute("id", "projet" + idImg);
				creatDiv.setAttribute("id", "projet" + idImg);
				creatImg.style.width = "4rem";
				creatImg.style.height = "6rem";
				creatImg.style.margin = ".3rem";
				creatDiv.appendChild(creatImg);
				creatDiv.appendChild(title);
				allImgModal.push(creatDiv);
				console.log(creatDiv);
			});
		})
	);
}
callImagesModale();
//creation function pour ouverture modale
const modale = document.getElementById("modal1");
const btnCloseModale = document.getElementById("close");

const openModal = function () {
	modale.style.display = null;
	sectionImagesModale.innerHTML = "";

	allImgModal.forEach((img) => {
		sectionImagesModale.appendChild(img);
	});
};
const closeModal = function () {
	modale.style.display = "none";
};

btnCloseModale.addEventListener("click", closeModal);

// controle de la connexion réaliser (savoir si le token est present)
// const urlParams = new URLSearchParams(window.location.search);
// const accessToken = urlParams.get("access_token");
const accessToken = localStorage.getItem("access_token");

if (accessToken != null) {
	console.log("bonjour sophie");
	console.log(localStorage);
	// --------- barre modification ----------------
	const header = document.querySelector("header");
	const navModification = document.createElement("div");
	header.appendChild(navModification);
	navModification.style.width = "100vw";
	navModification.style.order = "-1";
	navModification.style.display = "flex";
	navModification.style.justifyContent = "center";
	navModification.style.gap = "10px";
	navModification.style.background = "black";
	navModification.style.height = "4rem";

	header.style.display = "flex";
	header.style.flexWrap = "wrap";
	header.style.marginTop = "0";
	header.style.gap = "20px";
	header.style.justifyContent = "space-around";
	const icon = document.createElement("i");
	icon.classList.add("fa", "fa-edit");
	const editionMode = document.createElement("button");

	editionMode.textContent = "Mode édition";
	const publication = document.createElement("button");
	publication.textContent = "publier les changements";
	editionMode.style.color = "white";
	editionMode.style.backgroundColor = "black";
	editionMode.style.border = "0px";
	editionMode.style.margin = "10px";
	publication.style.border = "0px";
	publication.style.borderRadius = "60px";
	publication.style.padding = "10px";
	publication.style.margin = "15px";
	editionMode.appendChild(icon);
	editionMode.style.display = "flex";
	editionMode.style.alignItems = "center";
	editionMode.style.gap = "10px";
	icon.style.order = "-1";
	navModification.append(editionMode, publication);
	editionMode.addEventListener("click", openModal);
	window.onclick = function (event) {
		if (event.target == modale) {
			modale.style.display = "none";
		}
	};

	//----------- description
	const description = document.getElementById("introduction");
	const divForButton = document.createElement("div");
	const btnModifIntro = document.createElement("button");
	description.style.display = "flex";
	description.style.flexWrap = "wrap";
	btnModifIntro.textContent = "modifier";
	divForButton.style.width = "100%";
	btnModifIntro.style.display = "flex";
	btnModifIntro.style.width = "5rem";
	btnModifIntro.style.marginLeft = "3rem";
	btnModifIntro.style.alignSelf = "end";
	btnModifIntro.style.border = "0";
	btnModifIntro.style.gap = "10px";
	const iconDescrip = document.createElement("i");
	iconDescrip.classList.add("fa", "fa-edit");
	iconDescrip.style.order = "-1";
	btnModifIntro.appendChild(iconDescrip);

	btnModifIntro.style.backgroundColor = "rgb(229, 229, 229)";
	divForButton.appendChild(btnModifIntro);
	description.appendChild(divForButton);

	//------------mes Projets -----------
	const modification = document.getElementById("projet");
	modification.style.display = "flex";
	modification.style.justifyContent = "center";
	const iconElement = document.createElement("i");
	iconElement.classList.add("fa", "fa-edit");

	const btnModif = document.createElement("button");
	btnModif.textContent = "modifier";
	btnModif.style.width = "5rem";
	btnModif.style.marginLeft = "2rem";
	btnModif.style.border = "0";
	btnModif.style.backgroundColor = "rgb(229, 229, 229)";

	btnModif.appendChild(iconElement);
	btnModif.style.display = "flex";
	btnModif.style.alignItems = "center";
	btnModif.style.gap = "10px";
	iconElement.style.order = "-1";
	modification.append(btnModif);
} else {
	console.log(localStorage);
	console.log("non non");
}
