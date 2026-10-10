import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [BrowserModule],
    });
    TestBed.compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should toggle details and log each click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.showSecret).toBe(false);
    app.onToggleDetails();
    expect(app.showSecret).toBe(true);
    app.onToggleDetails();
    expect(app.showSecret).toBe(false);
    expect(app.log).toEqual([1, 2]);
  });

  it('should render details and style log entries starting with the fifth click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p')).toBeNull();
    for (let i = 0; i < 5; i++) {
      compiled.querySelector('button').click();
      fixture.detectChanges();
    }
    expect(compiled.querySelector('p').textContent).toContain('Secret Password');
    const entries = compiled.querySelectorAll('.col-xs-12 > div');
    expect(entries.length).toBe(5);
    expect(entries[3].classList.contains('white-text')).toBe(false);
    expect(entries[4].classList.contains('white-text')).toBe(true);
    expect(entries[4].style.backgroundColor).toBe('blue');
  });
});
