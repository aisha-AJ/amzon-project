import { renderOrderSummary } from "./checkoutes/orderSummary.js";
import { renderPaymentSummary } from "./checkoutes/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/car-class.js';
//import '../data/backend-practice.js';

loadProducts(() => {
 renderOrderSummary();
 renderPaymentSummary();

});

