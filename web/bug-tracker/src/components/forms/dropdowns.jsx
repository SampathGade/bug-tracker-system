export default function DropDown(props) {
	/**
		props - removable=true, options=['a', 'b'], selected=null, setter=setUserHandler
	 */
	const options = props.options;
	const selectedVal = props.selected? props.selected: null;
	
	function getOptions() {
		if(props.removable) {
			if(selectedVal) {
            	return ['Remove Assignment', ...options];
			}
			return ['Unassigned', ...options];
		}
		return options;
	}
	
	function getDefault() {
		if(props.removable) return 'Unassigned';
		return options[0];
	}
	
	function handleAssignment(e) {
		const v = e.target.value;
		if(v === 'Remove Assignment' || v === 'Unassigned') {
			props.setter(null);
		}
		else {
			props.setter(v);
		}
	}
	
	return <select value={selectedVal? selectedVal: getDefault()} onChange={handleAssignment}>
				{getOptions().map(u => {
						return <option name={u} key={u} selected={selectedVal === u}>{u}</option>
					}
				)}
		</select>;

}