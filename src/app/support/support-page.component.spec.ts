import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { SupportPageComponent } from './support-page.component';

/**
 * Testes unitários para o componente SupportPageComponent
 */
describe('SupportPageComponent', () => {
  let component: SupportPageComponent;
  let fixture: ComponentFixture<SupportPageComponent>;

  // Configuração antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        SupportPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Teste básico de criação do componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Teste para verificar se o filtro inicial é 'PENDENTE'
  it('should have initial filter set to PENDENTE', () => {
    expect(component.filter()).toBe('PENDENTE');
  });

  // Teste para verificar a mudança de filtro
  it('should change filter when setFilter is called', () => {
    component.setFilter('CONCLUIDO');
    expect(component.filter()).toBe('CONCLUIDO');
    
    component.setFilter('CANCELADO');
    expect(component.filter()).toBe('CANCELADO');
  });

  // Teste para verificar a paginação
  it('should handle pagination correctly', () => {
    // Configuração inicial
    expect(component.page()).toBe(1);
    
    // Teste de próxima página
    component.next();
    expect(component.page()).toBe(2);
    
    // Teste de página anterior
    component.prev();
    expect(component.page()).toBe(1);
    
    // Teste de limite inferior
    component.prev(); // Não deve ir abaixo de 1
    expect(component.page()).toBe(1);
  });

  // Teste para verificar a função de busca
  it('should filter tickets based on query', () => {
    // Teste com query vazia
    component.query.set('');
    expect(component.filteredAll().length).toBeGreaterThan(0);
    
    // Teste com query específica
    component.query.set('mouse');
    expect(component.filteredAll().some(t => t.assunto.toLowerCase().includes('mouse'))).toBeTrue();
  });
});