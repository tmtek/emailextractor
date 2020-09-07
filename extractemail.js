/**
 * This function will extract all email addresses that appear in a table row on a page.
 * The rows must also contain a checkbox that is checked.
 */
function extractEmails(){
	
	//RegEx for valid email address:
	const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	
	let emailList = 

		//Find all table rows in the document:
		[...document.querySelectorAll('tr')]

		//Filter out any rows that don't have a clicked checkbox in them:
		.filter(tr => {
			let cb = [...tr.querySelectorAll('input[type=checkbox]')];
			return cb && cb[0] && cb[0].checked;
		})

		//Search all table cells for a string that matches the format of an email address: 
		.reduce((acc, tr) => {
			let tds = [...tr.querySelectorAll('td')]
				.map(td => td.textContent)
				.filter(text => text.match(EMAIL_PATTERN));
			if(tds.length) acc.push(tds[0]);
			return acc;
		}, [])

	//If we find addresses, let's copy them to the clipboard, and alert the user:
	if(emailList.length) {
		navigator.clipboard.writeText(emailList.toString()).then(
			() => alert(`The following ${emailList.length} addresses have been copied to your clipboard in a comma delimited list you can use in a BCC field:\n\n${emailList.join("\n")}`), 
			() => alert("Failed to copy addresses to the clipboard")
		);
	//Tell the user we didn't find any addresses:	
	} else {
		alert("We didn't find any email addresses on this page.");
	}
}

//Call the extraction function:
extractEmails();