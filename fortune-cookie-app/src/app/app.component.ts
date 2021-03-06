import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {Product} from "./shared/product";
import {ProductService} from "./shared/product.service";
import {ShoppingCartService} from "./shared/shopping-cart.service";
import {FulfillmentService} from "./shared/fulfillment.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private fulfillmentService: FulfillmentService,
              private notificationService: ToastsManager,
              private vref: ViewContainerRef) {
    this.notificationService.setRootViewContainerRef(vref)
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => this.products = products);
  }

  addToCart(product: Product): void {
    this.shoppingCartService.addProduct(product);
  }

  checkout(shoppingCart): void {
    this.fulfillmentService.checkout(shoppingCart).subscribe(response => {
      this.notificationService.success("Shopping Cart successfully submitted!");
      this.shoppingCartService.resetShoppingCart();
      this.products = [];
    }, error => {
      this.notificationService.error("Ooops ... some error occured while submitting your shopping cart.")
    });

  }


}
