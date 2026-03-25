import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
 
describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])], // Necesario porque usas RouterOutlet
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the correct title signal', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    // 1. Usamos (app as any) porque el title es 'protected'
    // 2. Usamos () porque es un Signal: title()
    expect((app as any).title()).toEqual('frontend-angular');
  });
});