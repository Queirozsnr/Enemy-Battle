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
  ]

  attackType = {
    attack: 0,
    special: -11,
    heal: 10
  }

  player1: Player = {
    name: 'José',
    type: 'player',
    life: 100,
    score: 0,
    percentageType: 'success',
    turn: 0,
    useSpecial: 2
  }

  enemy: Player = {
    name: 'Warwick',
    type: 'monster',
    life: 100,
    percentageType: 'success',
    turn: 0,
    useSpecial: 3
  }

  constructor() { }

  ngOnInit(): void {
  }

  attack(player : Player): void{

    if(player.type == 'monster'){
      this.attackType.attack = this.randomIntFromInterval(-5, -13);

      if(this.enemy.useSpecial < 3){
        this.enemy.useSpecial += 1;

      }else if(this.enemy.useSpecial == 3){
        this.attackType.special = this.randomIntFromInterval(-7, -17);
        this.attackHandler(player.type, this.attackType.special, 'special');
        return
      }
    }else{
      this.attackType.attack = this.randomIntFromInterval(-4, -11);

      if(this.player1.useSpecial < 2){
        this.player1.useSpecial += 1;
      }
    }

    this.attackHandler(player.type, this.attackType.attack, 'basic');
  }

  special(player : Player): void{

    if(player.type == 'monster'){
      this.attackType.special = this.randomIntFromInterval(-7, -17);
    }else{
      if(this.player1.turn){}
      this.attackType.special = this.randomIntFromInterval(-9, -21);
    }

    this.attackHandler(player.type, this.attackType.special, 'special');
  }

  heal(player : Player): void{
    if(this.player1.useSpecial < 2){
      this.player1.useSpecial += 1;
    }

    this.attackType.heal =  this.randomIntFromInterval(5, 10)
    this.attackHandler(player.type, this.attackType.heal, 'heal');
  }

  surrender(player : Player): void{
    this.resetBattle();
    alert("Você desistiu :(");
  }

  attackHandler(type:string, attackPoint:number, action:string): boolean{
    let round = this.verifyRound(type);
    if(!round){
      return false
    }
    if(type == 'monster'){
      this.enemy.turn += 1;

      if(action == 'special'){
        this.enemy.useSpecial = 0;
      }

      if(attackPoint > 0){
        this.enemy.life += attackPoint;
      }else{
        this.player1.life += attackPoint;
      }
    }
    else{
      this.player1.turn += 1;

      if(action == 'special'){
        this.player1.useSpecial = 0;
      }

      if(attackPoint > 0){
        this.player1.life += attackPoint;
      }else{
        this.enemy.life += attackPoint;
      }
    }
    console.log(this.enemy.turn, this.player1.turn)

    this.percentageHandler();

    this.addLogHandler(type, action, this.attackType.attack);

    if(this.player1.life <= 0){ //Verificação caso um dos jogadores fique com 0 de vida
      alert('O inimigo Venceu');
      this.resetBattle();
      return false

    }else if(this.enemy.life <= 0){
      alert('Você venceu!!');
      this.resetBattle();
      return false
    }

    if(type == 'player'){
      setTimeout( () => this.attack(this.enemy), 700 );
    }

    return true;
  }

  percentageHandler(){

    //Porcentagem da vida para o Inimigo
    if(this.enemy.life >= 50){
      this.enemy.percentageType = 'success'
    }else{
      this.enemy.percentageType = this.enemy.life <= 20? 'danger': 'warning';
    }

    //Porcentagem da vida para o Player
    if(this.player1.life >= 50){
      this.player1.percentageType = 'success';
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

  verifyRound(type:string):boolean{
    if(type == 'monster'){
      if(this.enemy.turn < this.player1.turn){
        return true;
      }
      alert("Vez do Jogador");
      return false;
    }else{
      if(this.enemy.turn >= this.player1.turn){
        return true;
      }
      alert("Vez do Oponente")
      return false;
    }
  }

  randomIntFromInterval(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  resetBattle(): void{
    this.player1.life = 100;
    this.player1.percentageType = 'success'

    this.enemy.life = 100;
    this.enemy.percentageType = 'success'
  }

}
