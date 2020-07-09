import {Component, OnInit} from '@angular/core';
import {IPost} from '../IPost';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  currentPost: IPost;
  postForm: FormGroup;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.postService.getPostById(id).subscribe(
      next => {
        this.currentPost = next;
        this.postForm.patchValue(this.currentPost);
      }, error => {
        console.log(error);
        this.currentPost = null;
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.postForm.valid) {
      const {value} = this.postForm;
      const data = {
        ...this.currentPost,
        ...value
      };
      this.postService.updatePost(data).subscribe(
        next => {
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  get rfc(): any {
    return this.postForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.postForm.reset();
  }
}
