import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {BlogComponent} from './blog/blog.component';
import {BlogEditComponent} from './blog-edit/blog-edit.component';

const routes: Routes = [
  {path: '', component: BlogComponent},
  {path: 'blog/:id', component: BlogDetailComponent},
  {path: 'blog/:id/edit', component: BlogEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
