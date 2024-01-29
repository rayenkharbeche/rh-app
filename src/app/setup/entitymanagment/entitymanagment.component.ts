
import { Component, OnInit } from '@angular/core';
import { Entity } from '../model/entity';
import { EntityService } from '../service/entity.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateentityComponent } from '../createentity/createentity.component';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

@Component({
  selector: 'app-entitymanagment',
  templateUrl: './entitymanagment.component.html',
  styleUrl: './entitymanagment.component.css'
})
export class EntitymanagmentComponent implements OnInit {

  entity: Entity = {
    id: 0,
    name: '',
    countryCode: '',
  };
  submitted = false;
  entities?: Entity[];
  public icons!: [string, string[]][];

  constructor(private entityService: EntityService,
    public iconSet: IconSetService,

    public dialog: MatDialog) { 
      iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };

    }

  
  ngOnInit(): void {
    this.icons = this.getIconsView('cif');

    this.retrieveEntities(); 
  }
  getIconsView(prefix: string) {
    return Object.entries(this.iconSet.icons).filter((icon) => {
      return icon[0].startsWith(prefix);
    });
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
      countryCode: this.entity.countryCode
    };
    console.log(data.countryCode);

    this.entityService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
          this.retrieveEntities();

        },
        error: (e) => console.error(e)
      });
  }

  newEntity(): void {
    this.submitted = false;
    this.entity = {
      id: 0 ,
      name: '',
      countryCode: '',
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
  removeEntities(id: any): void {
    console.log("test");
    this.entityService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveEntities();
        },
        error: (e) => console.error(e)
      });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CreateentityComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrieveEntities();


    });
  }


}
