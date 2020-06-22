export default class LoginModel {
    constructor() {
        this.errors = {
            email: "Email is not valid",
            password: "Password length should be greater than 8",
            mismatch: "Incorrect login or password"
        }
        this.errorMessage = "";
    }

    validate(credential) {
        return this.isEmailValid(credential)
            && this.isPasswordValid(credential)
    }

    login(credentials) {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(credentials)
        }
        return fetch("/login", options)
            .then(res=>res.json())
            .then(data => {
                console.log(data);
                if (data.loginStatus) {
                    localStorage.setItem("login", "ok");
                } else {
                    this.setErrorMessage("mismatch");
                }
                return data
            })
    }

    logout() {
        localStorage.removeItem('login');
        console.log("sdsd");
    }

    isEmailValid(credential) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(credential.login) === false) {
            this.setErrorMessage("email");
            return false
        } else {
            return credential
        }
    }

    isPasswordValid(credential) {
        if (credential.password.length < 8) {
            this.setErrorMessage("password");
            return false
        } else {
            return credential
        }
    }

    setErrorMessage(msg) {
        this.errorMessage = this.errors[msg];
    }

    getErrorMessage() {
        return this.errorMessage
    }
}
 
