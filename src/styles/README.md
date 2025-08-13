# UI Style Guidelines - Sistema de Chamados

## 📋 Visão Geral

Este documento contém as diretrizes de UI que devem ser seguidas rigorosamente em todo o projeto. Estas configurações garantem consistência visual e devem ser consultadas sempre antes de implementar novos componentes ou modificar estilos existentes.

## 🎨 Tipografia

### Fonte Principal
- **Família**: Nunito
- **Importação**: Google Fonts
- **URL**: `https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;900&display=swap`

### Pesos de Fonte
| Peso | Valor | Uso Recomendado |
|------|-------|----------------|
| Light | 300 | Textos secundários, legendas |
| Regular | 400 | Texto padrão, parágrafos |
| Semibold | 600 | Subtítulos, destaques |
| Black | 900 | Títulos principais |

### Tamanhos e Estilos

#### 16px
- `.text-16-black` - Títulos principais
- `.text-16-semibold` - Subtítulos importantes
- `.text-16-light` - Texto secundário grande
- `.text-16-regular` - Texto padrão grande

#### 14px
- `.text-14-black` - Títulos de seção
- `.text-14-semibold` - Labels importantes
- `.text-14-light` - Texto auxiliar
- `.text-14-regular` - Texto padrão (corpo)

#### 12px
- `.text-12-black` - Micro títulos
- `.text-12-semibold` - Labels pequenos
- `.text-12-light` - Legendas
- `.text-12-regular` - Texto pequeno

#### 10px
- `.text-10-black` - Badges importantes
- `.text-10-semibold` - Status pequenos
- `.text-10-light` - Notas de rodapé
- `.text-10-regular` - Texto muito pequeno

## 🎨 Paleta de Cores

### Cores Principais
| Cor | Hex | Uso |
|-----|-----|-----|
| Primary | `#3a9db7` | Cor principal da marca, botões primários |
| Primary 2 | `#49afc9` | Variação da cor principal, hover states |
| Secondary | `#222b45` | Textos principais, elementos secundários |

### Cores Neutras
| Cor | Hex | Uso |
|-----|-----|-----|
| Black | `#888787` | Textos secundários, ícones |
| Gray | `#f0f0f0` | Fundos, divisores |
| White | `#2f80ed` | ⚠️ Nota: Esta cor é azul, não branco |

### Classes CSS Disponíveis

#### Cores de Texto
- `.text-primary`
- `.text-primary-2`
- `.text-secondary`
- `.text-black`
- `.text-gray`
- `.text-white`

#### Cores de Fundo
- `.bg-primary`
- `.bg-primary-2`
- `.bg-secondary`
- `.bg-black`
- `.bg-gray`
- `.bg-white`

## 📁 Estrutura de Arquivos

```
src/styles/
├── ui-guidelines.scss    # Configurações principais
└── README.md            # Esta documentação
```

## 🔧 Como Usar

### 1. Importação
O arquivo `ui-guidelines.scss` é automaticamente importado no `styles.scss` principal:

```scss
@import './styles/ui-guidelines.scss';
```

### 2. Usando Classes CSS
```html
<!-- Exemplo de uso das classes de tipografia -->
<h1 class="text-16-black text-primary">Título Principal</h1>
<p class="text-14-regular text-secondary">Texto do parágrafo</p>
<small class="text-12-light text-black">Texto pequeno</small>
```

### 3. Usando Variáveis SCSS
```scss
.meu-componente {
  font-family: 'Nunito', sans-serif;
  font-size: $font-size-14;
  font-weight: $font-weight-regular;
  color: $secondary;
  background-color: $gray;
}
```

### 4. Usando Variáveis CSS
```css
.meu-elemento {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  color: var(--c-secondary);
}
```

## ⚠️ Regras Importantes

1. **NÃO ALTERE** as cores e tipografias definidas sem aprovação
2. **SEMPRE CONSULTE** este arquivo antes de definir novos estilos
3. **USE AS CLASSES** predefinidas sempre que possível
4. **MANTENHA A CONSISTÊNCIA** em todo o projeto
5. **DOCUMENTE** qualquer nova adição às diretrizes

## 🔄 Atualizações

Qualquer alteração nas diretrizes deve:
1. Ser documentada neste README
2. Ser aprovada pela equipe
3. Ser testada em todos os componentes
4. Manter compatibilidade com código existente

## 📞 Contato

Para dúvidas sobre as diretrizes de UI, consulte a equipe de desenvolvimento.

---

**Última atualização**: Dezembro 2024
**Versão**: 1.0.0