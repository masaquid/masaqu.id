---
date: 2019-06-11T18:09:13+09:00
thumbnail: images/posts/2019-06-06_eye-catch.png
title: Hugoで固定ページを作成し、コンテンツ一覧に表示させない
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

# Hugoで固定ページを作りたい
自己紹介用のページを作ろうとしたのですが（一応ポートフォリオサイトなので）  
通常通り <code>/content</code> 以下に作成してしまうと一覧に表示されてしまいます

表示されていても良いといえば良いのですが、数が増えてくるとやっかいなので  
今のうちに記事と固定ページの表示を分離することにしました

## はじめに
Hugoテーマ [Robust](https://github.com/dim0627/hugo_theme_robust) での設定方法で、テーマによっては違うやも

必要に応じて適宜読み替えてください

* * *
## 固定ページ用のフォルダを作成

今は <code>/content/posts/</code> 以下に記事を作成しているので、
<code>/content/pages/</code> フォルダを新たに作成し、そこに固定ページを作ることにしました

```
$ hugo new pages/about.md
```

トップページの一覧表示部分は <code>_default/list.html</code> で行っているので <code>/layouts/</code> 以下にコピーし、呼び出し部分を次の通りに変更する

```
/layouts/_default/list.html


<div class="articles">
  <div class="mrow">
    {{ $paginator := .Paginate (where .Data.Pages "Type" "posts") }}
    {{ range $paginator.Pages }}
    <div class="mcol c6">{{ .Render "li" }}</div>
    {{ end }}
  </div>
</div>
```

LATESTの所にも固定ページが紛れ込んできているので、こっちも合わせて修正

```
/layouts/partials/latests.html

<section class="sidebar">
  <header>LATESTS</header>
  <div>
    <div class="articles sm">
      {{ range $i, $p := first 10 (where .Site.RegularPages "Type" "posts") }}
      {{ .Render "li_sm" }}
      {{ end }}
    </div>
  </div>
</section>
```

これで一覧には表示されなくなった

後は、作った自己紹介ページへのリンクを適宜設定すれば良き  
今回の場合は、自己紹介ページなので AUTHOR 内のテキストからリンクするようにする

```
config.toml

[params.author]
  description = '<a href="/pages/about/">私のプロフィールはこちら</a>'
```

これで必要な設定は終了

