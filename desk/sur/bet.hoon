|%
+$  race   @t  ::  description of bet's object/conditions
+$  rail   @t  ::  payment method to use on resolution
+$  odds   [for=@ against=@]
+$  pick   [side=? max=@ud]  ::  side=true means we are for; stakes offered/accepted
+$  paid   [when=@da =rail]  ::  receipt
+$  foul   $~  ~    ?(%lied %welshed ~)
+$  score
  $:
    won=[claimer=@p res=?]
    =foul
    tab=(unit paid)
  ==
+$  wager
  $:  id=@da
      who=@p
      =race
      when=@da
      =pick
      heat=(unit odds)
      game=(unit score)
  ==
+$  source
  $?  %sent
      %recd
  ==
::
+$  offer
  $:  id=@da
      who=@p
      =race
      =pick
      heat=(unit odds)
      =source
      bitch=?
  ==
++  cmp
  |=  [a=[@p @da] b=[@p @da]]
  (lte +.a +.b)
++  offers
  =<  offers
  |%
  +$  offers  ((mop which offer) cmp)  ::  TODO write order comparator for mop
  ++  on  ((^on which offer) cmp)
  --
++  wagers
  =<  wagers
  |%
  +$  wagers  ((mop which wager) cmp)  ::  TODO write order comparator for mop
  ++  on  ((^on which wager) cmp)
  --
+$  which  [who=@p id=@da]
+$  act
  $%  [%make who=(unit @p) =offer]
      [%take =which bet=@ud]
      [%bitch =which]  ::  decline offer
      [%claim =which won=?]  ::  assert resolution
      [%foul =which]  ::  dispute claim or assert counterparty welshed
      [%settle =which =paid]  ::  payer notification of payee
      [%clear =which]  ::  payee indicates payment received
      [%foul =which =foul]
  ==
+$  update  (each offer wager)
+$  state-0
  $:  %0
    =offers  ::  most recent first
    =wagers
  ==
  ::  add manual remind msg?
--

::  future work
::  gossip offers to pals - expiry
::  betting pools, standing offers
::  trigger Lightning send if both/all parties agree
::  welsher score, predictor score
