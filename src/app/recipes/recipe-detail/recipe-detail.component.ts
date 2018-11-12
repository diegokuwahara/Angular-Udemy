import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(id);

    this.route.params
      .subscribe(
        (params: Params) => {
          this.recipe = this.recipeService.getRecipe(+params['id']);
        }
      )
  }

  sendIngredientsToShoppingList(){
    this.recipeService.sendIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(["/shopping-list"]);
  }

}
