var Helpers = require('./../helpers');

describe('products page', function () {
    var helpers = new Helpers();
    var path = require('path');
    var productTitle = 'title' + +new Date();

    beforeEach(function () {
        helpers.get('product-list');
    });

    function getProductsCount() {
        return element.all(by.repeater('item in productsInterface.items'))
            .then(function (products) {
                return products.length;
            })
    }

    it('should show proper products amount', function () {

        // the default situation
        var itemsPerPage = element(by.model('itemsControl.itemsPerPage'));

        itemsPerPage.$('option:checked').getText().then(function (checkedValue) {
            expect(getProductsCount()).toBeLessThan(+checkedValue + 1);
        });

        // changing itemPerPage select option
        var newOptionValue = 2;
        itemsPerPage.element(by.cssContainingText('option', newOptionValue)).click();

        itemsPerPage.$('option:checked').getText().then(function (checkedValue) {
            expect(+checkedValue).toBe(newOptionValue);
            expect(getProductsCount()).toBeLessThan(newOptionValue + 1);
        });
    });

    it('should add product', function () {
        // adding a new product
        var btnAddProduct = element(by.css('a[ng-click="productsInterface.add()"]'));
        btnAddProduct.click();

        var productForm = element(by.name('productForm'));
        var modalTitle = productForm.element(by.css('input[type=text]'));
        var modalDesc = productForm.element(by.css('textarea'));
        var modalPrice = productForm.element(by.css('input[type=number]'));
        var modalFile = productForm.element(by.css('input[type=file]'));
        var modalBtnOk = productForm.element(by.buttonText("OK"));

        modalTitle.sendKeys(productTitle);
        modalDesc.sendKeys('desc');
        modalPrice.sendKeys(123);
        var fileToUpload = 'image.jpg';
        var absolutePath = path.resolve(__dirname + '/assets/', fileToUpload);
        modalFile.sendKeys(absolutePath);
        modalBtnOk.click();

        // product searching
        var search = element(by.model('itemsControl.search'));
        search.sendKeys(productTitle);
        expect(getProductsCount()).toBe(1);
    });

    it('should find product and remove it', function () {
        // product searching
        var search = element(by.model('itemsControl.search'));
        search.sendKeys(productTitle);
        expect(getProductsCount()).toBe(1);

        // remove product
        var btnDelete = element(by.css("button.btn-danger"));
        btnDelete.click();
        var deleteForm = element(by.name('deleteForm'));
        var modalDeleteBtnOk = deleteForm.element(by.buttonText("OK"));
        var modalReason = deleteForm.element(by.css('textarea'));
        modalReason.sendKeys('przyczyna');
        modalDeleteBtnOk.click();
        helpers.waitForAlert();
        expect(getProductsCount()).toBe(0);
    });

    it('should pagination work properly', function () {
        var expectedBricks = element(by.binding('productsInterface.items.length')).getText()
            .then(function (value) {
                var allItemsValue = value.match(/[0-9]/g).join('');
                var itemsPerPageSelect = element(by.model('itemsControl.itemsPerPage'));
                return itemsPerPageSelect.$('option:checked').getText()
                    .then(function (selectedOption) {
                        return Math.ceil(allItemsValue / selectedOption).toString();
                    })
            });

        var paginationBricks = element.all(by.repeater('page in pages track by $index'))
            .then(function (items) {
                return items.length;
            });

        element(by.cssContainingText('.pagination a', '...')).isPresent()
            .then(function (paginationLimit) {
                if (paginationLimit) {
                    paginationBricks.then(function (value) {
                        var num = value - 1;
                        expect(expectedBricks).toBeGreaterThan(num);
                    });
                } else {
                    paginationBricks.then(function (value) {
                        var num = value.toString();
                        expect(expectedBricks).toBe(num);
                    });

                }
            });
    });

});