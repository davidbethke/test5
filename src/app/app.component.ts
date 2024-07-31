import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Routes } from '@angular/router';
import { MissionComponent } from './mission/mission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatTabsModule, MatTabGroup,MatTab} from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MissionComponent, RouterModule, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test5';
}
