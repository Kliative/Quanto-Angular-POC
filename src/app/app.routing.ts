import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSearchComponent } from './product-search/product-search.component';
import { QuantoComponent } from './quanto/quanto.component';

export const router: Routes = [
    { path: '', redirectTo: '/Quanto', pathMatch: 'full' },
    { path: 'Quanto', component: QuantoComponent },
    { path: 'GroceryList', component:ProductSearchComponent }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

