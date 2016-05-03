//From: https://gist.github.com/conorhastings/ba8a06ce061466ac3fe7
"use strict";

function createStore(reducer, initState) {
	var state = initState;
	var subscribers = [];

	var getState = function getState() {
		return state;
	};
	var dispatch = function dispatch(action) {
		state = reducer(state, action);
		subscribers.forEach(function (subscriber) {
			return subscriber();
		});
		return action;
	};
	var subscribe = function subscribe(listener) {
		subscribers.push(listener);
		return function () {
			subscribers = subscribers.slice(subscribers.indexOf(listener) + 1, 1);
		};
	};
	return {
		dispatch: dispatch,
		subscribe: subscribe,
		getState: getState
	};
}
