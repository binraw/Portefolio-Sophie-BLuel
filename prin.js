let works = window.localStorage.getItem("tableau");
const body = document.querySelector("body");
const log = document.getElementById("login");
const information = document.getElementById("info");
const sectionImages = document.querySelector(".gallery");

// style background
body.style.backgroundColor = "#E5E5E5";
// style login lien et info
log.style.textDecoration = "none";
information.style.textDecoration = "none";
information.style.color = "black";
log.style.color = "black";

let data = window.localStorage.getItem("filter");
try {
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
			);
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
						creatImg.textContent = img.title;
						creatImg.src = img.imageUrl;
						const idImg = img.categoryId;
						creatDiv.setAttribute("id", "projet" + idImg);
						sectionImages.appendChild(creatDiv);
						creatDiv.appendChild(creatImg);
						creatDiv.appendChild(title);
						allImg.push(creatImg.id);
						allDiv.push(img.title);
						if (creatDiv.getAttribute("id") === "projet1") {
							newfilterObjet.push(creatDiv);
						}
						if (creatDiv.getAttribute("id") === "projet2") {
							newfilterAppart.push(creatDiv);
						}
						if (creatDiv.getAttribute("id") === "projet3") {
							newfilterRestaurant.push(creatDiv);
						}
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
				const idImg = img.categoryId;
				creatDiv.setAttribute("id", "projet" + idImg);
				//filteredImages.push(creatImg);
				title.textContent = img.title;
				creatImg.src = img.imageUrl;
				title.style.marginTop = "1rem";
				sectionImages.appendChild(creatDiv);
				creatDiv.appendChild(creatImg);
				creatDiv.appendChild(title);
				if (creatDiv.getAttribute("id") === "projet1") {
					newfilterObjet.push(creatDiv);
				}
				if (creatDiv.getAttribute("id") === "projet2") {
					newfilterAppart.push(creatDiv);
				}
				if (creatDiv.getAttribute("id") === "projet3") {
					newfilterRestaurant.push(creatDiv);
				}
			});
		}
	}

	//const filteredImages = [];
	const newfilterObjet = [];
	const newfilterAppart = [];
	const newfilterRestaurant = [];

	getCategories();
	callImages();

	//Création des buttons et effect click isoler
	const creatCategories = document.querySelector(".categories");
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

	// // creation click
	btnAll.addEventListener("click", () => {
		sectionImages.innerHTML = "";

		// Ajoutez les éléments de newfilterAppart à la section d'images
		newfilterObjet.forEach((img) => {
			sectionImages.appendChild(img);
		});
		newfilterAppart.forEach((img) => {
			sectionImages.appendChild(img);
		});
		newfilterRestaurant.forEach((img) => {
			sectionImages.appendChild(img);
		});
	});
	btnObject.addEventListener("click", () => {
		sectionImages.innerHTML = "";

		//  les éléments de newfilterObjet à la section d'images
		newfilterObjet.forEach((img) => {
			sectionImages.appendChild(img);
		});
	});
	btnAppart.addEventListener("click", () => {
		sectionImages.innerHTML = "";

		//  les éléments de newfilterAppart à la section d'images
		newfilterAppart.forEach((img) => {
			sectionImages.appendChild(img);
		});
	});
	btnHotel.addEventListener("click", () => {
		sectionImages.innerHTML = "";

		//  les éléments denewfilterRestaurant à la section d'images
		newfilterRestaurant.forEach((img) => {
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
} catch (error) {
	console.error(error);
}
