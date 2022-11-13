# Contribution guide

This is an open source library. Feel free to contribute.

## Adding new libraries

Steps:

1. Generate the library using NX.
1. Add `CHANGELOG.md` to the library.
1. Copy and update `version`, `github` and `deploy` jobs from an older package.
1. Do the first deploy from the local environment `npx nx run {library}:version --releaseAs=major`
