/-  bet
|%
++  enjs-state
  =,  enjs:format
  |=  stat=state-0:bet
  ^-  json
  |^
  %-  pairs
  :~  ['offers' a+(turn ~(val by offers.stat) offer)]
      ['wagers' a+(turn ~(val by wagers.stat) wager)]
  ==
  ++  offer
    =,  enjs:format
    |=  =offer:bet
    ^-  json
    %-  pairs
    :~  ['id' (numb id.offer)]
        ['who' (ship who.offer)]
        ['race' (tape race.offer)]
        ['pick' (pick pick.offer)]
        ['heat' (heat heat.offer)]
        ['source' (tape source.offer)]
        ['bitch' b+bitch.offer]
    ==
  ++  wager
      =,  enjs:format
      |=  =wager:bet
      ^-  json
      %-  pairs
      :~  ['id' (numb id.wager)]
          ['who' (ship who.wager)]
          ['race' (tape race.wager)]
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
        ['claimer' (ship claimer.won.u.gem)]
        ['foul' s+foul.u.gem]
        :-  'paid'
            ?~  paid.gem
              ~
            %-  pairs
            :~  ['when' (sect when.u.paid.u.gem)]
                ['rail' (tape rail.u.paid.u.gem)]
            ==
    ==
  --
++  dejs-act
  =,  dejs:format
  |=  jon=json
  ^-  act:bet
  |^
  %.  jon
  %-  of
  :~  [%make (ot ~[offer+off])]
      [%take (ot ~[which+wich bet+ne])]
      [%bitch (ot ~[which+wich])]
      [%claim (ot ~[which+wich won+b])]
      [%settle (ot ~[which+wich paid+pad])]
      [%clear (ot ~[which+wich])]
      [%foul (ot ~[which+wich foul+fol])]
  ==
  ++  wich
    |=  jon=json
    ^-  which:bet
    (ot ~[who+(se @p) id+ni])
  ++  fol
    |=  jon=json
    ?:  =(~ jon)  ~
    ((su (perk %welshed %lied ~)) jon)
  ++  off
    |=  jon=json
    ^-  offer:bet
    %-  ot
    :~  [%id ni]
        [%who (se @p)]
        [%race so]
        [%pick (ot ~[side+b max+ne])]
        [%heat (mu (ot ~[for+ni against+ni]))]
        [%source (se @tas)]
        [%bitch b]
    ==
  ++  pad
    |=  jon=json
    ^-  paid:bet
    (ot ~[when+du rail+so])
  --
--