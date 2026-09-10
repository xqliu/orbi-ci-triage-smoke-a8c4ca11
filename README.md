# orbi-ci-triage-smoke

Smoke test repository for the Orbi beta end-to-end delivery flow.
This repository is safe for the Orbi runner to modify.

## Delivery log

- 2026-09-08: README.md delivered by the Orbi runner sandbox on Lawrence (run ee86e768).

## Auto-provisioning

This repository's sandbox is auto-provisioned by orbi-cloud-provisioner on Lawrence (provisioning_requests succeeded with installation-token credentials, 2026-09-09).

## Release

Releases for this repository are executed by Orbi's release state machine, triggered by an Issue carrying the `ai-release` label. Version identifiers are git tags shaped like `v0.1.0`. The repository has no version metadata file, so a release modifies no source files (`version_file: none`).

## Onboarding

This repository is delivered through orbi-cloud's hosted sandbox delivery, where each sandbox is provisioned automatically by orbi-cloud-provisioner. A delivery is triggered by an Issue carrying the `ai-ready` label. The sandbox uses the model provider configured by the tenant on the Cloud side.

## Clean Run 2026-09-10

- 从零 reset D1 后出发，未做任何手工初始化。
- 订阅与仓库绑定由流程自动完成，无需人工介入。
- 沙箱由 provisioner 自动开出（provisioning `succeeded/attempts=1`）。
