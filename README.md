# Leonel Rocha Broker - Landing Page

Landing page institucional para administração de condomínios, gestão condominial profissional, consultoria para condomínios e valorização patrimonial.

## Estrutura

```text
.
├── index.html
├── Css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
├── Src/
│   └── logo-completa-navbar.png
```

## Seções

- Cabeçalho com navegação responsiva
- Hero principal com imagem premium
- Indicadores institucionais
- Sobre a empresa
- Soluções para condomínios
- Tipos de empreendimentos atendidos
- Diferenciais
- Tecnologia e transparência
- Formulário de contato via WhatsApp
- Rodapé com dados da empresa

## Imagens

As imagens foram organizadas em `assets/images/` com nomes descritivos:

- `hero-condominio-clube.jpg`
- `fachada-alto-padrao.jpg`
- `areas-comuns.jpg`
- `portaria-moderna.jpg`
- `gestao-condominial.jpg`
- `tecnologia-condominial.jpg`
- `gestao-patrimonial.jpg`

## SEO aplicado

- `title` otimizado para gestão condominial
- `meta description` com palavras-chave transacionais
- HTML5 semântico
- Hierarquia clara de H1, H2 e H3
- `alt` descritivo em todas as imagens de conteúdo
- Lazy loading nas imagens secundárias
- Conteúdo nacional, sem foco em empreendimento específico

## Versionamento

Este projeto usa versionamento semântico no formato `MAJOR.MINOR.PATCH`.

A versão atual fica no arquivo `VERSION` e o histórico fica em `CHANGELOG.md`.

Use assim:

- `PATCH`: correções pequenas, ajustes visuais e textos sem mudar a estrutura principal. Exemplo: `1.0.0` para `1.0.1`.
- `MINOR`: novas seções, novos blocos, melhorias de conversão ou mudanças maiores sem quebrar o site. Exemplo: `1.0.1` para `1.1.0`.
- `MAJOR`: reformulação grande, troca de identidade visual ou mudança estrutural importante. Exemplo: `1.1.0` para `2.0.0`.

Fluxo recomendado:

```bash
# 1. Ajuste a versão
# Edite o arquivo VERSION

# 2. Registre a mudança
# Edite o CHANGELOG.md

# 3. Faça o commit
git add VERSION CHANGELOG.md README.md index.html Css/style.css js/script.js
git commit -m "Release 1.0.1"

# 4. Crie uma tag da versão
git tag v1.0.1
git push origin main --tags
```
