import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NewTicketPageComponent } from './new-ticket-page.component';

/**
 * Testes unitários para o componente NewTicketPageComponent
 */
describe('NewTicketPageComponent', () => {
  let component: NewTicketPageComponent;
  let fixture: ComponentFixture<NewTicketPageComponent>;

  // Configuração antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        NewTicketPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTicketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Teste básico de criação do componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Teste para verificar se os campos iniciam vazios
  it('should have empty initial values', () => {
    expect(component.grupo()).toBe('');
    expect(component.tipo()).toBe('');
    expect(component.assunto()).toBe('');
    expect(component.descricao()).toBe('');
  });

  // Teste para verificar a atualização do campo de assunto
  it('should update assunto when onAssunto is called', () => {
    const mockEvent = { target: { value: 'Novo assunto de teste' } } as unknown as Event;
    component.onAssunto(mockEvent);
    expect(component.assunto()).toBe('Novo assunto de teste');
  });

  // Teste para verificar a atualização do campo de descrição
  it('should update descricao when onDescricao is called', () => {
    const mockEvent = { target: { value: 'Nova descrição de teste' } } as unknown as Event;
    component.onDescricao(mockEvent);
    expect(component.descricao()).toBe('Nova descrição de teste');
  });
});