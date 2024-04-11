type event = {
	data: []
}

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		return { error: 'session have not been loaded' };
	}

	const { events, err } = await supabase
		.from('event')
		.eq('id', session.user.id)
		.select()

	return { session, events};
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const beginning = formData.get('beginning');
		const ending = formData.get('ending');

		const currentSession = await locals.getSession();
		const creator = currentSession.user.id;

		const now = new Date();

		console.log({
			name: name,
			description: description,
			creator: creator,
			created_at: now,
			beginning: beginning,
			collaborators: null,
			ending: ending
		});

		const { error } = await locals.supabase.from('event').insert({
			name: name,
			description: description,
			creator: creator,
			created_at: now,
			beginning: beginning,
			collaborators: null,
			ending: ending
		});
		console.log(error);
		return error;
	}
};
