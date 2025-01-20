# Point of Comparison: ESLint Remote Tests

From the root `eslint/eslint` repository directory:

```shell
npm link
cd tests/remote
npm i
npm link eslint
npm run test:remote
```

This will intentionally output errors due to the `throw new Error(...)` in `for-direction`:

```plaintext

Full log:
[INFO] Cached repositories (2) at ./node_modules/eslint-remote-tester/.cache-eslint-remote-tester
[ERROR] reach/reach-ui crashed: for-direction
[ERROR] Worker crashed on reach/reach-ui
[ERROR] reach/reach-ui 2 errors
[ERROR] mui-org/material-ui crashed: for-direction
[ERROR] Worker crashed on mui-org/material-ui
[ERROR] mui-org/material-ui 2 errors
[DONE] Finished scan of 2 repositories
[INFO] Cached repositories (2) at ./node_modules/eslint-remote-tester/.cache-eslint-remote-tester
```
