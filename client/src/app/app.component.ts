import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private deathcounter: number;
  private listLetters: Array<string> = [];
  private word: string;
  private test: boolean;
  private tab = [];
  public letter;

	constructor(private myService: AppService) {
		this.deathcounter = 0;
    //faire en sorte de ne pas avoir 2x le même mot
    this.myService.data.subscribe((word) => {
      this.word = word;
      for (let trait = 0; trait < this.word.length; trait++) {
        this.tab[trait] = '_ ';
      }
    });
  }

  check_letter() {
    if (this.deathcounter < 10) {
      this.test = false;
      let ret = this.listLetters.find((letter) => this.letter == letter);
      //si la lettre écrite n'a pas été testé
      if (ret == undefined) {
        for (let i = 0;i < this.word.length;i++)
        {
          if (this.word[i] == this.letter)
          {
            this.tab[i] = this.letter;
            this.test = true;
          }
        }
        this.listLetters.push(this.letter);
        let nb:number = this.tab.indexOf('_ ');
        if (nb == -1)
          alert("Bravo ! T'as trouvé le mot !! :))");
      }
      if (this.test == false) {
        //2x la même lettre écrite ou pas la bonne lettre
        this.deathcounter++;
        if (this.deathcounter == 10) {
          alert("You looooooooooose !! Le mot était "+this.word+" ! Raffraichis la page pour rejouer !");
        }
      }
    }
  }
}

//questions :
//peut-on donner le nom du fichier en directive pour lier l'enfant et le parent ?
//providers : service
//declarations: composant
//imports: 

//word, difficulté 1-5, booléan success
//formulaire rajouter un mot 

//CREATE SCHEMA test
//CREATE TABLE pendu (word text, difficulty integer, succeed boolean)