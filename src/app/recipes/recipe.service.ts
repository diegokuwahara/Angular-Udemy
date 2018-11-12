import { Recipe } from './recipe.model'
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-edit/shopping-list.service';

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            1,
            'A Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            2,
            'Another Test Recipe',
            'This is simply a test', 
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 2)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id: number){
        const recipe = this.recipes.find(
            (r) => {
                return r.id == id;
            }
        );
        return recipe;
    }

    updateRecipe(recipe: Recipe){
        let recipeInMem = this.recipes.find(
            (r) => {
                return r.id == recipe.id;
            }
        );
        if (recipeInMem){
            recipeInMem = recipe;
        }
    }

    deleteRecipe(id: number){
        const recipe = this.recipes.find(
            (r) => {
                return r.id == id;
            }
        );
        const index = this.recipes.indexOf(recipe);
        this.recipes.splice(index, 1);
    }

    sendIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.sendIngredients(ingredients);
    }
}