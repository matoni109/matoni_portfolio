---
layout: post
title:  "Tig for newbs"
date:  2021-12-01 09:10:49 +1100
categories: jea
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
<sl-format-date date="{{page.date}}" month="long" day="numeric" year="numeric"></sl-format-date>
So you have been using `git log` for a bit to give you a graphical representation of your `git commits` like below, which is great if you have a mad appreciation of [ascii art](https://www.asciiart.eu/), and let's face it when faced with a boring lecture, who didn't get into it at some stage.

```
* | | cae63d5 - Merge branch 'master' of gitlab.com:gorails/jumpstart-pro (8 months ago) Chris Oliver
|\ \ \
| * \ \ 64bd2a1 - Merge branch 'tzdata-gem' into 'master' (8 months ago) Chris Oliver
| |\ \
| | * | | ccfdc01 - Rely on tzinfo-data instead of system package (8 months ago) Vlad Gorodetsky
| |/ / /
* / / / 1a96ed5 - Only add sentry-sidekiq if using sidekiq and sentry (8 months ago) Chris Oliver
|/ / /
* | | 0b09656 - Enable TailwindCSS JIT by default (8 months ago) Chris Oliver
```

The important take away here though is that there are tool out there other than ones like [Git Kraken](https://www.gitkraken.com/pricing) which I have used, **but** are not free for private repositories, which kind of makes them nerfed at 'work' as everything is on a private repo ```unless``` they will pay up the 💵 .

Enter the wonderous world of `tig` which is well and truely worth the price of admission ( it's free 😃 ), and slide across the image below to see what you get straight out of the box.

- graphical representation of your branches and commits same as `git log`.
-  `commit` author, `timestamp` & `git commit` message.
-  `git diff` & files change with lines altered.
<br>

```tig``` == 😄 🔥 ✨

<sl-responsive-media>

<sl-image-comparer  position="30">

<img  slot="before"  src="https://res.cloudinary.com/oeelsafe/image/upload/f_auto,q_auto/v1638313700/Screen_Shot_2021-12-01_at_10.05.55_am_mxujon.png"  alt="Original git log view.">

<img  slot="after"  src="https://res.cloudinary.com/oeelsafe/image/upload/f_auto,q_auto/v1638318651/Screen_Shot_2021-12-01_at_11.29.43_am_ivguz1.png"  alt="git tig view with diff showing.">

</sl-image-comparer>

</sl-responsive-media>




### a time to tig
So let's start to dig into just what exactly `tig` is and how it can help us in our day to day developer life.

From the [Tig man page](http://manpages.ubuntu.com/manpages/bionic/man1/tig.1.html):

> Tig is an ncurses-based text-mode interface for git(1). It functions mainly as a Git repository browser, but can also assist in staging changes for commit at chunk level and act as a pager for output from various Git commands.

So time to get cooking with `tig` for [**homebrew**](http://brew.sh/) users you can use below, otherwise check out the [install docs](https://jonas.github.io/tig/INSTALL.html).

```brew install tig```
#### now what.. ?
Well time to dive into what `tig` can do, to browse your latest commits jump into your latest branch via the command line and type

`tig` or `tig README.md` for an individual file

and you will be greeted with UI similar to below depending on your terminal theme for colours, a list of all of your commits, you can navigate up with `k` and down with `j`

<sl-responsive-media>
<img  src="https://res.cloudinary.com/oeelsafe/image/upload/f_auto,q_auto/v1638319330/Screen_Shot_2021-12-01_at_11.41.34_am_dsfqtf.png"  alt="Tig terminal initial view.">
</sl-responsive-media>

now you can 'drill' into this `commits` with a press of the `enter` key now as you can see below, you have access to the `git diff` also lines changed, holding down `enter` keeps you diving further through the `diff` until the end.

<sl-responsive-media>
<img  src="https://res.cloudinary.com/oeelsafe/image/upload/f_auto,q_auto:good/v1638319097/Screen_Shot_2021-12-01_at_11.37.35_am_htv8ls.png"  alt="Tig terminal view.">
</sl-responsive-media>

### the blame game

Sometimes you want to find out who changed an individual file, and why 🤷

`tig blame README.md`

Will sort that for you, now you can go through line by line of the code and see the `diff` who authored the changes, when, the why? Well they might not be apparent straight off the bat, but hopefully you get there ( apologies if it is my code.. ).

<sl-responsive-media>
<img  src="https://res.cloudinary.com/oeelsafe/image/upload/f_auto,q_auto/v1638320595/Screen_Shot_2021-12-01_at_12.02.05_pm_z0yfgg.png"  alt="Tig terminal view for Blame.">
</sl-responsive-media>

### is that it..?

Not in the slightest you might want to narrow the commits down to a specific date range, send below to tig:

```tig --after="2021-05-23" --before="2021-12-01" -- README.md```

### stash the tig

Not sure how many, or what you have in your naughty `git stash` corner ? ( i know i never do.. ), we get a visual idea of what code you might have given up on by just using

`tig stash`

Hopefully that has given you an insight into `tig` and how this valuable tool can enhance your workflow, and give you greater clarity on just what is going on in that `repo` in front of you 🥰


***references:***
-  [atlassian dev blog](https://www.atlassian.com/blog/git/git-tig)
-  [tig manual](https://jonas.github.io/tig/)
-  [open source blog](https://opensource.com/article/19/6/what-tig)
