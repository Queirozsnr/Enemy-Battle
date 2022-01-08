import { Injectable } from '@angular/core';

import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = axios.create({
    baseURL: "http://localhost:3000",
  });

  constructor() {}

  getScore(){
    this.api.get("scores/")
      .then((response:any) => console.log(response.data))
      .catch((err:any) => {
        console.error("ops! ocorreu um erro" + err);
    });
  }
}
