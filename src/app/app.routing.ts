import { Routes, RouterModule } from '@angular/router';

import { ProductSearchComponent } from './product-search/product-search.component';
import { QuantoComponent } from './quanto/quanto.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/Quanto', pathMatch: 'full' },
    { path: 'GroceryList', component:ProductSearchComponent },
    { path: 'Quanto', component: QuantoComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES);

