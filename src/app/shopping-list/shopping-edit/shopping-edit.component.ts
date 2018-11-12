import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  private selectedIndex: number;
  private selectedSubscription: Subscription;
  private editMode = false;
  private editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.selectedSubscription = this.shoppingListService.ingredientSelected
      .subscribe(
        (i) => {
          this.editMode = true;
          this.editedIngredient = this.shoppingListService.getIngredient(i);
          this.shoppingListForm.form.patchValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount,            
          });
          this.selectedIndex = i;
        }
      )
  }

  ngOnDestroy(){
    this.selectedSubscription.unsubscribe();
  }
  
  onSubmit(){
    if (this.editMode){
      this.editedIngredient.name = this.shoppingListForm.value.name;
      this.editedIngredient.amount = this.shoppingListForm.value.amount;
      this.shoppingListService.updateIngredient(this.selectedIndex, this.editedIngredient);
    }
    else{
      const ingName = this.shoppingListForm.value.name;
      const ingAmount = this.shoppingListForm.value.amount;
      const newIngredient = new Ingredient(ingName, ingAmount);
      this.shoppingListService.addItem(newIngredient);
    }
    this.resetForm();
  }

  resetForm(){
    this.shoppingListForm.reset();
    this.selectedIndex = null;
    this.editMode = false;
    this.editedIngredient = null;
  }

  deleteIngredient(){
    this.shoppingListService.deleteIngredient(this.selectedIndex);
    this.resetForm();
  }

}
