export default class GalleryView {
    constructor() {
        this.result = document.getElementById("result");
        this.selectorType = document.getElementById("line-selector");

        this.modalCreate = document.getElementById("modalCreate");
        this.formCreate = document.getElementById("formCreate");
        this.inputCreateName = document.getElementById("inputCreateName");
        this.inputCreateDesc = document.getElementById("inputCreateDesc");
        this.inputCreateURL = document.getElementById("inputCreateURL");
        this.inputCreateDate = document.getElementById("inputCreateDate");

        this.modalEdit = document.getElementById("modalEdit");
        this.formEdit = document.getElementById("formEdit");
        this.inputEditName = document.getElementById("inputEditName");
        this.inputEditDesc = document.getElementById("inputEditDesc");
        this.modalBackdrop =  document.getElementsByClassName('modal-backdrop');
    }

    createTemplatedCard(card) {
        let resultHTML = '';
        card.forEach(item => {
            let secondItemTemplate =
                `<div class="col-md-4">
					<div class="card mb-4 box-shadow">
	            	<img src="${item.url}" alt="${item.name}" class="card-img-top" style="height: 225px; width: 100%; display: block;">\
	            	<div class="card-body">
	                	<h5 class="card-title">${item.name}</h5>
						<div class="text-muted top-padding">${item.description}</div>
						<div class="d-flex justify-content-between align-items-center flex-wrap">
							<div class="btn-group" id="${item.id}">
                    			<button type="button" class="btn btn-outline-secondary edit" data-toggle="modal"
                                data-target="#modalEdit">Edit</button>
								<button class="button btn btn-danger">Delete</button>
							</div>
							<small class="text-muted">${item.date}</small>
						</div>
					</div>
				</div></div>`;

            resultHTML += secondItemTemplate
        });

        this.result.innerHTML += resultHTML;
    }

    addCardToHtml(card) {
        this.result.innerHTML = "";
        this.createTemplatedCard(card);
    }

    buildCreatedCard() {
        return {
            url: this.inputCreateURL.value,
            name: this.inputCreateName.value,
            description: this.inputCreateDesc.value,
            date: Number(moment(this.inputCreateDate.value).format("x")),
            id: uuidv4()
        }
    }

    buildEditedCard(list, carId) {
        return {
            url: list[carId - 1].url,
            name: this.inputEditName.value,
            description: this.inputEditDesc.value,
            date: list[carId - 1].date
        }
    }
}

