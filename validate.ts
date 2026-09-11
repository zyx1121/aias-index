// Checks apps.yaml against schema.json, then checks the two things a schema
// cannot: names are unique, and every repo answers.
import Ajv from "ajv/dist/2020";
import addFormats from "ajv-formats";
import { parse } from "yaml";

const schema = await Bun.file("schema.json").json();
const index = parse(await Bun.file("apps.yaml").text());

const ajv = addFormats(new Ajv({ allErrors: true, strict: true }));
const validate = ajv.compile(schema);

if (!validate(index)) {
  console.error("apps.yaml does not match schema.json:");
  for (const error of validate.errors ?? []) {
    console.error(`  ${error.instancePath || "/"} ${error.message}`);
  }
  process.exit(1);
}

const names = new Set<string>();
let failed = false;

for (const app of index.apps as { name: string; repo: string; ref: string }[]) {
  if (names.has(app.name)) {
    console.error(`duplicate name: ${app.name}`);
    failed = true;
  }
  names.add(app.name);

  const response = await fetch(app.repo, { method: "HEAD" });
  if (!response.ok) {
    console.error(`${app.name}: ${app.repo} answered ${response.status}`);
    failed = true;
    continue;
  }
  console.log(`${app.name}: ${app.repo}@${app.ref} ok`);
}

if (failed) process.exit(1);
console.log(`${index.apps.length} app(s) valid`);
