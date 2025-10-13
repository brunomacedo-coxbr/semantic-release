# Semantic Release

```mermaid
flowchart LR
 subgraph DEV["Development"]
    direction TB
        dev_push["Manual Trigger<br><b>workflow_dispatch</b>"]
        beta_env["Beta Deploy<br><code>environment: beta</code>"]
  end
 subgraph STG["Staging"]
    direction TB
        push_staging["Push to <b>staging</b> branch"]
        dark_np["Deploy to Dark NonProd<br><code>environment: dark-np</code>"]
        green_np["Deploy to Green NonProd<br><code>environment: green-np</code>"]
  end
 subgraph PROD["Production"]
    direction TB
        push_release["Push to <b>release/*</b> branch"]
        dark_prod["Deploy to Dark Prod<br><code>environment: dark-prod</code>"]
        green_prod["Deploy to Green Prod<br><code>environment: green-prod</code>"]
        semantic_release["Semantic Release<br>Tagging, PR to <b>main</b> and <b>staging</b><br><code>environment: production</code>"]
  end
    dev_push --> beta_env
    push_staging --> dark_np
    dark_np --> green_np
    push_release --> dark_prod
    dark_prod --> green_prod
    green_prod --> semantic_release
    DEV -. Promote code<br>via Pull Request .-> STG
    STG -. Promote code<br>via Pull Request .-> PROD
     dev_push:::dev
     beta_env:::dev
     push_staging:::stg
     dark_np:::stg
     green_np:::stg
     push_release:::prod
     dark_prod:::prod
     green_prod:::prod
     semantic_release:::prod
    classDef dev fill:#B3E5FC,stroke:#0288D1,color:#111
    classDef stg fill:#FFF9C4,stroke:#FBC02D,color:#111
    classDef prod fill:#C8E6C9,stroke:#2E7D32,color:#111
```

## Explain

| Deployment      | File              | Trigger                    | Environments                       | Sequence                                   |
| --------------- | ----------------- | -------------------------- | ---------------------------------- | ------------------------------------------ |
| **Development** | `development.yml` | `workflow_dispatch` manual | `beta`                             | once                                       |
| **Staging**     | `staging.yml`     | `push → staging`           | `dark-np → green-np`               | green before dark                          |
| **Production**  | `production.yml`  | `push → release/*`         | `dark-prod → green-prod → release` | runs dark, green and then semantic-release |
