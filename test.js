const fileNameUpdate = (type, orderNumber, fileLength) => {
	switch (type) {
		case 'invoice':
			return 'Счёт_СКРАМ-Материалы_' + orderNumber + '_v' + (fileLength + 1) + '.docx';
			break
		case 'retail':
			return 'Счёт_Розница_СКРАМ-Материалы_' + orderNumber + '_v' + (fileLength + 1) + '.docx';
		case 'check':
			return 'Товарный_чек_СКРАМ-Материалы_' + orderNumber + '_v' + (fileLength + 1) + '.docx';
	
		default:
			break;
	}
}

const name = fileNameUpdate('check', 5, 3)
console.log(name)