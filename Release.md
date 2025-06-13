# Release process

## 0 step	

	- Run npm test.js - check results

## 1st step
	
	- Add changes to Changelog.md file
	- increase version of package.json file

## 2nd step
	
	1st - commit files to git
		>> git add -A
		>> git commit -m "message"
		>> git push

	2nd - publish tag
	commands:
		>> tag="1.0.56"
		>> git tag ${tag}
		>> git push origin ${tag}

## 3rd step
	
	launch release on git and npm:
		>> gh release create ${tag}

## 4th step
	
	npm publish