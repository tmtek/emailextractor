import extractFromTable from './extract';

const emailList = extractFromTable();

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