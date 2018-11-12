import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  editMode = false;
  private recipe: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null)
    });

    const id = +this.route.snapshot.params['id'];
    if (id){
      this.recipe = this.recipeService.getRecipe(id);
      this.recipeForm.setValue({
        name: this.recipe.name,
        description: this.recipe.description
      })
      this.editMode = true;
    }
    else
    {
      this.editMode = false;
    }
    
  }

  onSubmit(){
    this.recipe.name = this.recipeForm.get('name').value;
    this.recipe.description = this.recipeForm.get('description').value;
    this.recipeService.updateRecipe(this.recipe);
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.recipe.id);
  }

}
