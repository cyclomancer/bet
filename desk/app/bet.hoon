/-  *bet
/+  dbug
|%
+$  state-0
  $:  %0
    $=  offers
      sent=(map @p (list offer))
      recd=(map @p (list offer))
      puss=(map @p (list offer))
    ==
    $=  wagers
      open=(map @p (list wager))
      over=(map @p (list wager))
    ==
  ==
+$  versioned-state
  $%  state-0
  ==
::
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def  ~(. (default-agent this %|) bowl)
    hc   ~(. +> bowl)
::
++  on-init
  ^-  (quip card _this)
  `this(state *state-0)
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  `this(state !<(versioned-state old-state))
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  =^  cards  state
  ?+  mark  (on-poke:def mark vase)
    %bet-action   (handle-act:hc !<(bet-act vase))
    %bet-message  (handle-msg:hc !<(bet-msg vase))
  ==
::
++  on-arvo
::  behn for reminders
++  on-agent  on-agent:def
++  on-peek
::  client scries
++  on-watch
::  client subscriptions
++  on-leave  on-leave:def
++  on-fail   on-fail:def
--
::
|_  =bowl:gall
++  handle-act
|=  act=bet-act
^-  (quip card _state)
?+  -.act  `this
    %make
  :_
  %=  state
    idx         +(idx)
    sent.offers (~(put by sent) who.act offer.act)
  ==
  [%pass ~[/new-offer] %agent who.act^%bet %poke %bet-msg !>(made+offer.act)]~
::
    %take
  =+  sent=(~(get by sent.offers) who.act)
  =+  off=(snag id.act his-sent)
  ?>  (lte bet.act max.pick.off)
  =+  active=(~(get by open.wagers) who.act)
  =|  =wager
  =.  wager
    %=  wager
      id    id.act
      race  race.off
      when  now.bowl
      pick  [side.off bet.act]
      heat  heat.off
    ==
  :_
  %=  state
    sent.offers  (oust id.act 1 his-sent)
    open.wagers  (~(put by open.wagers) who.act (snoc active wager))
  ==
  :~  :*  %pass   ~[/take-offer]
          %agent  who.act^%bet
          %poke   %bet-msg  !>(taken+[id.act bet.act])]
  ==  ==
  ::
    %claim
  =/  open  (~(get by open.wagers) who.act)
  =/  it  game:(~(get by open) id.act)
  ?^  it
    `this
  =|  =score
  =.  it  `score(won won.act)
  :_
  state(open.wagers (~(put by open) id.act it))
  :~  :*  %pass   ~[/claim-result]
          %agent  who.act^%bet
          %poke   %bet-msg  !>(claimed+[id.act won.act])
  ==  ==
::
%settle
::
%clear
==
::
++  handle-message
