import { Component, OnInit } from '@angular/core';
import { Enemy } from 'src/app/models/enemy';
import { Player } from 'src/app/models/player';
import {Hero} from '../../models/hero';
import {HEROES} from '../../models/mock/mock-hero';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.sass']
})
export class BattlefieldComponent implements OnInit {

  title = 'Welcome to Battlefield';

  heroes = HEROES;

  selectedHero?: Hero;

  attackType = {
    attack: -6,
    special: -11,
    heal: 10
  }

  player1: Player = {
    name: 'José',
    type: 'player',
    life: 100,
    score: 0
  }

  enemy: Player = {
    name: 'Warwick',
    type: 'monster',
    life: 100
  }

  constructor() { }

  ngOnInit(): void {
  }

  selectHero(hero: Hero): void{
    this.selectedHero = hero;
  }

  clearHeroSelected(): void{
    this.selectedHero = undefined;
  }

  attack(player : Player): void{
    this.attackHandler(player.type, this.attackType.attack);
  }

  special(player : Player): void{
    this.attackHandler(player.type, this.attackType.special);
  }

  heal(player : Player): void{
    this.attackHandler(player.type, this.attackType.heal);
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
    if(this.player1.life < 0){
      this.resetBattle();
      alert('O inimigo Venceu');
    }else if(this.enemy.life < 0){
      this.resetBattle();
      alert('Você venceu!!');
    }
  }

  resetBattle(): void{
    this.player1.life = 100;
    this.enemy.life = 100;
  }

}
