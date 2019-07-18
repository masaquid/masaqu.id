---
date: 2019-07-04T15:47:35+09:00
thumbnail: images/posts/2019-06-06_eye-catch.png
title: Hugoテーマ Robust の各英語表記を日本語にした
toc: false

# Categories:
#   開発関係のこと
#   趣味のこと
#   ニュース
#   その他
# Tags:
#   ruby, php, golang, javascript
#   ruby on rails, laravel, hugo
#   github, netlify
#   自転車
categories:
 - "開発関係のこと"
tags:
 - "golang"
 - "hugo"
---

# Hugoテーマ Robustの英語表記部分を日本語にしました

細かな事だけど、やってなかったので。  

現状はこのブログ改造のメモや、プログラム勉強のアウトプット記事ばかりなので英語アレルギーある人は少ないかもしれませんが、
やはり、日本語の記事を読みに来た人に、英語で表記しておく意味が1mmも無いので、日本語表記に修正しました

{{% ad %}}

* * *

編集に必要なファイルを <code>/layouts</code> 以下にコピー・作成し編集すること

## AUTHOR を なかのひと に

```
/layouts/partials/author.html

{{ with .Site.Params.author }}
<section class="sidebar">
  <header>なかのひと</header>

  ...
```

## LATESTS を 最新の投稿 に
```
/layouts/partials/latests.html

<section class="sidebar">
  <header>最新の投稿</header>

  ...
```

## CATEGORIES を カテゴリー に。TAGS を タグ に

Hugoのテンプレートで <code>case</code> とか使う方法がわからなかったので <code>if</code> でゴリゴリ書きました  
いい方法あったら教えてください

```
/lauouts/partials/taxonomy.html

<section class="sidebar">
  <header>
    {{ if eq .key "categories" }} カテゴリー
    {{ else if eq .key "tags" }} タグ
    {{ else }} {{ .key | upper }} {{ end }}
  </header>

  ...
```

## 記事末尾の previous... を過去の記事・次の記事 に

```
/layouts/_default/single.html
/layouts/_default/single.amp.html

...

    <div class="adj">
      <div class="mrow">
        {{ with .PrevInSection }}
        <div class="mcol c6">
          <header>前の記事</header>
          {{ .Render "li_sm" }}
        </div>
        {{ end }}
        {{ with .NextInSection }}
        <div class="mcol c6">
          <header>次の記事</header>
          {{ .Render "li_sm" }}
        </div>
        {{ end }}
      </div>
    </div>

```