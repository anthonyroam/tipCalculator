const tipAccountText = document.querySelector("#tip__account");
const tipTotalText = document.querySelector("#tip__total");

const billInput = document.querySelector("#bill__input");
billInput.addEventListener("input", () => tipCalculator.calculate());

const tipInput = document.querySelector("#tip__input");
tipInput.addEventListener("input", () => tipCalculator.tip = tipInput.value / 100);

const peopleInput = document.querySelector("#people__input");
peopleInput.addEventListener("input", () => tipCalculator.calculate());

const resetButton = document.querySelector(".computation__button");
resetButton.addEventListener("click", () => tipCalculator.reset());

const buttons = document.querySelectorAll(".tip__button");
const buttonsArray = [...buttons];

const isClicked = button => button.className === "button tip__button active";

const toogleClickedButton = function (array) {
    const clickedButton = array.filter(isClicked);
    if (clickedButton[0] !== undefined) clickedButton[0].classList.toggle("active");
};

const buttonContainer = document.querySelector(".tip__container");
buttonContainer.addEventListener("click", e => {
    toogleClickedButton(buttonsArray);
    let buttonClicked = e.target;
    buttonClicked.classList.toggle("active");
    tipInput.value = "";
    tipCalculator.tip = buttonClicked.dataset.tip;
});

const parentPeopleInput = document.querySelector("#form__item--people");
const errorMessage = document.createElement("p");
errorMessage.setAttribute("class", "error");
errorMessage.innerText = "can't be zero";

const tipCalculator = {
    bill: "",
    people: "",
    _tip: 0,

    get tip() {
        return this._tip;
    },

    set tip(value) {
        this._tip = value;
        return this.calculate();
    },  

    calculate() {
        this.bill = billInput.value;
        this.people = peopleInput.value;
       
        if (this.people === "0") {
            peopleInput.classList.add("error__border");
            parentPeopleInput.insertBefore(errorMessage, peopleInput);
            return 
        } else {
            peopleInput.classList.remove("error__border");
            errorMessage.remove();
        }
        
        if (this.people === "") return;
        
        let tipAccount = (this.bill / this.people) * this._tip; 
        let tipTotal = (this.bill / this.people) + tipAccount;

        return this.renderResult(tipAccount, tipTotal);
    },

    renderResult(tipAccount, tipTotal) {
        tipAccountText.innerText = `$${this.getDisplayNumber(tipAccount)}`;
        tipTotalText.innerText = `$${this.getDisplayNumber(tipTotal)}`;
    },

    getDisplayNumber(number) {
        let fixedNumber = number.toFixed(2);
        let numberString = fixedNumber.toString();
        let numberDisplay = numberString.replace(/(\d)(?=(\d{3})+\b)/g,'$1,');
        return numberDisplay;
    },


    reset() {
        billInput.value = "";
        peopleInput.value = "";
        tipInput.value = "";
        this.tip = 0;
        this.renderResult(0,0);
        toogleClickedButton(buttonsArray);
    },
};