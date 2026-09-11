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

## Perfect Run 2026-09-10

- 全程零手工介入：从 D1 reset 后的零状态出发，注册、订阅、绑定、自动 provision 一气呵成，无任何 adhoc 修改。
- tenant 由系统自动对账重建：登出走 `/api/logout`，tenant 由 OAuth 回调自动对账，provider 与模型从下拉选择。
- 沙箱由 provisioner 自动开出：host-provisioner 由 sync timer 自动保持最新，沙箱 runner 独立完成一次真实交付。

## Production Launch 2026-09-10

- 生产控制面 `orbi.build/api*` 与营销站 `orbi.build/*` 共享同一主机名，通过同一域名提供服务。
- 沙箱宿主机为独立云主机，而非个人开发机，由 orbi-cloud-provisioner 自动管理。
- 本次交付由生产环境的 GitHub App `orbi-build` 驱动，通过官方生产控制面完成部署与验证。

## beta e2e 2026-09-11

- 免单码路径：应用 100% off 促销码后 Checkout 的 `Total due today` 为 0，且不再索要信用卡，全程无卡完成订阅。
- 模型配置：provider 下拉选择后 baseUrl 自动填入，model_id 下拉随之联动，三级均在界面可见。
- 沙箱 provisioning：一次成功（`attempts=1`），`orbi.toml` 与 `pi-providers.json` 中的 provider/model 一致。

## prod e2e 2026-09-11

- 免单码路径：生产 Checkout 页 `Total due today` 为 0，页面无卡号字段（服务端按 promotion_code id 施加，cloud#259 绕行）。
- 模型配置三级联动：选 DeepSeek 后 baseUrl 自动填入、model_id 列表刷新为 `deepseek-v4-pro` / `deepseek-flash`。
- provisioning：`attempts=1` 一次成功，`orbi.toml` 与 `.orbi/pi-providers.json` 两处配置一致。

## prod perfect e2e 2026-09-11

- 全链路 reset 后从零走通，tenant 由 OAuth 回调自动对账重建（系统 UUID，非手工插入）。
- 免单码路径：生产 Checkout 页 `Total due today` 为 0、页面无卡号字段，订阅后 `plan` 由 `free` 变为 `founding_pilot`，零扣款。
- provisioning 与模型配置保存同一秒自动入队，`attempts=1` 一次成功，`orbi.toml` 与 `.orbi/pi-providers.json` 两处配置一致。
