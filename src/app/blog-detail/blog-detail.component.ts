import { Component, OnInit } from '@angular/core';
import {IPost} from '../IPost';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  currentPost: IPost;
  sub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.postService.getPostById(id).subscribe(
        next => (this.currentPost = next),
        error => {
          console.log(error);
          this.currentPost = null;
        }
      );
    });
  }
}
