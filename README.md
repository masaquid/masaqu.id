![2019-06-06_eye-catch](https://user-images.githubusercontent.com/28913751/59395279-1fe64c80-8dbe-11e9-98c2-18ca27ce75ea.png)

# Hugo使ってみた
ある日Jekyllブログからポートフォリオサイトに変更しようと思いたち「そうだ、Hugoに乗り換えだ～！」と息巻いて作業を進めたはずが、気がついたらまたブログになってた 

気づいたことや興味のある事のほか、言語学習で出来た副産物や、仕事用にちょっと作ったマイクロなアプリケーションとかを公開したりする

[http://masaqu.id](http://masaqu.id)

* * *
## テーマは Robust 使ってます
[Hugo-Theme Robustを採用・カスタマイズ](https://masaqu.id/posts/2019-06-11_robust-customize/)  
元々ブログを作りたかったわけではないので、乗り換えるかもしれませｎ

* * *
## hugo new posts/YYYY-MM-DD_TITLE.md するのが面倒くさい

Windowsで更新してるのでバッチファイルにした  

```
@echo off

set Y=%DATE:~0,4%
set M=%DATE:~5,2%
set D=%DATE:~8,2%

if "%1" == "" (
  set TITLE=untitled
) else (
  set TITLE=%1
)
hugo new posts/%Y%-%M%-%D%_%TITLE%.md
```

* * *
## Githubの主要言語を Go にしたかった
でも無理だった go言語のソースがなかった

```
./.gitattributes
# 書くことない
```

* * *