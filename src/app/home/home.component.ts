import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgs: [Image];
  status: boolean;
  isEmpty = false;

  constructor(private imgService: ImageService) { }

  ngOnInit(): void {
    this.imgService.getImages().subscribe(res => {
      if (res.data) {
        this.status = true;
        this.imgs = [...res.data];
        if (res.data.length <= 0) {
          this.isEmpty = true;
        }
        console.log(this.imgs)
      } else {
        this.status = false;
        this.imgs = null;
      }

    })
  }

}
