import { NavigationActions, StackActions } from 'react-navigation';
import type { NavigationParams, NavigationRoute } from 'react-navigation';


let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeName,
      params,
    })
  );
}

function reset(routeName, params) {
	console.log('reset gets called');
	_navigator.dispatch(
		StackActions.reset({
	      index: 0,
	      actions: [NavigationActions.navigate({routeName: routeName, params: params})]
    	})
	);
}

function state() {
	console.log(_navigator);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  state,
  reset
};