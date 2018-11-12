import { Ingredient } from './../../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from '../../../../node_modules/rxjs';

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientSelected = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    addItem(item: Ingredient){
        this.ingredients.push(item);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index){
        return this.ingredients[index];
    }

    sendIngredients(itens: Ingredient[]){
        // itens.forEach(item => {
        //     this.ingredients.push(item)
        // });
        this.ingredients.push(...itens);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}