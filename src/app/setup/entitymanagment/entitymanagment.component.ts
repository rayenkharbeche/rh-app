
import { Component, OnInit } from '@angular/core';
import { Entity } from '../model/entity';
import { EntityService } from '../service/entity.service';

@Component({
  selector: 'app-entitymanagment',
  templateUrl: './entitymanagment.component.html',
  styleUrl: './entitymanagment.component.css'
})
export class EntitymanagmentComponent implements OnInit {

  entity: Entity = {
    id: 0,
    name: '',
    countrycode: '',
  };
  submitted = false;
  entities?: Entity[];
  constructor(private entityService: EntityService) { }

  
  ngOnInit(): void {
    this.retrieveEntities();
  }

  retrieveEntities(): void {
    this.entityService.getAll()
      .subscribe({
        next: (data) => {
          this.entities = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  saveEntity(): void {
    const data = {
      name: this.entity.name,
      countrycode: this.entity.countrycode
    };
    console.log(data.countrycode);

    this.entityService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newEntity(): void {
    this.submitted = false;
    this.entity = {
      id: 0 ,
      name: '',
      countrycode: '',
    };
  }
  removeAllEntities(): void {
    this.entityService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveEntities();
        },
        error: (e) => console.error(e)
      });
  }



}
