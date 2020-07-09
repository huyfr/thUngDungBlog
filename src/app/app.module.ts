import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BlogComponent} from './blog/blog.component';
import {BlogEditComponent} from './blog-edit/blog-edit.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PostService} from './post.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    BlogEditComponent,
    BlogDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
