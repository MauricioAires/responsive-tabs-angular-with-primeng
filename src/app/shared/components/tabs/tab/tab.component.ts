import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent implements OnInit {
  public title = input<string>();
  public active = input<boolean>();

  public isActive = signal<boolean>(false);
  public isDisabled = signal<boolean>(false);

  public ngOnInit(): void {
    if (this.active()) {
      this.isActive.set(true);
    }
  }
}
