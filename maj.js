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
} from "./stylesheet.js";
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
	console.log(accessToken);
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
		galleryModalClick.style.borderBottom = "1px solid grey";
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
	imgFormModal.addEventListener("change", async function (e) {
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
			imgUpload.style.maxHeight = "10rem;";
			console.log(imgUpload);

			// Utiliser FileReader pour lire le fichier
			const reader = new FileReader();
			reader.onload = async (event) => {
				const result = event.target.result;
				console.log(result);

				// Accéder aux propriétés des fichiers ici, par exemple :
				const inputFileTitle = document.getElementById("name");
				const inputFileImage = document.getElementById("upload");
				const fileTitle = inputFileTitle.files[0];
				const fileTImage = inputFileImage.files[0];

				const resultTitle = await read(fileTitle);
				const resultImage = await read(fileTImage);

				// Vérifier que tous les champs du formulaire sont remplis avant d'appeler addElementsModal
				if (resultTitle && resultImage) {
					// Appeler la fonction addElementsModal avec les résultats
					await addElementsModal(resultTitle, resultImage);
				}
			};

			reader.readAsDataURL(file[0]);
		}
	});

	// Fonction de lecture des fichiers
	const read = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => resolve(event.target.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});

	async function addElementsModal(resultTitle, resultImage) {
		const titre = document.getElementById("name").value;
		const imgUpload = document.getElementById("upload").value;
		await fetch(`http://localhost:5678/api/works`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ resultTitle, resultImage }),
		})
			.then((response) => response.json())
			.then((data) => {
				const imageElement = document.createElement("img");
				imageElement.src = data.image;

				const titreElement = document.createElement("h2");
				titreElement.textContent = data.titre;
				console.log(data);
				console.log("titre", titre);
				console.log("image", imgUpload);
				sectionImages.appendChild(titreElement);
				sectionImages.appendChild(imageElement);
			})
			.catch((error) => console.log(error.message));
	}

	// formElem.addEventListener("submit", function (e) {
	// 	e.preventDefault();

	// 	addElementsModal();
	// });

	btnCheckAddImgModal.addEventListener("click", () => {
		addElementsModal();
	});
} else {
	console.log(localStorage);
	console.log("non non");
}
