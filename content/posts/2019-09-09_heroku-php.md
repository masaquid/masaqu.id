---
date: 2019-09-09T11:50:56+09:00
thumbnail: images/posts/2019-09-09_eye-catch.png
title: HerokuでPHPを動かす
toc: false

# Categories:
#   技術, ゲーム, 自転車, ニュース, その他
# Tags:
#   ruby, php, golang, javascript
#   ruby on rails, laravel, hugo
#   github, netlify, heroku
#   自転車, ボードゲーム
categories:
 - "技術"
tags:
 - "PHP"
 - "composer"
 - "heroku"
---

# HerokuでPHPを動かす時のメモ

Heroku上でPHPを動かす時、依存関係とかに<code>composer</code>がなくても、
composer.jsonが無いとビルドに失敗する


プロジェクト直下に __空の__<code>composer.json</code> を置いておけば、デプロイ・ビルドに成功した

```
/composer.json


```

最近はもうPHPを触ることが殆どないので、あまり直面することはないだろうけど  
いつか同じエラーを見た時のために、残しておきます。

{{< ad >}}