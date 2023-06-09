/-  bet
|%
++  enjs-state
  =,  enjs:format
  |=  stat=state-0:bet
  ^-  json
  |^
  %-  pairs
  :~  :-  'offers'
      %-  pairs
      %+  turn  (tap:on:offers:bet offers.stat)
      |=  [w=which:bet o=offer:bet]
      [(which-str w) (offer o)] 
    ::
      :-  'wagers'
      %-  pairs
      %+  turn  (tap:on:wagers:bet wagers.stat)
      |=  [wh=which:bet wa=wager:bet]
      [(which-str wh) (wager wa)] 
  ==
  ++  which-str
    |=  w=which:bet
    ^-  @t
    (crip "{(scow %p who.w)}/{(scow %da id.w)}")

  ++  offer
    =,  enjs:format
    |=  =offer:bet
    ^-  json
    %-  pairs
    :~  ['id' s/(scot %da id.offer)]
        ['who' s/(scot %p who.offer)]
        ['race' s/race.offer]
        ['pick' (pick pick.offer)]
        ['heat' (heat heat.offer)]
        ['source' s/source.offer]
        ['bitch' b+bitch.offer]
    ==
  ++  wager
      =,  enjs:format
      |=  =wager:bet
      ^-  json
      %-  pairs
      :~  ['id' s/(scot %da id.wager)]
          ['who' s/(scot %p who.wager)]
          ['race' s/race.wager]
          ['when' (sect when.wager)]
          ['pick' (pick pick.wager)]
          ['heat' (heat heat.wager)]
          ['game' (game game.wager)]
      ==
  ++  pick
      |=  =pick:bet
      %-  pairs
      :~  ['side' b+side.pick]
          ['max' (numb max.pick)]
      ==
  ++  heat
      |=  hat=(unit odds:bet)
      ?~  hat
        ~
      %-  pairs
      :~  ['for' (numb for.u.hat)]
          ['against' (numb against.u.hat)]
      ==
  ++  game
    |=  gem=(unit score:bet)
    ?~  gem
      ~
    %-  pairs
    :~  ['result' b+res.won.u.gem]
        ['claimer' s/(scot %p claimer.won.u.gem)]
        ['foul' ?~(foul.u.gem ~ s+`@t`foul.u.gem)]
        :-  'paid'
            ?~  tab.u.gem
              ~
            %-  pairs
            :~  ['when' (sect when.u.tab.u.gem)]
                ['rail' s/rail.u.tab.u.gem]
            ==
    ==
  --
++  dejs-act
  =,  ^?(dejs:format)
  |=  jon=json
  ~!  ..bet
  ^-  act:bet
  |^
  %.  jon
  %-  of
  :~  [%make off]
      [%take (ot ~[which+wich bet+ni])]
      [%bitch wich]
      [%claim (ot ~[which+wich won+bo])]
      [%settle (ot ~[which+wich paid+pad])]
      [%clear wich]
      [%foul (ot ~[which+wich foul+fol])]
  ==
  ++  wich
    ^-  $-(json which:bet)
    (ot ~[who+(se %p) id+(se %da)])
  ++  fol
    |=  jon=json
    ?:  =(~ jon)  ~
    ((su (perk %welshed %lied ~)) jon)
  ++  off
    ^-  $-(json offer:bet)
    %-  ot
    :~  [%id (se %da)]
        [%who (se %p)]
        [%race so]
        [%pick (ot ~[side+bo max+ni])]
        [%heat (mu (ot ~[for+ni against+ni]))]
        [%source (su (perk %recd %sent ~))]
        [%bitch bo]
    ==
  ++  pad
    ^-  $-(json paid:bet)
    (ot ~[when+du rail+so])
  --
--
