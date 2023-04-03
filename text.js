const arrayCategories = [];
const worksToDisplay = [];

getCategories();
getWorks();

async function getWorks() {
	await fetch(`http://localhost:5678/api/works`).then((response) =>
		response.json().then((data) => {
			worksToDisplay = data;

			// Génération
			generateWorksToDisplay();
		})
	);
}

async function getCategories() {
	await fetch(`http://localhost:5678/api/categories`).then((response) =>
		response.json().then((data) => {
			arrayCategories = data;

			data.forEach((cate) => {
				// Génération de tes boutons filtres

				// écouteur sur les boutons filtres
				creatCate.addEventListener("click", () => {
					generationCategories(cate.id);
				});
			});
		})
	);
}

function generateWorksToDisplay(categoryId = null) {
	if (categoryId === null) {
		worksToDisplay.forEach((work) => {
			// Génération des travaux à afficher ( l.150 / l.161 )
		});
	} else {
		worksToDisplay.forEach((work) => {
			if (work.categoryId === categoryId) {
				// Génération des travaux à afficher ( l.150 / l.161 )
			}
		});
	}
}
