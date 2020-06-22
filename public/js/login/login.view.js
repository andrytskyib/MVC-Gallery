export default class LoginView {
    constructor() {
        this.email = document.getElementById("inputEmail");
        this.pas = document.getElementById("inputPassword");
        this.alertError = document.getElementById("alert");
        this.exit = document.getElementById("exit");
        this.logIn = document.getElementById("login-form");
    }

    getCredetntials() {
        return {
            login: this.email.value,
            password: this.pas.value
        }
    }

    showMsg(msg) {
        this.alertError.classList.remove("hide");
        this.alertError.innerHTML = msg;
    }

    hideMsg() {
        this.alertError.classList.add("hide");
    }

    showLogout() {
        this.exit.innerHTML = "Log out";
    }

    hideLogout() {
        this.exit.innerHTML = "Log in";
    }
}

    