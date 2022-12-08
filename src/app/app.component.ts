import {
  AfterViewInit,
  Component,
  ElementRef,
  VERSION,
  ViewChild,
} from '@angular/core';
import { fromEvent, mergeMap, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  name = 'Angular ' + VERSION.major;
  @ViewChild('monCarre') private monCarre: ElementRef;

  ngAfterViewInit() {
    // document // est à bannir ! Empêche de mettre en place le SSR
    fromEvent(this.monCarre.nativeElement, 'mousedown')
      .pipe(
        switchMap(() => fromEvent(this.monCarre.nativeElement, 'mousemove')),
        takeUntil(fromEvent(this.monCarre.nativeElement, 'mouseup'))
      )
      .subscribe((event: MouseEvent) => {
        this.monCarre.nativeElement.style.top = `${event.clientY}px`;
        this.monCarre.nativeElement.style.left = `${event.clientX}px`;
      });
  }
}
