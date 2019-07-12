---
date: 2019-06-17T17:51:50+09:00
thumbnail: images/posts/2019-06-06_eye-catch.png
title: Hugo Robustテーマで よく考えたら LATESTS いらないので削除した
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
---

# サイドバーのLATEST削除しました
よくよく思えば、トップページに最近の投稿が表示されるので _LATESTS_ いらないじゃん？って気づいたので削除しました。 __※ 戻しました__

ちょっと調べると、<code>/layouts/partials/latests.html</code>に空のHTMLファイルをいれておくとか見たけどちょっと違う気がするので別の方法で削除しました

{{% ad %}}

* * *

サイドバーの表示項目はサイドバーの構成HTMLを適切に変更するべきだと思うので

```
/layouts/partials/sidebar.html

<aside class="l-sidebar">

  <div class="sections sidebar">
    {{ partial "author.html" . }}
    {{/* partial "latests.html" . */}} ※これを削除した
    {{ partial "categories.html" . }}
    {{ partial "tags.html" . }}
  </div>

</aside>
```

もちろん調べたら出てくるように、空の <code>latests.html</code> をアップしても同じっぽい動作するの確認しました

```
/layouts/partials/latests.html

{{/* 虚無 */}}
```

どっちでも良いのですが、いつか必要になった時に戻しやすいので _sidebar.html_ の変更に留めるのをオススメします

* * *

追記

結局、非表示にするのやめました。  
記事単体を表示してるときに _LATESTS_ が表示されない事に気づきました。

トップページには、最近の投稿以外の何かを表示するように工夫しないとですね、いつか考えます