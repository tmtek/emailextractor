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

		//Print the result to a comma delimited list:
		.toString();

	alert(emailList);
}

//Call the extraction function:
extractEmails();