//import { invalidate } from '$app/navigation';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const env: string = import.meta.env.MODE ?? "DEV";
	console.log(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
	const supabase = createSupabaseLoadClient({
		supabaseUrl:  env === "PROD" ? import.meta.env.PUBLIC_SUPABASE_URL : PUBLIC_SUPABASE_URL,
		supabaseKey: env == "PROD" ? import.meta.env.PUBLIC_SUPABASE_ANON_KEY : PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
