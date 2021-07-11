import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from './model';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImages() {
    return this.http.get<{ status: boolean, data: [Image] }>(environment.apiUrl + 'show');
  }

  getImage(id) {
    console.log("services ", id)
    return this.http.get<{ status: boolean, data: [Image] }>(environment.apiUrl + 'show/' + id);
  }

  saveIamge(name: string, details: string, image: File) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('details', details);
    formData.append('file', image)
    return this.http.post<{ data: Image }>(environment.apiUrl, formData);
  }
}
