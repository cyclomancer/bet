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
    ==
  [cards this]
::
++  on-arvo  on-arvo:def
::  behn for reminders
++  on-agent  on-agent:def
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-peek:def src.bowl)
      [%x %all ~]
    ``bet-state+!>(state)
  ==
::  client scries
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+  path  (on-watch:def path)
    [%updates ~]  `this
  ==
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
++  give-update
  |=  =which:bet
  ^+  main
  =;  =update:bet
    (emit %give %fact ~[/updates] %bet-update !>(update))
  ?^  wag=(get:on:wagers:bet wagers which)
    [%| u.wag]
  [%& (got:on:offers:bet offers which)]
++  handle-act
  |=  =act:bet
  ^+  main
  =-  (give-diff:- which.act)
  ?+    -.act  main
      %make
    ?:  =(src.bowl our.bowl)
      ?>  =(^ who.act)
      =.  source.offer.act  %sent
      =.  offers  (put:on:offers:bet offers [u.who.act id.offer.act] offer.act)
      (send-message /make who.act make+[~ offer.act])
    ?>  =(~ (~(get by offers) [src.bowl id.offer.act]))
    =.  source.offer.act  %recd
    =.  offers  (put:on:offers:bet offers [src.bowl id.offer.act] offer.act)
    (give-update which.act)
  ::
      %take
    ?>  |(=(src.bowl our.bowl) =(src.bowl who.which.act))
    =/  =offer:bet  (~(got by offers) which.act)
    ?>  (lte bet.act max.pick.offer)
    =|  =wager:bet
    =.  wager
      %=  wager
        id    id.which.act
        who   who.which.act
        race  race.recd
        when  now.bowl
        heat  heat.offer
      ==
    =?  pick.wager  =(status.offer %sent)
      [side.pick.offer bet.act]
    =?  pick.wager  =(status.offer %recd)
      [!side.pick.offer bet.act]
    =.  wagers  (put:on:wagers:bet wagers which.act wager)
    ?.  =(src.bowl our.bowl)
      (give-update which.act)
    (send-message /take who.which.act take+[[our.bowl id.which.act] bet.act])
  ::
      %bitch
    ?>  |(=(src.bowl our.bowl) =(src.bowl who.which.act))
    =/  =offer:bet  (~(got by offers) which.act)
    =.  bitch.offer  %.y
    =.  offers  (put:on:offers:bet offers which.act offer)
    ?.  =(src.bowl our.bowl)
      (give-update which.act)
    (send-message /bitch who.which.act bitch+[our.bowl id.which.act])
  ::
      %claim
    ?>  |(=(src.bowl our.bowl) =(src.bowl who.which.act))
    =/  open=wager:bet  (~(got by wagers) which.act)
    ?^  game.open
      ?:  =(src.bowl our.bowl)
        main
      =.  foul.u.game.open  %lied  ::  TODO: update client on foul
      ::  issue with simultaneous claims resulting in accidental fouls?
      main
    =|  =score:bet
    =.  won.score  [src.bowl won.act]
    ::  TODO: add behn timer
    =.  wagers  (put:on:wagers:bet wagers which.act open(game `score))
    ?.  =(src.bowl our.bowl)
      (give-update which.act)
    =.  who.which.act  our.bowl
    (send-message /claim who.which.act claim+[which.act won.act])
  ::
      %settle
    ?>  |(=(src.bowl our.bowl) =(src.bowl who.which.act))
    =/  open=wager:bet  (~(got by wagers) which.act)
    ?~  game.open  main
    ?^  tab.u.game.open  main
    =>  .(tab.u.game.open `(unit paid:bet)`tab.u.game.open)
    =.  tab.u.game.open  `paid.act
    =.  wagers  (put:on:wagers:bet wagers which.act open)
    ?.  =(src.bowl our.bowl)
      (give-update which.act)
    =.  who.which.act  our.bowl
    (send-message /settle who.which.act settle+[which.act paid.act])
  ::
      %clear
    ?>  |(=(src.bowl our.bowl) =(src.bowl who.which.act))
    =/  open=wager:bet  (~(got by wagers) which.act)
    ?~  game.open  main
    ?^  tab.u.game.open  main
    =>  .(tab.u.game.open `(unit paid:bet)`tab.u.game.open)
    =|  =paid:bet
    =.  when.paid  now.bowl
    =.  tab.u.game.open  `paid
    =.  wagers  (put:on:wagers:bet wagers which.act open)
    ?.  =(src.bowl our.bowl)
      (give-update which.act)
    =.  who.which.act  our.bowl
    (send-message /clear who.which.act clear+which.act)
  ::
      %foul
    ?>  =(src.bowl our.bowl)
    =/  open=wager:act  (~(got by offers) which.act)
    ?~  game.open
      main
    =.  foul.game.open  foul.act
    =.  wagers  (put:on:wagers:bet wagers which.act open)
    main
  ==
::
++  send-message
  |=  [=wire who=@p =msg:bet]
  ^+  main
  (emit %pass wire %agent who^%bet %poke %bet-msg !>(msg))
--