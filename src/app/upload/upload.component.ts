import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadFromFileForm: FormGroup;
  uploadFromURLForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.uploadFromFileForm = this.formBuilder.group({
      file: [null, [Validators.required]]
    });

    this.uploadFromURLForm = this.formBuilder.group({
      fileURL: ['', [Validators.required]]
    });
  }

  onUploadFromFile(){
    console.log("Uploading file!");
  }

  onUploadFromURL(){
    console.log("Uploading file from url!")
  }

}
