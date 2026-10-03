---
kind: "work_record"
recordId: "cd9852bd-6f0f-4183-b31e-1030e495f56d"
status: "approved"
scope: "planned_change"
workKind: "DOCUMENTATION"
origin: "internal"
completionMode: "verified"
createdAt: "2026-10-03T16:04:07.578Z"
provenance:
    sourcePlans:
        - "4f74af05-0415-41d5-a00d-d587cc2b0fa4"
---
# Added RunWield privacy policy and footer link

## Summary

Added `/privacy` with all nine approved policy sections covering the harness and website, plus a shared footer link. The static page adds no client scripts. Fixed non-home header positioning to prevent mobile title overlap. RunWield Workflow Validation completed; build-content checks, four existing blog tests, and desktop and mobile browser checks passed. The page provides the policy URL needed for winget publication once deployed.

## Deferred Work

After merge and GitHub Pages deployment, confirm `https://runwield.dev/privacy` returns HTTP 200. Add the privacy URL to the winget manifest in the separate harness repository.

## Future Planning Notes

Keep the automatic GitHub update check disclosed alongside the no-telemetry claim. Policy updates must distinguish local storage from context sent directly to configured AI providers.