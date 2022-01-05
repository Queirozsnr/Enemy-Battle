import { PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import {Log} from '../../models/actionLog';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.sass']
})
export class BattlefieldComponent implements OnInit {

  listLog: Log[] = [
    {type: 'monster', action: 'basic', value: -15},
    {type: 'monster', action: 'special', value: -40}
  ]

  attackType = {
    attack: -6,
    special: -11,
    heal: 10
  }

  player1: Player = {
    name: 'José',
    type: 'player',
    life: 100,
    score: 0,
    percentageType: 'success'
  }

  enemy: Player = {
    name: 'Warwick',
    type: 'monster',
    life: 100,
    percentageType: 'success'
  }

  constructor() { }

  ngOnInit(): void {
  }

  attack(player : Player): void{
    this.attackHandler(player.type, this.attackType.attack);
    this.addLogHandler(player.type,'basic', this.attackType.attack);
  }

  special(player : Player): void{
    this.attackHandler(player.type, this.attackType.special);
    this.addLogHandler(player.type,'special', this.attackType.special);
  }

  heal(player : Player): void{
    this.attackHandler(player.type, this.attackType.heal);
    this.addLogHandler(player.type,'heal', this.attackType.heal);
  }

  surrender(player : Player): void{
    this.resetBattle();
    alert("Você desistiu :(");
  }

  attackHandler(type:string, attackPoint:number): void{
    if(type == 'monster'){
      if(attackPoint > 0){
        this.enemy.life += attackPoint;
      }else{
        this.player1.life += attackPoint;
      }
    }else{
      if(attackPoint > 0){
        this.player1.life += attackPoint;
      }else{
        this.enemy.life += attackPoint;
      }
    }

    this.percentageHandler();

    if(this.player1.life <= 0){
      alert('O inimigo Venceu');
      this.resetBattle();
    }else if(this.enemy.life <= 0){
      alert('Você venceu!!');
      this.resetBattle();
    }
  }

  percentageHandler(){

    //Porcentagem para o Inimigo
    if(this.enemy.life >= 50){
      this.enemy.percentageType = 'success'
    }else{
      this.enemy.percentageType = this.enemy.life <= 20? 'danger': 'warning';
    }

    //Porcentagem para o Player
    if(this.player1.life >= 50){
      this.player1.percentageType = 'success'
    }else{
      this.player1.percentageType = this.player1.life <= 20? 'danger': 'warning';
    }

    console.log(this.listLog);
  }

  addLogHandler(type:string, action:string, value:number){
    let log: Log = {
      type: type,
      action: action,
      value: value
    }
    this.listLog.push(log);
  }

  resetBattle(): void{
    this.player1.life = 100;
    this.enemy.life = 100;
  }

}
