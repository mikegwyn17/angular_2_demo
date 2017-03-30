import { style } from '@angular/core/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { runInThisContext } from 'vm';
import { NgFor } from '@angular/common/src/directives/ng_for_of';
import { inherits } from 'util';
import { NgModel } from '@angular/forms/src/directives';
import { Component, Input } from '@angular/core';
import {OnInit} from '@angular/core';

import {Hero} from './hero'
import {HeroService} from './hero.service';

@Component ({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {
  constructor (private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  };

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  };

  heroes: Hero[];
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes)
  } 

  add (name: string): void {
    name = name.trim();
    if (!name) return;

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;

      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null }
      });
  } 
}
