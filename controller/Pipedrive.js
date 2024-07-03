import pipedrive from 'pipedrive';


const defaultClient = new pipedrive.ApiClient();

defaultClient.authentications.api_key.apiKey = '7632c71c4d05079df3f8a8718f9763fd0cde670d';

async function addDeal() {
	try {
		console.log('Sending request...');

		const api = new pipedrive.DealsApi(defaultClient);

		const data = {
			title: 'Test deal',
			value: 10000,
			currency: 'USD',
			user_id: null,
			person_id: null,
			org_id: 1,
			stage_id: 1,
			status: 'open',
			expected_close_date: '2022-02-11',
			probability: 60,
			lost_reason: null,
			visible_to: 1,
			add_time: '2021-02-11',
		}
		const response = await api.addDeal(data);
		console.log('Deal was added successfully!', response);
		return response.data.id;
	} catch (err) {
		const errorToLog = err.context?.body || err;

		console.log('Adding failed', errorToLog);
	}
}

async function updatingCustomFieldValue(id, name, value) {
	try {
		console.log('Sending request...');

		const DEAL_ID = id; // An ID of Deal which will be updated
		const fieldsApi = new pipedrive.DealFieldsApi(defaultClient);
		const dealsApi = new pipedrive.DealsApi(defaultClient);

		// Get all Deal fields (keep in mind pagination)
		const dealFields = await fieldsApi.getDealFields();
		// Find a field you would like to set a new value to on a Deal
		const appointedManagerField = dealFields.data.find(field => field.name === name);

		const updatedDeal = await dealsApi.updateDeal(DEAL_ID, {
			[appointedManagerField.key]: value
		});

		console.log('The value of the custom field was updated successfully!', updatedDeal);
	} catch (err) {
		const errorToLog = err.context?.body || err;

		console.log('Updating failed', errorToLog);
	}
}

export async function add(req, res) {
	try {
		const id = await addDeal();
		await updatingCustomFieldValue(id, "Address", req.body.address);
		await updatingCustomFieldValue(id, "Job type", req.body.jobType);
		await updatingCustomFieldValue(id, "Job source", req.body.jobSource);
		await updatingCustomFieldValue(id, "Job date", req.body.date);
		await updatingCustomFieldValue(id, "Job start time", req.body.startTime);
		await updatingCustomFieldValue(id, "Job end time", req.body.endTime);
		await updatingCustomFieldValue(id, "Tampa Technician", req.body.tampa);
		await updatingCustomFieldValue(id, "Miami Technician", req.body.miami);
		await updatingCustomFieldValue(id, "Orlando Technician", req.body.orlando);
		await updatingCustomFieldValue(id, "Houston Technician", req.body.houston);
		await updatingCustomFieldValue(id, "Charlotte Technician", req.body.charlotte);
		await updatingCustomFieldValue(id, "Austin Technician", req.body.austin);
		await updatingCustomFieldValue(id, "Area", req.body.area);
		await updatingCustomFieldValue(id, "Tags", req.body.tags);
		await updatingCustomFieldValue(id, "Job comment", req.body.descr);
		await updatingCustomFieldValue(id, "Job ID", req.body.jobID);
		await updatingCustomFieldValue(id, "Job Link", req.body.jobLink);
		await updatingCustomFieldValue(id, "City", req.body.city);
		await updatingCustomFieldValue(id, "State", req.body.state);
		await updatingCustomFieldValue(id, "First name", req.body.firstName);
		await updatingCustomFieldValue(id, "Last name", req.body.lastName);
		await updatingCustomFieldValue(id, "Phone", req.body.phone);
		await updatingCustomFieldValue(id, "Email", req.body.email);

		res.json({ "success": true })
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось создать работу',
		});
	}
}