import {
	buildBtnCategorie,
	buildContenerCategories,
	styleBarreNavigation,
	styleContenerHeader,
	stylePublicationButton,
	styleEditionButton,
	styleBtnModifIntro,
	buildIcon,
	styleBtnModif,
	styleBtnArrowModale,
	styleHover,
} from "./stylesheet.js";
const body = document.querySelector("body");
const log = document.getElementById("login");
const logout = document.getElementById("logout");
const information = document.getElementById("info");
const sectionImages = document.querySelector(".gallery");
const sectionImagesModale = document.getElementById("gallery");
let arrayCategories = [];
let worksToDisplay = [];
const newCateModal = document.getElementById("pet-select");
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
styleHover(log);
styleHover(logout);
styleHover(information);
let data = window.localStorage.getItem("filter");
const creatCategories = document.querySelector(".categories");
const creatCateId = 0;
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

				const createOptionModal = document.createElement("option");
				newCateModal.appendChild(createOptionModal);
				createOptionModal.textContent = cate.name;
				createOptionModal.value = cate.id;
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
				title.textContent = img.title;
				creatImg.src = img.imageUrl;
				sectionImages.appendChild(creatDiv);
				creatDiv.appendChild(creatImg);
				creatDiv.appendChild(title);
				createAll.push(creatDiv);
			});
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
			title.textContent = img.title;
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
				title.textContent = img.title;
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

const btnAll = document.createElement("button");
creatCategories.appendChild(btnAll);
//Bouton Tous
btnAll.textContent = "Tous";
btnAll.style.order = -1;
buildBtnCategorie(btnAll);

// // creation click
btnAll.addEventListener("click", () => {
	sectionImages.innerHTML = "";
	getWorks();
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

const accessToken = localStorage.getItem("access_token");

if (accessToken != null) {
	creatCategories.style.display = "none";
	log.style.display = "none";
	logout.style.display = null;
	logout.addEventListener("click", () => {
		localStorage.clear();
	});

	// --------- barre modification ----------------
	const header = document.querySelector("header");
	const navModification = document.createElement("div");
	header.appendChild(navModification);
	styleBarreNavigation(navModification);
	styleContenerHeader(header);
	const icon = document.createElement("i");
	icon.classList.add("fa", "fa-edit");
	const editionMode = document.createElement("button");
	const publication = document.createElement("button");
	stylePublicationButton(publication);
	styleEditionButton(editionMode);
	editionMode.appendChild(icon);

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
						const id = img.id;
						console.log(img);
						supprElement(id);
					});
					sectionImagesModale.appendChild(creatDiv);
				});
			})
		);
	}
	callImagesModale();

	//creation function pour ouverture modale
	const modale = document.getElementById("modal1");
	const btnCloseModale = document.getElementById("close");
	const btnCheckAddImgModal = document.getElementById("check");
	const reloadModalImg = function () {
		// Supprimer les anciens éléments de la modal
		sectionImagesModale.innerHTML = "";
		callImagesModale();
	};
	const openModal = function () {
		modale.style.display = null;
		galleryModalClick.style.display = "none";
		btnCheckAddImgModal.style.display = "none";
		btnAddImg.style.display = null;
		divUploadImg.style.display = "none";
		reloadModalImg();
	};
	const closeModal = function () {
		modale.style.display = "none";
	};

	btnCloseModale.addEventListener("click", closeModal);

	async function supprElement(id) {
		await fetch(`http://localhost:5678/api/works/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					console.log("Suppression effectuée avec succès !");
					fetch("http://localhost:5678/api/works")
						.then((response) => response.json())
						.then((works) => {
							sectionImages.innerHTML = "";
							sectionImagesModale.innerHTML = "";
							callImagesModale();
							getWorks();
						});
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
	styleBtnModifIntro(btnModifIntro);
	description.style.display = "flex";
	description.style.flexWrap = "wrap";
	divForButton.style.width = "100%";
	const iconDescrip = document.createElement("i");
	iconDescrip.classList.add("fa", "fa-edit");
	iconDescrip.style.order = "-1";
	btnModifIntro.appendChild(iconDescrip);
	divForButton.appendChild(btnModifIntro);
	description.appendChild(divForButton);

	//------------mes Projets -----------
	const modification = document.getElementById("projet");
	modification.style.display = "flex";
	modification.style.justifyContent = "center";
	const iconElement = document.createElement("i");
	iconElement.classList.add("fa", "fa-edit");
	const btnModif = document.createElement("button");
	styleBtnModif(btnModif);
	btnModif.appendChild(iconElement);
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
		formModal.style.borderBottom = "1px solid grey";
		formModal.style.paddingBottom = "2rem";
		btnCheckAddImgModal.style.margin = "2rem";
		btnCheckAddImgModal.style.marginLeft = "4rem";
		btnCheckAddImgModal.style.position = "absolute";
		btnCheckAddImgModal.style.top = "31rem";
		galleryModalClick.style.width = "50%";
		galleryModalClick.style.height = "70%";
		galleryModalClick.appendChild(formModal);
		const btnArrowBackModal = document.createElement("button");
		styleBtnArrowModale(btnArrowBackModal);
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
			sectionImagesModale.innerHTML = "";
			reloadModalImg();
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

	// affiche l'image quand elle est selectonnée dans le modale
	const formAddImg = document.getElementById("form-modale");
	const divImgForm = document.getElementById("upload");
	divImgForm.addEventListener("change", async function (e) {
		let file = e.target.files;
		const fileLength = file.length;

		console.log(fileLength);
		if (fileLength > 0) {
			let imgUpload = document.createElement("img");

			imgUpload.classList.add("image-load");
			const imgSource = URL.createObjectURL(file[0]);
			imgUpload.src = imgSource;

			divImgForm.innerHTML = "";
			divImgForm.appendChild(imgUpload);
			imgUpload.style.maxHeight = "10rem;";
			console.log(imgUpload);
		}
	});

	// btnCheckAddImgModal.addEventListener("submit", async function (event) {
	const uploadImageElement = document.getElementById("upload-image");
	const addTextModal = document.getElementById("add-text-modal");
	const addIconModal = document.getElementById("add-icon-modal");
	const addFormatModal = document.getElementById("add-info-format");
	addFormatModal.textContent = "jpg, png : 4mo max";
	formAddImg.addEventListener("submit", async function (event) {
		event.preventDefault();
		const file = uploadImageElement.files[0];
		const newTitleModal = document.getElementById("name").value;
		const addCategorie = document.getElementById("pet-select").value;

		const formData = new FormData();
		formData.append("image", file);
		formData.append("title", newTitleModal);
		formData.append("category", addCategorie);

		await fetch("http://localhost:5678/api/works", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				sectionImages.innerHTML = "";
				getWorks();
				sectionImagesModale.innerHTML = "";
				callImagesModale();
				document.getElementById("name").value = ""; // Réinitialiser la valeur du champ de texte 'name'
				document.getElementById("pet-select").value = ""; // Réinitialiser la valeur du champ de sélection 'pet-select'
				divImgForm.innerHTML = "";
				divImgForm.appendChild(uploadImageElement);
				divImgForm.appendChild(addTextModal);
				divImgForm.appendChild(addIconModal);
				divImgForm.appendChild(addFormatModal);
			})
			.catch((error) => console.log(error.message));
	});
} else {
	console.log(localStorage);
}
