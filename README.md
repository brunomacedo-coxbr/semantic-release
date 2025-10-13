# Semantic Release

```mermaid
flowchart TD
  %% --- SECTIONS ---
  subgraph DEV["🚧 Development (workflow_dispatch)"]
    BETA["Beta Environment<br/><code>environment: beta</code>"]
  end

  subgraph STG["🧪 Staging (branch: staging)"]
    DARK_NP["Dark NP<br/><code>environment: dark-np</code>"]
    GREEN_NP["Green NP<br/><code>environment: green-np</code>"]
    DARK_NP --> GREEN_NP
  end

  subgraph PROD["🚀 Production (branch: release/*)"]
    DARK_PROD["Dark Prod<br/><code>environment: dark-prod</code>"]
    GREEN_PROD["Green Prod<br/><code>environment: green-prod</code>"]
    RELEASE["Semantic Release & PR Sync<br/><code>environment: production</code>"]

    DARK_PROD --> GREEN_PROD
    GREEN_PROD --> RELEASE
  end

  %% --- FLOW RELATIONS ---
  BETA --> STG
  STG --> PROD

  %% --- STYLES ---
  classDef dev fill:#B3E5FC,stroke:#0288D1,color:#000,stroke-width:1px;
  classDef stg fill:#FFF9C4,stroke:#FBC02D,color:#000,stroke-width:1px;
  classDef prod fill:#C8E6C9,stroke:#2E7D32,color:#000,stroke-width:1px;

  class BETA dev
  class DARK_NP,GREEN_NP stg
  class DARK_PROD,GREEN_PROD,RELEASE prod
```

## Explicação

| Tipo de Deployment | Workflow File                       | Branch / Trigger           | Environments envolvidos            | Sequência                                              |
| ------------------ | ----------------------------------- | -------------------------- | ---------------------------------- | ------------------------------------------------------ |
| **Development**    | `.github/workflows/development.yml` | `workflow_dispatch` manual | `beta`                             | único job                                              |
| **Staging**        | `.github/workflows/staging.yml`     | `push → staging`           | `dark-np → green-np`               | dark antes de green                                    |
| **Production**     | `.github/workflows/production.yml`  | `push → release/*`         | `dark-prod → green-prod → release` | executa dark, depois green, e por fim semantic-release |
