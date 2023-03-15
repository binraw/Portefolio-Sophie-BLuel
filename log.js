const form = document.getElementById("contact");
const log = document.getElementById("login");
const memo = document.getElementById("memorie");
const email = document.getElementById("email");
const information = document.getElementById("info");
const userPassword = document.getElementById("userPasseword");
log.style.textDecoration = "none";
information.style.textDecoration = "none";
information.style.color = "black";
log.style.color = "black";
memo.style.textDecoration = "none";
memo.style.color = "black";

form.addEventListener("submit", (event) => {
	event.preventDefault(); // Empêche la soumission par défaut du formulaire

	const emailValue = document.getElementById("email").value;
	const password = document.getElementById("userPasseword").value;

	fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: emailValue,
			password: password,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			// Stocker le jeton d'accès dans le stockage local ou les cookies
			localStorage.setItem("access_token", data.access_token);
			// Rediriger l'utilisateur vers la page d'accueil
			window.location.href =
				"/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
		})
		.catch((error) => console.error(error));
});
