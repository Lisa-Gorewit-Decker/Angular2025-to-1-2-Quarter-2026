import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppModule compatibility', () => {
  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  it('should toggle details and render styled log entries through NgModule', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const button = compiled.querySelector('button')!;

    expect(compiled.querySelector('p')).toBeNull();
    button.click();
    fixture.detectChanges();
    expect(compiled.querySelector('p')?.textContent).toContain('Lollipop');

    for (let i = 1; i < 6; i++) {
      button.click();
      fixture.detectChanges();
    }

    expect(compiled.querySelector('p')).toBeNull();
    const styledEntry = compiled.querySelector<HTMLElement>('.white-text')!;
    expect(styledEntry.textContent?.trim()).toBe('6');
    expect(styledEntry.style.backgroundColor).toBe('dodgerblue');
  });
});
