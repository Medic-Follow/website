"golden rules" - many small > few big commits - unrelated changes in separate commit

We encourage everyone to make heavy use of git status and git diff. Please always check before committing, what exactly you have changed. What we will not accept:

whole file content removed and added back: This most likely happens if you make great use of auto format, messing everything up. Another error source can be that something changed line endings.
empty lines containing spaces, or trailing spaces on line end (without technical reason) No big deal to fix, but time waste if we have to block your MR because of this.
multiple changes in one commit, that have nothing to do with each other It's great if you have fixed a typo in a comment at the other end of the file. But: What do you think happens, if five people fix the same typo in their commits? We would have four merge conflicts, needing manual work to fix this mess. So create a new ticket for what you found, instead of just doing it "as it doesn't hurt". It hurts, trust me.
commit messages not following [conventional commits][https://conventionalcommits.org] specifications.
"view diff of not yet tracked files" -> If you want to check a new file for flaws, sure git diff doesn't show anything. But you can add the file and before committing check with git diff --cached.

We use the [conventional commits][https://conventionalcommits.org] specification in this project, to auto generate a changelog with conventional-changelog: https://github.com/conventional-changelog/conventional-changelog.
"add only parts of changes in a file" -> As we want to have more small commits, than one single big one, it can be useful to split your changes into multiple commits, even inside the same file.

You can use git add -p [path|file]. This allows you to exactly decide which lines of your changes should be staged , before committing.

For the moment, only the members of MedicFollow are allowed the contribute for the website content.
