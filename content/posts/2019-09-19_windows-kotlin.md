---
date: 2019-09-19T09:43:11+09:00
thumbnail: images/posts/2019-09-19_eye-catch.png
title: Windows+VScode環境下でKotlinの導入・HelloWorldまで
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
 - "kotlin"
---

# Windows+VScodeの環境でKotlinを書けるようにするまでのメモ

この先、遠くない未来のウェアラブルデバイスに可能性しか感じていないので __Kotlin__ の勉強をはじめてます  
様々なデバイスに改革が起こるのは早くても2年後だと思うので、ゆっくりで。

ともあれ、とりあえずKotlinが動かせるようになるまでのメモ

* * *

## kotlinをダウンロードする

Zipファイルをダウンロード・解凍して適切な場所に配置。その後PATHを通すだけ   
Hugoとかのインストールと同じですね。最近こういうマニュアルインストール多いのかな

[GitHub Releases](https://github.com/JetBrains/kotlin/releases/latest) から  
_kotlin-compiler-VERSION.zip_ をダウンロード・回答する

今回は _C:\kotlinc_ に配置し、PATHに _C:\kotlinc\bin_ とした

build.txtとか必要ないや～ って消すとエラーでるので注意してください(戒め)

<br>
[Working with the Command Line Compiler](https://kotlinlang.org/docs/tutorials/command-line.html)  
[https://kotlinlang.org/](https://kotlinlang.org/)  

<br>
## kotlinインストール・バージョンチェック

```
$ kotlin -version
```

{{< img src="images/posts/2019-09-19_kotlin-cmd.png" >}}

動いた。

<br>
## VScodeにkotlin環境をセットアップ

Extensionから適当なものを入れるだけ

{{< img src="images/posts/2019-09-19_kotlin-vscode.png" >}}


<br>
## とりあえず Hello World してみる

[https://try.kotlinlang.org](https://try.kotlinlang.org) を参考に<small>(そのまま)</small> Hello world のコードを書いてみる

適当な所に __hello.kt__ を作成してコードを書く

```
fun main(args: Array<String>) {
    println("Hello, world!")
}
```

<code>kotlinc</code> でコンパイルする

```
$ kotlinc hello.kt
```

エラーがでなければOKで HelloKtってファイルが生成される  
とりあえずそのまま <code>kotlin</code> コマンドで実行する


```
$ kotlin HelloKt

Hello, world!
```

おしまい

* * *

Javaベースなのもあって、環境用意するのめんどくさそう……と食指が動かない状態でしたが、やってみると結構あっさりだった

[https://try.kotlinlang.org](https://try.kotlinlang.org)でサンプルコード見てるだけで結構参考になります
Javaと比べると本当に楽にコーディングできるし、色々捗りそう

