import { Component, Input } from '@angular/core';
import {Hero } from '../hero';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgIf],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  //@Input() hero?: Hero;
  hero: Hero | undefined;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
