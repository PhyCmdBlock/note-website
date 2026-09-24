#!/usr/bin/env bash
# Run: sudo bash scripts/setup-linux-mount.sh
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo 'Run this script with sudo.' >&2; exit 1; }
project=/mnt/shared/Projects/note-website
native=/home/alice/.local/share/note-website/node_modules
target="$project/node_modules"
[[ -d "$native" && -d "$target" ]] || { echo 'Project/dependencies missing.' >&2; exit 1; }
mountpoint -q /mnt/shared || { echo 'Shared partition is not mounted.' >&2; exit 1; }
case "$(findmnt -n -o FSTYPE -T "$native")" in ext4|btrfs|xfs) ;; *) echo 'Dependencies must be on a Linux filesystem.' >&2; exit 1;; esac
entry="$native $target none bind,nofail,x-systemd.requires-mounts-for=/mnt/shared 0 0"
if ! grep -Fxq "$entry" /etc/fstab; then
  if grep -Fq "$target" /etc/fstab; then
    echo 'A different fstab entry already mentions this target; inspect it first.' >&2; exit 1
  fi
  backup=/etc/fstab.note-website.bak
  [[ ! -e "$backup" ]] || { echo "Backup already exists: $backup; inspect it first." >&2; exit 1; }
  cp -a /etc/fstab "$backup"
  printf '\n# Linux-native npm dependencies for shared VitePress notes\n%s\n' "$entry" >> /etc/fstab
fi
systemctl daemon-reload
if ! mountpoint -q "$target"; then mount "$target"; fi
[[ "$native" -ef "$target" ]] || { echo 'Mounted directory does not match native dependencies.' >&2; exit 1; }
findmnt -T "$target"
echo 'Linux dependency mount is ready.'
