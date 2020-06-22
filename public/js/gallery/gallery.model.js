export default class GalleryModel {
    constructor() {
        this.list = null;
        this.card = [];
        this.carId = null;
    }

    prepareData(data) {
        this.card = data.map((item) => {
            return {
                id: item.id,
                name: item.name[0].toUpperCase() + item.name.slice(1).toLowerCase(),
                url: item.url,
                description: item.description.substr(0, 15).concat(" ..."),
                date: moment(item.date).format("YYYY/MM/DD"),
                dateToSort: item.date
            }
        });
    }

    getDESCSortedName() {
        return this.card.sort(function (a, b) {
            if (b.name < a.name) {
                return 1
            } else {
                return -1
            }
        });
    }

    getASCSortedName() {
        return this.card.sort(function (a, b) {
            if (a.name < b.name) {
                return 1
            } else {
                return -1
            }
        });
    }

    getDESCSortedDate() {
        return this.card.sort(function (a, b) {
            if (b.dateToSort < a.dateToSort) {
                return 1
            } else {
                return -1
            }
        });
    }

    getASCSortedDate() {
        return this.card.sort(function (a, b) {
            if (a.dateToSort < b.dateToSort) {
                return 1
            } else {
                return -1
            }
        });
    }

    sortedGalleryToShow(type) {
        switch (type) {
            case "1":
                return this.getDESCSortedName();
            case "2":
                return this.getASCSortedName();
            case "3":
                return this.getASCSortedDate();
            case "4":
                return this.getDESCSortedDate();
            default:
                return this.card;
        }
    }

    createItem(data) {
        return fetch("/cars", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(responce => responce.json())
    }

    findIdOfCard(e) {
        if (e.target.classList.contains("edit") || e.target.classList.contains("btn-danger")) {
            this.carId = e.target.parentElement.id;
        }
    }

    updateItem(data) {
        return fetch(`http://localhost:3000/cars/${this.carId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(responce => responce.json())
    }

    deleteItem() {
        return fetch(`http://localhost:3000/cars/${this.carId}`, {method: 'DELETE'})
    }

    initComponent() {
        return fetch("/cars")
            .then(responce => responce.json())
            .then(data => {
                this.list = data;
                return data;
            })
            .then(data => {
                this.prepareData(data);
            })
    }
}
