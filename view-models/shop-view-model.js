import Cart from "../models/cart.js";
import Product from "../models/product.js";
import ItemCategoryType from "../enums/item-category-type.js"

export default class ShopViewModel {
    constructor() {
        this.cart = new Cart();

        var productItems = document.getElementsByClassName("product-box__item");

        [...productItems].forEach(productItem => {
            var productButton = productItem.getElementsByClassName("product-box__btn")[0];
            productButton.onclick = this.addProduct.bind(null, productItem, this.cart);
        });

        var categorySelectorDiv = document.getElementsByClassName("category-select-box")[0];
        var categorySelector = categorySelectorDiv.getElementsByClassName("select-control")[0];

        categorySelector.onchange = this.filterProductsByCategory.bind(null, categorySelector, this);

        var priceSelectorDiv = document.getElementsByClassName("price-select-box")[0];
        var priceSelector = priceSelectorDiv.getElementsByClassName("select-control")[0];
        
        priceSelector.onchange = this.filterProductsByPrice.bind(null, priceSelector, categorySelector);

        var modalDialog = document.getElementsByClassName("modal__window")[0];
        var modalButton = modalDialog.getElementsByClassName("modal__send")[0];
        modalButton.onclick = this.onModalButtonSubmit.bind(null, modalDialog);

        var submitButton = document.getElementsByClassName("btn-check")[0];
        submitButton.onclick = this.submitOrder.bind(null, modalDialog);

        this.initTotalValues();
    }

    initTotalValues() {
        var totalProductsCount = document.getElementsByClassName("count__products")[0];
        totalProductsCount.innerText = this.cart.totalItemCount;
        
        var totalProductsPrice = document.getElementsByClassName("price__products")[0];
        totalProductsPrice.innerText = this.cart.totalPrice;
    }

    addProduct(productItem, cart) {
        var productCount = productItem.getElementsByClassName("qty__item")[0];
        var productName = productItem.getElementsByClassName("product-box__title")[0];
        var productPrice = productItem.getElementsByClassName("price__item")[0];

        var product = new Product(productName.innerText, +productPrice.innerText, +productCount.value);

        cart.addProduct(product);

        var totalProductsCount = document.getElementsByClassName("count__products")[0];
        totalProductsCount.innerText = cart.totalItemCount;

        var totalProductsPrice = document.getElementsByClassName("price__products")[0];
        totalProductsPrice.innerText = cart.totalPrice;
    }

    filterProductsByCategory(categorySelector, context) {
        var category = categorySelector.value;
        var productItems = document.getElementsByClassName("product-box__item");

        if (category == ItemCategoryType.ALL) {
            [...productItems].forEach(
                productItem => productItem.style.display = "flex"
            );

            return;
        }

        [...productItems].forEach(productItem => {
            if (productItem.classList.contains(category)) {
                productItem.style.display = "flex";
            } else {
                productItem.style.display = "none";
            }
        });

        var priceSelectorDiv = document.getElementsByClassName("price-select-box")[0];
        var priceSelector = priceSelectorDiv.getElementsByClassName("select-control")[0];

        context.filterProductsByPrice(priceSelector, categorySelector);
    }

    filterProductsByPrice(priceSelector, categorySelector) {
        var price = +priceSelector.value;
        var productItems = document.getElementsByClassName("product-box__item");

        var category = categorySelector.value;

        var filteredByCategoryProducts = category == "all"
            ? [...productItems]
            : [...productItems].filter(productItem => productItem.classList.contains(category));

        if (price == 0) {
            filteredByCategoryProducts.forEach(
                productItem => productItem.style.display = "flex"
            );
                
            return;
        }

        filteredByCategoryProducts.forEach(productItem => {
            var productPrice = productItem.getElementsByClassName("price__item")[0];

            if (+productPrice.innerText <= price) {
                productItem.style.display = "flex";
            } else {
                productItem.style.display = "none";
            }
        });
    }

    submitOrder(modalWindow) {
        modalWindow.showModal();
    }

    onModalButtonSubmit(modalWindow) {
        var modalForm = modalWindow.getElementsByClassName("modal__form")[0];

        if (modalForm.checkValidity()) {
            alert("Thank you for the order!");
            modalWindow.close();
        }
    }

    static createNew() {
        return new ShopViewModel();
    }
}

ShopViewModel.createNew();