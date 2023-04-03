const body = document.querySelector("body");
const log = document.getElementById("login");
const logout = document.getElementById("logout");
const information = document.getElementById("info");
const sectionImages = document.querySelector(".gallery");
const sectionImagesModale = document.getElementById("gallery");
let arrayCategories = [];
let worksToDisplay = [];
// style background
body.style.backgroundColor = "#E5E5E5";
// style login lien et info
log.style.textDecoration = "none";
logout.style.textDecoration = "none";
logout.style.display = "none";
information.style.textDecoration = "none";
information.style.color = "black";
log.style.color = "black";
logout.style.color = "black";

let data = window.localStorage.getItem("filter");
const creatCategories = document.querySelector(".categories");
const creatCateId = 0;
function buildContenerCategories(e) {
	e.style.display = "flex";
	e.style.width = "50%";
	e.style.marginLeft = "auto";
	e.style.marginRight = "auto";
	e.style.marginBottom = "1rem";
	e.style.justifyContent = "space-around";
	e.style.alignItems = "center";
}

function buildBtnCategorie(e) {
	e.style.border = "2px solid #1D6154";
	e.style.color = "#1D6154";
	e.style.width = "auto";
	e.style.padding = ".5rem";
	e.style.borderRadius = "20px";
	e.style.fontSize = "larger";
	e.style.backgroundColor = "#E5E5E5";
}

async function getCategories() {
	await fetch(`http://localhost:5678/api/categories`).then((response) =>
		response.json().then((data) => {
			arrayCategories = data;

			data.forEach((cate) => {
				const creatCate = document.createElement("btn");
				creatCategories.appendChild(creatCate);
				creatCate.textContent = cate.name;
				const idCate = cate.id;
				creatCate.setAttribute("id", idCate);
				//contener Categorie
				buildContenerCategories(creatCategories);
				//boutons

				buildBtnCategorie(creatCate);
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

				// écouteur sur les boutons filtres
				creatCate.addEventListener("click", () => {
					generateWorksToDisplay(idCate);
				});
			});
		})
	);
}
const createAll = [];
async function getWorks() {
	await fetch(`http://localhost:5678/api/works`).then((response) =>
		response.json().then((works) => {
			worksToDisplay = works;
			works.forEach((img) => {
				const creatImg = document.createElement("img");
				const creatDiv = document.createElement("div");
				const title = document.createElement("h3");
				creatImg.textContent = img.title;
				creatImg.src = img.imageUrl;
				const idImg = img.categoryId;
				sectionImages.appendChild(creatDiv);
				creatDiv.appendChild(creatImg);
				creatDiv.appendChild(title);
				createAll.push(creatDiv);
				console.log(idImg);
			});
			// Génération
		})
	);
}

function generateWorksToDisplay(categoryId = null) {
	sectionImages.innerHTML = "";
	if (categoryId === null) {
		worksToDisplay.forEach((img) => {
			const creatImg = document.createElement("img");
			const creatDiv = document.createElement("div");
			const title = document.createElement("h3");
			creatImg.textContent = img.title;
			creatImg.src = img.imageUrl;
			sectionImages.appendChild(creatDiv);
			creatDiv.appendChild(creatImg);
			creatDiv.appendChild(title);
			createAll.push(creatDiv);
		});
	} else {
		worksToDisplay.forEach((img) => {
			if (img.categoryId == categoryId) {
				const creatImg = document.createElement("img");
				const creatDiv = document.createElement("div");
				const title = document.createElement("h3");
				creatImg.textContent = img.title;
				creatImg.src = img.imageUrl;
				sectionImages.appendChild(creatDiv);
				creatDiv.appendChild(creatImg);
				creatDiv.appendChild(title);
				createAll.push(creatDiv);
			}
		});
	}
}

getWorks();
getCategories();
console.log(worksToDisplay);
const btnAll = document.createElement("button");
creatCategories.appendChild(btnAll);
//Bouton Tous
btnAll.textContent = "Tous";
btnAll.style.order = -1;
buildBtnCategorie(btnAll);

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
function buildIcon(e) {
	e.textContent = "delete";
	e.classList.add("material-icons");
	e.style.backgroundColor = "black";
	e.style.color = "white";
	e.style.fontSize = "16px";
	e.style.position = "absolute";
	e.style.top = "5px";
	e.style.right = "5px";
	e.setAttribute("id", "delete");
}
const accessToken = localStorage.getItem("access_token");

if (accessToken != null) {
	creatCategories.style.display = "none";
	log.style.display = "none";
	logout.style.display = null;
	logout.addEventListener("click", () => {
		localStorage.clear();
	});

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
					creatDiv.id = idImg;
					creatDiv.setAttribute("id", "projet" + idImg);
					creatImg.style.width = "4rem";
					creatImg.style.height = "6rem";
					creatImg.style.margin = ".3rem";
					creatDiv.style.position = "relative";
					const iconPoubelle = document.createElement("i");
					buildIcon(iconPoubelle);
					creatDiv.appendChild(iconPoubelle);
					creatDiv.appendChild(creatImg);
					creatDiv.appendChild(title);
					allImgModal.push(creatDiv);
					//click pour suppr l'image
					iconPoubelle.addEventListener("click", () => {
						const id = creatDiv.id;
						supprElement(id);
						creatDiv.remove();
					});
				});
			})
		);
	}
	callImagesModale();

	//creation function pour ouverture modale
	const modale = document.getElementById("modal1");
	const btnCloseModale = document.getElementById("close");
	const btnCheckAddImgModal = document.getElementById("check");
	const openModal = function () {
		modale.style.display = null;
		galleryModalClick.style.display = "none";
		btnCheckAddImgModal.style.display = "none";
		btnAddImg.style.display = null;

		divUploadImg.style.display = "none";
		sectionImagesModale.innerHTML = "";

		allImgModal.forEach((img) => {
			sectionImagesModale.appendChild(img);
		});
	};
	const closeModal = function () {
		modale.style.display = "none";
	};

	btnCloseModale.addEventListener("click", closeModal);

	async function supprElement(id) {
		const newId = id.replace("projet", "");

		await fetch(`http://localhost:5678/api/works/${Number(newId)}`, {
			method: "DELETE",

			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					console.log("Suppression effectuée avec succès !");
				} else {
					console.log("Une erreur s'est produite lors de la suppression.");
				}
			})
			.catch((error) => {
				console.log("Une erreur s'est produite: ", error);
			});
	}
	editionMode.addEventListener("click", openModal);
	// fonction qui permet le clic en dehors de la modale et la fermeture
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

	// recuperation du click ajouter pour changer la modale
	const btnAddImg = document.getElementById("ajout");
	const galleryModal = document.getElementById("gallery");
	const galleryModalClick = document.getElementById("gallery-modale-click");
	const titleContenerModal = document.getElementById("title-modale");
	const formModal = document.getElementById("form-modale");
	const divUploadImg = document.getElementById("upload");
	galleryModalClick.style.width = "90%";
	function createObjtModale() {
		galleryModal.style.display = "none";
		galleryModalClick.style.borderBottom = "1px solid grey";
		galleryModalClick.style.width = "50%";
		galleryModalClick.style.height = "70%";

		galleryModalClick.appendChild(formModal);

		const btnArrowBackModal = document.createElement("button");
		btnArrowBackModal.style.position = "absolute";
		btnArrowBackModal.style.top = "1.3rem";
		btnArrowBackModal.style.left = "2rem";
		btnArrowBackModal.style.backgroundColor = "white";
		btnArrowBackModal.style.border = "0";
		const arrowBackModal = document.createElement("i");
		arrowBackModal.classList.add("material-icons");
		arrowBackModal.textContent = "arrow_back";
		btnArrowBackModal.appendChild(arrowBackModal);
		galleryModalClick.appendChild(btnArrowBackModal);
		btnArrowBackModal.addEventListener("click", () => {
			galleryModalClick.style.display = "none";
			btnAddImg.style.display = null;
			divUploadImg.style.display = "none";
			btnCheckAddImgModal.style.display = "none";
			sectionImagesModale.style.display = null;
			btnAddImg.textContent = "Ajouter une photo";
			btnAddImg.style.backgroundColor = "#1d6154";
			titleContenerModal.textContent = "Galerie photo";
		});
	}
	let modalCreated = false;
	function changeModal() {
		if (!modalCreated) {
			createObjtModale();
			modalCreated = true;
			galleryModalClick.style.display = null;
			btnCheckAddImgModal.style.display = null;

			titleContenerModal.textContent = "Ajout photo";
			divUploadImg.style.display = null;
		} else {
			galleryModal.style.display = "none";
			galleryModalClick.style.display = "block";
			titleContenerModal.textContent = "Ajout photo";
			divUploadImg.style.display = null;
			galleryModalClick.style.display = null;
			btnCheckAddImgModal.style.display = null;
		}
	}
	btnAddImg.addEventListener("click", () => {
		changeModal();
		btnAddImg.style.display = "none";
	});

	const formAddImg = document.getElementById("form-modale");
	formAddImg.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(formAddImg);
		const data = Object.fromEntries(formData);
		console.log(data);
	});
	console.log(data);

	// affiche l'image quand elle est selectonnée dans le modale
	let imgFormModal = document.getElementById("upload-image");
	imgFormModal.addEventListener("change", function (e) {
		let newReader = new FileReader();
		let file = e.target.files;
		const fileLength = file.length;

		console.log(fileLength);
		if (fileLength > 0) {
			let imgUpload = document.createElement("img");

			imgUpload.classList.add("image-load");
			const imgSource = URL.createObjectURL(file[0]);
			imgUpload.src = imgSource;

			let divImgForm = document.getElementById("upload");
			divImgForm.innerHTML = "";
			divImgForm.appendChild(imgUpload);
			imgUpload.style.maxHeight = " 10rem;";
			console.log(imgUpload);
			newReader.readAsDataURL(file[0]);
		}
	});
	const formElem = document.getElementById("form-modale");
	console.log(formElem);

	async function addElementsModal() {
		const preload = new FormData(formElem);
		await fetch(`http://localhost:5678/api/works`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: preload,
		})
			.then((res) => console.log(res.json()))
			.then((data) => console.log(data))
			.catch((error) => console.log(error.message));
	}

	formElem.addEventListener("submit", function (e) {
		e.preventDefault();
	});

	btnCheckAddImgModal.addEventListener("click", addElementsModal);
} else {
	console.log(localStorage);
	console.log("non non");
}
