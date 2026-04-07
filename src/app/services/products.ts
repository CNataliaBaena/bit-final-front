import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:4000/recipes';

  getAllProducts() {
    return this.httpClient.get(this.apiUrl);
  }
}
