import extractFromTable, { isEmail } from '../src/extract';

function generateTable(rows = []) {
	return `
	<table>${rows.map(r => `
		<tr>
			<td><input type="checkbox" ${!!r.checked && "checked"}></td>
			<td>${r.name}</td>
			<td>${r.email}</td>
		</tr>
	`)}</table>
	`;
}

describe('isEmail', () => {

	it('Should return true when value matches email address pattern.', () => {
		expect(isEmail("username@domain.com")).toBe(true);
	});

	it('Should return false when value does not match email address pattern.', () => {
		expect(isEmail("test")).toBe(false);
		expect(isEmail("")).toBe(false);
	});

	it('Should return false when value is not a string value.', () => {
		expect(isEmail()).toBe(false);
		expect(isEmail(1)).toBe(false);
		expect(isEmail({})).toBe(false);
		expect(isEmail([])).toBe(false);
	});
});

describe('extractFromTable', () => {

	it(`Should extract all emails in a row with checked checkboxes.`, () => {
		const rows = [
			{
				checked:true,
				name:"Jon Doe",
				email:"jon@example.com"
			},
			{
				checked:true,
				name:"Jane Doe",
				email:"jane@example.com"
			}
		];
		document.body.innerHTML = generateTable(rows);
		expect(extractFromTable()).toMatchObject(rows.map(r => r.email));
	});

	it(`Should not extract emails that are not in a row with a checked checkbox.`, () => {
		const rows = [
			{
				checked:true,
				name:"Jon Doe",
				email:"jon@example.com"
			},
			{
				checked:false,
				name:"Jane Doe",
				email:"jane@example.com"
			}
		];
		document.body.innerHTML = generateTable(rows);
		expect(extractFromTable()).toMatchObject([rows[0].email]);
	});
});

