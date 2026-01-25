import { renderOrderSummary } from "../../script/checkoutes/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe('test Suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    // Setup before each individual test
    beforeEach(() => {
        // Mock localStorage.setItem so we don't actually write to disk
        spyOn(localStorage, 'setItem');

        // Create the test container in the DOM
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        // Mock localStorage.getItem to return our fake cart
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                { productId: productId1, quantity: 2, deliveryOptionId: '1' },
                { productId: productId2, quantity: 1, deliveryOptionId: '2' }
            ]);
        });

        loadFromStorage();
    });

    // Cleanup after each test
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart correctly', () => {
        renderOrderSummary();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });

    it('removes a product from the display and cart', () => {
        renderOrderSummary();

        // Simulate clicking delete
        // In your test file
      document.querySelector(`.js-delete-link[data-product-id="${productId1}"]`).click();

        // Check DOM updates
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toBeNull();
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toBeNull();

        // Check Data updates
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
    
});