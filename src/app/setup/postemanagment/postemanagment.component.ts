
import { Component, OnInit } from '@angular/core';
import { Poste } from '../model/poste';
import { PosteService } from '../service/poste.service';

@Component({
  selector: 'app-postemanagment',
  templateUrl: './postemanagment.component.html',
  styleUrl: './postemanagment.component.css'
})
export class PostemanagmentComponent implements OnInit {

  poste: Poste = {
    id: 0,
    name: '',
  };
  submitted = false;
  postes?: Poste[];
  constructor(private posteService: PosteService) { }

  
  ngOnInit(): void {
    this.retrievePostes();
  }

  retrievePostes(): void {
    this.posteService.getAll()
      .subscribe({
        next: (data) => {
          this.postes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  savePoste(): void {
    const data = {
      name: this.poste.name,
    };


    this.posteService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newPoste(): void {
    this.submitted = false;
    this.poste = {
      id: 0 ,
      name: '',
    };
  }
  removeAllPostes(): void {
    this.posteService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrievePostes();
        },
        error: (e) => console.error(e)
      });
  }



}
