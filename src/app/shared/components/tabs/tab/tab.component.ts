import { Component, input, OnInit, signal } from '@angular/core';

export type EmitValue =
  | {
      [key: string]: string | number;
    }
  | string;

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
  /**
   * @param emitValue  The value that will be send when the tab is clicked
   */
  public emitValue = input<EmitValue>('');

  public isActive = signal<boolean>(false);
  public isDisabled = signal<boolean>(false);
  public value = signal<EmitValue>('');

  public ngOnInit(): void {
    if (this.active()) {
      this.isActive.set(true);
    }

    this.value.set(this.emitValue());
  }
}
