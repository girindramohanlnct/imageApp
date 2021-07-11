import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../model';
import { mimeType } from '../mime-type.validator';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private mode = 'create';
  private postId: string;
  img: Image
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  enteredTitle = '';
  enteredContent = '';

  constructor(private imgService: ImageService, private route: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      details: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    console.log("saving");
    this.imgService.saveIamge(this.form.value.name, this.form.value.details, this.form.value.image).subscribe(res => {
      console.log("saved");
      this.form.reset();
      this.route.navigate(['/']);
    })
  }

}
