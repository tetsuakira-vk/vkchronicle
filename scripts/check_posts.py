import glob
import os
import re
import subprocess
import sys


def sh(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True).stdout


def added_posts():
    diff = sh("git diff --name-status HEAD~1 HEAD -- _posts")
    paths = []
    for line in diff.splitlines():
        parts = line.split("\t")
        if len(parts) == 2 and parts[0] == "A":
            paths.append(parts[1])
    return paths


def parse(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None
    fm, body = parts[1], parts[2].strip()
    m = re.search(r'^image:\s*"?(.*?)"?\s*$', fm, re.M)
    image = m.group(1).strip() if m else ""
    return {"body": body, "image": image}


def main():
    added = added_posts()
    output_path = os.environ.get("GITHUB_OUTPUT")

    def set_output(flagged):
        if output_path:
            with open(output_path, "a") as f:
                f.write(f"flagged={'true' if flagged else 'false'}\n")

    if not added:
        print("No new posts in this push.")
        set_output(False)
        return

    all_posts = glob.glob("_posts/*.md")
    flagged = {}

    for path in added:
        if not os.path.exists(path):
            continue
        data = parse(path)
        if data is None:
            continue
        issues = []
        if len(data["body"]) < 5:
            issues.append("empty article body")
        img = data["image"]
        if img and "placeholder" not in img:
            for other in all_posts:
                if other == path:
                    continue
                odata = parse(other)
                if odata and odata["image"] == img:
                    issues.append(f"image already used by {other}")
                    break
        if issues:
            flagged[path] = issues

    if not flagged:
        print("All new posts look good.")
        set_output(False)
        return

    os.makedirs("_drafts", exist_ok=True)
    print("Flagged posts (moved to _drafts/):")
    for path, issues in flagged.items():
        print(f" - {path}: {'; '.join(issues)}")
        dest = os.path.join("_drafts", os.path.basename(path))
        os.replace(path, dest)

    set_output(True)


if __name__ == "__main__":
    sys.exit(main())
