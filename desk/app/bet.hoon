/-  bet
/+  dbug, default-agent
|%
+$  state-0
  $:  %0
    =offers:bet  ::  most recent first
    =wagers:bet
  ==
+$  versioned-state
  $%  state-0
  ==
+$  card  card:agent:gall
--
::
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def  ~(. (default-agent this %|) bowl)
    main   ~(. +> [bowl ~])
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
    =<  abet
    ?+  mark  (on-poke:def mark vase)
      %bet-action   (handle-act:main !<(act:bet vase))
      %bet-message  (handle-msg:main !<(msg:bet vase))
    ==
  [cards this]
::
++  on-arvo  on-arvo:def
::  behn for reminders
++  on-agent  on-agent:def
++  on-peek  on-peek:def
::  client scries
++  on-watch  on-watch:def
::  client subscriptions
++  on-leave  on-leave:def
++  on-fail   on-fail:def
--
::
|_  [=bowl:gall cards=(list card)]
++  abet  [(flop cards) state]
++  main  .
++  emit
  |=  =card
  main(cards [card cards])
++  handle-act
  |=  =act:bet
  ^+  main
  ?+    -.act  main
      %make
    =.  id.offer.act  now.bowl
    =.  offers  (put:on:offers:bet offers [who.act now.bowl] offer.act)
    (send-message /new-offer who.act made+offer.act)
  ::
      %take
    =/  sent=offer:bet  (~(got by offers) which.act)
    ?>  (lte bet.act max.pick.sent)
    ?>  =(who.which.act src.bowl)
    =|  =wager:bet
    =.  wager
      %=  wager
        id    id.which.act
        who   src.bowl
        race  race.sent
        when  now.bowl
        pick  [side.pick.sent bet.act]
        heat  heat.sent
      ==
    =:  offers  +:(del:on:offers:bet offers which.act)
        wagers  (put:on:wagers:bet wagers which.act wager)
      ==
    (send-message /take-offer who.which.act taken+[id.which.act bet.act])
  ::
      %bitch  !!
  ::
      %claim
    =/  open=wager:bet  (~(got by wagers) which.act)
    ?^  game.open
      =.  foul.u.game.open  %lied  ::  TODO: update client on foul
      ::  issue with simultaneous claims resulting in accidental fouls?
      main
    =|  =score:bet
    =.  won.score  [src.bowl won.act]
    :: =.  game.open  `score
    ::  TODO: add behn timer
    =.  wagers  (put:on:wagers:bet wagers which.act open(game `score))
    (send-message /claim-result who.which.act claimed+[id.which.act won.act])
  ::
      %settle
    =/  open=wager:bet  (~(got by wagers) which.act)
    ?~  game.open  main
    ?^  tab.u.game.open  main
    =>  .(tab.u.game.open `(unit paid:bet)`tab.u.game.open)
    =.  tab.u.game.open  `paid.act
    =.  wagers  (put:on:wagers:bet wagers which.act open)
    (send-message /settle-wager who.which.act settled+[id.which.act paid.act])
  ::
      %clear
    =/  open=wager:bet  (~(got by wagers) which.act)
    ?~  game.open  main
    ?^  tab.u.game.open  main
    =>  .(tab.u.game.open `(unit paid:bet)`tab.u.game.open)
    =|  =paid:bet
    =.  when.paid  now.bowl
    =.  tab.u.game.open  `paid
    =.  wagers  (put:on:wagers:bet wagers which.act open)
    (send-message /settle-wager who.which.act cleared+[id.which.act])
  ==
::
++  send-message
  |=  [=wire who=@p =msg:bet]
  ^+  main
  (emit %pass wire %agent who^%bet %poke %bet-msg !>(msg))
::
++  handle-msg
  |=  msg:bet
  main
--