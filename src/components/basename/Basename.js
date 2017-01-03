import {useBasename} from 'history'

// This helper is for setting basename on examples with minimal boilerplate. In
// an actual application, you would build a custom history to set basename.
export default function withBasename(history, dirname) {
	if (dirname=='/') {
		return useBasename(() => history)({ basename: "/" });
	}else{
		return useBasename(() => history)({ basename: "/${dirname}" });
	}
}