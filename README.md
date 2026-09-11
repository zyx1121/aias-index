# AI App Store index

> The list of apps an AI PC can install. Publishing is a pull request.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](#license)

The [AI App Store](https://github.com/zyx1121/ai-app-store) indexes repositories, not images. An app is a git repo with an `aias.yaml` at its root, and this file is the list of repos the store offers. The user's machine clones and builds locally, which is what makes forking a published app possible.

## apps.yaml

```yaml
apps:
  - name: example-chat
    repo: https://github.com/zyx1121/aias-example-chat
    ref: main
    description: Chat with one local model, history in Postgres
    tags: [chat, example]
```

| Field | Required | Meaning |
|-------|----------|---------|
| `name` | yes | Same as `name` in the app's `aias.yaml`, unique in this index |
| `repo` | yes | HTTPS git URL, cloned by the store |
| `ref` | yes | Branch or tag to clone, a tag once the app has releases |
| `description` | yes | One line in the store listing |
| `tags` | no | For humans searching the store |
| `homepage` | no | When the project page is not the repo |

[`schema.json`](schema.json) is the normative form of that table.

## Publish an app

1. Make sure the repo has a valid `aias.yaml` and a `Dockerfile`, see [the manifest spec](https://github.com/zyx1121/ai-app-store/blob/main/PLAN.md#3-the-manifest).
2. Add one entry to `apps.yaml`, keeping the list sorted by `name`.
3. Open a pull request. CI validates the entry against `schema.json`, fetches the app's `aias.yaml` and builds its Dockerfile.

## License

[MIT](LICENSE) · the store is a text file until someone installs it.
