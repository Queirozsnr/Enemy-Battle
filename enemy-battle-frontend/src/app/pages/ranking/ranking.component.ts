import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.sass']
})
export class RankingComponent implements OnInit {

  listRanking: Array<Score> = []

  constructor(private api:ApiService) { }

  ngOnInit(): void {

    this.api.getScore()
      .then((response:any) => {
        this.listRanking = response.data
        this.listRanking = this.sortBy()
        console.log(this.listRanking)
      })
      .catch((err:any) => {
        console.error("ops! ocorreu um erro" + err);
    });
  }

  sortBy() {
    return this.listRanking.sort((a, b) => a.score < b.score ? 1 : a.score === b.score ? 0 : -1);
  }

}
