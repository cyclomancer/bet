|%
+$  race   @ta
+$  rail   @ta
+$  odds   (pair @ @)
+$  pick   [side=? max=@ud]
+$  paid   [when=@da =rail]
+$  score  [won=? foul=? tab=(unit paid)]
+$  wager
  $:  id=@
      =race
      when=@da
      toss=(unit pick)
      heat=(unit odds)
      game=(unit score)
  ==
++  next-project
  [%ordinals %auction]
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
      [%bitch =which]
      [%claim =which won=?]
      [%foul =which]
      [%settle =which =paid]
      [%clear =which]
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

::  gossip offers to pals - expiry
::  betting pools, standing offers
::  trigger Lightning send if both/all parties agree
::  welsher score, predictor score