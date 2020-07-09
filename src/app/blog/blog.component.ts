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

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.postService.getPost().subscribe(next => (this.postList = next), error => (this.postList = []));
  }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.valid) {
      const {value} = this.postForm;
      this.postService.createPost(value).subscribe(next => {
        this.postList.unshift(next);
        this.postForm.reset({
          title: '',
          body: ''
        });
      }, error => console.log(error));
    }
  }

  deletPost(id: number) {
    const currentPost = this.postList[id];
    this.postService.deletePost(currentPost.id).subscribe(() => {
      this.postList = this.postList.filter(post => post.id !== currentPost.id);
    });
  }

  get rfc() {
    return this.postForm.controls;
  }
}
