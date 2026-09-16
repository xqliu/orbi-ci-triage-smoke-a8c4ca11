# orbi-ci-triage-smoke

Smoke test repository for the Orbi beta end-to-end delivery flow.
This repository is safe for the Orbi runner to modify.

## Hello World

```
Hello World
```

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

## prod zero-touch e2e 2026-09-11

- 全链路 reset 后从零走通，tenant 由 OAuth 回调自动对账重建（系统 UUID，非手工插入）。
- 免单码路径：生产 Checkout 页无卡号字段、`Total due today` 为 0，订阅后 `plan` 由 `free` 变为 `founding_pilot`，零扣款。
- provisioning 与模型配置保存同一秒自动入队，`attempts=1` 一次成功，37 秒完成。

## prod zero-touch 2026-09-12

- 从生产库全量清空（10 张表）的零状态出发。
- 登录后 tenant 由系统自动对账重建，无手工插入。
- 订阅、模型配置、绑定仓库、开沙箱全程无人介入。

## prod zero-touch acceptance 2026-09-12 (DeepSeek)

- 起点是生产库 10 张表全部清空后的零数据状态，没有任何预置记录；首次登录即由系统自动对账，tenant 被重新建出来，而非人工插入。
- 整轮只使用同一份 DeepSeek provider 配置，中途没有人工调整过 provider、baseUrl 或 model，对账与后续流程都在这一份配置下完成。
- 沙箱资源配额由 provisioning 自动应用，无需人工填写或调整。

## 测试

本项目是 Node.js ESM 工程：运行时依赖 [`nanoid`](https://www.npmjs.com/package/nanoid) 与 [`zod`](https://zod.dev/)，测试使用 [`vitest`](https://vitest.dev/)。

```bash
npm install   # 安装依赖，生成 package-lock.json 与 node_modules/
npm test      # 运行 vitest 测试套件
```

真实执行结果（run c8d6b1a6）：

- `npm install zod`：成功，输出 `added 1 package, and audited 40 packages in 1s`、`found 0 vulnerabilities`，并把真实解析版本 `zod@4.6.2` 写入提交到仓库的 `package-lock.json`。`node_modules/` 仅存在于本地，已被 `.gitignore` 忽略、不入库。
- `npm test`：成功（exit 0），输出 `Test Files 2 passed (2)`、`Tests 8 passed (8)`，包含：
  - `tests/nanoid.test.mjs`（5 个既有用例）：`nanoid()` 默认 21 位 URL-safe id、自定义长度、1000 次调用唯一性、自定义字母表，以及非法长度抛错。
  - `tests/zod.test.mjs`（3 个新增用例）：object schema 解析合法输入并丢弃未知键、`safeParse` 对非法输入返回失败并给出出错字段路径 `['age']`、`z.coerce.number()` 把字符串 `'42'` 转成数字 `42`。
e2e n2n 104615
生产 e2e 193003 — v0.6.2 部署后验证
生产 UAT 09160823：引擎 v0.5.8 全程零干预验收
- 生产回测 09160631：orbi-cloud v0.6.10 晋级生产后交付链路验证通过
