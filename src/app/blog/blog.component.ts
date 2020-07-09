import {Component, OnInit} from '@angular/core';
import {IPost} from '../IPost';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  postList: IPost[] = [];
  postForm: FormGroup;
  submitted = false;

  constructor(private postService: PostService,
              private formBuilder: FormBuilder) {
  }

  // done
  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.postService.getPosts().subscribe(next => {
      this.postList = next;
      this.postService.postList = this.postList;
    }, error => (this.postList = []));
  }

  // done
  onSubmit(): void {
    this.submitted = true;
    if (this.postForm.valid) {
      const {value} = this.postForm;
      console.log(value);
      this.postService.createPost(value).subscribe(next => {
        this.postList.unshift(next);
        this.postForm.reset({
          title: '',
          body: ''
        });
      }, error => console.log(error));
    }
  }

  // done
  onReset(): void {
    this.submitted = false;
    this.postForm.reset();
  }

  // done
  get rfc(): any {
    return this.postForm.controls;
  }

  // done
  deletePost(id: number): void {
    const currentPost = this.postList[id];
    console.log(JSON.stringify(currentPost));
    this.postService.deletePost(currentPost.id).subscribe(() => {
      this.postList = this.postList.filter(post => post.id !== currentPost.id);
    });
  }
}
