interface EmailContent {
	entrepName: string;
	entrepEmail: string;
	entrepPhone: string;
	managerEmail: string;
	checkerName: string;
	checkerEmail: string;
	supplyDetails: string;
	supplyNote: string;
	firstCheckDate: string;
	actualFirstCheckDate: string;
	failedSecondCheckDate: string;
}

export const sendFailedSecondCheckEmail = async ({
	entrepName,
	entrepEmail,
	entrepPhone,
	managerEmail,
	checkerName,
	checkerEmail,
	supplyDetails,
	supplyNote,
	firstCheckDate,
	actualFirstCheckDate,
	failedSecondCheckDate
}: EmailContent) => {
	const emailTo = ['info@openversum.com', 'l.donadio@openversum.com'];
	const subject = `Unsuccessful Entrepreneur - ${entrepName}`;

	const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <h3>Second Inventory Check Failed</h3>
      <p>The entrepreneur <strong>${entrepName}</strong> has failed the second inventory check.</p>
      
      <h4>Inventory Check History</h4>
      <p>
        The first inventory check was scheduled for <strong>${firstCheckDate}</strong> and actually took place on <strong>${actualFirstCheckDate}</strong>.
        The second check, which failed, was scheduled for <strong>${failedSecondCheckDate}</strong>.
      </p>

      <h4>Details</h4>
      <p>
        Managed by <strong>${managerEmail}</strong>, the inventory was verified by 
        <strong>${checkerName} (${checkerEmail})</strong>.
      </p>
      
      <h4>Failed Supplies</h4>
      <p>The following supplies were not sold:</p>
      <ul>
        <li><strong>Details:</strong> ${supplyDetails}</li>
        <li><strong>Notes:</strong> ${supplyNote ?? 'N/A'}</li>
      </ul>

      <h4>Contact Information</h4>
      <p>Contact information for the entrepreneur:</p>
      <ul>
        <li><strong>Email:</strong> ${entrepEmail}</li>
        <li><strong>Phone:</strong> ${entrepPhone}</li>
      </ul>
      
      <hr>
      <footer>This is an automatically generated email by the Openversum app.</footer>
    </body>
    </html>
  `;

	return await fetch('/api/resend-info-email', {
		method: 'POST',
		body: JSON.stringify({ emailTo, subject, html }),
		mode: 'same-origin',
		headers: {
			'content-type': 'application/json'
		}
	});
};
