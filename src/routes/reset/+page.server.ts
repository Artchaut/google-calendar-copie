import { fail } from '@sveltejs/kit';

export const actions = {
	reset: async ({ request, url, locals: { supabase, getSession } }) => {
		const formData = await request.formData();

		const email = formData.get('email') as string;

		console.log(email);

		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/changepassword`
		});
	}
};
