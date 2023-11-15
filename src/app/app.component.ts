import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private router:Router, private dataService:DataService) {}

  ngOnInit() {
    this.router.navigate(['']);
  }
}
