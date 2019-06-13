---
date: 2019-06-06T16:00:00+09:00
thumbnail: images/posts/2019-06-06_eye-catch.png
title: Github-PagesからNetlify＋Hugoに移行しました
toc: true
categories:
 - "Hugo"
 - "Netlify"
---

# Netlify＋Hugo環境に移行しました
以前は Github-Pages＋Jekyll 環境でブログっぽいものを作っていたのですが、もう少しポートフォリオサイトらしく・かつシンプルにリニューアルを計画し、Golangの勉強も兼ねて Hugo を採用する事にしました。

Windows環境下で編集出来るようセットアップしたので、その記録を残しておきます

* * *

## WindowsにHugoをインストール

Hugoのインストールはバイナリをダウンロードして配置、パスを通すだけ  

[Releases・gohugoio/hugo・Github](https://github.com/gohugoio/hugo/releases)  
ここから最新版のWindows向けをダウンロードする

<code>C:\Hugo</code> 以下に <code>Sites</code> と <code>bin</code> のフォルダを作成  

{{% img src="images/posts/2019-06-06_hugo-install.png" %}}

<code>bin</code> 以下にダウンロードしてきたバイナリを配置

環境変数のPATHに <code>C:\Hugo\bin</code> を追加しておしまい。

```
$ setx PATH "PATH=%PATH%;C:\Hugo\bin"
```

インストール確認でHugoのバージョンチェック
```
$ hugo version
```

* * *

## Githubリポジトリの準備

好きな名前でHugo用リポジトリを作成する 

リポジトリを作ったら clone するために適当なファイルを作って一度 commit するのですが面倒くさいので、そのままブラウザ上からREADMEファイル作って保存

{{% img src="images/posts/2019-06-06_start-repo1.png" %}}

中身はなんでも良いので、そのままページ下部の __Commit new file__ して終了

{{% img src="images/posts/2019-06-06_start-repo2.png" %}}

* * *

## Windows環境下にcloneする
 
ちゃんとコマンドライン使っても勿論良いのですが  
Windows の Github-Desktop が楽で気に入ってるのでGithub-Desktop のキャプチャ載せておく

{{% img src="images/posts/2019-06-06_clone-repo.png" %}}

* * *

## Hugoでサイト・記事を作る

<code>hugo site new SITENAME</code> すると、新しくフォルダが作られてしまい階層が深くなっていやなので、現在ディレクトリに直接作成したい

新しくディレクトリを作成しない場合や既にファイルが存在する場合はエラー吐くので
<code>-\-force</code> フラグをつけて、エラー回避する
```
$ hugo new site . --force
```

### とりあえず最初の記事を書いてみる
<code>hugo new PATH/TITLE.md</code> のコマンドを叩く事で  
<code>content/PATH</code> フォルダの中に <code>TITLE.md</code> が作成される

```
$ hugo new posts/first-post.md
```

### 毎回ファイル名をつけてコマンド打つのが面倒なのでバッチファイル化する

<code>content/posts</code> 以下に 記事ファイルが大量に入ることを考えると日付でソート出来るようにしたい  
年月日で階層化しても良いが、とりあえず今回はファイル名に <code>YYYY-MM-DD_TITLE.md</code> と年月日を入れることで整理する方針にした

となると毎回日付を打ち込むのが面倒くさいので、簡単なバッチファイルを書いた

``` 
[new.bat]

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
これで、このディレクトリ内で <code>new</code> を叩くだけで記事を作ってくれるように

* * *

## Netlifyでホスティングする

Github-Pagesでホスティングしようとして何日も進まずイライラしてたのだけど、Netlifyでホスティングを試みたら5分で終了しました。  
Netlifyは神ですね


ログインして最初のページで __New site from Git__ を押下する

{{% img src="images/posts/2019-06-06_start-netlify1.png" %}}

するとリポジトリの選択画面が出るので、今回作ったリポジトリを選択する

{{% img src="images/posts/2019-06-06_start-netlify2.png" %}}

設定を入れるところが出るので、適切に入力する  
今回の場合 <code>public</code> を生成してくれる <code>hugo</code> コマンドと、生成されたHTMLのディレクトリ <code>public</code> を指定

{{% img src="images/posts/2019-06-06_start-netlify3.png" %}}

終わり  
Netlifyは神ですね

あとは、同画面で指定したブランチ (master) に push/merge されたらビルドコマンドを走らせてくれるようです

### 公開されるURLを変更する

デフォルトで割当られるURLが適当なので、好きな名前に変更する

__Site settings__ を押下し

{{% img src="images/posts/2019-06-06_edit-netlify1.png" %}}

__Change site name__ を押下し

{{% img src="images/posts/2019-06-06_edit-netlify2.png" %}}

好きな名前を入力するだけ

{{% img src="images/posts/2019-06-06_edit-netlify3.png" %}}

* * *

### baseURLの設定

CSSの取得URLが <code>config.toml</code> の <code>baseURL</code> を基準に作られているので、環境に応じて適切な <code>baseURL</code> を設定してあげないといけない

```
baseURL = "https://masaquid.netlify.com"
```

Netlify なら Netlify の、独自ドメインなら独自ドメインのbaseURLに修正して commit する

* * *

### 独自ドメインの設定

Netlify＋CloudFlare校正で独自ドメイン化・Https化したのでメモしておいた

[Hugo＋Netlify＋CloudFlareで独自ドメインのhttps化](https://masaqu.id/posts/2019-06-07_netlify-cloudflare/)
