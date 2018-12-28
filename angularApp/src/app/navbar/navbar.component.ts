import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public href: string = "";

  constructor(private _router:Router) { }

  ngOnInit() {
    this.href = this._router.url;
  }

}
