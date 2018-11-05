import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrackManagerService} from "../services/track-manager.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadFromFileForm: FormGroup;
  uploadFromURLForm: FormGroup;
  uid: string;
  idToken: string;

  constructor(private formBuilder: FormBuilder,
              private TrackManagerService: TrackManagerService) {
  }

  ngOnInit() {
    this.initForms();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.uid = user.uid;
          user.getIdToken().then( (token) => {
            this.idToken = token;
          });
        } else {
          this.uid = '';
          this.idToken = '';
        }
      }
    );
  }

  initForms() {
    this.uploadFromFileForm = this.formBuilder.group({
      file: [null, [Validators.required]]
    });

    this.uploadFromURLForm = this.formBuilder.group({
      fileURL: ['', [Validators.required]]
    });
  }

  onUploadFromFile() {
    const file = this.uploadFromFileForm.get('file').value;
    this.TrackManagerService.insertTracks(this.idToken, 'true', file)
      .then( ()=> {
      this.uploadFromFileForm.reset();
    })
      .catch( ()=> {
        console.log("MERDE");
      });
  }

  onUploadFromURL() {
    const fileURL = this.uploadFromURLForm.get('fileURL').value;
    this.TrackManagerService.insertTracksURL(this.idToken, 'true', fileURL)
      .then( ()=> {
        this.uploadFromURLForm.reset();
      })
      .catch( ()=> {
          console.log("MER2");
        });

  }

}
