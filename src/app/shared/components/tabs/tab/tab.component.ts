import { Component, input, OnInit, signal } from '@angular/core';

export type EmitValue =
  | {
      [key: string]: string | number | boolean | undefined;
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
  public active = input<boolean>(true);
  public disabled = input<boolean>(false);
  public hidden = input<boolean>(false);
  /**
   * @param emitValue  The value that will be send when the tab is clicked
   */
  public emitValue = input<EmitValue>('');

  public isActive = signal<boolean>(false);
  public isDisabled = signal<boolean>(false);
  public value = signal<EmitValue>('');
  public isHidden = signal<boolean>(false);

  public ngOnInit(): void {
    this.isActive.set(this.active());
    this.value.set(this.emitValue());
    this.isDisabled.set(this.disabled());
    this.isHidden.set(this.hidden());
  }
}
