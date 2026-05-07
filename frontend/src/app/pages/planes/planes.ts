import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './planes.html',
  styleUrls: ['./planes.css']
})
export class PlanesComponent {

}