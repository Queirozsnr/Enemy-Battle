import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.sass']
})
export class RuleComponent implements OnInit {

  constructor(private apiService:ApiService) {}

  ngOnInit(): void {
    this.apiService.getScore()
  }

}
