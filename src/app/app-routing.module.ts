import { NgModule } from "../../node_modules/@angular/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { Routes, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { NoRecipeComponent } from "./recipes/no-recipe/no-recipe.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const routes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: NoRecipeComponent, pathMatch: 'full'},
        { path: 'new', component: RecipeEditComponent},
        { path: ':id', component: RecipeDetailComponent},
        { path: ':id/edit', component: RecipeEditComponent}
    ] },
    { path: '', redirectTo: 'recipes', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}