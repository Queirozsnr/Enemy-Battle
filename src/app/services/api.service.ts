import { Injectable } from '@angular/core';

import axios from 'axios'
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = axios.create({
    baseURL: "http://localhost:3000",
  });

  constructor() {}

  getScore():Promise <Array<Score>>{
    return this.api.get("scores/");
  }

  postScore(score:any){
    this.api.post('scores/', score)
      .then((response:any) => console.log(response.data))
      .catch((err:any) => {
        console.error("ops! ocorreu um erro" + err);
    });
  }
}
