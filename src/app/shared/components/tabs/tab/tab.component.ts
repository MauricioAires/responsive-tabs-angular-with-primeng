import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  template: ``,
  styleUrl: './tab.component.scss',
})
export class TabComponent implements OnInit {
  public title = input.required<string>();
  public active = input<boolean>(true);
  public disabled = input<boolean>(false);
  public badge = input<string | undefined>('');
  public hidden = input<boolean>(false);
  /**
   * @param emitValue  The value that will be send when the tab is clicked
   */
  public emitValue = input<unknown>('');

  public isActive = signal<boolean>(false);
  public isDisabled = signal<boolean>(false);
  public value = signal<unknown>('');
  public isHidden = signal<boolean>(false);

  public ngOnInit(): void {
    this.isActive.set(this.active());
    this.value.set(this.emitValue());
    this.isDisabled.set(this.disabled());
    this.isHidden.set(this.hidden());
  }
}
