import React from "react";
import WagerList from "../components/WagerList";
import {
  NewWagerScreenNavigationProp,
  NewWagerScreenRouteProp,
} from "../AppNavigator";
import WagerForm from "../components/WagerForm";

interface NewWagerProps {
  navigation: NewWagerScreenNavigationProp;
  route: NewWagerScreenNavigationProp;
}
const NewWager = (props: NewWagerProps) => {
  const onSubmit = () => {};

  return (<WagerForm onSubmit={onSubmit} />);
};

export default NewWager;
