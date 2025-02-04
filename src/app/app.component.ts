import { Component } from '@angular/core';
import { TabComponent } from './shared/components/tabs/tab/tab.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabComponent, TabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public tabsLoopExample: string[] = [
    'John Cleese',
    'Eric Idle',
    'Michael Palin',
    'Terry Jones',
    'Terry Gilliam',
    'Graham Chapman',
  ];
}
