---
layout: post
title:  "Http and Http2"
date:  2022-01-04 09:10:49 +1100
categories: jea
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

##### In the beginning..
There was Hypertext Transfer Protocol, or HTTP, that know it well was versioned HTTP/1.1 in 1997, this predates the existence of [F.A.N.G](https://www.investopedia.com/terms/f/fang-stocks-fb-amzn.asp) by a long way. But what did it do, how does it work currently, and more importantly how will HTTP/2 change our current web applications & how we build them ?

#### Http/1.1 vs Http2 as a night out at two Http themed cocktail bars

To piece together a workable analogy for v1.1 think of yourself sitting at a table in fancy bar, you're with some friends as you're most likely not a software developer. Everyone orders a drink from the table ( or **client** ), we'll call this order the `GET` request to the quite dapper bartender behind the cocktail bar ( or **Server** )

Now in bar **Http/1.1** something slightly strange is about to happen, for the 3 different drinks that you have ordered, **_3 different waiters_** from the **server** are going to walk to your **client** table each with **one** drink on their tray each.

We you go to do the same thing next door at bar **Http2** everyone sits down and orders the same drinks, the waiter send the same `GET` request back to a slightly somehow even sexier bartender **Server**. Now the magic begins, only **_1 waiter_** returns with all **three** drinks on their tray.
But that is not how the `GET` request cookie crumbled until quite recently. The ability to get just one waiter turning up at your table leverages heavily the change from **Http/1.1** sending requests in a `String` based format to the ability of **Http2** to slice these requests up into a binary structure with streams.

> _"If you can break that into one initial request that takes 50ms, followed by 3 concurrent requests each taking 50ms, in the HTTP/2 example, you’ll only spend ~100ms on the full request, because the 3 x 50ms requests happen simultaneously over the 1 TCP connection. "_<br><br>
> \- [DHH](https://threadreaderapp.com/thread/1212929536918204417.html)

Below is **Http2's** Request Multiplexing in progress, vs **Http/1.1** having to serve all assets in different requests/pipelines.

<img  class="fit-picture" src="https://res.cloudinary.com/oeelsafe/image/upload/v1641278390/http1_http2_qpw3vo.png"  alt="Http/1.1 vs Http2 pipeline.">

### Http2 & the secret sauce and what that means for Rails apps going forward using Turbo

Yes, that is a very long heading, but mostly this is a [Ruby on Rails](#) blog so what exactly is Http2 going to do for me and my `Rails new App`

#### Request Multiplexing

> _"The second crucial change is that HTTP2 is now the norm. With HTTP2, you no longer pay a large penalty for sending many small files instead of one big file. A single connection can multiplex  all the responses you need. No more managing multiple connections, paying for multiple SSL handshakes. This means that bundling all your JavaScript into a single file loses many of its performance benefits (yes, yes, tree-shaking is still one)."_<br><br>
> \- [DHH](https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755)


#### Header compression

HPACK compresses each header value before it is transferred to the server, which then looks up the encoded information in a list of previously transferred header values to reconstruct the data.

<img  class="fit-picture" src="https://res.cloudinary.com/oeelsafe/image/upload/v1641283304/0_5r8-MbhEseP6lEQg_rl1rph.png"  alt="HPACK Http2 header compression">

#### Binary protocol

HTTP1.x processed text commands to complete request-response cycles. The latest version of HTTP has significantly evolved in terms of capabilities and attributes such as transforming from a text protocol to a binary protocol. HTTP/2 uses binary commands (in 1s and 0s) to perform the same tasks. This attribute simplifies implementation of commands that were confusingly entangled due to commands containing text and optional spaces.

The same text commands are converted into binary by HTTP/2-implemented browsers before being transmitted over the network

<img  class="fit-picture" src="https://res.cloudinary.com/oeelsafe/image/upload/v1641283684/0_0LtM_XmkauxVoY8M_lsielz.png"  alt="HPACK Http2 header compression">

This unlocks the capability of what Rails 7 has in store for us according to DHH, Http2 has allowed the use of [importmap-rails](https://github.com/rails/importmap-rails/) and [esbuild](https://github.com/evanw/esbuild) within Rails 7.0 along side with [Hotwire](https://hotwired.dev/) with [Turbo](https://github.com/hotwired/turbo-rails) & [Stimulus](https://stimulus.hotwired.dev/) to bring [React](https://reactjs.org/) style fidelity to Monolith Rails apps, or at least the promise of that eventuality.


***references:***
- [DHH on Rails 7](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-javascript-in-2021-8d68191b)
- [DHH on JS bundling](https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755)
- [Http by Factory](https://factoryhr.medium.com/http-2-the-difference-between-http-1-1-benefits-and-how-to-use-it-38094fa0e95b)
- [Digital Ocean](https://www.digitalocean.com/community/tutorials/http-1-1-vs-http-2-what-s-the-difference)


#### results by pictures

##### Sample Page:
<img  class="fit-picture" src="https://res.cloudinary.com/oeelsafe/image/upload/v1641278391/100_checks_xhpjal.png"  alt="HPACK Http2 header compression">

##### Http/1.1:
<img  class="fit-picture" src="https://res.cloudinary.com/oeelsafe/image/upload/v1641278391/http1_fc0cp6.png"  alt="HPACK Http2 header compression">


##### Http/2:
<img  class="fit-picture" src="https://res.cloudinary.com/oeelsafe/image/upload/v1641278391/http_2_kw5mal.png"  alt="HPACK Http2 header compression">

##### Http/2 w/ Server Push:
<img  class="fit-picture" src="https://res.cloudinary.com/oeelsafe/image/upload/v1641278393/http2_server_push_uy69c2.png"  alt="HPACK Http2 header compression">




