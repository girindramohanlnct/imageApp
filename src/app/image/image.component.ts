import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../image.service';
import { Image } from '../model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  img: Image;
  id;

  constructor(private imgServise: ImageService, public route: ActivatedRoute) {

    this.route.paramMap.subscribe((res) => {
      console.log(res['params']);
      this.id = res['params']['id'];
      console.log(this.id)
    })

    this.imgServise.getImage(this.id).subscribe(res => {
      console.log(res);
      this.img = res.data[0];
    }, err =>
      console.error(err)
    )

  }

  ngOnInit(): void {


  }

}
