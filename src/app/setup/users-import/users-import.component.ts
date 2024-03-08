import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users-import',
  templateUrl: './users-import.component.html',
  styleUrl: './users-import.component.css'
})
export class UsersImportComponent {

  
  
    myForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  
    status!: string;
  
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
  
    ) { }
    
  
    selectedId: any ;
  
    
      
    get f(){
      return this.myForm.controls;
    }
    
      ngOnInit(): void {
  
      }
    
   
      onFileChange(event:any) {
    
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.myForm.patchValue({
            fileSource: file
          });
        }
        this.onSubmit();
      } 
      onSubmit() {
        const formData = new FormData();
        formData.append('file', this.myForm.value.fileSource!);
         
        this.http.post('http://localhost:8080/api/excel/upload', formData)
          .subscribe(res => {
            console.log( res)
  
            alert('Uploaded Successfully.');
          })
  
    
  
        }
   
    
  
      
    }
    
  