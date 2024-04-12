import { redirect } from '@sveltejs/kit';

export const actions = {
	change: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const new_password = formData.get('password');

		const { data, error } = await supabase.auth.updateUser({
			password: new_password
		});

		if (data) {
			throw redirect(302, '/login');
		}

		if (error) {
			return { error: 'Something went wrong' };
		}
	}
};
