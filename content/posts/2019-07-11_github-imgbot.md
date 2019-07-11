---
date: 2019-07-09T18:33:04+09:00
thumbnail: images/posts/2019-07-11_eye-catch.png
title: Github上の画像を自動圧縮してくれるImgBot導入した
toc: false

# Categories:
#   開発関係
#   趣味・ゲーム
#   ニュース
#   その他
# Tags:
#   ruby, php, golang, javascript
#   ruby on rails, laravel, hugo
#   github, netlify
#   自転車
categories:
 - "開発関係"
tags:
 - "github"
 - "github-app"
---


# Github上の画像を自動圧縮してくれるImgBot導入した

ブログ的に使ってるとリポジトリの画像重たすぎるよなぁ…外部サーバ探そうかな、とか思ってたら良いサービスがあった 

__IMGBOT__  
_A GitHub app that optimizes your images_  
[https://imgbot.net](https://imgbot.net)

* * *

## リポジトリ上の画像を自動圧縮してpull requestしてくれる奴

便利ですね。HugoとかJekyll使ってる人はすごく良さそう  
早速導入してみることにした

<br>

[Github Marketplace](https://github.com/marketplace) で無料公開されてます  
[https://imgbot.net](https://imgbot.net)

Githubとの連携は、ポチポチ押すだけで何も無いので割愛

## ImgBotの設定

色々と設定ファイルが書けるので、書く  
[ImgBot / Documentation](https://imgbot.net/docs/)


このブログは更新頻度も高く無いので、週１にスケジュール  
サービスとかと違って、画像は荒くなっても構わないので圧縮率をあげるべく
<code>aggressiveCompression</code> を <code>true</code>に  
圧縮されたくないロゴとかは <code>ignoredFiles</code> に設定

こんな感じでブログに合わせて設定しました 

ドキュメントめっちゃ簡単で読みやすいです
```
{
    "schedule": "weekly",
    "aggressiveCompression": "true",
    "ignoredFiles": [
        "/static/avatar.png",
        "/static/logo.png"
    ]
}
```

## Pull Request

実際にプルリクきた

{{% img src="images/posts/2019-07-11_imgbot-pullrequest.png" %}}

画像にもよりますが、結構圧縮されてる・・・しゅごい