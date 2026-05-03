import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private apiUrl =
    'http://localhost:4000/recetas';


  constructor(
    private http:
    HttpClient
  ) {}


  getRecetas():
  Observable<any> {

    return this.http.get(
      this.apiUrl
    );

  }

}
