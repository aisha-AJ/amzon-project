import { renderOrderSummary } from "./checkoutes/orderSummary.js";
import { renderPaymentSummary } from "./checkoutes/paymentSummary.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/car-class.js';
//import '../data/backend-practice.js';

async function loadPage() {
    console.log('loadPage');
    
    try{
        await loadProductsFetch();

    const value = await new Promise((resolve) => {
        loadCart(() => {
         resolve('value3');
        });
    });
    } catch (error) {
        console.log('unexpected error. please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();


    return 'value2'
}
loadPage();
/*

Promise.all([
  loadProductsFetch(),
   new Promise((resolve) => {
        loadCart(() => {
         resolve();
        });
    })


]).then(() =>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/



/*
new Promise((resolve) => {
    loadProducts(() => {
        
        resolve('value1');
    });
    
}).then((value) => {
 console.log(value);


    return new Promise((resolve) => {
        loadCart(() => {
         resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

     

/*

loadProducts(() => {
    loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    })
 

});
*/
