---
date: 2019-11-06T09:14:09+09:00
thumbnail: images/posts/2019-11-06_eye-catch.jpg
title: Windows環境下でのeventmachineインストールでコケる話
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
 - "windows"
---

# Windows環境下でのeventmachineインストールでコケる

調べてみたら、散見されるエラーに私も直面したのでメモ __(未解決です)__

国内外問わず、結構エラー＆解決しない報告あるようで  

詳しくない私は、見つかったそれらしい情報を片っ端から試してみる

* * *

## トラブル発生！ middleman server した時にエラー

Middlemanが起動こそしてるものの、EventMachine C extension とエラーが出ている

```
$ bundle exec middleman server
Unable to load the EventMachine C extension; To use the pure-ruby reactor, require 'em/pure_ruby'
Unable to load the EventMachine C extension; To use the pure-ruby reactor, require 'em/pure_ruby'
== The Middleman is loading
Unable to load the EventMachine C extension; To use the pure-ruby reactor, require 'em/pure_ruby'
Unable to load the EventMachine C extension; To use the pure-ruby reactor, require 'em/pure_ruby'
== View your site at "http://HOSTNAME.local:4567", "http://192.168.0.1:4567"
== Inspect your site configuration at "http://HOSTNAME.local:4567/__middleman", "http://192.168.0.1:4567/__middleman"
```

ridkのバージョン情報を確認

```
$ ridk version
---
ruby:
  path: C:/Ruby26-x64
  version: 2.6.3
  platform: x64-mingw32
ruby_installer:
  package_version: 2.6.3-1
  git_commit: 779b05c
msys2:
  path: C:\Ruby26-x64\msys64
cc: x86_64-w64-mingw32-gcc (Rev2, Built by MSYS2 project) 9.2.0
os: Microsoft Windows [Version 6.1.7601]
```

ridk 再インストールも試してみたが変化は無し。

```
$ ridk install 1 2 3
```
* * *

<code>platform=ruby</code>をつけて、gem eventmachineの再インストールをする事で解決すると各所に書いてあるので試してみた

```
$ gem uninstall eventmachine
$ gem install eventmachine --platform=ruby
```

eventmachineのインストール時にそもそもエラーが発生

```
current directory: C:/Ruby26-x64/lib/ruby/gems/2.6.0/gems/eventmachine-1.2.7/ext
C:/Ruby26-x64/bin/ruby.exe -I C:/Ruby26-x64/lib/ruby/2.6.0 -r ./siteconf20191106-9308-56urn.rb extconf.rb
checking for -lcrypto... no
checking for -lssleay32... no
checking for -lcrypto... no
checking for -lssleay32... no
checking for -lcrypto... no
checking for -lssleay32... no
checking for -lcrypto... no
checking for -lssleay32... no
checking for rb_trap_immediate in ruby.h,rubysig.h... no
checking for rb_thread_blocking_region()... no
checking for rb_thread_call_without_gvl() in ruby/thread.h... yes
checking for rb_thread_fd_select()... yes
checking for rb_fdset_t in ruby/intern.h... yes
checking for rb_wait_for_single_fd()... yes
checking for rb_enable_interrupt()... no
checking for rb_time_new()... yes
checking for inotify_init() in sys/inotify.h... no
checking for __NR_inotify_init in sys/syscall.h... no
checking for writev() in sys/uio.h... no
checking for pipe2() in unistd.h... no
checking for accept4() in sys/socket.h... no
checking for SOCK_CLOEXEC in sys/socket.h... no
checking for windows.h... yes
checking for winsock.h... yes
checking for -lkernel32... yes
checking for -lrpcrt4... yes
checking for -lgdi32... yes
checking for getaddrinfo()... yes
checking for clock_gettime()... yes
checking for CLOCK_MONOTONIC_RAW in time.h... no
checking for CLOCK_MONOTONIC in time.h... yes
CXXFLAGS=-march=x86-64 -mtune=generic -O2 -pipe -Wall -Wextra -Wno-deprecated-declarations -Wno-ignored-qualifiers -Wno-unused-result -Wno-address
creating Makefile

current directory: C:/Ruby26-x64/lib/ruby/gems/2.6.0/gems/eventmachine-1.2.7/ext
make "DESTDIR=" clean

current directory: C:/Ruby26-x64/lib/ruby/gems/2.6.0/gems/eventmachine-1.2.7/ext
make "DESTDIR="
generating rubyeventmachine-x64-mingw32.def
compiling binder.cpp
compiling cmain.cpp
compiling ed.cpp
compiling em.cpp
compiling kb.cpp
compiling page.cpp
compiling pipe.cpp
compiling rubymain.cpp
compiling ssl.cpp
linking shared-object rubyeventmachine.so
C:/Ruby26-x64/msys64/mingw64/bin/../lib/gcc/x86_64-w64-mingw32/9.2.0/../../../../x86_64-w64-mingw32/bin/ld.exe: em.o:em.cpp:(.text+0x14a5): undefined reference to `__chk_fail'
collect2.exe: error: ld returned 1 exit status
make: *** [Makefile:261: rubyeventmachine.so] エラー 1

make failed, exit code 2
```

MSYS関係でコケてるっぽい？gcc周りでエラー出てる感じ

```
$ gcc --version
'gcc' は、内部コマンドまたは外部コマンド、
操作可能なプログラムまたはバッチ ファイルとして認識されていません。
```

minGW をインストールし gcc/g++ をWindows環境下に導入
[http://www.mingw.org/](http://www.mingw.org/)

minGW/MSYS の設定・インストール方法は割愛

* * *

eventmachineを一度アンインストール

```
$ gem uninstall eventmachine
```

eventmachineのソースをgithubから持ってくる

```
$ git clone https://github.com/eventmachine/eventmachine.git
$ cd eventmachine
```

<code>ext/extconf.rb</code> と <code>ext/fastfilereader/extconf.rb</code> でコンパイラに g++ 指定

```
CONFIG['CXX'] = "g++"
```

gemパッケージ化する  

ついでにパッケージ化に必要なgemもインストール

```
$ gem install rake
$ gem install rake-compiler

$ rake gem
```

パッケージ化したgemを使ってeventmachineをインストール
```
$ gem install --local pkg/eventmachine-1.3.0.dev.1.gem --platform=ruby
```

結果一緒……    
とりあえずここまで。断念。  
エラーの原因が分かってないから対処出来ない雑魚ッパ

とりあえず <code>wdm</code> と <code>tz-info</code> をコメントアウトして無理やり動かしてます
解決したら纏めておきます

Ubuntu環境下で OpenSSL のビルドをやり直すことで解決したとの声もありますが、こちらは試していません 
[Ubuntuでgem install eventmachine したい話](http://syoshinsyakangeisagi.blogspot.com/2014/08/ubuntugem-install-eventmachine.html)


{{< ad >}}