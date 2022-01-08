import { PercentPipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player';
import {Log} from '../../models/actionLog';
import {ModalDismissReasons, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.sass'],

  providers: [NgbModalConfig, NgbModal]
})

export class BattlefieldComponent implements OnInit {

  @ViewChild('modalData') modalData?:ElementRef;

  closeModal?: string;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private api: ApiService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  triggerModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      if (res == 'save') {
        this.sendPost();
      }else{
        this.resetBattle();
      }
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      this.resetBattle();
    });
  }
  sendPost() {
    var date = new Date().toLocaleString();

    this.api.postScore({
      "playerName": this.player1.name,
      "data": date,
      "score": this.player1.score
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {}

  listLog: Log[] = [
  ]

  player1: Player = {
    name: '',
    type: 'player',
    life: 100,
    score: 0,
    percentageType: 'success',
    turn: 0,
    useSpecial: 2,
    round: 0
  }

  enemy: Player = {
    name: '',
    type: 'monster',
    life: 100,
    percentageType: 'success',
    turn: 0,
    useSpecial: 3
  }

  attack(player : Player): void{
    let attack = 0;

    if(player.type == 'monster'){
      attack = this.calculateRandomAction(-5, -13);

      if(this.enemy.useSpecial < 3){
        this.enemy.useSpecial += 1;

      }else if(this.enemy.useSpecial == 3){
        this.attackHandler(player.type, this.calculateRandomAction(-7, -17), 'special');
        return
      }
    }else{
      attack = this.calculateRandomAction(-4, -11);

      if(this.player1.useSpecial < 2){
        this.player1.useSpecial += 1;
      }
    }

    this.attackHandler(player.type, attack, 'basic');
  }

  special(player : Player): void{
    let special = player.type == 'monster'
      ? this.calculateRandomAction(-7, -17)
      : this.calculateRandomAction(-9, -21);

    this.attackHandler(player.type, special, 'special');
  }

  heal(player : Player): void{
    if(this.player1.useSpecial < 2){
      this.player1.useSpecial += 1;
    }
    if(this.player1.life == 100){
      alert("Sua vida está cheia!");
    }else{
      this.attackHandler(player.type, this.calculateRandomAction(5, 15), 'heal');
    }
  }

  surrender(player : Player): void{
    this.resetBattle();
    alert('Você desistiu');
  }

  attackHandler(type:string, attackPoint:number, action:string): void{

    if(!this.verifyRound(type)){
      return;
    }

    if(type == 'monster'){
      this.attackEnemyHandler(action, attackPoint);
    }
    else{
      this.attackPlayerHandler(action, attackPoint);
    }

    this.percentageHandler();

    this.addLogHandler(type, action, attackPoint);

    if(this.verifyWinner()){
      return
    }

    if(type == 'player'){
      setTimeout( () => this.attack(this.enemy), 900 );
    }
  }

  attackEnemyHandler(action: string, attackPoint: number) {
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

  attackPlayerHandler(action: string, attackPoint: number) {
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

  verifyRound(type:string):boolean{ //Verifica os turnos de jogada
    this.player1.round = (this.player1.turn + this.enemy.turn) + 1;

    if(type == 'monster'){
      if(this.enemy.turn < this.player1.turn){
        return true;
      }
      return false;
    }else{
      if(this.enemy.turn >= this.player1.turn){
        return true;
      }
      alert("Vez do Oponente");
      return false;
    }
  }

  verifyWinner(): boolean{
    if(this.player1.life <= 0){
      alert('O inimigo Venceu');
      //this.resetBattle();
      this.triggerModal(this.modalData)
      return true;

    }else if(this.enemy.life <= 0){
      alert('Você venceu!!');
      this.triggerModal(this.modalData)
      this.player1.score = Math.round((this.player1.life * 1000) /  this.player1.turn)

      console.log("Score final: " +this.player1.score)
      console.log("Vida final: " +this.player1.life)
      console.log("Turno final: " +this.player1.turn)

      //this.resetBattle();
      return true;
    }
    return false;
  }

  calculateRandomAction(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  resetBattle(): void{
    this.player1.round = 0;

    this.player1.life = 100;
    this.player1.percentageType = 'success';
    this.player1.turn = 0;
    this.player1.useSpecial = 2;

    this.enemy.life = 100;
    this.enemy.percentageType = 'success';
    this.enemy.turn = 0;
    this.enemy.useSpecial = 3;

    this.listLog = []
  }
}
