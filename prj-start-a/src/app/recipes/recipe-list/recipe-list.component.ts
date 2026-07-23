import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This Is simply A Test', 'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Instant-Pot-Chicken-Marinara-with-Polenta-12.jpg?w=1200&q=82&fm=jpg&fit=crop&dm=1611333160&s=20a2c3364c075750a029157eeb07934e')
  ];
  constructor () { }
  ngOnInit() {

  }
}
