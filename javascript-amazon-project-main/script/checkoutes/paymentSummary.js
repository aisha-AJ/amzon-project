import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";


export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippimgPriceCents = 0;


    cart.forEach((cartItem) => {
     const Product = getProduct(cartItem.productId);
     productPriceCents += Product.priceCents * cartItem.quantity;

     const deliveryOPtion = getDeliveryOption(cartItem.deliveryOptionId);
     shippimgPriceCents += deliveryOPtion.priceCents;   
        
    });
    
    const totalBeforeTaxCents = productPriceCents + shippimgPriceCents;
    const texCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + texCents;

    const paymentSummaryHtml = `
       <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippimgPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formatCurrency(texCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    
    `;
    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHtml;



}