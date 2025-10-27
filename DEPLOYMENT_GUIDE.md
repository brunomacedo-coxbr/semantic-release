# 🚀 Deployment & Rollback Guide

Este repositório possui um sistema otimizado de deploy e rollback com artefatos versionados.

## 📋 Workflows Disponíveis

### 1. **Deploy Production** (Automático)

- **Trigger**: Push para branches `release/*`
- **Função**: Deploy para produção com build otimizado
- **Artefatos**: Cria builds versionados para rollback

### 2. **List Available Rollback Versions** (Manual)

- **Função**: Lista todas as versões disponíveis para rollback
- **Como usar**:
  1. Vá em Actions → "List Available Rollback Versions"
  2. Clique em "Run workflow"
  3. Veja a lista no log do workflow

### 3. **Rollback Production** (Manual)

- **Função**: Reverte para uma versão anterior
- **Como usar**: Veja seções abaixo

## 🔄 Como Fazer Rollback

### Opção 1: Rollback para Última Versão

```
1. Actions → "Rollback Production"
2. Run workflow
3. Version: "latest" (padrão)
```

### Opção 2: Rollback para Versão Específica

```
1. Actions → "List Available Rollback Versions" → Run workflow
2. Copie a versão desejada do log (ex: "2.11.10")
3. Actions → "Rollback Production" → Run workflow
4. Version: "2.11.10"
```

## 🏗️ Como Funciona o Sistema

### Deploy Production Pipeline

```
deploy-dark (Build) → deploy-green (Reuso) → release (Semantic Release)
                ↓                              ↓
        Cria artefato build             Cria artefato rollback
```

### Artefatos Criados

- **Build artifacts**: `build-{version}` (90 dias de retenção)
- **Rollback artifacts**: `rollback-{version}` (365 dias de retenção)

### Benefícios

- ✅ **Build único**: Compilação apenas 1x por deploy
- ✅ **Consistência**: Mesmo build em todos os environments
- ✅ **Rollback rápido**: Sem necessidade de recompilação
- ✅ **Versionamento**: Artefatos organizados por versão
- ✅ **Discovery**: Lista automática de versões disponíveis

## 🛠️ Estrutura de Artefatos

```
Workflow Run #123 (v2.11.11)
├── build-2.11.11 (usado durante deploy)
└── rollback-2.11.11 (usado para rollback)

Workflow Run #122 (v2.11.10)
├── build-2.11.10 (expirado após 90 dias)
└── rollback-2.11.10 (disponível por 365 dias)
```

## 🚨 Troubleshooting

### Erro: "no matching workflow run found with any artifacts"

**Causa**: Versão não encontrada ou artefato expirado
**Solução**:

1. Execute "List Available Rollback Versions"
2. Use uma versão da lista retornada

### Erro: Version not available for rollback

**Causa**: Versão digitada incorretamente
**Solução**:

1. Verifique a lista de versões disponíveis
2. Use exatamente o formato listado (ex: "2.11.10")

### Dica: Use "latest"

Para sempre fazer rollback para a versão mais recente, use `latest` como versão.

## 📊 Monitoramento

- **Logs**: Cada workflow mostra versões disponíveis
- **Artefatos**: Visíveis na aba "Artifacts" de cada workflow run
- **Retenção**: Builds (90d), Rollbacks (365d)
