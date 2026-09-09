# orbi-ci-triage-smoke

Smoke test repository for the Orbi beta end-to-end delivery flow.
This repository is safe for the Orbi runner to modify.

## Delivery log

- 2026-09-08: README.md delivered by the Orbi runner sandbox on Lawrence (run ee86e768).

## Auto-provisioning

This repository's sandbox is auto-provisioned by orbi-cloud-provisioner on Lawrence (provisioning_requests succeeded with installation-token credentials, 2026-09-09).

## Release

Releases for this repository are executed by Orbi's release state machine, triggered by an Issue carrying the `ai-release` label. Version identifiers are git tags shaped like `v0.1.0`. The repository has no version metadata file, so a release modifies no source files (`version_file: none`).
