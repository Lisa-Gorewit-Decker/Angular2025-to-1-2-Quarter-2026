import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredients/ingredient.model';
import { RecipesComponent } from '../recipes/recipes.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] =  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 8),
    new Ingredient('Honey', 5),
  ];
  constructor() { }
  ngOnInit() {
  }
}
