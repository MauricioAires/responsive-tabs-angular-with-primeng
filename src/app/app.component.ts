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
  public tabsLoopExample = [
    { label: 'John Cleese', route: '/john-cleese' },
    { label: 'Eric Idle', route: '/eric-idle' },
    { label: 'Michael Palin', route: '/michael-palin' },
    { label: 'Terry Jones', route: '/terry-jones' },
    { label: 'Terry Gilliam', route: '/terry-gilliam' },
    { label: 'Graham Chapman', route: '/graham-chapman' },
  ];

  protected handleActiveIndexChanged(event: any): void {
    console.log(event);
  }
}
