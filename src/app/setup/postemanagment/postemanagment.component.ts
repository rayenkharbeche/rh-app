
import { Component, OnInit } from '@angular/core';
import { Poste } from '../model/poste';
import { PosteService } from '../service/poste.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-postemanagment',
  templateUrl: './postemanagment.component.html',
  styleUrl: './postemanagment.component.css'
})
export class PostemanagmentComponent implements OnInit {
  form!: FormGroup;

  poste: Poste = {
    id: 0,
    name: '',
  };
  submitted = false;
  postes?: Poste[];
  validForm: any;
  constructor(private posteService: PosteService,
    private formBuilder: FormBuilder,

  ) { }

  
  ngOnInit(): void {
    this.validForm = true;

    this.form = this.formBuilder.group({
      poste: ['', Validators.required ],
      

  });
    this.retrievePostes();
  }

  retrievePostes(): void {
    this.posteService.getAll()
      .subscribe({
        next: (data) => {
          this.postes = data;
        },
        error: (e) => console.error(e)
      });
  }


  savePoste(): void {
    const data = {
      name: this.form.value.poste,
    };
console.log(this.form.invalid)

if (this.form.invalid) {
  this.validForm = false;
  return;
}
    this.posteService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res); 
          this.submitted = true;
          this.form.value.poste = "";
          this.retrievePostes();

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
  removePoste(poste:any): void {
    this.posteService.delete(poste)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrievePostes();
        },
        error: (e) => console.error(e)
      });
  }



}
