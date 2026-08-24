# Infrastructure

Environment and deployment definitions:

- Local development environment contract (compose file for PostgreSQL and
  supporting services) arrives with the environment-contract phase.
- Production deployment/IaC definitions arrive with the deployment phase per
  `docs/DEPLOYMENT.md`.

Nothing in here should be referenced by application code.
