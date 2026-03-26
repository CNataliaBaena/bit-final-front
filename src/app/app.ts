import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Cupcake {
  _id?: string;
  name: string;
  description: string;
  price: number;
  ingredients: string;
  instructions: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {

  apiUrl = 'http://localhost:4000/recipes';

  cupcakes: Cupcake[] = [];

  cupcake: Cupcake = {
    name: '',
    description: '',
    price: 0,
    ingredients: '',
    instructions: ''
  };

  editMode = false;
  editId = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get<Cupcake[]>(this.apiUrl)
      .subscribe(data => this.cupcakes = data);
  }

  save() {
    if (this.editMode) {
      this.http.put(`${this.apiUrl}/${this.editId}`, this.cupcake)
        .subscribe(() => {
          this.reset();
          this.load();
        });
    } else {
      this.http.post(this.apiUrl, this.cupcake)
        .subscribe(() => {
          this.reset();
          this.load();
        });
    }
  }

  edit(c: Cupcake) {
    this.cupcake = { ...c };
    this.editMode = true;
    this.editId = c._id!;
  }

  delete(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => this.load());
  }

  reset() {
    this.cupcake = {
      name: '',
      description: '',
      price: 0,
      ingredients: '',
      instructions: ''
    };
    this.editMode = false;
    this.editId = '';
  }
}