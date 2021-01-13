#!/usr/bin/env sh

release() {
  # Clean node_modules
  rm -rf node_modules && rm -f yarn.lock

  # Install dependencies.
  yarn

  # Bump version.
  yarn version --no-git-tag-version --new-version ${1:-patch}

  # Get the new version number.
  local version=`grep -m1 version package.json | cut -d '"' -f4`

  # Create deploy branch.
  git checkout -b deploy/${version}

  # Generate changelog.
  github-changelog-generator --owner=uphold --repo=uphold-sdk-javascript --future-release=${version} > CHANGELOG.md

  # Build release
  yarn build

  # Add modified files.
  git add -f dist yarn.lock package.json CHANGELOG.md

  # Commit release with new version.
  git commit -m "Release ${version}"
}

release $1
