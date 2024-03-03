const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

// Error message
const showError = (field, parent, errMsg) => {
	parent.className = "form-field error";
	let allFieldsName = field.getAttribute("name");
	let small = parent.querySelector("small");
	if (small) {
		let firstUpperCase = `${allFieldsName.charAt(0).toUpperCase()}${allFieldsName.slice(1)}`
		small.innerHTML = `${firstUpperCase} ${errMsg}`;
		return;
	}
}
// Success message
const showSuccess = (field, parent) => {
	parent.className = "form-field success";
}
// Checking if any field is empty
const checkEmpty = (input) => {
	input.forEach((field) => {
		let parent = field.parentElement;
		let isRequired = 'is required';
		if (field.value.trim() === "") {
			showError(field, parent, isRequired);
		} else if (field.type === "email") {
			let validEmailmsg = 'is not valid, enter a valid email';
			if (!isValidEmail(field.value)) {
				showError(field, parent, validEmailmsg);
			} else {
				showSuccess(field, parent);
			}
		} else if (field.type === "password" && field.name === "confirm-password") {
			let passwordField = document.querySelector("input[name='password']");
			let cnfirmPasswordmsg = 'does not match';
			if (field.value !== passwordField.value) {
				showError(field, parent, cnfirmPasswordmsg);
			} else {
				showSuccess(field, parent);
			}
		} else if (field.type === "password") {
			let lengthMsg = "must be at least 6 characters long"
			if (field.value.length < 6) {
				showError(field, parent, lengthMsg);
			} else {
				showSuccess(field, parent);
			}
		} else {
			showSuccess(field, parent);
		}
	});
};


// Check email is valid
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}


// check form validtion start from here
firstForm.addEventListener("submit", function (e) {
	e.preventDefault();
	let input = firstForm.querySelectorAll("input");
	checkEmpty(input);

});

secondForm.addEventListener("submit", function (e) {
	// e.preventDefault();

	let input = secondForm.querySelectorAll("input");
	checkEmpty(input);
});