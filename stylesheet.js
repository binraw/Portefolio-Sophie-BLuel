export function buildContenerCategories(e) {
	e.style.display = "flex";
	e.style.width = "50%";
	e.style.marginLeft = "auto";
	e.style.marginRight = "auto";
	e.style.marginBottom = "1rem";
	e.style.justifyContent = "space-around";
	e.style.alignItems = "center";
}

export function buildBtnCategorie(e) {
	e.style.border = "2px solid #1D6154";
	e.style.color = "#1D6154";
	e.style.width = "auto";
	e.style.padding = ".5rem";
	e.style.borderRadius = "20px";
	e.style.fontSize = "larger";
	e.style.backgroundColor = "#E5E5E5";
}

export function styleBarreNavigation(e) {
	e.style.width = "100vw";
	e.style.order = "-1";
	e.style.display = "flex";
	e.style.justifyContent = "center";
	e.style.gap = "10px";
	e.style.background = "black";
	e.height = "4rem";
}
export function styleContenerHeader(e) {
	e.style.display = "flex";
	e.style.flexWrap = "wrap";
	e.style.marginTop = "0";
	e.style.gap = "20px";
	e.style.justifyContent = "space-around";
}

export function stylePublicationButton(e) {
	e.textContent = "publier les changements";
	e.style.border = "0px";
	e.style.borderRadius = "60px";
	e.style.padding = "10px";
	e.style.margin = "15px";
}
export function styleEditionButton(e) {
	e.textContent = "Mode édition";
	e.style.color = "white";
	e.style.backgroundColor = "black";
	e.style.border = "0px";
	e.style.margin = "10px";
	e.style.display = "flex";
	e.style.alignItems = "center";
	e.style.gap = "10px";
}
export function styleBtnModifIntro(e) {
	e.textContent = "modifier";
	e.style.display = "flex";
	e.style.width = "5rem";
	e.style.marginLeft = "3rem";
	e.style.alignSelf = "end";
	e.style.border = "0";
	e.style.gap = "10px";
	e.style.backgroundColor = "rgb(229, 229, 229)";
}
export function buildIcon(e) {
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

export function styleBtnModif(e) {
	e.textContent = "modifier";
	e.style.width = "5rem";
	e.style.marginLeft = "2rem";
	e.style.border = "0";
	e.style.backgroundColor = "rgb(229, 229, 229)";
	e.style.display = "flex";
	e.style.alignItems = "center";
	e.style.gap = "10px";
}

export function styleBtnArrowModale(e) {
	e.style.position = "absolute";
	e.style.top = "1.3rem";
	e.style.left = "2rem";
	e.style.backgroundColor = "white";
	e.style.border = "0";
}
export function styleHover(e) {
	e.addEventListener("mouseover", () => {
		e.style.color = "#b1663c";
	});
	e.addEventListener("mouseout", () => {
		e.style.color = "black";
	});
}
