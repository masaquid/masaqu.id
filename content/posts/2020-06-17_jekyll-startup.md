---
date: 2020-06-17T11:13:09+09:00
thumbnail: images/posts/2020-06-17_eye-catch.png
title: Jekyll+Netlify環境でのブログセットアップ
toc: false

# Categories:
#   技術, ゲーム, 自転車, ニュース, Poker, その他
# Tags:
#   ruby, php, golang, javascript, kotlin
#   ruby-on-rails, sinatra, laravel, hugo
#   github, netlify, heroku, line-bot
#   自転車, ボードゲーム
categories:
 - "技術"
tags:
 - "ruby"
 - "jekyll"
---

## 本題の前に……

ゲーム攻略Wikiの一部閉鎖について案内する記事を書いたのですがコミット忘れてました！！  
改めて、一部抜粋して記載させていただきます。

[Magic: Manastrike 攻略Wiki 【マナストライク】](https://manastrike.xyz/)  

最低限の維持はしておりますが、継続的な更新は現状難しいので、別の更新者または他に管理される方がいたらソースごとお渡しする事も考えています。

manastrike.xyz のドメイン有効期限が __2021年02月13日__ までとなり、失効後は何らかの形で運用するかそのまま閉じるか現時点では未定です。

もし希望される方がいたらコメントまたは [Twitter@masaquid](https://twitter.com/home) までご連絡お願いします 


# Jekyll+Netlify環境でのブログセットアップ

そんなこんなもありながら、新しくJekyllのブログを立ち上げました。  
Jekyllブログの立ち上げに必要な情報とカスタマイズについて、未来の自分のためにまとめておきます。

### Jekyl
[http://jekyllrb-ja.github.io/docs/](http://jekyllrb-ja.github.io/docs/)  

```
bundle init
```

_bundle init_ して、Gemfileにjekyllを追加

```
# Gemfile

gem "jekyll"
```

Githubにリポジトリを作成してローカルにClone  
Cloneしたプロジェクト直下に、Jekyll newする

```
$ jekyll new . --force
```

### Netlify
Netlifyのbuild-command

_Build command_ jekyll build  
_Publish Directory_ _site/  

### その他
Jekyll Themes  
http://jekyllrb-ja.github.io/docs/themes/  
http://jekyllthemes.org/

layout作る時は  
http://jekyllrb-ja.github.io/docs/layouts/  

ドメイン運用する時  
私のブログに昔書いた記事がありました  
https://masaqu.id/posts/2019-06-07_netlify-cloudflare/
