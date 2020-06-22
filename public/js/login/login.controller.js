export default class LoginController {
    constructor(model, view, utils) {
        this.model = model;
        this.view = view;
        this.utils = utils;
        this.init();
    }

    loginHandler(e) {
        e.preventDefault();
        let credentials = this.view.getCredetntials();
        if (this.model.validate(credentials)) {
            this.model.login(credentials).then(
                data => {
                    if (data.loginStatus) {
                        this.view.hideMsg();
                        this.view.showLogout();
                        this.utils.navigateTo("gallery");
                    } else {
                        this.view.showMsg(this.model.getErrorMessage());
                    }
                }
            )
        } else {
            this.view.showMsg(this.model.getErrorMessage());
        }
    }

    logOutHandler() {
        this.view.hideLogout();
        this.model.logout();
        this.utils.navigateTo("");
    }

    initListeners() {
        this.view.logIn.addEventListener("submit", this.loginHandler.bind(this));
        this.view.exit.addEventListener("click", this.logOutHandler.bind(this));
    }

    init() {
        let isLoged = localStorage.getItem("login");
        if (isLoged) {
            this.view.showLogout();
        }
        this.initListeners()
    }
}
