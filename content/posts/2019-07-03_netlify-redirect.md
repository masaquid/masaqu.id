---
date: 2019-07-03T10:43:18+09:00
thumbnail: images/posts/2019-07-03_eye-catch_2.png
title: Netlifyでリダイレクトするには .htaccess じゃなくて _redirects
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
 - "golang"
 - "hugo"
 - "netlify"
---

過去のJekyllで作ったブログの記事は、既にサービスが終了してしまった旧Cloud9 (現AmazonAWS Cloud9)
環境に限定した記事が多かったので、現在のブログに記事を移したりしませんでした

ですが、当時のGoogleAnalyticsを見てみると、Railsに関する記事などが多少なりとも需要があったようなので自分用のメモとしても活用できるように
少しづつ、昔に書いた記事を復活させていくこととしました

* * *

過去記事へのリンクが現在はデッドリンクになってしまっているので、301リダイレクトをかけようとしたのですが、どうも <code>.htaccess</code> がNetlify上で動作していない様子

調べてみると、Netlifyでリダイレクトさせたい場合は、直下に <code>_redirect</code> のファイルを設置しなくてはいけないらしい  
<code>netlify.toml</code>に書くことも出来るようだ

<small>詳しいことはココに →</small> [Redirects | Netlify](https://www.netlify.com/docs/redirects/)

Hugoの場合は <code>/static</code> フォルダの直下に <code>_redirects</code> を配置する事となる  

* * *

記載は <code>.htaccess</code>に書くようなものよりかなりシンプル  

※ 公式ページから例を一部引用 

```
# 昔の記事(my-old-title) から 新しい記事(my-new-title) に転送する
/blog/my-old-title  /blog/my-new-title 
```

ステータスコードを指定出来る
末尾に <code>!</code> を追加する事で、転送元URLでが存在する場合も強制的にリダイレクト出来る

```
# /home へのアクセスを / に 301リダイレクト
/home         /              301

# /home が存在していても強制的に / に 301リダイレクト
/home         /              301
```

URL末尾のスラッシュ除去などには、リダイレクトではなく Netlify上から設定してくださいとのこと

[#Trailing-slash / Redirects  | Netlify](https://www.netlify.com/docs/redirects/#trailing-slash)


基本的なリダイレクトに関する所はこのぐらいか  
結構細かく設定できるようなので、また必要に応じて読み進める

* * *

リダイレクトのルールが正しく設定されているかは、ココで確かめられるよう  
[Netlify's playground](https://play.netlify.com/redirects)