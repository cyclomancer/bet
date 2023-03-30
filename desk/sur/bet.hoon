|%
+$  race   @ta  ::  description of bet's object/conditions
+$  rail   @ta  ::  payment method to use on resolution
+$  odds   (pair @ @)
+$  pick   [side=? max=@ud]  ::  side taken and stakes offered/accepted
+$  paid   [when=@da =rail]  ::  receipt
+$  score  [won=? foul=? tab=(unit paid)]  ::  outcome, foul indicates dispute with counterparty
+$  wager
  $:  id=@
      =race
      when=@da
      toss=(unit pick)
      heat=(unit odds)
      game=(unit score)
  ==
::
+$  offer
  $:  idx=@
      =race
      =pick
      heat=(unit odds)
  ==
+$  which  [who=@p id=@]
+$  bet-act
  $%  [%make who=@p =offer]
      [%take =which bet=@ud]
      [%bitch =which]  ::  decline offer
      [%claim =which won=?]  ::  assert resolution
      [%foul =which]  ::  dispute claim or assert counterparty welshed
      [%settle =which =paid]  ::  payer notification of payee
      [%clear =which]  ::  payee indicates payment received
  ==
+$  bet-msg
  $%  [%made =offer]
      [%taken i=@ bet=@ud]
      [%bitched i=@]
      [%claimed i=@ won=?]
      [%settled i=@ =paid]
      [%cleared i=@]
  ==
--

::  future work
::  gossip offers to pals - expiry
::  betting pools, standing offers
::  trigger Lightning send if both/all parties agree
::  welsher score, predictor score