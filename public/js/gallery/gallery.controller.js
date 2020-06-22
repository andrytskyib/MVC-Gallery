export default class GalleryController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    createItem(e) {
        e.preventDefault();

        this.model.createItem(this.view.buildCreatedCard())
            .then(() => {
                this.model.initComponent()
                    .then(() => {
                        this.view.addCardToHtml(this.model.card)
                    })
            })
        this.closeModal(this.view.modalCreate)
    }

    updateItem(e) {
        e.preventDefault();

        this.model.updateItem(this.view.buildEditedCard(this.model.list, this.model.carId))
            .then(() => {
                this.model.initComponent()
                    .then(() => {
                        this.view.addCardToHtml(this.model.card)
                    })
            })

        this.closeModal(this.view.modalEdit)
    }

    deleteItem(e) {
        if (e.target.classList.contains("btn-danger")) {
            this.model.deleteItem()
                .then(() => {
                    this.model.initComponent()
                        .then(() => {
                            this.view.addCardToHtml(this.model.card)
                        })
                })
        }
    }

    closeModal(modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal')
        modal.setAttribute('style', 'display: none');

        document.body.removeChild(this.view.modalBackdrop[0]);
        document.body.classList.remove("modal-open");
    }

    sortGallery() {
        let type = this.view.selectorType.value;
        let gallery = this.model.sortedGalleryToShow(type);
        this.view.result.innerHTML = "";
        this.view.createTemplatedCard(gallery);
    }

    initListeners() {
        this.view.result.addEventListener("click", this.model.findIdOfCard.bind(this.model));
        this.view.formCreate.addEventListener("submit", this.createItem.bind(this));
        this.view.formEdit.addEventListener("submit", this.updateItem.bind(this));
        this.view.result.addEventListener("click", this.deleteItem.bind(this));
        this.view.selectorType.addEventListener("change", this.sortGallery.bind(this));
    }


    init() {
        this.model.initComponent()
            .then(() => {
                this.view.addCardToHtml(this.model.card)
            })
        this.initListeners();
    }
}

