/-  bet
/+  dbug, default-agent
|%
+$  versioned-state
  $%  state-0:bet
  ==
+$  card  card:agent:gall
--
::
%-  agent:dbug
=|  state-0:bet
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
  `this(state *state-0:bet)
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
      %bet-act   (handle-act:main !<(act:bet vase))
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
  ?+  path  (on-peek:def path)
      [%x %all ~]
    ``bet-state+!>(state)
  ==
::  client scries
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+  path  (on-watch:def path)
    [%updates ~]  ?>(=(our src):bowl `this)
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
    [%wager u.wag]
  [%offer (got:on:offers:bet offers which)]
++  handle-act
  |=  =act:bet
  ^+  main
  ?-    -.act
      %make
    ?:  =(src.bowl our.bowl)
      =.  source.offer.act  %sent
      =.  offers  (put:on:offers:bet offers [who.offer.act id.offer.act] offer.act)
      (send-action /make who.offer.act make+[offer.act])
    ?>  =(~ (~(get by offers) [src.bowl id.offer.act]))
    =.  source.offer.act  %recd
    =.  who.offer.act  src.bowl
    =.  offers  (put:on:offers:bet offers [src.bowl id.offer.act] offer.act)
    (give-update [src.bowl id.offer.act])
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
        race  race.offer
        when  now.bowl
        heat  heat.offer
      ==
    =?  pick.wager  =(source.offer %sent)
      [side.pick.offer bet.act]
    =?  pick.wager  =(source.offer %recd)
      [!side.pick.offer bet.act]
    =.  wagers  (put:on:wagers:bet wagers which.act wager)
    ?.  =(src.bowl our.bowl)
      (give-update which.act)
    (send-action /take who.which.act take+[[our.bowl id.which.act] bet.act])
  ::
      %bitch
    ?>  |(=(src.bowl our.bowl) =(src.bowl who.which.act))
    =/  =offer:bet  (~(got by offers) which.act)
    =.  bitch.offer  %.y
    =.  offers  (put:on:offers:bet offers which.act offer)
    ?.  =(src.bowl our.bowl)
      (give-update which.act)
    (send-action /bitch who.which.act bitch+[our.bowl id.which.act])
  ::
      %claim
    ?>  |(=(src.bowl our.bowl) =(src.bowl who.which.act))
    =/  open=wager:bet  (~(got by wagers) which.act)
    ?^  game.open
      ?:  =(src.bowl our.bowl)
        main
      =.  foul.u.game.open  %lied  ::  TODO: update client on foul
      (give-update which.act)
      ::  issue with simultaneous claims resulting in accidental fouls?
    =|  =score:bet
    =.  won.score  [src.bowl won.act]
    ::  TODO: add behn timer
    =.  wagers  (put:on:wagers:bet wagers which.act open(game `score))
    ?.  =(src.bowl our.bowl)
      (give-update which.act)
    =.  who.which.act  our.bowl
    (send-action /claim who.which.act claim+[which.act won.act])
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
    (send-action /settle who.which.act settle+[which.act paid.act])
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
    (send-action /clear who.which.act clear+which.act)
  ::
      %foul
    ?>  =(src.bowl our.bowl)
    =/  open=wager:bet  (~(got by wagers) which.act)
    ?~  game.open
      main
    =.  foul.u.game.open  foul.act
    =.  wagers  (put:on:wagers:bet wagers which.act open)
    main
  ==
::
++  send-action
  |=  [=wire who=@p =act:bet]
  ^+  main
  (emit %pass wire %agent who^%bet %poke %bet-act !>(act))
--
